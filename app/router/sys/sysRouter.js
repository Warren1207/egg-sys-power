'use strict';

module.exports = app => {
  app.router.post('/api/auth/login', app.controller.sys.userController.login);
  app.router.post('/api/auth/logout', app.controller.sys.userController.logout);
  app.router.get('/api/auth/info', app.controller.sys.userController.getUserInfo);
  app.router.post('/api/user/queryFn', app.controller.sys.userController.queryUserInfo);
  app.router.get('/api/user/queryUserArray', app.controller.sys.userController.queryAllUserInfo);
  app.router.post('/api/user/insertInfo', app.controller.sys.userController.insertUserInfo);
  app.router.post('/api/user/modifyInfo', app.controller.sys.userController.modifyUserInfo);
  app.router.post('/api/user/deleteInfo', app.controller.sys.userController.deleteUserInfo);
  app.router.get('/api/menu/menuList', app.controller.sys.menuController.queryMenuInfo);
  app.router.get('/api/menu/powerList', app.controller.sys.menuController.queryPower);
  app.router.post('/api/menu/insertInfo', app.controller.sys.menuController.insertMenuInfo);
  app.router.post('/api/role/queryFn', app.controller.sys.roleController.queryRoleInfo);
  app.router.get('/api/role/queryAllFn', app.controller.sys.roleController.queryRole);
  app.router.post('/api/role/insertInfo', app.controller.sys.roleController.insertRoleInfo);
  app.router.post('/api/role/modifyInfo', app.controller.sys.roleController.modifyRoleInfo);
  app.router.post('/api/role/deleteInfo', app.controller.sys.roleController.deleteRoleInfo);
  app.router.post('/api/role/queryRoleMenuArray', app.controller.sys.roleController.queryRoleMenu);
  app.router.post('/api/role/modifyRoleMenu', app.controller.sys.roleController.modifyRoleMenu);
  app.router.post('/api/user/queryRoleUserArray', app.controller.sys.roleController.queryRoleUserArray);
  app.router.post('/api/role/modifyRoleUser', app.controller.sys.roleController.modifyRoleUser);
};
