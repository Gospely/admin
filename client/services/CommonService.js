//post，get,delete,put等基本请求通用服务
var utils = require('../util/utils');
var HTTP = require('./Http')
module.exports = {

  init: function(obj, bu) {
    var request = HTTP.init(obj, bu)
    return {
      //新增
      create: function(options) {

        return request.post(options);
      },
      //列表查询
      list: function(options) {

        var query = utils.toParam(options.param);
        console.log(query);
        var url = options.url;
        if (query != null && query != undefined && query != '') {
          options.url = options.url + "?" + query;
        }
        console.log(query);
        return request.get(options);
      },
      //删除
      delete: function(options) {
        options.url = options.url + "/" + options.param.id
        request.delete(options);
      },
      //获取某个
      getOne: function(options) {
        options.url = options.url + "/" + options.param.id
        request.get(options);
      },
      //更新修改数据（param 中必须有id）
      update: function(options) {
        request.put(options);
      },
      // 获取总数
      count: function(options) {
        if (options.param != undefined) {
          var query = utils.toParam(options.param);
          var url = options.url;
          if (query != null && query != undefined && query != '') {
            options.url = options.url + "/number?" + query;
          }
        } else {
          options.url = options.url + "/number";
        }
        request.get(options);
      },
      // 动态获取监控状态
      containerOperate: function(options) {
        options.url = options.url + "/" + options.param.containerName
        request.get(options);
      },
       dashboard: function(options) {
       if (options.param != undefined) {
          var query = utils.toParam(options.param);
          var url = options.url;
          if (query != null && query != undefined && query != '') {
            options.url = options.url + "?" + query;
          }
        } else {
          options.url = options.url ;
        }
        request.get(options);
      },


    }

  }
}