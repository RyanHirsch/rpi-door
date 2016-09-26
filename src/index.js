import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import logger from './lib/logger';

import { initialize, getDoorStatus } from './lib/hardware';
import * as actions from './lib/actions';
initialize({
  opened: actions.opened,
  opening: actions.opening,
  closed: actions.closed,
  closing: actions.closing,
});

const app = express();
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    works: true,
    version: '1.0.2',
    status: getDoorStatus(),
  });
});

const server = app.listen(process.env.PORT || 3000, () => { // eslint-disable-line no-process-env
  logger.log('info', `server is running on port ${server.address().port}`);
});
