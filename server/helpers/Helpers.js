import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default class Helpers {
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  static jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: ONE_WEEK });
  }

  static async comparePassword(password, userHashpassword) {
    const result = await bcrypt.compare(password, userHashpassword);
    return result;
  }


  // copied from https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
  static async asyncForEach(array, callback) {
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < array.length; index++) {
      // eslint-disable-next-line no-await-in-loop
      await callback(array[index], index, array);
    }
  }
}
