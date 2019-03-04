import { users } from '../dummyData/Database';
import User from '../model/user';

export default class UserServices {
  static createUser({ firstName, lastName, password, email }) {
    const user = new User();
    user.id = users[users.length - 1].id + 1;
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;

    users.push(user);

    return user;
  }

  static getAllUsers() {
    return users;
  }
}
