import jwt from 'jsonwebtoken';
import Helper from '../helpers/Helpers';
import { query } from '../db/index';

const Joi = require('joi');

export default class Auth {
  static validate(req, res, next) {
    const schema = {
      firstname: Joi.string().required().min(2).regex(/^[a-zA-Z]+/),
      lastname: Joi.any(),
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string().min(8),
    };

    const { error } = Joi.validate(req.body, schema);

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(401).send({
            status: 401,
            error: ['you must provide a valid email address'],
          });
          break;
        case 'firstname':
          res.status(401).send({
            status: 401,
            error: ['firstname cannot be empty or less than two characters and must not start with a number'],
          });
          break;
        case 'password':
          res.status(401).send({
            status: 401,
            error: ['password was must be at least 8'],
          });
          break;
        default:
          res.status(401).send({
            status: 401,
            error: ['invalid registration information'],
          });
      }
    } else {
      next();
    }
  }

  static magicValidator(req, res, next) {
    const { body } = req;
    const toValidate = {};
    let obj = {};
    Object.keys(body).forEach((key) => {
      obj = Object.assign(toValidate, { [key]: Joi.string().required() });
    });

    const schema = obj;
    const { error } = Joi.validate(body, schema);

    if (error) {
      res.status(401).send({
        status: 401,
        error: error.details[0].message,
      });
    } else {
      next();
    }
  }

  static async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({
        status: 401,
        error: ['Token is not provided'],
      });
    }
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await query(text, [decoded.id]);
      if (!rows[0]) {
        return res.status(401).send({
          status: 401,
          error: ['The token you provided is invalid'],
        });
      }
      req.user = { id: decoded.id };
      next();
    } catch (error) {
      return res.status(401).send({
        status: 401,
        error: [error],
      });
    }
    return {};
  }

  static emailExist(req, res, next) {
    const { email } = req.body;

    const emailExist = Helper.emailExist(Helper.AllEmails(), email);

    if (emailExist) {
      res.status(403).send({
        error: ['User already exists - -'],
      });
    } else {
      next();
    }
  }
}
