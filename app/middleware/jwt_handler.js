'use strict';

module.exports = () => {
  return async function(ctx, next) {
    if (ctx.originalUrl !== '/api/auth/login') {
      const token = ctx.header['x-token'];
      if (!token) {
        ctx.status = 401;
        ctx.body = 'token不能为空';
        return;
      }
      try {
        const tokenInfo = await ctx.service.sys.userService.verifyToken(token);
        const exp = tokenInfo.data.exp;
        const now = parseInt(new Date().getTime() / 1000);
        const isOver = exp - now < 60 * 60;
        const id = tokenInfo.data.id;
        if (isOver) {
          const token = await ctx.service.sys.userService.createToken({ id });
          ctx.set('x-token', token);
        }
      } catch (err) {
        ctx.status = 401;
        if (err.name === 'TokenExpiredError') {
          ctx.body = 'token过期';
        } else if (err.name === 'JsonWebTokenError') {
          ctx.body = 'token无效';
        }
      }
    }
    await next();
  };
};
