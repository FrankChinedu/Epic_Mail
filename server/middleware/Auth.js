import jwt from 'jsonwebtoken';
import { query } from '../db/index';
import { decode } from 'punycode';

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
        data: [
          {
            message: error.details[0].message,
          },
        ],
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
        data: [
          {
            message: 'Token is not provided',
          },
        ],
      });
    }
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await query(text, [decoded.id]);
      if (!rows[0]) {
        return res.status(401).send({
          status: 401,
          data: [
            {
              message: 'The token you provided is invalid',
            },
          ],
        });
      }
      req.user = { id: decoded.id, email: decoded.email };
      next();
    } catch (error) {
      return res.status(401).send({
        status: 401,
        data: [
          {
            message: error,
          },
        ],
      });
    }
    return {};
  }

  static spoof(req, res, next) {
    const { email } = req.user;
    const { recieversEmail } = req.body;
    if (email === recieversEmail) {
      return res.status(400).send({
        status: 400,
        data: [
          {
            message: 'You cannot send an email to your self',
          },
        ],
      });
    }
    next();
    return {};
  }
}
