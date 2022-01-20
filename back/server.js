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
  dotEnv = require('dotenv'),
  upload = multer(),
  app = express(),
  PORT = process.env.PORT || 3000,
  NODE_ENV = process.env.NODE_ENV || 'development';

(async () => {
  app.set('port', PORT);
  app.set('env', NODE_ENV);

  dotEnv.config();

  mongoose
    .connect(process.env.MONGO_URL)
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
  app.use((error, req, res, next) => {
    const status = error.status || 500;
    const msg = error.error || error.message;
    console.error(error);
    res.status(status).send({ status, error: msg });
  });

  module.exports = app;

  app.listen(PORT, () => {
    console.log(`Express Server started on Port ${app.get('port')} | Environment : ${app.get('env')}`);
  });
})();
