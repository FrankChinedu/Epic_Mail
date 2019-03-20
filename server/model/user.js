/* eslint-disable import/prefer-default-export */
import moment from 'moment';
import nodemailer from 'nodemailer';
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
    const {
      firstname,
      lastname,
      email,
    } = user;
    const data = { firstname, lastname, email };
    const res = {
      status: 201,
      data: {
        ...data,
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
          status: 500,
          error: 'account already exists',
        };
      }
      return {
        status: 500,
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

  static async reset(email) {
    const dbQuery = 'SELECT * FROM users WHERE email=$1';
    const { rows } = await query(dbQuery, [email]);

    if (!rows[0]) {
      return {
        status: 404,
        data: {
          message: 'User not found',
        },
      };
    }

    const { id, firstname, lastname } = rows[0];

    const user = {
      id, firstname, lastname, email,
    };
    const token = Helper.jwtSignUser(user);
    this.sendEmail(email, token);
    return {
      status: 200,
      data: {
        message: 'check your email for reset password link',
        email,
      },
    };
  }

  static sendEmail(email, token) {
    const mailOptions = {
      from: 'EPIC MAIL',
      to: email,
      subject: 'EPIC MAIL Reset Password Link',
      html: `<h1> reset link </h1>
         <p> click on the
        <a href='https://frankchinedu.github.io/Epic_Mail/UI/reset-password.html?x-access-token=${token}'>link</a>
        to reset password </p>
      `,
    };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    transporter.sendMail(mailOptions)
      .then(() => ({}))
      .catch((err) => {
        throw err;
      });
    return {};
  }

  static async resetPassword({ userId, password, email }) {
    const hashpassword = Helper.hashPassword(password);

    const dbQuery = 'SELECT * FROM users WHERE email= $1';

    try {
      const { rows } = await query(dbQuery, [email]);
      const user = rows[0];
      if (!user) {
        return {
          status: 404,
          error: 'User not found',
        };
      }

      const update = 'UPDATE users SET password=$1, updatedat=$2 WHERE id=$3 AND email=$4 returning *';
      const res = await query(update, [hashpassword, moment(new Date()), userId, email]);
      if (!res.rows[0]) {
        return {
          status: 400,
          error: 'something went wrong try again',
        };
      }
      return {
        status: 200,
        data: 'Password changed, goto login',
      };
    } catch (error) {
      return {
        status: 400,
        error,
      };
    }
  }
}


export { User };
