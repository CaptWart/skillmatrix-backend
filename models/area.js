module.exports = function(sequelize, DataTypes) {
    const Area = sequelize.define("area", {
      name: DataTypes.STRING
    });
  
    Area.associate = function(models){
      Area.hasMany(models.userskill, {
        onDelete: "cascade"
      })
    }


    return Area;
  };