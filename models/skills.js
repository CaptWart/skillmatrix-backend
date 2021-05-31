module.exports = function(sequelize, DataTypes) {
    const Skill = sequelize.define("skill", {
      name: DataTypes.STRING,
      description: DataTypes.STRING
    });


    Skill.associate = function(models){
      Skill.hasMany(models.userskill, {
        onDelete: "cascade"
      })
    }

  
    return Skill;
  };