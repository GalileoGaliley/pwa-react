const axios = require('axios');
const {History, Token} = require('../models');
const ApiError = require('../error');

class chatController {
  async getHistory (req, res) {
    const token = req.headers.authorization.replace('Bearer ', '');

    const tokenData = await Token.findOne({where: {token: token}});

    const history = await History.findAll({where: {userId: tokenData.dataValues.userId}});

    const data = {history: history};

    return res.json({data: data, code: 200});
  }

  async message (req, res, next) {
    const {message, historyId} = req.body;

    const token = req.headers.authorization.replace('Bearer ', '');

    try {
      const tokenData = await Token.findOne({where: {token: token}});

      const history = await History.findAll({where: {userId: tokenData.dataValues.userId}});
  
      if (historyId && !history.find((item) => item.dataValues.history_id === historyId)) {
        return res.json({code: 400, data: 'Произошла ошибка, не правильно указан historyId'});
      }

      const {data: messages} = await axios.post(
        'https://jellyfish-app-b9mgf.ondigitalocean.app/chat',
        {
          "message": message,
          "historyId": historyId ? historyId : undefined
        },
        {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInRva2VuSWQiOiIzNGJhZWVmNy1lYmE3LTQzNWEtYWRjNy0wOGFlOGZiMmM4MjIiLCJpYXQiOjE2ODUxMDYwNDR9.ld0_y6TGQQ14yRhcAxJx42Ov5Pn8BeVtI-W4UxWsOb4'
          }
        }
      )
      if (!historyId) {
        await History.create({history_id: messages.id, userId: tokenData.dataValues.userId});
      }
      return res.json({data: messages, code: 200});
    } catch (e) {
      console.log(e);
      return res.json({code: 500, data: 'Произошла ошибка, попробуйте позже'})
    }
  };
}


module.exports = new chatController();
