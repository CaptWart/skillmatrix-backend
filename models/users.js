const userskill = require("./userskill");

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("user", {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      manager: DataTypes.INTEGER,
      phone: DataTypes.BIGINT,
      mphone: DataTypes.BIGINT,
      employeeid: DataTypes.INTEGER,
      permission: DataTypes.INTEGER
    });

    User.associate = function(models){
      User.hasMany(models.userskill, {
        onDelete: "cascade"
      })
    };

  
    return User;
  };