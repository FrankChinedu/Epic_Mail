import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { users } from '../dummyData/Database';

export default class Helpers {
  static emailExist(array, email) {
    let result = false;
    array.forEach((data) => {
      if (data === email) {
        result = true;
      }
    });
    return result;
  }

  static AllEmails() {
    const AllEmails = [];
    users.forEach((data) => {
      AllEmails.push(data.email);
    });

    return AllEmails;
  }

  static jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: ONE_WEEK });
  }

  static async comparePassword(password, userHashpassword) {
    const result = await bcrypt.compare(password, userHashpassword);
    return result;
  }
}
