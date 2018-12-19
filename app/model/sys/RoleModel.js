'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const RoleModel = app.model.define('Role', {
    id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING(200),
      allowNull: false,
      unique: true,
    },
    state: {
      type: INTEGER(11),
      allowNull: true,
      defaultValue: 1,
    },
    desc: {
      type: STRING(500),
    },
    create_time: {
      type: DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'sys_role_t',
  });
  return RoleModel;
};
