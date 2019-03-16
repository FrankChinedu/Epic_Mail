import { Sent } from '../model/sent';
import { Inbox } from '../model/inbox';
import { Email } from '../model/email';
import { Draft } from '../model/draft';

export default class messageServices {
  static async saveDraft(data) {
    const { userId, recieversEmail } = data;

    const res = await Email.getMessageReceiverId(recieversEmail);
    let receiverId = null;

    if (res.success) {
      receiverId = res.id;
    }

    let msg = await Email.createMessage(data);
    if (!msg.success) {
      return {
        status: 401,
        error: msg.error,
      };
    }
    msg = msg.data;
    const messageId = msg.id;

    const inserts = { userId, messageId, receiverId };

    const fromDraft = await Draft.insertIntoDraftTable(inserts);

    if (!fromDraft.success) {
      return {
        status: 401,
        error: fromDraft.error,
      };
    }

    const info = {
      id: messageId,
      createdOn: msg.createdat,
      subject: msg.subject,
      message: msg.message,
      parentMessageId: msg.parentMessageId,
      status: msg.status,
    };

    return {
      status: 201,
      message: 'draft saved successfully',
      data: [info],
    };
  }

  static async sendMessage(data) {
    const { userId, recieversEmail } = data;

    const res = await Email.getMessageReceiverId(recieversEmail);
    if (!res.success) {
      return {
        status: 401,
        error: res.error,
      };
    }
    const receiverId = res.id;

    let msg = await Email.createMessage(data);
    if (!msg.success) {
      return {
        status: 401,
        error: msg.error,
      };
    }
    msg = msg.data;
    const messageId = msg.id;

    const inserts = { userId, messageId, receiverId };

    const result = await Inbox.insertIntoInboxTable(inserts);

    if (!result.success) {
      return {
        status: 4012,
        error: result.error,
      };
    }

    const fromSent = await Sent.insertIntoSentTable(inserts);
    if (!fromSent.success) {
      return {
        status: 401,
        error: fromSent.error,
      };
    }

    const info = {
      id: messageId,
      createdOn: msg.createdat,
      subject: msg.subject,
      message: msg.message,
      parentMessageId: msg.parentMessageId,
      status: msg.status,
    };

    return {
      status: 201,
      message: 'message sent successfully',
      data: [info],
    };
  }

  static async getRecievedEmails(userId) {
    const response = await Email.getInboxMessages(userId);
    if (response.success) {
      return {
        status: 200,
        data: response.data,
      };
    }
    return {
      status: 500,
      error: response.error,
    };
  }

  static async getSentEmails(userId) {
    const response = await Email.getSentEmails(userId);
    if (response.success) {
      return {
        status: 200,
        data: response.data,
      };
    }
    return {
      status: 500,
      error: response.error,
    };
  }

  static async getUnReadEmails(userId) {
    const response = await Email.getInboxMessages(userId);

    if (response.success) {
      let res = response.data[0];
      res = res.filter(data => data.read === true);
      if (!res.length) {
        res = [
          {
            message: 'No unread messages',
          },
        ];
      }
      return {
        status: 200,
        data: res,
      };
    }
    return {
      status: 500,
      error: response.error,
    };
  }


  static async viewAnInboxMessage({ userId, messageId }) {
    const response = await Email.getInboxMessages(userId);

    if (response.success) {
      let res = response.data[0];
      res = res.find(data => data.id === parseInt(messageId, 0));
      return {
        status: 200,
        data: [res],
      };
    }
    return {
      status: 500,
      error: response.error,
    };
  }

  static async deleteAnInboxMessage(data) {
    const response = await Email.deleteInboxMessage(data);
    if (response.success) {
      return {
        status: 202,
        data: response.data,
      };
    }
    return {
      status: 500,
      error: response.error,
    };
  }
}
