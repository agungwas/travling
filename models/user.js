'use strict';
const {
  Model
} = require('sequelize');

const { hash } = require('../helpers/bcrypt')
// import { hash } from '../helpers/bcrypt'

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Review)
    }
  };
  User.init({
    url_photo_profile: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: false,
          msg: "Password is required"
        },
        notEmpty: {
          args: false,
          msg: "Password is required"
        },
        len: {
          args: [5],
          msg: "Password have more than 6 character"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email already registered"
      },
      validate: {
        notNull: {
          args: false,
          msg: "Email is required"
        },
        notEmpty: {
          args: false,
          msg: "Email is required"
        },
        isEmail: {
          args: true,
          msg: "Please give valid email"
        },
      }
    }
  }, {
    hooks: {
      beforeCreate: (data, option) => {
        data.password = hash(data.password)
        data.email = data.email.toLowerCase()
      }
    }, 
    sequelize,
    modelName: 'User',
  });
  return User;
};