const ApiError = require('../error');

module.exports = function (req, res, err){
  if (err instanceof ApiError){
    res.status(err.status).json({message: err.message})
  }
  return res.status(500).json({message:'Неизвестная ошибка!'})
}
