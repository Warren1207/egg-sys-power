'use strict';

const Service = require('egg').Service;

class MenuService extends Service {
  constructor(ctx) {
    super(ctx);
    this.MenuModel = ctx.model.Sys.MenuModel;
  }
  async queryMenuInfo(isPower) {
    let params = {};
    if (!isPower) {
      params = {
        where: {
          type: 2,
        },
      };
    }
    const menuArray = await this.MenuModel.findAll(params);
    const getTreeData = function(data, menuId) {
      const dataArray = [];
      for (let i = 0; i < data.length; i++) {
        const obj = data[i].dataValues;
        if (obj.parentid === menuId) {
          const childrenArray = getTreeData(menuArray, obj.id);
          if (childrenArray.length > 0) {
            obj.children = childrenArray;
            obj.leaf = false;
          } else {
            obj.leaf = true;
          }
          obj.text = obj.name;
          dataArray.push(obj);
        }
      }
      return dataArray;
    };
    const resultArray = getTreeData(menuArray, 0);
    return resultArray;
  }

  async insertMenuInfo(menuInfo) {
    const menu = this.MenuModel.create(menuInfo);
    return menu;
  }
}

module.exports = MenuService;
