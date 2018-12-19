'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const UserModel = app.model.define('User', {
    id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: STRING(100),
      allowNull: false,
    },
    email: {
      type: STRING(100),
      allowNull: true,
    },
    state: {
      type: INTEGER(8),
      allowNull: true,
      defaultValue: 1,
    },
    create_time: {
      type: DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'sys_user_t',
  });
  UserModel.associate = function() {
    app.model.Sys.UserModel.hasMany(app.model.Sys.UserRoleModel, { foreignKey: 'userid', targetKey: 'id' });
  };
  return UserModel;
};
