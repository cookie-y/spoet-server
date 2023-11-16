'use strict';
const { assignFilter } = require('../utils/common');

module.exports = app => {
  const Race = app.model.define('race', require('../schema/race')(app));
  const Account = app.model.define('account', require('../schema/account')(app));
  const Message = app.model.define('message', require('../schema/message')(app));
  const VolleyballScore = app.model.define('volleyballScore', require('../schema/volleyballScore')(app));
  const ParticipateRecord = app.model.define('participateRecord', require('../schema/participateRecord')(app));

  // 关系
  // 一个账号可参加多个比赛 一个比赛可以有多个参赛方
  Race.belongsToMany(Account, { as: 'participants', through: ParticipateRecord, foreignKey: 'raceId', otherKey: 'accountId' });
  Race.hasMany(ParticipateRecord, { foreignKey: 'raceId', targetKey: 'raceId' });
  // 一个账号可以举办多场比赛 一个比赛只有一个举办方
  Race.belongsTo(Account, { as: 'organize', foreignKey: 'organizer', targetKey: 'accountId' });
  // 一场比赛有多条比赛结果记录
  Race.hasMany(VolleyballScore, { foreignKey: 'raceId', targetKey: 'raceId' });
  // 一场比赛有多条相关的消息记录
  Race.hasMany(Message, { foreignKey: 'raceId', targetKey: 'raceId' });

  // 查询列表
  Race.list = async origin => {
    const common = {
      include: [{
        model: Account,
        as: 'organize',
        attributes: [ 'accountName' ],
      }],
    };
    const filter = assignFilter(origin, common);
    const { rows, count } = await Race.findAndCountAll(filter);
    return { list: rows, total: count };
  };

  // 查询详情
  Race.detail = async filter => {
    return await Race.findOne(filter);
  };

  // 新增比赛
  Race.add = async race => {
    return await Race.create(race);
  };

  // 编辑队员
  Race.edit = async (race, where) => {
    return await Race.update(race, { where });
  };

  // 删除队员
  Race.del = async where => {
    return await Race.destroy({ where });
  };

  return Race;
};
