import { users } from '../dummyData/Database';
import User from '../model/user';
import Helper from '../helpers/Helpers';

export default class UserServices {
  static createUser({
    firstName, lastName, password, email,
  }) {
    const user = new User();
    user.id = users[users.length - 1].id + 1;
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;

    users.push(user);

    return this.getJsonWebToken(user);
  }


  static login({ email, password }) {
    const user = users.find(data => data.email === email);

    if (!user) {
      return {
        status: 403,
        error: ['The login email information was incorrect'],
      };
    }

    if (user.password !== password) {
      return {
        status: 403,
        error: ['The login information was incorrect'],
      };
    }
    return this.getJsonWebToken(user);
  }

  static getJsonWebToken(user) {
    let userJson = JSON.stringify(user);
    userJson = JSON.parse(userJson);
    const res = {
      status: 201,
      data: {
        ...user,
        token: Helper.jwtSignUser(userJson),
      },
    };

    return res;
  }

  static getAllUsers() {
    return users;
  }
}
