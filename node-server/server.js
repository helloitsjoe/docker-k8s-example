const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 8080;
const { SA_LOGIC_URL } = process.env;

app.use(cors());

app.get('/', (req, res) => {
  const { sentence } = req.query;
  console.log(`Sentence:`, sentence);

  if (!sentence) {
    console.warn(`No sentence provided!`);
    return res.status(400).send({ message: 'Sentence is required' });
  }

  console.log('Analyzing sentiment...');
  axios
    .post(`${SA_LOGIC_URL}/analyse/sentiment`, { sentence })
    .then(json => {
      const { data } = json;
      console.log('Analysis successful!', data);
      res.status(200).send({ data });
    })
    .catch(err => {
      console.error('Error!', err.toJSON());
      res.status(500).send({ message: `[analysis] - ${err.message}` });
    });
});

app.listen(PORT, () => {
  console.log(`listening on ${HOST}:${PORT}`);
});
