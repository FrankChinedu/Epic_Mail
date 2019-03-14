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
/* istanbul ignore next */
const createDraftTable = async () => {
/* istanbul ignore next */
  const queryText = `CREATE TABLE IF NOT EXISTS
      drafts(
        id SERIAL NOT NULL UNIQUE,
        receiverId INTEGER,
        senderId INTEGER,
        messageId INTEGER,
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
};
/* istanbul ignore next */
const dropDraftTable = () => {
/* istanbul ignore next */
  const queryText = 'DROP TABLE IF EXISTS drafts CASCADE';
  /* istanbul ignore next */
  pool
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
};

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
}


export { dropDraftTable, createDraftTable, Draft };
