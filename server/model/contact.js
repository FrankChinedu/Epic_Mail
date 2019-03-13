import { Pool } from 'pg';

let connectionString;

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TEST_DB;
} else {
  connectionString = process.env.DEV_DB;
}

const pool = new Pool({ connectionString });

pool.connect();

const createContactsTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      contacts(
        id SERIAL NOT NULL UNIQUE,
        firstname VARCHAR(128) NOT NULL,
        lastname VARCHAR(128),
        email VARCHAR(128) NOT NULL,
        contact_Owner_Id INTEGER,
        avatar VARCHAR(128),
        createdAt TIMESTAMP,
        updatedAt TIMESTAMP,
        FOREIGN KEY (contact_Owner_Id) REFERENCES users (id) ON DELETE CASCADE
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

const dropContactTable = () => {
  const queryText = 'DROP TABLE IF EXISTS contacts CASCADE';
  pool
    .query(queryText)
    .then(() => {
      pool.end();
    })
    .catch(() => {
      pool.end();
    });
};

export { dropContactTable, createContactsTable };
