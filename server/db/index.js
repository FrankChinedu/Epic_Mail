import { Pool } from 'pg';

let connectionString;
/* istanbul ignore next */
if (process.env.NODE_ENV === 'test') {
  /* istanbul ignore next */
  connectionString = process.env.TEST_DB;
} else {
  connectionString = process.env.DEV_DB;
}

const pool = new Pool({ connectionString });

const query = (text, params) => new Promise((resolve, reject) => {
  pool.query(text, params)
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });
});

export default query;
