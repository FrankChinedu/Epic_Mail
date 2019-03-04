import { users } from '../dummyData/Database';
import Helper from '../helpers/Helpers';

const Joi = require('joi');

export default class Auth {
  static validate(req, res, next) {
    const schema = {
      firstName: Joi.string().required(),
      lastName: Joi.any(),
      email: Joi.string().email().required(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$'),
      ),
    };

    const { error } = Joi.validate(req.body, schema);

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(403).send({
            error: ['you must provide a valid email address'],
          });
          break;
        case 'firstName':
          res.status(403).send({
            error: ['firstName cannot be empty'],
          });
          break;
        case 'password':
          res.status(403).send({
            error: ['the password must match the following rules',
              'it must contain only the following characters: lower case, upper case and numbers',
              'it must be at least 8 charcters in length and not greater than 32',
            ],
          });
          break;
        default:
          res.status(403).send({
            error: ['invalid registration information'],
          });
      }
    } else {
      next();
    }
  }

  static emailExist(req, res, next) {
    const { email } = req.body;

    const AllEmails = [];

    users.forEach((data) => {
      AllEmails.push(data.email);
    });
    const emailExist = Helper.emailExist(AllEmails, email);

    if (emailExist) {
      res.status(403).send({
        error: ['User already exists'],
      });
    } else {
      next();
    }
  }
}
