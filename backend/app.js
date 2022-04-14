/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const users = require('./routes/users');
const cards = require('./routes/cards');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const regExp = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-z0-9]{1}[A-Za-z0-9\-]*\.?)*\.{1}[A-Za-z0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(requestLogger);

app.use(cors({
  origin: 'https://nzhyburtovich.nomoredomains.work',
  credentials: true,
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value, helpers) => {
      if (!regExp.test(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);

app.use('/', users);
app.use('/', cards);

app.use(errorLogger);

app.use(() => {
  throw new NotFoundError('Страница не найдена');
});

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
