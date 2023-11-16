'use strict';

const Service = require('egg').Service;

class MessageService extends Service {
  // 获取消息列表
  async getMsgList(accountId, page, pageSize) {
    const { app } = this;
    const SQL = `SELECT t2.message_id, t2.sender_id, m.content, a.account_name
                FROM (SELECT t.sender_id, MAX(t.created_at) as time
                  FROM message_transmissions t
                  WHERE t.receiver_id = ${accountId}
                  GROUP BY t.sender_id
                  ORDER BY t.created_at) t1
                LEFT JOIN message_transmissions t2
                ON t1.time = t2.created_at 
                LEFT JOIN messages m
                ON t2.message_id = m.id
                LEFT JOIN accounts a
                on t2.sender_id = a.account_id
                LIMIT ${pageSize}
                OFFSET ${(page - 1) * pageSize}`;
    const [ result ] = await app.model.query(SQL);
    return { result, page, pageSize };
  }

  // 获取某人发送的消息列表
  async getMsgDetail(senderId, receiverId, page, pageSize) {
    const { ctx } = this;
    const filter = {
      attributes: [ 'id', 'readed', 'createdAt' ],
      where: {
        senderId,
        receiverId,
      },
      include: [
        {
          model: ctx.model.Message,
          attributes: { exclude: [ 'createdAt', 'updatedAt', 'deletedAt' ] },
        },
      ],
      order: [[ 'createdAt', 'DESC' ]],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    };
    const list = await ctx.model.MessageTransmission.list(filter);
    return list;
  }
}

module.exports = MessageService;
