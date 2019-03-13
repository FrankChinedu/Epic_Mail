import moment from 'moment';
import { users } from '../dummyData/Database';
import query from '../db/index';
import Helper from '../helpers/Helpers';

export default class UserServices {
  static async createUser({
    firstname, lastname, password, email,
  }) {
    const hashpassword = Helper.hashPassword(password);

    const dbQuery = `INSERT INTO
      users(firstname, lastname, email, password, createdAt, updatedAt)
      VALUES($1, $2, $3, $4, $5, $6) returning *`;
    const values = [firstname, lastname, email, hashpassword, moment(new Date()),
      moment(new Date())];

    try {
      const { rows } = await query(dbQuery, values);
      const user = rows[0];

      return this.getJsonWebToken(user);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return {
          status: 403,
          error: 'User with that EMAIL already exist',
        };
      }
      return {
        status: 403,
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
        status: 403,
        error: 'The credentials you provided is incorrect',
      };
    }

    const isUserPassword = await Helper.comparePassword(password, user.password);

    if (!isUserPassword) {
      return {
        status: 403,
        error: 'The credentials you provided is incorrect',
      };
    }
    return this.getJsonWebToken(user);
  }

  static getJsonWebToken(user) {
    const res = {
      status: 201,
      data: {
        ...user,
        token: Helper.jwtSignUser(user),
      },
    };

    return res;
  }

  static getAllUsers() {
    return users;
  }
}