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
const createSentTable = async () => {
/* istanbul ignore next */
  const queryText = `CREATE TABLE IF NOT EXISTS
      sents(
        id SERIAL NOT NULL UNIQUE,
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
};
/* istanbul ignore next */
const dropSentTable = () => {
/* istanbul ignore next */
  const queryText = 'DROP TABLE IF EXISTS sents CASCADE';
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

export { dropSentTable, createSentTable };
