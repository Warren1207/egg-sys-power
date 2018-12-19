'use strict';

/** 静态文件 **/
exports.static = true;

/** Session **/
exports.session = true;

/** sequelize **/
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
/** 鉴权 **/
exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};
