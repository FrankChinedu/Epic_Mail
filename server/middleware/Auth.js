import Helper from '../helpers/Helpers';

const Joi = require('joi');

export default class Auth {
  static validate(req, res, next) {
    const schema = {
      firstname: Joi.string().required(),
      lastname: Joi.any(),
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
            status: 403,
            error: ['you must provide a valid email address'],
          });
          break;
        case 'firstname':
          res.status(403).send({
            status: 403,
            error: ['firstname cannot be empty'],
          });
          break;
        case 'password':
          res.status(403).send({
            status: 403,
            error: ['the password must match the following rules',
              'it must contain only the following characters: lower case, upper case and numbers',
              'it must be at least 8 charcters in length and not greater than 32',
            ],
          });
          break;
        default:
          res.status(403).send({
            status: 403,
            error: ['invalid registration information'],
          });
      }
    } else {
      next();
    }
  }

  static emailExist(req, res, next) {
    const { email } = req.body;

    const emailExist = Helper.emailExist(Helper.AllEmails(), email);

    if (emailExist) {
      res.status(403).send({
        error: ['User already exists'],
      });
    } else {
      next();
    }
  }
}
