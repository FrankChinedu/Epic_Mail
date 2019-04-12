/* eslint-disable import/prefer-default-export */
import { query, pool } from '../db/index';


class Sent {
  static async insertIntoSentTable({ userId, messageId, receiverId }) {
    const findQuery = `INSERT INTO
    sents(senderid, receiverid, messageid, read) 
    VALUES ($1, $2, $3, $4) RETURNING *
    `;

    const values = [
      userId,
      receiverId,
      messageId,
      false,
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
  static async createSentTable() {
    /* istanbul ignore next */
    const queryText = `CREATE TABLE IF NOT EXISTS
      sents(
        id SERIAL NOT NULL UNIQUE PRIMARY KEY,
        receiverId INTEGER,
        senderId INTEGER,
        messageId INTEGER,
        read BOOLEAN,
        retract BOOLEAN DEFAULT FALSE,
        createdAt TIMESTAMP DEFAULT NOW(),
        updatedAt TIMESTAMP DEFAULT NOW(),
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
  static async dropSentTable() {
    /* istanbul ignore next */
    const queryText = 'DROP TABLE IF EXISTS sents CASCADE';
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

export { Sent };
