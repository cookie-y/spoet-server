'use strict';
const Service = require('egg').Service;
const nodemailer = require('nodemailer');

const userMail = 'zwx24@foxmail.com';
const authCode = 'qairxzlusmetebdh';

const transporter = nodemailer.createTransport({
  service: 'qq',
  port: 465,
  auth: {
    user: userMail,
    pass: authCode,
  },
});

class MailService extends Service {
  /**
   * 发送邮件
   *
   * @param {*} email 要发送至的邮箱
   * @param {*} subject 邮件标题
   * @param {*} html 邮件内容
   * @return {boolean} 是否发送成功
   * @memberof MailService
   */
  async sendMail(email, subject, html) {
    const mailOptions = {
      from: userMail,
      to: email,
      subject,
      html,
    };
    try {
      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * 发送验证码
   *
   * @param {*} email 要发送至的邮箱
   * @param {*} code 验证码
   * @return {*} 是否发送成功
   * @memberof MailService
   */
  async sendCodeMail(email, code) {
    const html = `您的验证码为：<b>${code}</b>(一分钟内有效)`;
    return await this.sendMail(email, '注册验证码', html);
  }
}

module.exports = MailService;
