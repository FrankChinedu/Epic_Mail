/* eslint-disable import/prefer-default-export */
import { Pool } from 'pg';
import moment from 'moment';
import query from '../db/index';

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

class Group {
  /* istanbul ignore next */
  static async createGroupTable() {
  /* istanbul ignore next */
    const queryText = `CREATE TABLE IF NOT EXISTS
        groups(
          id SERIAL NOT NULL UNIQUE PRIMARY KEY,
          name VARCHAR(128) NOT NULL,
          role VARCHAR(128),
          ownerId INTEGER,
          createdAt TIMESTAMP,
          updatedAt TIMESTAMP,
          FOREIGN KEY (ownerId) REFERENCES users (id) ON DELETE CASCADE
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
  static async dropGroupTable() {
  /* istanbul ignore next */
    const queryText = 'DROP TABLE IF EXISTS groups CASCADE';
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

  static async sendGroupMessage({ name, userId }) {
    const dbQuery = `INSERT INTO
      groups(name, ownerid, role, createdat, updatedat)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [name, userId, 'admin', moment(new Date()), moment(new Date())];

    try {
      const { rows } = await query(dbQuery, values);
      return {
        success: true,
        data: { ...rows[0] },
      };
    } catch (error) {
      return {
        success: false,
        error: [error],
      };
    }
  }

  static async getAllGroup(userId) {
    const dbQuery = 'SELECT id, name, role FROM groups WHERE ownerid=$1';
    const values = [userId];

    try {
      const { rows } = await query(dbQuery, values);
      if (!rows[0]) {
        return {
          success: true,
          data: [{
          }],
        };
      }
      return {
        success: true,
        data: rows,
      };
    } catch (error) {
      return {
        success: false,
        error: [error],
      };
    }
  }

  static async editGroup({ userId, id, name }) {
    const find = 'SELECT * FROM groups WHERE id=$1 AND ownerid = $2';

    try {
      const { rows } = await query(find, [id, userId]);
      if (!rows[0]) {
        return {
          success: false,
          data: [{
            message: 'not found',
          }],
        };
      }
      const update = 'UPDATE groups SET name=$1, updatedat=$2 WHERE ownerid=$3 AND id=$4 returning *';
      const values = [
        name || rows[0].name,
        moment(new Date()),
        userId, id,
      ];
      const response = await query(update, values);
      return {
        success: true,
        data: [{
          id: response.rows[0].id,
          name: response.rows[0].name,
          role: response.rows[0].role,
        }],
      };
    } catch (err) {
      return {
        success: false,
        error: [err],
      };
    }
  }

  static async deleteGroup({ userId, id }) {
    const dbQuery = 'DELETE FROM groups WHERE id=$1 AND ownerid=$2 returning *';

    try {
      const { rows } = await query(dbQuery, [id, userId]);
      if (!rows[0]) {
        return {
          success: true,
          data: [{
            message: 'no result',
          }],
        };
      }
      return {
        success: true,
        data: [{
          message: 'deleted successfully',
        }],
      };
    } catch (error) {
      return {
        success: false,
        error: [error],
      };
    }
  }
}

export { Group };
