const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('dist/ys-pet'));

const apiRouter = require('./src/api/api');

app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/ys-pet/index.html');
});

app.get('*', (req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server start on http://localhost:${port}`);
});
