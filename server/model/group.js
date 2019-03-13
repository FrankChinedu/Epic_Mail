import { Pool } from 'pg';

let connectionString;

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TEST_DB;
} else {
  connectionString = process.env.DEV_DB;
}

const pool = new Pool({ connectionString });

pool.connect();

const createGroupTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      groups(
        id SERIAL NOT NULL UNIQUE,
        name VARCHAR(128) NOT NULL,
        ownerId INTEGER,
        createdAt TIMESTAMP,
        updatedAt TIMESTAMP,
        FOREIGN KEY (ownerId) REFERENCES users (id) ON DELETE CASCADE
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

const dropGroupTable = () => {
  const queryText = 'DROP TABLE IF EXISTS groups';
  pool
    .query(queryText)
    .then(() => {
      pool.end();
    })
    .catch(() => {
      pool.end();
    });
};

export { dropGroupTable, createGroupTable };
