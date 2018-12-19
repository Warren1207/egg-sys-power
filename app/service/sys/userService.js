'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');

class UserService extends Service {
  constructor(ctx) {
    super(ctx);
    this.UserModel = ctx.model.Sys.UserModel;
  }
  async login(username, password) {
    const md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex');
    const user = await this.UserModel.findOne({
      attributes: [ 'id', 'name', 'email', 'state', 'create_time' ],
      where: {
        name: username,
        password,
        state: 1,
      },
    });
    let userInfo = null;
    if (user) {
      userInfo = user.toJSON();
    }
    return userInfo;
  }

  async createToken(data) {
    const { app } = this;
    return await app.jwt.sign(data, app.config.jwt.secret, {
      expiresIn: '12h',
    });
  }

  async verifyToken(token) {
    const { app } = this;
    return await app.jwt.verify(token, app.config.jwt.secret, function(err, decoded) {
      const result = {};
      if (err) {
        result.success = false;
        result.data = err.message;
      } else {
        result.success = true;
        result.data = decoded;
      }
      return result;
    });
  }

  async findById(id) {
    const user = await this.UserModel.findById(id);
    let userInfo = null;
    if (user) {
      userInfo = user.toJSON();
    }
    return userInfo;
  }

  async queryUserInfo(name, status, role_id, page, limit) {
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
      attributes: [ 'id', 'name', 'email', 'state', 'create_time' ],
      where: params,
      limit,
      offset: (page - 1) * limit,
    };
    if (role_id) {
      queryParams.include = [
        {
          model: this.app.model.Sys.UserRoleModel,
          where: {
            roleid: role_id,
          },
        },
      ];
    }
    const user = await this.UserModel.findAndCountAll(queryParams);
    return user;
  }

  async queryAllUserInfo() {
    const userArray = await this.UserModel.findAll({
      attributes: [ 'id', 'name', 'email' ],
    });
    return userArray;
  }

  async insertUserInfo(userInfo) {
    const md5 = crypto.createHash('md5');
    userInfo.password = md5.update(userInfo.password).digest('hex');
    const user = this.UserModel.create(userInfo);
    return user;
  }

  async modifyUserInfo(userInfo) {
    const user = await this.UserModel.findById(userInfo.id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user.update(userInfo);
  }

  async deleteUserInfo(ids) {
    const user = await this.UserModel.destroy({
      where: {
        id: ids,
      },
    });
    return user;
  }
}

module.exports = UserService;
