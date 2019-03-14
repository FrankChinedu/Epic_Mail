/* eslint-disable import/no-dynamic-require */
import 'dotenv/config';
import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import fs from 'fs';
import { createAllTables } from './v2/model/index';

const swaggerDocument = YAML.load(`${__dirname}/../swagger.yaml`);

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  cors({
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);

app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.use('/', (req, res, next) => {
  if (req.originalUrl !== '/') {
    next();
    return;
  }
  res.send({
    message: 'welcome to EPIC MAIL',
  });
});

app.use((req, res, next) => {
  let version = req.url.match(/\/api\/(v[0-9]+).*/) || [];
  version = version[1] || null;

  if (version) {
    const routePath = path.join(__dirname, `${version}/app.js`);

    if (!fs.existsSync(routePath)) {
      return res.status(404).send({
        status: 404,
        error: ['route not found'],
      });
    }
    require(routePath).default(app);
  }
  next();
  return {};
});

const create = () => {
  createAllTables();
};

create();

app.listen(process.env.PORT, () => {
  console.log(`server start at port ${process.env.PORT} `);
});

module.exports = app;
