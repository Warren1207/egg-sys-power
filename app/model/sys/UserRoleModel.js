'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;
  const UserRoleModel = app.model.define('UserRole', {
    id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: INTEGER(11),
      allowNull: false,
    },
    roleid: {
      type: INTEGER(11),
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'sys_user_role_t',
  });
  UserRoleModel.associate = function() {
    app.model.Sys.UserRoleModel.belongsTo(app.model.Sys.UserModel, { foreignKey: 'userid', targetKey: 'id' });
  };
  return UserRoleModel;
};
