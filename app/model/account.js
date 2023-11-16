'use strict';

const bcrypt = require('bcrypt');
const { assignFilter } = require('../utils/common');

module.exports = app => {
  const Account = app.model.define('account', require('../schema/account')(app));
  const Race = app.model.define('race', require('../schema/race')(app));
  const Member = app.model.define('Member', require('../schema/member')(app));
  const ParticipateRecord = app.model.define('participateRecord', require('../schema/participateRecord')(app));
  const School = app.model.define('school', require('../schema/school')(app));
  const SearchRecord = app.model.define('searchRecord', require('../schema/searchRecord')(app));
  const Message = app.model.define('message', require('../schema/message')(app));
  const MessageTransmission = app.model.define('messageTransmission', require('../schema/messageTransmission')(app));

  // #region 关系
  Account.belongsTo(School, { foreignKey: 'schoolId' }); // 一个账号属于一个学校
  // 一个账号可举办多场比赛
  Account.hasMany(Race, { foreignKey: 'organizer', targetKey: 'accountId' });
  // 一个账号可参加多个比赛 一个比赛可以有多个参赛方
  Account.belongsToMany(Race, { through: ParticipateRecord, foreignKey: 'accountId', otherKey: 'raceId' });
  Account.hasMany(ParticipateRecord, { foreignKey: 'accountId', targetKey: 'accountId' });
  // 一个账号有多个队员
  Account.hasMany(Member, { foreignKey: 'facultyId', targetKey: 'accountId' });
  // 一个账号可发送多条信息
  Account.hasMany(MessageTransmission, { as: 'sended', foreignKey: 'senderId', targetKey: 'accountId' });
  // 一个接收方可以接收多条信息 一条消息可以有多个接收方
  Account.belongsToMany(Message, { through: MessageTransmission, foreignKey: 'receiverId', otherKey: 'messageId' });
  Account.hasMany(MessageTransmission, { as: 'received', foreignKey: 'receiverId', targetKey: 'accountId' });
  // 一个账号可有多个搜索记录
  Account.hasMany(SearchRecord, { foreignKey: 'accountId', targetKey: 'accountId' });
  // #endregion

  Account.beforeSave(async account => {
    if (!account.changed('password')) {
      return;
    }
    account.password = await bcrypt.hash(account.password, 10);
  });

  // 获取账号信息
  Account.detail = async origin => {
    const common = {
      attributes: { exclude: [ 'password' ] },
    };
    const filter = assignFilter(origin, common);
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
  Account.edit = async ({ accountId, ...others }) => {
    await Account.update(
      { ...others },
      { where: { accountId },
        individualHooks: true,
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

  // 查询列表
  Account.list = async filter => {
    const { rows, count } = await Account.findAndCountAll(filter);
    return { list: rows, total: count };
  };

  return Account;
};
