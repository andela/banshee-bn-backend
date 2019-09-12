import replaceEnum from 'sequelize-replace-enum-postgres';

module.exports = {
  up: queryInterface => replaceEnum({
    queryInterface,
    tableName: 'Trips',
    columnName: 'status',
    defaultValue: 'pending',
    newValues: ['started', 'completed', 'pending', 'rejected', 'approved'],
    enumName: 'enum_Trips_status'
  }),

  down: queryInterface => replaceEnum({
    queryInterface,
    tableName: 'Trips',
    columnName: 'status',
    defaultValue: 'pending',
    newValues: ['started', 'completed', 'pending', 'rejected', 'approved'],
    enumName: 'enum_Trips_status'
  })
};
