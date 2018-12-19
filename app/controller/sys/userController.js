'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.UserService = ctx.service.sys.userService;
  }
  /** 登录方法 **/
  async login() {
    const { ctx, UserService } = this;
    const { username, password } = ctx.request.body;
    const res = await UserService.login(username, password);
    if (res) {
      const token = await UserService.createToken({ id: res.id });
      res.token = token;
    }
    ctx.helper.success({ ctx, res });
  }

  async logout() {
    const { ctx } = this;
    ctx.helper.success({ ctx });
  }

  async getUserInfo() {
    const { ctx, UserService } = this;
    const token = ctx.header['x-token'];
    let res = null;
    if (token) {
      const tokenInfo = await UserService.verifyToken(token);
      const id = tokenInfo.data.id;
      res = await UserService.findById(id);
    }
    ctx.helper.success({ ctx, res });
  }

  async queryUserInfo() {
    const { ctx, UserService } = this;
    const { name, status, role_id, page, limit } = ctx.request.body;
    const res = await UserService.queryUserInfo(name, status, role_id, page, limit);
    ctx.helper.success({ ctx, res });
  }
  async queryAllUserInfo() {
    const { ctx, UserService } = this;
    const res = await UserService.queryAllUserInfo();
    ctx.helper.success({ ctx, res });
  }

  async insertUserInfo() {
    const { ctx, UserService } = this;
    const res = await UserService.insertUserInfo(ctx.request.body);
    ctx.helper.success({ ctx, res });
  }

  async modifyUserInfo() {
    const { ctx, UserService } = this;
    const res = await UserService.modifyUserInfo(ctx.request.body);
    ctx.helper.success({ ctx, res });
  }

  async deleteUserInfo() {
    const { ctx, UserService } = this;
    const res = await UserService.deleteUserInfo(ctx.request.body);
    ctx.helper.success({ ctx, res });
  }
}

module.exports = UserController;
