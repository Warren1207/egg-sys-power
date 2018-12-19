'use strict';

module.exports = appInfo => {
  const config = exports = {};

  config.keys = appInfo.name + '_913932075_1207';

  config.middleware = [ 'errorHandler', 'jwtHandler' ];

  /** 静态文件配置**/
  config.static = {
    prefix: '/',
    gzip: true,
  };

  /** 允许跨域 **/
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
  };

  /** 数据库配置 **/
  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'demo',
    host: '119.29.86.18',
    port: '3306',
    username: 'root',
    password: 'root123',
    timezone: '+08:00', // 东八时区
  };

  config.jwt = {
    enable: false,
    secret: '91332075',
  };

  config.session = {
    key: 'WL_1587912681212',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
    renew: true,
  };
  return config;
};
