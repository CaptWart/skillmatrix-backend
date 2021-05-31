module.exports = function(sequelize, DataTypes) {
    const Endorsement = sequelize.define("endorsement", {
      userid: DataTypes.STRING
    });
  
    Endorsement.associate = function(models) {
        Endorsement.belongsTo(models.userskill, {
        foreignKey: {
          allowNull: false
        }
      });
    };

    return Endorsement;
  };