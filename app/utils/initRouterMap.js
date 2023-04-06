'use strict';
const { forEachObjIndexed } = require('ramda');

/**
 * * 初始化路由
 * @param {string} prefix 链接前缀
 * @param {Object} maps 路由配置
 * @param {function} app 挂载路由上
 */
function initRouterMap(prefix, maps, app) {
  const { router } = app;

  forEachObjIndexed((map, method) => {
    forEachObjIndexed((controller, url) => {
      router[method](prefix + url, controller);
    }, map);
  }, maps);
}

module.exports = initRouterMap;
