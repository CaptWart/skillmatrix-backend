module.exports = function(sequelize, DataTypes) {
    const Permission = sequelize.define("permission", {
      role: DataTypes.INTEGER,
      description: DataTypes.STRING
    });
  
    return Permission;
  };