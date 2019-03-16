/* eslint-disable import/prefer-default-export */
import { Pool } from 'pg';
import moment from 'moment';
import query from '../db/index';

let connectionString;
/* istanbul ignore next */
if (process.env.NODE_ENV === 'test') {
/* istanbul ignore next */
  connectionString = process.env.TEST_DB;
} else {
  connectionString = process.env.DEV_DB;
}

const pool = new Pool({ connectionString });

pool.connect();

class Sent {
  static async insertIntoSentTable({ userId, messageId, receiverId }) {
    const findQuery = `INSERT INTO
    sents(senderid, receiverid, messageid, read, createdat, updatedat) 
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
  static async createSentTable() {
    /* istanbul ignore next */
    const queryText = `CREATE TABLE IF NOT EXISTS
      sents(
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
        pool.end();
      })
      /* istanbul ignore next */
      .catch(() => {
        /* istanbul ignore next */
        pool.end();
      });
  }

  /* istanbul ignore next */
  static async dropSentTable() {
    /* istanbul ignore next */
    const queryText = 'DROP TABLE IF EXISTS sents CASCADE';
    /* istanbul ignore next */
    await pool
      .query(queryText)
      /* istanbul ignore next */
      .then(() => {
        /* istanbul ignore next */
        pool.end();
      })
      /* istanbul ignore next */
      .catch(() => {
        /* istanbul ignore next */
        pool.end();
      });
  }
}

export { Sent };
