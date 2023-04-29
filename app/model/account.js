'use strict';

const bcrypt = require('bcrypt');

module.exports = app => {
  const Account = app.model.define('account', require('../schema/account')(app));
  const Race = app.model.define('race', require('../schema/race')(app));
  const Member = app.model.define('Member', require('../schema/member')(app));
  const ParticipateRecord = app.model.define('participateRecord', require('../schema/participateRecord')(app));
  const School = app.model.define('school', require('../schema/school')(app));
  const Point = app.model.define('point', require('../schema/point')(app));
  const SearchRecord = app.model.define('searchRecord', require('../schema/searchRecord')(app));
  const Message = app.model.define('message', require('../schema/message')(app));
  const MessageReceiver = app.model.define('messageReceiver', require('../schema/messageReceiver')(app));

  // 关系
  Account.belongsTo(School, { foreignKey: 'schoolId', as: 'school', targetKey: 'schoolId' }); // 一个账号属于一个学校
  Account.hasMany(Race, { foreignKey: 'organizer', targetKey: 'accountId' }); // 一个账号可举办多场比赛
  Account.hasMany(Member, { foreignKey: 'facultyId', targetKey: 'accountId' }); // 一个账号有多个队员
  Account.hasMany(ParticipateRecord, { foreignKey: 'accountId', targetKey: 'accountId' }); // 一个账号可有多个队员参赛
  Account.hasMany(Point, { foreignKey: 'accountId', targetKey: 'accountId' }); // 一个账号可有多个积分(不同的比赛)
  Account.hasMany(SearchRecord, { foreignKey: 'accountId', targetKey: 'accountId' }); // 一个账号可有多个搜索记录
  Account.hasMany(Message, { foreignKey: 'sender', targetKey: 'accountId' }); // 一个账号可发送多条信息
  Account.hasMany(MessageReceiver, { foreignKey: 'receverId', targetKey: 'accountId' }); // 一个账号可接收多条信息


  Account.beforeSave(async account => {
    if (!account.changed('password')) {
      return;
    }
    account.password = await bcrypt.hash(account.password, 10);
  });

  /**
   * * 获取账号信息
   * @param {number} accountId 账号Id
   */
  Account.detail = async accountId => {
    const filter = {
      where: { accountId },
      include: 'school',
    };
    return await Account.findOne(filter);
  };

  /**
   * * 新增账号
   * @param {object} account 账号数据
   */
  Account.add = async account => {
    return await Account.create(account);
  };

  /**
   * * 更新用户信息
   * @param {number} accountId 账号Id
   */
  Account.update = async accountId => {
    return await Account.update({
      where: { accountId },
    });
  };

  /**
   * * 删除
   * @param {number} accountId 账号Id
   */
  Account.delete = async accountId => {
    return await Account.destroy({
      where: { accountId },
    });
  };

  return Account;
};
