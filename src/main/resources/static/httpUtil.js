var option = {
  xhrFields: {
    withCredentials: true
  },
  crossDomain: true,
  cache: false,
}

/**
 * 提交表单
 * @param url
 * @param data
 * @returns {*}
 */
function postForm(url, data) {
  var o = $.extend({type: "POST", url: url, data: data}, option)
  return $.ajax(o);
}

/*同步*/
function postFormSyn(url, data) {
  var o = $.extend({type: "POST", url: url, async: false, data: data}, option)
  return $.ajax(o);
}

/**
 * 提交json
 * @param url
 * @param data
 * @returns {*}
 */
function postJson(url, data) {
  var o = $.extend({
    type: "POST",
    url: url,
    contentType: "application/json;charset=utf-8",
    data: JSON.stringify(data)
  }, option)
  return $.ajax(o);
}

/*同步*/
function postJsonSyn(url, data) {
  var o = $.extend({
    type: "POST",
    url: url,
    async: false,
    contentType: "application/json;charset=utf-8",
    data: JSON.stringify(data)
  }, option)
  return $.ajax(o);
}

/*get请求*/
function get(url, params) {
  var o = $.extend({type: "get", url: url, data: params}, option)
  return $.ajax(o);
}

/*同步*/
function getSyn(url, params) {
  var o = $.extend({type: "get", url: url, async: false, data: params}, option);
  return $.ajax(o);
}

/**
 * 将form表单转换成json对象
 * @param select  jquery选择器表达式
 * @param skipEmpty
 * @returns {{}}
 */
function form2Json(select, skipEmpty) {
  var serializeObj = {};
  var array = $(select).serializeArray();
  var skip = skipEmpty == undefined ? false : skipEmpty;
  $(array).each(function () {
    var value = this.value;
    if (!skip || (skip && (value != "" && value != null && value != undefined))) {
      if (serializeObj[this.name]) {
        if ($.isArray(serializeObj[this.name])) {
          serializeObj[this.name].push(this.value);
        } else {
          serializeObj[this.name] = [serializeObj[this.name], this.value];
        }
      } else {
        serializeObj[this.name] = this.value;
      }
    }
  });
  var remark = {};
  $(select).find('[ext=ext]').each(function (inx, elem) {
    var $elem = $(elem);
    var temp = $elem.val();
    var val = temp;
    try {
      val = JSON.parse(temp);
    } catch (e) {
      log("非json:" + temp);
    }
    remark[$elem.attr('name')] = val;
  });
  serializeObj.remark = remark;
  return serializeObj;
};

/*上传图片*/
function postFile(url, data) {
  return $.ajax({
    url: url,
    type: 'POST',
    cache: false,
    async: false,
    data: data,
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true,
    processData: false,
    contentType: false
  })
}

/**
 * get序列化数据{xx==yy&xx=yy} 转js对象
 * @param str
 * @returns {{}}
 */
function getParamToObj(str) {
  str = decodeURIComponent(str);
  var arr = str.split("&");
  var obj = {}
  for (var i = 0; i < arr.length; i++) {
    var keyVal = arr[i].split("=");
    obj[keyVal[0]] = keyVal[1];
  }
  return obj;
}
