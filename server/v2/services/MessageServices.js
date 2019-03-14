import moment from 'moment';
import {
  messages, drafts, inboxs, sents,
} from '../dummyData/Database';
import query from '../db/index';
import Inbox from '../model/inbox';
import Sent from '../model/sent';
import Draft from '../model/draft';

export default class messageServices {
  static async createMessage({
    subject, message, status, contactEmail, userId,
  }) {
    const dbQuery = `INSERT INTO
      emails(subject, message, created_date, modified_date)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      subject,
      message,
      status,
      moment(new Date()),
      moment(new Date()),
    ];

    try {
      const { rows } = await query(dbQuery, values);
      return {
        status: 201,
        message: 'message created',
        data: rows[0],
      };
    } catch (error) {
      return {
        status: 400,
        error: [error],
      };
    }
  }

  static filteredMessage(msgs) {
    const response = [];

    msgs.forEach((inbox) => {
      const mail = messages.find(data => data.id === inbox.messageId);
      const { subject, message, parentMessageId } = mail;
      const {
        id, createdOn, read, status, senderId, receiverId,
      } = inbox;

      response.push({
        id, createdOn, subject, message, senderId, receiverId, parentMessageId, status, read,
      });
    });

    return response;
  }

  static getUsersMessages(userId) {
    const msgs = inboxs.filter(data => data.receiverId === userId);
    const response = this.filteredMessage(msgs);
    return response;
  }

  static getSentEmails(userId) {
    const msgs = sents.filter(data => data.senderId === userId);
    const response = this.filteredMessage(msgs);
    return {
      status: 200,
      data: response,
    };
  }

  static getUnReadEmails(userId) {
    const response = this.getUsersMessages(userId);
    const res = response.filter(data => data.read === false);

    return {
      status: 200,
      data: res,
    };
  }

  static deleteAnInboxMessage({ userId, id }) {
    let response = 'unsuccessful';
    const inboxId = inboxs.findIndex(data => (data.senderId === parseInt(userId, 10)
     && data.messageId === parseInt(id, 10)));

    if (inboxId !== -1) {
      inboxs.splice(inboxId, 1);
      response = 'deleted successfully';
    } else {
      response = 'not found';
    }
    return {
      status: 202,
      data: [{ message: response }],
    };
  }

  static viewAnInboxMessage({ userId, id }) {
    const inbox = inboxs.find(data => (data.receiverId === parseInt(userId, 10)
      && data.id === parseInt(id, 10)));

    let response = [];

    if (inbox) {
      const msg = messages.find(data => data.id === parseInt(inbox.messageId, 10));

      const { subject, message, parentMessageId } = msg;
      const {
        createdOn, read, status, senderId, receiverId,
      } = inbox;

      response.push({
        id: inbox.id,
        createdOn,
        read,
        status,
        senderId,
        receiverId,
        subject,
        message,
        parentMessageId,
      });
    } else {
      response = [{ message: 'not found' }];
    }

    return {
      status: 200,
      data: response,
    };
  }

  static getRecievedEmails(userId) {
    const response = this.getUsersMessages(userId);

    return {
      status: 200,
      data: response,
    };
  }

  static saveDraft(data) {
    const { userId, contactEmail } = data;

    const receiverId = this.getMessageReceiverId(contactEmail);
    const message = this.createMessage(data);

    const draft = new Draft();
    draft.id = drafts[drafts.length - 1].id + 1;
    draft.senderId = userId;
    draft.receiverId = receiverId;
    draft.messageId = message.id;

    drafts.push(draft);

    return {
      status: 201,
      message: 'draft saved successfully',
      data: [message],
    };
  }

  static async getMessageReceiverId(email) {
    const findQuery = 'SELECT id FROM users WHERE id=$1 returning id';

    try {
      const { rows } = await query(findQuery, [email]);
      if (!rows[0]) {
        return {
          status: 400,
          error: ['user not found try another email'],
        };
      }
      const { id } = rows[0];
      return {
        status: 200,
        id,
      };
    } catch (error) {
      return {
        status: 400,
        error: [error],
      };
    }
  }

  static sendMessage(data) {
    const { userId, contactEmail } = data;

    const receiverId = this.getMessageReceiverId(contactEmail);
    const message = this.createMessage(data);

    const inbox = new Inbox();
    inbox.id = drafts[drafts.length - 1].id + 1;
    inbox.receiverId = receiverId;
    inbox.senderId = userId;
    inbox.messageId = message.id;

    inboxs.push(inbox);

    const sent = new Sent();
    sent.id = sents[sents.length - 1].id + 1;
    sent.messageId = message.id;
    sent.senderId = userId;
    sent.receiverId = receiverId;

    sents.push(sent);

    return {
      status: 201,
      message: 'message sent successfully',
      data: [message],
    };
  }
}
