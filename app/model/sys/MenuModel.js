'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const MenuModel = app.model.define('Menu', {
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
    type: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: 1,
    },
    href: {
      type: STRING(500),
      allowNull: true,
    },
    icon: {
      type: STRING(200),
      allowNull: true,
    },
    html: {
      type: STRING(500),
      allowNull: true,
    },
    parentid: {
      type: INTEGER(11),
      allowNull: true,
    },
    desc: {
      type: STRING(500),
      allowNull: true,
    },
    create_time: {
      type: DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'sys_power_t',
  });
  return MenuModel;
};
