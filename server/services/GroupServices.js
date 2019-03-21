import { Group } from '../model/group';
import { GroupMember } from '../model/groupMembers';
import { Sent } from '../model/sent';
import { Email } from '../model/email';
import Helpers from '../helpers/Helpers';
import { Inbox } from '../model/inbox';

export default class UserServices {
  static async createGroup(data) {
    const res = await Group.createGroup(data);

    return {
      status: 201,
      message: 'group created successfully',
      data: [res.data],
    };
  }

  static async getAllGroup(userId) {
    const response = await Group.getAllGroup(userId);
    return {
      status: 200,
      data: response.data,
    };
  }

  static async editGroup(data) {
    const response = await Group.editGroup(data);
    if (response.success) {
      return {
        status: 200,
        data: response.data,
      };
    }
    return {
      status: 404,
      data: response.data,
    };
  }

  static async deleteGroup(data) {
    return Group.deleteGroup(data);
  }

  static async addContactToGroup(data) {
    return Group.addContactToGroup(data);
  }

  static async removeMemberFromGroup(data) {
    return GroupMember.removeMemberFromGroup(data);
  }

  static async sendGroupMessage(data) {
    const res = await GroupMember.retriveMembersEmails(data);
    const { userId } = data;
    if (res.success) {
      const membersEmails = res.emails;

      const details = { ...data };

      let msg = await Email.createMessage(details);

      msg = msg.data;
      const messageId = msg.id;

      await Helpers.asyncForEach(membersEmails, async (recieversEmail) => {
        const result = await Email.getMessageReceiverId(recieversEmail);
        const receiverId = result.id;

        const inserts = { userId, messageId, receiverId };

        await Inbox.insertIntoInboxTable(inserts);
        await Sent.insertIntoSentTable(inserts);
      });

      const info = {
        id: messageId,
        createdOn: msg.createdat,
        subject: msg.subject,
        message: msg.message,
        parentMessageId: msg.parentmessageid,
        status: msg.status,
      };

      return {
        status: 201,
        data: [info],
      };
    }
    return res;
  }
}
