'use strict';

const Controller = require('egg').Controller;

class MenuController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.session = ctx.session;
    this.MenuService = ctx.service.sys.menuService;
  }

  async queryMenuInfo() {
    const { ctx, MenuService } = this;
    const res = await MenuService.queryMenuInfo();
    ctx.helper.success({ ctx, res });
  }

  async queryPower() {
    const { ctx, MenuService } = this;
    const res = await MenuService.queryMenuInfo(true);
    ctx.helper.success({ ctx, res });
  }

  async insertMenuInfo() {
    const { ctx, MenuService } = this;
    const res = await MenuService.insertMenuInfo(ctx.request.body);
    ctx.helper.success({ ctx, res });
  }
}

module.exports = MenuController;
