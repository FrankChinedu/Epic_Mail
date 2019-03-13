import { Pool } from 'pg';

let connectionString;

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TEST_DB;
} else {
  connectionString = process.env.DEV_DB;
}

const pool = new Pool({ connectionString });

pool.connect();

const createMemberTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      groupmembers(
        id SERIAL NOT NULL UNIQUE,
        groupId INTEGER,
        memberId INTEGER,
        createdAt TIMESTAMP,
        updatedAt TIMESTAMP,
        FOREIGN KEY (groupId) REFERENCES groups (id) ON DELETE CASCADE,
        FOREIGN KEY (memberId) REFERENCES contacts (id) ON DELETE CASCADE
      )`;
  await pool
    .query(queryText)
    .then(() => {
      pool.end();
    })
    .catch(() => {
      pool.end();
    });
};

const dropMemberTable = () => {
  const queryText = 'DROP TABLE IF EXISTS groupmembers CASCADE';
  pool
    .query(queryText)
    .then(() => {
      pool.end();
    })
    .catch(() => {
      pool.end();
    });
};

export { dropMemberTable, createMemberTable };
