'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reply.belongsTo(models.User);
      Reply.belongsTo(models.Message);
    }
  }
  Reply.init(
     {
        content: DataTypes.TEXT,
        UserId: {
           type: DataTypes.INTEGER,
           references: {
              model: sequelize.User,
              key: "id",
           },
        },
        MessageId: {
           type: DataTypes.INTEGER,
           references: {
              model: sequelize.Message,
              key: "id",
           },
        },
     },
     {
        sequelize,
        modelName: "Reply",
     }
  );
  return Reply;
};