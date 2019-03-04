import jwt from 'jsonwebtoken';
// const jwt = require('jsonwebtoken');

// let s = jwt.sign({ foo: "bar" }, 'secret', {
//   expiresIn: 60 * 60 * 24 * 7
// });

// console.log(s);

// return;

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

  static jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(user, process.env.JWT_SECRET,
    //    {
    //   expiresIn: ONE_WEEK,
    // }
    );
  }
}
