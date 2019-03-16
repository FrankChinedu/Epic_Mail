import { User } from '../model/user';

export default class UserServices {
  static async createUser(data) {
    return User.createUser(data);
  }

  static async login(data) {
    return User.login(data);
  }
}
