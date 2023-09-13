'use strict';
const { assignFilter } = require('../utils/common');

module.exports = app => {
  const Race = app.model.define('race', require('../schema/race')(app));
  const Account = app.model.define('account', require('../schema/account')(app));
  const Message = app.model.define('message', require('../schema/message')(app));
  const VolleyballScore = app.model.define('volleyballScore', require('../schema/volleyballScore')(app));
  const ParticipateRecord = app.model.define('participateRecord', require('../schema/participateRecord')(app));

  // 关系
  Race.belongsTo(Account, { foreignKey: 'organizer', as: 'organize', targetKey: 'accountId' }); // 一个账号可以举办多场比赛
  Race.hasMany(ParticipateRecord, { foreignKey: 'raceId', as: 'participates', targetKey: 'raceId' }); // 一场比赛有多条参赛记录
  Race.hasMany(Message, { foreignKey: 'raceId', targetKey: 'raceId' }); // 一场比赛有多条消息记录
  Race.hasMany(VolleyballScore, { foreignKey: 'raceId', targetKey: 'raceId' }); // 一场比赛有多条比赛结果记录

  // 查询列表
  Race.list = async origin => {
    const common = {
      include: 'organize',
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

  return Race;
};
