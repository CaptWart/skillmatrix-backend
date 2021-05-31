module.exports = function(sequelize, DataTypes) {
    const Userskill = sequelize.define("userskill", {
      skillId: DataTypes.INTEGER,
      areaId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      level: DataTypes.STRING
    });
  
    Userskill.associate = function(models) {
      Userskill.belongsTo(models.skill);
    }
    // Userskill.associate = function(models) {
    //   // When an User is deleted, also delete any associated Fitness
    //   Userskill.hasMany(models.area, {
    //     onDelete: "cascade"
    //   });
    // };

    return Userskill;
  };