const axios = require('axios');
const {History, Token} = require('../models');
const ApiError = require('../error');

class logController {
  async log (req, res, next) {
    const body = req.body;
    console.log(body);
  };
}


module.exports = new logController();
