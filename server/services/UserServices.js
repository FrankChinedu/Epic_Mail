import { User } from '../model/user';

export default class UserServices {
  static async createUser(data) {
    return User.createUser(data);
  }

  static async login(data) {
    return User.login(data);
  }

  static async reset(email) {
    const res = await User.reset(email);
    return res;
  }

  static async resetPassword(data) {
    // console.log(data);
    return User.resetPassword(data);
  }
}
