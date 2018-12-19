'use strict';

const Controller = require('egg').Controller;

class RoleController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.RoleService = ctx.service.sys.roleService;
  }

  async queryRoleInfo() {
    const { ctx, RoleService } = this;
    const { name, status, page, limit } = ctx.request.body;
    const res = await RoleService.queryRoleInfo(name, status, page, limit);
    ctx.helper.success({ ctx, res });
  }

  async queryRole() {
    const { ctx, RoleService } = this;
    const res = await RoleService.queryRole();
    ctx.helper.success({ ctx, res });
  }

  async insertRoleInfo() {
    const { ctx, RoleService } = this;
    const res = await RoleService.insertRoleInfo(ctx.request.body);
    ctx.helper.success({ ctx, res });
  }

  async modifyRoleInfo() {
    const { ctx, RoleService } = this;
    const res = await RoleService.modifyRoleInfo(ctx.request.body);
    ctx.helper.success({ ctx, res });
  }

  async deleteRoleInfo() {
    const { ctx, RoleService } = this;
    const res = await RoleService.deleteRoleInfo(ctx.request.body);
    ctx.helper.success({ ctx, res });
  }

  async queryRoleUserArray() {
    const { ctx, RoleService } = this;
    const { id } = ctx.request.body;
    const res = await RoleService.queryRoleUserArray(id);
    ctx.helper.success({ ctx, res });
  }

  async modifyRoleUser() {
    const { ctx, RoleService } = this;
    const { ids, roleid } = ctx.request.body;
    const res = await RoleService.modifyRoleUser(ids, roleid);
    ctx.helper.success({ ctx, res });
  }

  async queryRoleMenu() {
    const { ctx, RoleService } = this;
    const { id } = ctx.request.body;
    const res = await RoleService.queryRoleMenu(id);
    ctx.helper.success({ ctx, res });
  }

  async modifyRoleMenu() {
    const { ctx, RoleService } = this;
    const { ids, roleid } = ctx.request.body;
    const res = await RoleService.modifyRoleMenu(ids, roleid);
    ctx.helper.success({ ctx, res });
  }
}
module.exports = RoleController;
