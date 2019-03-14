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
/* istanbul ignore next */
const createEmailTable = async () => {
/* istanbul ignore next */
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
  /* istanbul ignore next */
    .then(() => {
      pool.end();
    })
    .catch(() => {
    /* istanbul ignore next */
      pool.end();
    });
};
/* istanbul ignore next */
const dropEmailTable = () => {
/* istanbul ignore next */
  const queryText = 'DROP TABLE IF EXISTS emails CASCADE';
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

export { dropEmailTable, createEmailTable };
