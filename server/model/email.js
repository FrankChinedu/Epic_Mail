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

class Email {
  static async createMessage({
    subject, message, status,
  }) {
    const dbQuery = `INSERT INTO
      emails(subject, message, status, createdat)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      subject,
      message,
      status,
      moment(new Date()),
    ];

    try {
      const { rows } = await query(dbQuery, values);
      return {
        success: true,
        data: { ...rows[0] },
      };
    } catch (error) {
      return {
        success: false,
        error: [error],
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
        createdAt TIMESTAMP
      )`;
    await pool
      .query(queryText)
      /* istanbul ignore next */
      .then(() => {
        pool.end();
      })
      .catch(() => {
        /* istanbul ignore next */
        pool.end();
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
        pool.end();
      })
      /* istanbul ignore next */
      .catch(() => {
        /* istanbul ignore next */
        pool.end();
      });
  }

  static async getMessageReceiverId(email) {
    const findQuery = 'SELECT * FROM users WHERE email=$1 ';

    try {
      const { rows } = await query(findQuery, [email]);
      if (!rows[0]) {
        return {
          success: false,
          error: ['user not found try another email'],
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

export { Email };
