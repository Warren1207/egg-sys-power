'use strict';
const moment = require('moment');

// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD hh:mm:ss');

// 处理成功响应
exports.success = ({ ctx, res = null, msg = '请求成功', status = 200 }) => {
  ctx.body = {
    code: 0,
    data: res,
    msg,
  };
  ctx.status = status;
};

// 处理失败响应
exports.error = (ctx, code, message) => {
  ctx.body = {
    code,
    message,
  };
  ctx.status = code;
};
