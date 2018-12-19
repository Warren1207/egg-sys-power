'use strict';

const Service = require('egg').Service;

class RoleService extends Service {
  constructor(ctx) {
    super(ctx);
    this.RoleModel = ctx.model.Sys.RoleModel;
    this.UserRoleModel = ctx.model.Sys.UserRoleModel;
    this.RoleMenuModel = ctx.model.Sys.RoleMenuModel;
  }

  async queryRoleInfo(name, status, page, limit) {
    const params = {};
    if (name) {
      params.name = {
        $like: '%' + name + '%',
      };
    }
    if (status) {
      params.state = status;
    }
    const queryParams = {
      attributes: [ 'id', 'name', 'state', 'desc', [ 'create_time', 'createTime' ]],
      where: params,
      limit,
      offset: (page - 1) * limit,
    };
    const roles = await this.RoleModel.findAndCountAll(queryParams);
    return roles;
  }

  async queryRole() {
    const roles = await this.RoleModel.findAll({
      where: {
        state: 1,
      },
    });
    return roles;
  }

  async insertRoleInfo(roleInfo) {
    const role = this.RoleModel.create(roleInfo);
    return role;
  }

  async modifyRoleInfo(roleInfo) {
    const role = await this.RoleModel.findById(roleInfo.id);
    if (!role) {
      this.ctx.throw(404, 'role not found');
    }
    return role.update(roleInfo);
  }

  async deleteRoleInfo(ids) {
    const role = await this.RoleModel.destroy({
      where: {
        id: ids,
      },
    });
    return role;
  }

  async queryRoleUserArray(id) {
    const userIds = await this.UserRoleModel.findAll({
      attributes: [ 'userid' ],
      where: {
        roleid: id,
      },
    });
    return userIds;
  }

  async modifyRoleUser(ids, roleid) {
    const transaction = await this.ctx.model.transaction();
    try {
      await this.UserRoleModel.destroy({
        where: {
          roleid,
        },
      });
      const insertData = [];
      for (let i = 0; i < ids.length; i++) {
        const row = {
          userid: ids[i],
          roleid,
        };
        insertData.push(row);
      }
      await this.UserRoleModel.bulkCreate(insertData);
      await transaction.commit();
      return true;
    } catch (e) {
      console.error(e.message);
      await transaction.rollback();
      return false;
    }
  }

  async queryRoleMenu(roleid) {
    const menuIds = await this.RoleMenuModel.findAll({
      attributes: [ 'powerid' ],
      where: {
        roleid,
      },
    });
    return menuIds;
  }

  async modifyRoleMenu(ids, roleid) {
    const transaction = await this.ctx.model.transaction();
    try {
      await this.RoleMenuModel.destroy({
        where: {
          roleid,
        },
      });
      const insertData = [];
      for (let i = 0; i < ids.length; i++) {
        const row = {
          powerid: ids[i],
          roleid,
        };
        insertData.push(row);
      }
      await this.RoleMenuModel.bulkCreate(insertData);
      await transaction.commit();
      return true;
    } catch (e) {
      console.error(e.message);
      await transaction.rollback();
      return false;
    }
  }
}

module.exports = RoleService;
