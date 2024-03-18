require('dotenv').config();
const http = require('http');
const cron = require('node-cron');
const cors = require('cors');
const colors = require('colors')
const express = require('express');
const router = require('./router');
const models = require('./models');
const errorHandler = require('./middleware/ErrorHandler')
const sequelize = require('./db.js');

const PORT = process.env.PORT || 6000;

const app = express();
app.use(cors());
app.use(express.json());
// console.log(models);
app.use('/api', router);
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const createServer = http.createServer(app);
    createServer.listen(PORT, () => console.log(`Server run on port ${PORT}`.magenta));
  } catch (err) {
    console.error('ERROR', err);
  }
}

start();
