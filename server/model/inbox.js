/* eslint-disable import/prefer-default-export */
import moment from 'moment';
import { query, pool } from '../db/index';

class Inbox {
  static async insertIntoInboxTable({ userId, messageId, receiverId }) {
    const findQuery = `INSERT INTO
    inboxs(senderid, receiverid, messageid, read, createdat, updatedat) 
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `;

    const values = [
      userId,
      receiverId,
      messageId,
      false,
      moment(new Date()),
      moment(new Date()),
    ];

    try {
      const { rows } = await query(findQuery, values);
      if (!rows[0]) {
        return {
          success: false,
          error: ['an error occured'],
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
        error: [error],
      };
    }
  }

  /* istanbul ignore next */
  static async createInboxTable() {
    /* istanbul ignore next */
    const queryText = `CREATE TABLE IF NOT EXISTS
      inboxs(
        id SERIAL NOT NULL UNIQUE PRIMARY KEY,
        receiverId INTEGER,
        senderId INTEGER,
        messageId INTEGER,
        read BOOLEAN,
        createdAt TIMESTAMP,
        updatedAt TIMESTAMP,
        FOREIGN KEY (receiverId) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (senderId) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (messageId) REFERENCES emails (id) ON DELETE CASCADE
      )`;
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

  /* istanbul ignore next */
  static async dropInboxTable() {
    /* istanbul ignore next */
    const queryText = 'DROP TABLE IF EXISTS inboxs CASCADE';
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
}

export { Inbox };
