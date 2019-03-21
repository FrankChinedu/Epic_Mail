import { Group } from '../model/group';
import { GroupMember } from '../model/groupMembers';

export default class UserServices {
  static async createGroup(data) {
    return Group.createGroup(data);
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
    if (res.success) {
      const membersEmails = res.emails;
      const resp = await Group.sendGroupMessage(membersEmails, data);
      return {
        status: 201,
        data: resp,
      };
    }
    return res;
  }
}
