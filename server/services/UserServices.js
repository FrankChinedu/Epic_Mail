import { User } from '../model/user';

export default class UserServices {
  static async createUser(data) {
    return User.createUser(data);
  }

  static async login(data) {
    return User.login(data);
  }

  static async resetPassword(email) {
    await User.reset(email);
    return {
      status: 200,
      data: {
        message: 'check your mail for password reset link',
        email,
      },
    };
  }
}
