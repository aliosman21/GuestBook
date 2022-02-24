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
         as: "fromUser",
         foreignKey: {
            name: "FromUserId",
         },
      });
      Message.belongsTo(models.User, {
         as: "toUser",
         foreignKey: {
            name: "ToUserId"
         }
      });
      Message.hasMany(models.Reply);
    }
  }
  Message.init(
     {
        content: DataTypes.TEXT,
        FromUserId: {
           type: DataTypes.INTEGER,
           allowNull: false,
        },
        ToUserId: {
           type: DataTypes.INTEGER,
           allowNull: false,
        },
     },
     {
        sequelize,
        modelName: "Message",
     }
  );
  return Message;
};