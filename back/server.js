const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const { seed } = require('./services/seeder/seeder.js')

mongoose.connect('mongodb://localhost:27017/ys-blog')
  .then(() => console.log('DB connection successfully'))
  .catch((err) => console.error(err));

const app = express();
const port = 3000;
const apiRouter = require('./api/api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('../front/dist/ys-pet'));

app.use('/api', apiRouter);

// seed();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/ys-pet/index.html');
});

app.get('*', (req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// noinspection JSUnusedLocalSymbols
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server start on http://localhost:${ port }`);
});
