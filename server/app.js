import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.use('/', (req, res) => {
  res.send({
    message: 'welcome to EPIC MAIL',
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server start at port ${process.env.PORT} `);
});

module.exports = app;
