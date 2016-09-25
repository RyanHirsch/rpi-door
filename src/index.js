import express from 'express';
import bodyParser from 'body-parser';
import logger from './lib/logger';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    works: true,
    version: '1.0.0',
  });
});

const server = app.listen(process.env.PORT || 3000, () => { // eslint-disable-line no-process-env
  logger.log('info', `server is running on port ${server.address().port}`);
});
