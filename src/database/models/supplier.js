module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define(
    'Supplier',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      managerId: DataTypes.STRING,
      companyId: DataTypes.UUID
    },
    {}
  );
  Supplier.associate = (models) => {
    Supplier.belongsTo(models.Company, {
      foreignKey: 'companyId',
      as: 'company',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Supplier.belongsTo(models.User, {
      foreignKey: 'managerId',
      as: 'manager',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Supplier;
};
