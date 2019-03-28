/* eslint-disable import/prefer-default-export */
import { query, pool } from '../db/index';

class Email {
  static async createMessage({
    subject, message, status,
  }) {
    const dbQuery = `INSERT INTO
      emails(subject, message, status)
      VALUES($1, $2, $3)
      returning *`;
    const values = [
      subject,
      message,
      status,
    ];

    try {
      // await query('BEGIN');
      const { rows } = await query(dbQuery, values);
      return {
        success: true,
        data: { ...rows[0] },
      };
    } catch (e) {
      // await query('ROLLBACK');
      return {
        success: false,
        error: e,
      };
    }
  }

  /* istanbul ignore next */
  static async createEmailTable() {
    /* istanbul ignore next */
    const queryText = `CREATE TABLE IF NOT EXISTS
      emails(
        id SERIAL NOT NULL UNIQUE PRIMARY KEY,
        subject VARCHAR(128),
        message TEXT,
        parentMessageId INTEGER,
        status VARCHAR(128),
        createdAt TIMESTAMP DEFAULT NOW()
      )`;
    await pool
      .query(queryText)
      /* istanbul ignore next */
      .then(() => {
        // pool.end();
      })
      .catch(() => {
        /* istanbul ignore next */
        // pool.end();
      });
  }

  /* istanbul ignore next */
  static async dropEmailTable() {
    /* istanbul ignore next */
    const queryText = 'DROP TABLE IF EXISTS emails CASCADE';
    /* istanbul ignore next */
    await pool
      .query(queryText)
      /* istanbul ignore next */
      .then(() => {
        /* istanbul ignore next */
        // pool.end();
      })
      /* istanbul ignore next */
      .catch(() => {
        /* istanbul ignore next */
        // pool.end();
      });
  }

  static async saveDraft({
    subject, message, status, recieversEmail, userId,
  }) {
    try {
      await query('BEGIN');
      const getReceiver = 'SELECT * FROM users WHERE email=$1';
      const res = await query(getReceiver, [recieversEmail]);
      let receiverId = null;

      if (res.rows[0]) {
        receiverId = res.rows[0].id;
      }

      const dbQuery = `INSERT INTO
      emails(subject, message, status)
      VALUES($1, $2, $3)
      returning *`;
      const values = [
        subject,
        message,
        status,
      ];

      const result = await query(dbQuery, values);

      const msg = result.rows[0];
      const messageId = msg.id;

      const draftQuery = `INSERT INTO
    drafts(senderid, receiverid, messageid) 
    VALUES ($1, $2, $3) RETURNING *
    `;

      const draftValues = [userId, receiverId, messageId];
      await query(draftQuery, draftValues);
      const info = {
        id: messageId,
        createdOn: msg.createdat,
        subject: msg.subject,
        message: msg.message,
        parentMessageId: msg.parentmessageid,
        status: msg.status,
      };
      await query('COMMIT');

      return {
        status: 201,
        message: 'draft saved successfully',
        data: info,
      };
    } catch (e) {
      await query('ROLLBACK');
      return {
        statuc: 500,
        error: 'something went wrong',
      };
    }
  }

  static async sendMessage({
    subject, message, status, recieversEmail, userId,
  }) {
    const getReceiver = 'SELECT * FROM users WHERE email=$1';
    const res = await query(getReceiver, [recieversEmail]);

    if (res.rows[0] === undefined) {
      return {
        status: 404,
        error: `User with email ${recieversEmail} not found`,
      };
    }
    const receiverId = res.rows[0].id;
    try {
      await query('BEGIN');

      const dbQuery = `INSERT INTO
      emails(subject, message, status)
      VALUES($1, $2, $3)
      returning *`;
      const values = [
        subject,
        message,
        status,
      ];

      const result = await query(dbQuery, values);

      const msg = result.rows[0];
      const messageId = msg.id;

      const inboxQuery = `INSERT INTO
    inboxs(senderid, receiverid, messageid, read) 
    VALUES ($1, $2, $3, $4) RETURNING *
    `;

      const inboxValue = [
        userId,
        receiverId,
        messageId,
        false,
      ];

      await query(inboxQuery, inboxValue);

      const sentQuery = `INSERT INTO
    sents(senderid, receiverid, messageid, read) 
    VALUES ($1, $2, $3, $4) RETURNING *
    `;

      const sentValue = [
        userId,
        receiverId,
        messageId,
        false,
      ];

      await query(sentQuery, sentValue);
      const info = {
        id: messageId,
        createdOn: msg.createdat,
        subject: msg.subject,
        message: msg.message,
        parentMessageId: msg.parentmessageid,
        status: msg.status,
      };
      await query('COMMIT');

      return {
        status: 201,
        message: 'message sent successfully',
        data: info,
      };
    } catch (e) {
      await query('ROLLBACK');
      return {
        status: 500,
        error: 'something went wrong',
      };
    }
  }

  static async getMessageReceiverId(email) {
    const findQuery = 'SELECT * FROM users WHERE email=$1 ';

    try {
      const { rows } = await query(findQuery, [email]);
      if (!rows[0]) {
        return {
          success: false,
          error: 'user not found try another email',
        };
      }
      const { id } = rows[0];
      return {
        success: true,
        id,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }

  static qry(field, table, otherField) {
    const dbQuery = `SELECT emails.id as id,  emails.subject as subject, emails.message as message, emails.parentmessageid as parentMessageId,
    emails.status as status, ${table}.receiverid as receiverId, ${table}.senderid as senderId, ${table}.read as read, ${table}.createdat as createdOn,
    users.firstname as firstname, users.lastname as lastname, users.email as email
    FROM ${table}
    INNER JOIN users ON ${table}.${otherField} = users.id 
    INNER JOIN emails ON ${table}.messageid = emails.id WHERE ${table}.${field} = $1
     `;
    return dbQuery;
  }

  static async queryToRun(userId, field, table, otherField) {
    const dbQuery = this.qry(field, table, otherField);
    try {
      const { rows } = await query(dbQuery, [userId]);
      if (!rows[0]) {
        return {
          success: true,
          empty: true,
          data: [],
        };
      }
      const data = rows;
      return {
        success: true,
        empty: false,
        data,
      };
    } catch (e) {
      return {
        success: false,
        error: 'something went wrong',
      };
    }
  }

  static async getInboxMessages(userId) {
    return this.queryToRun(userId, 'receiverid', 'inboxs', 'senderid');
  }

  static async getSentEmails(userId) {
    return this.queryToRun(userId, 'senderid', 'sents', 'receiverid');
  }

  static async getUnReadEmails(userId) {
    const dbQuery = `SELECT emails.id as id,  emails.subject as subject, emails.message as message, emails.parentmessageid as parentMessageId,
    emails.status as status, inboxs.receiverid as receiverId, inboxs.senderid as senderId, inboxs.read as read, inboxs.createdat as createdOn
    FROM inboxs
    INNER JOIN emails ON inboxs.messageid = emails.id  WHERE inboxs.receiverid = $1 AND inboxs.read =$2;
     `;
    try {
      const { rows } = await query(dbQuery, [userId, false]);
      return {
        status: 200,
        data: rows,
      };
    } catch (e) {
      return {
        status: 500,
        error: 'something went wrong',
      };
    }
  }

  static async deleteInboxMessage({ userId, id }) {
    const dbQuery = 'DELETE FROM inboxs WHERE messageid=$1 AND receiverid=$2 returning *';

    try {
      const { rows } = await query(dbQuery, [id, userId]);
      if (!rows[0]) {
        return {
          status: 404,
          data: 'no result',
        };
      }
      return {
        status: 202,
        data: 'deleted successfully',
      };
    } catch (error) {
      return {
        status: 500,
        error: 'something went wrong',
      };
    }
  }

  static async deleteASentMessage({ userId, id }) {
    const dbQuery = 'DELETE FROM sents WHERE messageid=$1 AND senderid=$2 returning *';

    try {
      const { rows } = await query(dbQuery, [id, userId]);
      if (!rows[0]) {
        return {
          status: 404,
          data: 'no result',
        };
      }
      return {
        status: 202,
        data: 'deleted successfully',
      };
    } catch (error) {
      return {
        status: 500,
        error: 'something went wrong',
      };
    }
  }

  static async messageExists(userId, messageId, table, field) {
    const dbQuery = `SELECT * FROM ${table} WHERE ${field}=$1 AND messageid=$2`;
    try {
      const { rows } = await query(dbQuery, [userId, messageId]);
      if (!rows[0]) {
        return {
          success: false,
          data: 'no found',
        };
      }
      return {
        success: true,
        data: rows[0],
      };
    } catch (err) {
      return {
        success: false,
        data: err,
      };
    }
  }

  static async getOneMessage(table, field, userId, messageId) {
    const getQuery = `SELECT emails.id as id,  emails.subject as subject,
    emails.message as message, emails.parentmessageid as parentMessageId,
    emails.status as status, ${table}.receiverid as receiverId, 
    ${table}.senderid as senderId, ${table}.read as read, ${table}.createdat as createdOn
    FROM ${table}
    INNER JOIN emails ON ${table}.messageid = emails.id  WHERE ${table}.${field} = $1 AND ${table}.messageid =$2`;

    try {
      const { rows } = await query(getQuery, [userId, messageId]);
      return {
        status: 200,
        data: rows[0],
      };
    } catch (e) {
      return {
        status: 500,
        error: 'something went wrong',
      };
    }
  }

  static async readMessage(userId, messageId, table, field, otherfield) {
    const dbQuery = `UPDATE ${table} SET read=$1 WHERE messageid=$2 AND ${field}=$3 returning *`;

    try {
      await query('BEGIN');
      await query(dbQuery, ['true', messageId, userId]);

      const getQuery = `SELECT emails.id as id,  emails.subject as subject, emails.message as message, emails.parentmessageid as parentMessageId,
    emails.status as status, ${table}.receiverid as receiverId, ${table}.senderid as senderId, ${table}.read as read, ${table}.createdat as createdOn,
    users.firstname as firstname, users.lastname as lastname, users.email as email
    FROM ${table}
    INNER JOIN users ON ${table}.${otherfield} = users.id
    INNER JOIN emails ON ${table}.messageid = emails.id  WHERE ${table}.${field} = $1 AND ${table}.messageid =$2`;

      const res = await query(getQuery, [userId, messageId]);

      await query('COMMIT');
      return {
        success: true,
        data: res.rows[0],
      };
    } catch (e) {
      await query('ROLLBACK');
      return {
        success: false,
        error: 'something went wrong',
      };
    }
  }

  static async getAnInboxMessage({ userId, messageId }) {
    const exists = await this.messageExists(userId, messageId, 'inboxs', 'receiverid');
    if (exists.success) {
      const res = await this.readMessage(userId, messageId, 'inboxs', 'receiverid', 'senderid');
      if (res.success) {
        return {
          status: 200,
          data: res.data,
        };
      }
      return {
        status: 500,
        error: res.error,
      };
    }
    return {
      status: 200,
      data: [],
    };
  }

  static async getASentMessage({ userId, messageId }) {
    const exists = await this.messageExists(userId, messageId, 'sents', 'senderid');
    if (exists.success) {
      const res = await this.readMessage(userId, messageId, 'sents', 'senderid', 'receiverid');
      if (res.success) {
        return {
          status: 200,
          data: res.data,
        };
      }
      return {
        status: 500,
        error: res.error,
      };
    }
    return {
      status: 200,
      data: [],
    };
  }
}

export { Email };
