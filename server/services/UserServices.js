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

  static getJsonWebToken(user) {
    const userJson = JSON.stringify(user);
    const res = {
      status: 200,
      data: {
        // ...user,
        token: Helper.jwtSignUser(userJson),
      },
    };

    return res;
  }

  static getAllUsers() {
    return users;
  }
}
