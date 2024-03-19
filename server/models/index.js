const {DataTypes} = require('sequelize');
const sequelize = require('../db.js');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const History = sequelize.define('history', {
  history_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
});

const Token = sequelize.define('token', {
  token: {
    type: DataTypes.STRING,
    unique: true,
    primaryKey: true
  },
});

User.hasMany(History);
History.belongsTo(User);

User.hasMany(Token);
Token.belongsTo(User);

module.exports = {
  User,
  History,
  Token,
};


