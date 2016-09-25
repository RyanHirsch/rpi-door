import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ works: true });
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`server is running on port ${server.address().port}`);
});
