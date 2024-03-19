const {User, Token} = require('../models');
const ApiError = require('../error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateJWT = ({id, email, name})=>{
  const token = jwt.sign(
    {id, email, name},
    process.env.SECRET_KEY,
    {expiresIn: 1000 * 60 * 60 * 50}
  );
  return token;
}

class userController {
  async registration (req, res, next) {
    const {name, email, password, duplicatePassword} = req.body;

    if (!email || !password || !name){
      return next(ApiError.badRequest('Вы не ввели email или password'));
    }

    if (email.length < 8 || password.length < 8) {
      return next(ApiError.badRequest('Почта и пароль должны быть не короче восьми символов'));
    }

    if (duplicatePassword !== password) {
      return next(ApiError.badRequest('Введенные пароли не совпадают'));
    }

    try {
      const { email, name, password } = req.body;

      const emailCandidate = await User.findOne({ where: { email } });

      if (emailCandidate !== null) {
        return next(ApiError.badRequest('Пользователь с такой почтой уже существует'));
      }

      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({ email, name, password: hashPassword });

      const token = generateJWT(user.dataValues);

      const data = {
        user: {
          email: user.email,
          name: user.name,
        },
        token: token,
      };

      await Token.create({token: token, userId: user.id});

      return res.json({ data: data, code: 200 });
    } catch (error) {
      console.error("Произошла ошибка:", error);
      return res.status(401).json({message: 'Internal Server Error', error: error});
    }
  };

  async login (req, res, next) {

    const {email, password} = req.body;
    if (!email){
      return next(ApiError.badRequest('Введите логин или Email'));
    }
    if (!password){
      return next(ApiError.badRequest('Введите пароль'));
    }

    const userInDB = await User.findOne({where: {email}});

    if (!userInDB){
      return next(ApiError.internal('Такого пользователя нет!'))
    }

    const user = {
      data: userInDB.dataValues
    };

    const userPassword = bcrypt.compareSync(password, user.data.password);
    if (!userPassword){
      return next(ApiError.badRequest("Неверный пароль"));
    }

    const token = generateJWT({
      email: user.data.email,
      name: user.data.name,
      id: user.data.id,
    });

    const data = {
      user: {
        email: user.data.email,
        name: user.data.name,
        id: user.data.id,
      },
      token: token,
    };
    await Token.create({token: token, userId: user.data.id});

    return res.json({data: data, code: 200});
  };
}


module.exports = new userController();
