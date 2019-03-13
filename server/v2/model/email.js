import { Pool } from 'pg';

let connectionString;

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TEST_DB;
} else {
  connectionString = process.env.DEV_DB;
}

const pool = new Pool({ connectionString });

pool.connect();

const createEmailTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      emails(
        id SERIAL NOT NULL UNIQUE,
        subject VARCHAR(128),
        message TEXT,
        parentMessageId INTEGER,
        status VARCHAR(128),
        createdAt TIMESTAMP
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

const dropEmailTable = () => {
  const queryText = 'DROP TABLE IF EXISTS emails CASCADE';
  pool
    .query(queryText)
    .then(() => {
      pool.end();
    })
    .catch(() => {
      pool.end();
    });
};

export { dropEmailTable, createEmailTable };
