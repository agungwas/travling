'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User)
    }
  };
  Review.init({
    name: DataTypes.STRING,
    review: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Review is must be valid alphanumeric character"
        }
      }
    },
    photos: DataTypes.STRING(60000),
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Rating must be number'
        },
        notEmpty: {
          args: true,
          msg: "Rating must be number"
        },
        min: {
          args: [0],
          msg: "Rating cannot less than 0"
        },
        max: {
          args: 5,
          msg: 'Rating cannot more than 5'
        },
        isFloat: {
          args: true,
          msg: "Please use dot(.) as comma for decimal"
        }
      }
    },
    UserId: DataTypes.INTEGER,
    product_name: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Product name cannot empty'
        },
        notNull: {
          args: true,
          msg: 'Product name cannot empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};