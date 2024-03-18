const jwt = require('jsonwebtoken');
const colors = require('colors');


module.exports = function (req, res, next){
  try {
    console.log(`Новый запрос на адрес "${req.url}"`.green);
    console.log(`Токен пользователя "${req.headers.authorization}"`.blue);
    const token = req.headers.authorization;
    console.log(`Инфа "${JSON.stringify(jwt.decode(token.replace('Bearer ', ''), process.env.SECRET_KEY))}"`.cyan);
    if (!token){
      return res.status(401).json({message: 'Авторизуйтесь'});
    }
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET_KEY);
    req.user = decoded;
    next();
  }catch (e){
    res.status(401).json({message: 'Авторизуйтесь'})
  }
}
