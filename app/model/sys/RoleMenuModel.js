'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;
  const RoleMenuModel = app.model.define('RoleMenu', {
    id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    roleid: {
      type: INTEGER(11),
      allowNull: false,
    },
    powerid: {
      type: INTEGER(11),
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'sys_role_power_t',
  });
  return RoleMenuModel;
};
