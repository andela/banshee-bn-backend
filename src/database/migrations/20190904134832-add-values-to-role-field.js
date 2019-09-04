import replaceEnum from 'sequelize-replace-enum-postgres';

module.exports = {
  up: queryInterface => replaceEnum({
    queryInterface,
    tableName: 'Users',
    columnName: 'role',
    defaultValue: 'staff',
    newValues: ['super admin', 'travel admin', 'travel team member', 'manager', 'requester', 'staff'],
    enumName: 'enum_Users_role'
  }),

  down: queryInterface => replaceEnum({
    queryInterface,
    tableName: 'Users',
    columnName: 'role',
    defaultValue: 'staff',
    newValues: ['super admin', 'travel admin', 'travel team member', 'manager', 'requester', 'staff'],
    enumName: 'enum_Users_role'
  })
};
