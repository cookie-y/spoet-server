'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATEONLY } = app.Sequelize;
  return {
    // 比赛id
    raceId: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true, // 自增
    },
    // 比赛名称
    raceName: {
      type: STRING(255),
      allowNull: false,
    },
    // 比赛状态
    state: {
      type: INTEGER,
      defaultValue: 0,
      allowNull: false,
      comment: '0:编辑中,1:审核中,2:筹办中,3:报名中,4:已截止,5:进行中,6:已结束',
    },
    // 比赛类型 0 排球
    type: {
      type: INTEGER,
      defaultValue: 0,
      comment: '0:排球',
    },
    // 比赛海报
    racePoster: {
      type: STRING(255),
    },
    // 阅读量
    pv: {
      type: INTEGER,
      defaultValue: 1,
    },
    // 报名开始时间
    applyStart: {
      type: DATEONLY,
    },
    // 报名结束时间
    applyDeadline: {
      type: DATEONLY,
    },
    // 比赛开始时间
    raceStart: {
      type: DATEONLY,
    },
    // 比赛开始时间
    raceEnd: {
      type: DATEONLY,
    },
    // 比赛场地图片
    venueImgs: {
      type: STRING(255),
    },
    // 赛制 1 五局三胜，2 三局两胜
    rule: {
      type: INTEGER,
      defaultValue: 1,
    },
    // 场类型 1 女队，2 男队，3 混合场
    kind: {
      type: INTEGER,
      defaultValue: 1,
    },
    // 注意事项
    tips: {
      type: STRING(255),
    },
    // 附件地址
    annex: {
      type: STRING(255),
    },
    // 举办方id
    organizer: {
      type: INTEGER,
      allowNull: false,
    },
  };
};
