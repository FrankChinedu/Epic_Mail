/* eslint-disable import/prefer-default-export */
import moment from 'moment';
import 'dotenv/config';
import Helper from '../helpers/Helpers';
import { query, pool } from '../db/index';

class User {
  /* istanbul ignore next */
  static async createUserTable() {
    /* istanbul ignore next */
    const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL NOT NULL UNIQUE PRIMARY KEY,
        firstname VARCHAR(128) NOT NULL,
        lastname VARCHAR(128),
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        avatar VARCHAR(128),
        createdAt TIMESTAMP,
        updatedAt TIMESTAMP
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
  static async dropUserTable() {
    /* istanbul ignore next */
    const queryText = 'DROP TABLE IF EXISTS users CASCADE';
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

  static getJsonWebToken(user) {
    const res = {
      status: 201,
      data: {
        // ...user,
        token: Helper.jwtSignUser(user),
      },
    };
    return res;
  }

  static async createUser({
    firstname, lastname, password, email,
  }) {
    const hashpassword = Helper.hashPassword(password);

    const dbQuery = `INSERT INTO
      users(firstname, lastname, email, password, createdAt, updatedAt)
      VALUES($1, $2, $3, $4, $5, $6) returning *`;
    const values = [
      firstname,
      lastname,
      email,
      hashpassword,
      moment(new Date()),
      moment(new Date()),
    ];

    try {
      const { rows } = await query(dbQuery, values);
      const user = rows[0];

      return this.getJsonWebToken(user);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return {
          status: 401,
          error: 'account already exists',
        };
      }
      return {
        status: 401,
        error,
      };
    }
  }

  static async login({ email, password }) {
    const dbQuery = 'SELECT * FROM users WHERE email = $1';

    const { rows } = await query(dbQuery, [email]);

    const user = rows[0];

    if (!user) {
      return {
        status: 401,
        error: 'The credentials you provided is incorrect',
      };
    }

    const isUserPassword = await Helper.comparePassword(password, user.password);

    if (!isUserPassword) {
      return {
        status: 401,
        error: 'The credentials you provided is incorrect',
      };
    }
    const res = this.getJsonWebToken(user);
    res.status = 200;
    return res;
  }
}


export { User };
