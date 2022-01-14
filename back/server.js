const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const seederService = require('./services/seeder.service.js');
const { name: projectName } = require('./package.json');

const { initLoggerWithContext } = require('./utils/logger');
const { injectRequestId } = require('./middleware');

const cookieParser = require('cookie-parser'),
  log = require('morgan'),
  cors = require('cors'),
  multer = require('multer'),
  upload = multer(),
  app = express(),
  PORT = process.env.PORT || 3000,
  NODE_ENV = process.env.NODE_ENV || 'development';

(async () => {
  app.set('port', PORT);
  app.set('env', NODE_ENV);

  mongoose
    .connect('mongodb://localhost:27017/ys-blog')
    .then(() => console.log('DB connection successfully'))
    .catch(err => console.error(err));

  app.use(cors());
  app.use(log('tiny'));

  // parse application/json
  app.use(express.json());

  // parse raw text
  app.use(express.text());

  // parse application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // parse multipart/form-data
  app.use(upload.array());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static('../front/dist/ys-pet'));

  app.use(injectRequestId(projectName));

  app.use((req, res, next) => {
    req.logger = initLoggerWithContext({ requestId: req.requestId });
    next();
  });

  // await seederService.seed();

  require('./routes')(app);

  app.get('*', (req, res) => {
    res.status(404).json({ status: 404, error: 'Not found.' });
  });

  // catch errors
  app.use((err, req, res) => {
    const status = err.status || 500;
    const msg = err.error || err.message;
    console.error(err);
    res.status(status).send({ status, error: msg });
  });

  module.exports = app;

  app.listen(PORT, () => {
    console.log(`Express Server started on Port ${app.get('port')} | Environment : ${app.get('env')}`);
  });
})();
