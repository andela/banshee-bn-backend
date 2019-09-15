module.exports = (sequelize, DataTypes) => {
  const Accomodation = sequelize.define('Accomodation', {
    name: DataTypes.STRING,
    branchId: DataTypes.UUID,
    capacity: DataTypes.INTEGER,
    status: DataTypes.STRING,
    imgurl: DataTypes.STRING,
    address: DataTypes.STRING,
    description: DataTypes.TEXT,
    addOns: DataTypes.TEXT,
    amenities: DataTypes.ARRAY(DataTypes.TEXT),
    cost: DataTypes.DECIMAL(10, 2)
  }, {});
  Accomodation.associate = (models) => {
    Accomodation.belongsTo(models.Branch, {
      foreignKey: 'branchId',
      as: 'branch',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Accomodation.hasMany(models.Stop, {
      foreignKey: 'accomodationId',
      as: 'stop',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Accomodation;
};
