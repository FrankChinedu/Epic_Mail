import { Email } from '../model/email';

export default class MessageServices {
  static async saveDraft(data) {
    return Email.saveDraft(data);
  }

  static async sendMessage(data) {
    return Email.sendMessage(data);
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
    return Email.getUnReadEmails(userId);
  }

  static async viewAnInboxMessage({ userId, messageId }) {
    return Email.getAnInboxMessage({ userId, messageId });
  }

  static async viewASentMessage({ userId, messageId }) {
    return Email.getASentMessage({ userId, messageId });
  }

  static async deleteAnInboxMessage(data) {
    return Email.deleteInboxMessage(data);
  }

  static async deleteASentMessage(data) {
    return Email.deleteASentMessage(data);
  }
}
