const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const HOST = process.env.HOST;
const PORT = 5000;

app.use(cors());
// app.use(bodyParser.json());

app.get('/', (req, res) => {
  const { query } = req;
  console.log(`query:`, query);
  if (!query.name) {
    console.log(`fail!`);
    res.status(400).send('Name is required');
    res.end();
    return;
  }
  console.log(`success!`);
  res.status(200).send({ data: `Your name is ${query.name}` });
});

app.listen(PORT, () => {
  console.log(`listening on ${HOST}:${PORT}`);
});
