'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.User, {
         as: "FromUserId",
         foreignKey: {
            name: "id",
            allowNull: false,
         },
      });
      Message.belongsTo(models.User, {
         as: "ToUserId",
         foreignKey: {
            name: "id",
            allowNull: false,
         },
      });
    }
  }
  Message.init(
     {
        content: DataTypes.TEXT,
        FromUserId: {
           type: DataTypes.INTEGER,
           references: {
              model: sequelize.User,
              key: "id",
           },
        },
        ToUserId: {
           type: DataTypes.INTEGER,
           references: {
              model: sequelize.User,
              key: "id",
           },
        },
     },
     {
        sequelize,
        modelName: "Message",
     }
  );
  return Message;
};