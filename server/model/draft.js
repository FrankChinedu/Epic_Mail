/* eslint-disable import/prefer-default-export */
import moment from 'moment';
import { query, pool } from '../db/index';

class Draft {
  static async insertIntoDraftTable({ userId, messageId, receiverId }) {
    const findQuery = `INSERT INTO
    drafts(senderid, receiverid, messageid, createdat, updatedat) 
    VALUES ($1, $2, $3, $4, $5) RETURNING *
    `;

    const values = [
      userId,
      receiverId,
      messageId,
      moment(new Date()),
      moment(new Date()),
    ];

    try {
      const { rows } = await query(findQuery, values);
      if (!rows[0]) {
        return {
          success: false,
          error: 'an error occured',
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

  /* istanbul ignore next */
  static async createDraftTable() {
    /* istanbul ignore next */
    const queryText = `CREATE TABLE IF NOT EXISTS
      drafts(
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
  static async dropDraftTable() {
    /* istanbul ignore next */
    const queryText = 'DROP TABLE IF EXISTS drafts CASCADE';
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

export { Draft };
