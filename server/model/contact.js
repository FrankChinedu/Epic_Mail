/* eslint-disable import/prefer-default-export */
import moment from 'moment';
import { query, pool } from '../db/index';

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
        // pool.end();
      })
      /* istanbul ignore next */
      .catch(() => {
        /* istanbul ignore next */
        // pool.end();
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
        // pool.end();
      })
      /* istanbul ignore next */
      .catch(() => {
        /* istanbul ignore next */
        // pool.end();
      });
  }

  static async addContact({ userId, email }) {
    const dbQuery = 'SELECT * FROM users WHERE email=$1';
    const { rows } = await query(dbQuery, [email]);

    if (!rows[0]) {
      return {
        success: false,
        data: 'Contact does not exist',
      };
    }
    const { id } = rows[0];

    if (parseInt(id, 0) === parseInt(userId, 0)) {
      return {
        success: false,
        data: 'You cannot add your self as a contact',
      };
    }

    const contact = `SELECT * FROM contacts WHERE contact_owner_id=$1
    AND email=$2`;

    const userExist = await query(contact, [userId, email]);
    if (userExist.rows[0]) {
      return {
        success: false,
        data: 'This user is already a contact',
      };
    }

    const add = `INSERT INTO
      contacts(firstname, lastname, email, contact_owner_id, 
        avatar, createdat, updatedat)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
    const val = [
      rows[0].firstname,
      rows[0].lastname,
      rows[0].email,
      userId,
      rows[0].avatar,
      moment(new Date()),
      moment(new Date()),
    ];
    const resp = await query(add, val);
    return {
      success: true,
      data: resp.rows[0],
    };
  }

  static async getAllUserContacts(userId) {
    const dbQuery = ' SELECT * FROM contacts WHERE contact_owner_id=$1';

    const { rows } = await query(dbQuery, [userId]);

    if (!rows[0]) {
      return {
        success: false,
        data: 'no found',
      };
    }
    return {
      success: true,
      data: rows,
    };
  }

  static async deleteContact({ userId, id }) {
    const dbQuery = 'DELETE FROM contacts WHERE id=$1 AND contact_owner_id=$2 returning *';

    try {
      const { rows } = await query(dbQuery, [id, userId]);
      if (!rows[0]) {
        return {
          success: false,
          data: 'no result',
        };
      }
      /* find user in group member table and delete the user */
      return {
        success: true,
        data: 'deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }
}

export { Contact };
