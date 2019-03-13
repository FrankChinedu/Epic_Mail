import { Pool } from 'pg';

export default class Drafts {
  constructor() {
    this.id = null;
    this.senderId = null;
    this.messageId = null;
    this.receiverId = null;
    this.createdOn = new Date();
  }
}

let connectionString;

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TEST_DB;
} else {
  connectionString = process.env.DEV_DB;
}

const pool = new Pool({ connectionString });

pool.connect();

const createDraftTable = () => {
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
  pool
    .query(queryText)
    .then(() => {
      pool.end();
    })
    .catch(() => {
      pool.end();
    });
};

const dropDraftTable = () => {
  const queryText = 'DROP TABLE IF EXISTS drafts';
  pool
    .query(queryText)
    .then(() => {
      pool.end();
    })
    .catch(() => {
      pool.end();
    });
};

export { dropDraftTable, createDraftTable };
