//统一请求，统一处理请求结果和绑定,异常通知,可选择callback方式处理请求结果
module.exports = {

	init: function(obj, bu) {
		var _this = obj;
		var baseUrl = bu;

		function HTTP(options) {

			switch (options.method) {
				case 'post':
					return _this.$http.post(baseUrl + options.url, options.param);
					break;
				case 'get':
					return _this.$http.get(baseUrl + options.url);
					break;
				case 'delete':
					return _this.$http.delete(baseUrl + options.url);
					break;
				case 'put':
					return _this.$http.put(baseUrl + options.url, options.param);
					break;
				default:

			}
		};
		//统一出异常和绑定数据
		function requestAndHandlerError(options) {

			if (options.cb != null && options.cb != undefined) {

				HTTP(options).then(options.cb, function(err) {

					openNotification({
						message: '服务器异常',
						title: '服务器异常',
						type: 'warning'
					});
				});
			} else {
				HTTP(options).then(function(res) {

					//请求成功，统一处理
					if (res.status === 200) {

						console.log(res);
						var data = res.data;
						console.log(data);

						if (data.code == 1) {
							if (data != 'Done!') {
								//判断返回的数据是否是数组
								if (isArray(data.fields)) {
									//数组绑定

									if (options.ctx[options.target] == null || options.ctx[options.target] == undefined) {

										options.ctx.$data.all = data.all;
										options.ctx.fields = data.fields
									} else {

										console.log("target" + options.target);
										if (options.ctx.$data[options.all] != undefined) {
											options.ctx.$data[options.all] = data.all;
										}

										options.ctx[options.target] = data.fields;
									}
								} else {

									console.log(options.ctx.$data);
									for (var field in data.fields) {
										console.log(typeof field);
										//暂时判断，todo:转换成一个escape模块
										if (!(field == 'password' || field == 'all' || field == 'cur')) {
											if (Reflect.has(options.ctx.$data, field)) {
												Reflect.set(options.ctx.$data, field, Reflect.get(data.fields, field))
											}
										}
									}
								}
							}
						}

						if (data.code === -100) {
							openNotification({
								message: data.message,
								title: data.message,
								type: 'warning'
							});
							setTimeout(function() {

								window.location.href = window.baseUrl + "/#!/system/login"
							}, 1000)
						}
						if (options.msg != null && options.msg != undefined) {
							openNotification(options.msg.success);
						}
						console.log(options.ctx.$data.cur);
						if (options.reload != null && options.reload != undefined) {

							console.log(options.ctx.$data.cur);
							console.log("reload");


							options.reload(options.ctx.$data.cur);
						}
						//分页参数处理
					} else {
						if (options.msg != null && options.msg != undefined) {
							openNotification(options.msg.failed);
						}
					}
				}, function(err) {

					//切换提醒方式
					openNotification({
						title: '服务器异常',
						message: '服务器异常',
						type: 'warning'
					});
				});
			}

			function isArray(obj) {
				return Object.prototype.toString.call(obj) === '[object Array]';
			}

			function isObject(obj) {
				return Object.prototype.toString.call(obj) === '[Object]';
			}
		}
		return {

			get: function(options) {

				options.method = 'get';
				requestAndHandlerError(options);

			},
			post: function(options) {
				options.method = 'post';
				requestAndHandlerError(options);

			},
			delete: function(options) {
				options.method = 'delete';
				requestAndHandlerError(options);

			},
			put: function(options) {
				options.method = 'put';
				requestAndHandlerError(options);
			}

		}

	}

};