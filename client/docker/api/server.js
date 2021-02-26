// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

const port = 4200;
const root = path.join(__dirname, 'build')

app.use((req, res, next) => {
  console.log(`Request_Endpoint: ${req.method} ${req.url}`);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

app.use(express.static(root));

app.get('*', (req, res) => {
  res.sendFile('index.html', { root });
});

app.listen(port, () => console.log(`FRONT_END_SERVICE_PORT: ${port}`));
