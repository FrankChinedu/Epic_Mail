/* eslint-disable import/prefer-default-export */
import { Pool } from 'pg';

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

class Group {
  /* istanbul ignore next */
  static async createGroupTable() {
  /* istanbul ignore next */
    const queryText = `CREATE TABLE IF NOT EXISTS
        groups(
          id SERIAL NOT NULL UNIQUE PRIMARY KEY,
          name VARCHAR(128) NOT NULL,
          ownerId INTEGER,
          createdAt TIMESTAMP,
          updatedAt TIMESTAMP,
          FOREIGN KEY (ownerId) REFERENCES users (id) ON DELETE CASCADE
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
  static async dropGroupTable() {
  /* istanbul ignore next */
    const queryText = 'DROP TABLE IF EXISTS groups CASCADE';
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

export { Group };
