"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pool = exports.query = void 0;

var _pg = require("pg");

var connectionString;
/* istanbul ignore next */

if (process.env.NODE_ENV === 'test') {
  /* istanbul ignore next */
  connectionString = process.env.TEST_DB;
} else {
  connectionString = process.env.DEV_DB;
}

var pool = new _pg.Pool({
  connectionString: connectionString
});
exports.pool = pool;

var query = function query(text, params) {
  return new Promise(function (resolve, reject) {
    pool.query(text, params).then(function (res) {
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
};

exports.query = query;
pool.connect();