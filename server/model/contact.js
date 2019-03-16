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

class Contact {
  /* istanbul ignore next */
  static async createContactsTable() {
    /* istanbul ignore next */
    const queryText = `CREATE TABLE IF NOT EXISTS
      contacts(
        id SERIAL NOT NULL UNIQUE PRIMARY KEY,
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
  static async dropContactTable() {
    /* istanbul ignore next */
    const queryText = 'DROP TABLE IF EXISTS contacts CASCADE';
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

export { Contact };
