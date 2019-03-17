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

class GroupMember {
  /* istanbul ignore next */
  static async createMemberTable() {
  /* istanbul ignore next */
    const queryText = `CREATE TABLE IF NOT EXISTS
        groupmembers(
          id SERIAL NOT NULL UNIQUE PRIMARY KEY,
          groupId INTEGER,
          memberId INTEGER,
          userRole VARCHAR(128),
          createdAt TIMESTAMP,
          updatedAt TIMESTAMP,
          FOREIGN KEY (groupId) REFERENCES groups (id) ON DELETE CASCADE,
          FOREIGN KEY (memberId) REFERENCES contacts (id) ON DELETE CASCADE
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
  static async dropMemberTable() {
  /* istanbul ignore next */
    const queryText = 'DROP TABLE IF EXISTS groupmembers CASCADE';
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

export { GroupMember };
