import Helpers from '../helpers/Helpers';

const Joi = require('joi');

export default class Auth {
  static validate(req, res, next) {
    const schema = {
      firstName: Joi.string().required(),
      lastName: Joi.any(),
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{8,32}$/),
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
              'it must contain only numbers or letters or both',
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

    const emailExist = Helpers.emailExist(Helpers.AllEmails(), email);

    if (emailExist) {
      res.status(403).send({
        error: ['User already exists'],
      });
    } else {
      next();
    }
  }
}
