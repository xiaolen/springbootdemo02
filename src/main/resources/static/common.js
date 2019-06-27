var dictioanry = {};
var REG_PHONE__ = /^(((13[0-9]{1})|(17[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
var REG_EMAIL__ = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
(function ($) {
  $.fn.formJson = function (skipEmpty) {
    var serializeObj = {};
    var array = this.serializeArray();
    var str = this.serialize();
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
    return serializeObj;
  };
})(jQuery);

function isNum(param) {
  var defaultParam = {
    events: { // 默认绑定的事件
      keyup: true,
      focusout: true
    },
    // 如果为true,表示可以输入小数点，否则不可以输入
    dubbo: true,
    is_fs: false // 是否是负数 false:不是 true是
  };

  var IsNum = {
    init: function (ele, param) {
      var t = this;
      t.p = $.extend({}, defaultParam, param || {});
      t.ele = ele;
      t.$ele = $(ele);
      t.bind();
    },
    bind: function () {
      var t = this;
      var p = t.p;
      if (p.events.keyup) {
        t.$ele.on('keyup', function () {
          clearTimeout(t.keyuptime);
          t.keyuptime = setTimeout(function () {
            t.validateKeyupValue.call(t);
          }, 50);
        });
      }
      if (p.events.focusout) {
        t.$ele.on('focusout', function () {
          var _inputVal = t.getInputValue() || "";
          t.$ele.val(_inputVal.replace(/\s/g, '')); // 去除字符串中所有的空格
          if (p.dubbo) {
            // 1.判断存在几个小数点，如果多于2个，则提示用户并且去掉所有的小数点
            if (_inputVal.split('.').length > 2) {
              t.$ele.val(_inputVal.replace(/\./g, ''));
              alert('当前操作的值中存在多个小数点,已经全部移除,请检查.');
              return;
            }
            // 2.以-开始以.结束 --> 值为0.0
            if (/^-\.$/.test(_inputVal)) {
              t.$ele.val('0.0');
              return;
            }
            // 3.直接一个-  --> 值为空
            if (/^-$/.test(_inputVal)) {
              t.$ele.val('');
              return;
            }
            // 4.如果是 . 结束，则补一个0
            if (/!^\.$/.test(_inputVal)) {
              t.$ele.val(_inputVal + "0");
            }
            // 5.如果是以.开始并以.结束，则取消赋值
            if (/^\.$/.test(_inputVal)) {
              t.$ele.val('')
            }
            if (/^\.\d+/.test(_inputVal)) {
              t.$ele.val('0' + _inputVal);
            }
            if (+t.$ele.val() <= 0) {
              t.$ele.val('');
            }
          }
        });
      }
    },
    validateKeyupValue: function () {
      var inputVal = this.getInputValue();
      var dubbo = this.p.dubbo;
      if (inputVal) {
        var value = "", index = inputVal.length, eachVal = "";
        for (var i = 0; i < index; i++) {
          eachVal = inputVal.charAt(i);
          if (this.p.is_fs && i == 0 && eachVal == '-') { // 如果是负数的处理
            value += "-";
            continue;
          }
          if (dubbo) {
            if ((!isNaN(eachVal) || eachVal === ".")
              && eachVal != '') {
              value += eachVal;
            }
          } else {
            if (!isNaN(eachVal) && eachVal != '') {
              value += eachVal;
            }
          }
        }
        this.$ele.val(value);
      }
    },
    getInputValue: function () {
      return this.$ele.val();
    }
  };

  return this.find('[isnum]').andSelf().each(function (i, ele) {
    var isNum = Object.create(IsNum);
    isNum.init(ele, param);
  });
};

/** 加载数据字典 */
function loadDictionary(dictTypes) {
  var arr = dictTypes.split(",");
  var temp = [];
  $(arr).each(function (inx, item) {
    if (!dictioanry.hasOwnProperty(item)) {
      temp.push(item);
    }
  })
  var param = temp.join(",");
  if (isEmpty(param)) {
    return;
  }
  getSyn(DATA_DICT.get_dict_by_type, {'dictTypes': param}).then(function (r) {
    log(r);
    if (r.success) {
      if (!dictioanry) {
        dictioanry = r.data;
        return
      }
      $.extend(dictioanry, r.data);
    } else {
      layer.alert('获取数据字典失败 -1', {'icon': '5'});
    }
  }, function (r) {
    layer.alert('获取数据字典失败 -2', {'icon': '5'});
  })
}

/** 数据字典格式化 */
function currentDictionaryFormatter(value, dictType) {
  return dictType ? ((dictioanry[dictType] || {})[value] || value) : value;
};

// 显示提示
function showTips(msg, id, options) {
  layer.tips(msg, '#' + id, $.extend(true, {tips: [1, '#F1912E'], time: 500}, options || {}));
}

function sys_alert(msg) {
  if (!msg) {
    msg = "";
  }
  layer.alert(msg, {icon: 1})
}

function sys_error(msg) {
  if (!msg) {
    msg = "";
  }
  layer.alert(msg, {icon: 2});
}

/** 格式化金额 */
var digitsRE = /(\d{3})(?=\d)/g

function formatterCurrency(value, currency, decimals) {
  value = parseFloat(value || '0.0')
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : '¥'
  decimals = decimals != null ? decimals : 2
  var stringified = Math.abs(value).toFixed(decimals)
  var _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  var i = _int.length % 3
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  var _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  var sign = value < 0 ? '-' : ''
  return sign + currency + head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float
}

var work;

/*定时任务*/
function timeWork(method, time) {
  if (work != undefined && work != null) {
    clearInterval(work);
  }
  work = setInterval(method, time);
}

/*所有扩展只能在methods中使用*/
$(function () {
  $.fn.extend({
    sendPhoneCode: function () {
      var that = this;
      var msg = this.text();
      this.attr("disabled", "disabled");
      var time = 60;
      this.text('请等待(' + time + "s)");
      timeWork(function () {
        time--;
        if (time >= 0) {
          that.text('请等待(' + time + "s)");
        } else {
          that.text(msg);
          that.removeAttr("disabled");
          clearInterval(work);
        }
      }, 1000);
    }
  });
})

var BROWSE_COUNT = null;

var IMG_PATH = commonParams.fileServer

/**
 * 加载浏览数据
 */
function loadBrowseCount() {
  getSyn(DATA_SOURCE_API.browseCount).then(function (r) {
    log(r);
    if (r.success) {
      BROWSE_COUNT = r.data;
      return;
    }
    layer.alert(r.message, {icon: 2})
  })
}

/*数据源浏览量格式化*/
function dataSourceBrowseCountFormatter(value) {
  var count = BROWSE_COUNT[value] || 0
  return count;
}

/*数据源图片地址格式化*/
function dataSourceImgPathFormatter(value, defaultValue) {
  if (defaultValue) {
    return value ? IMG_PATH + value : '/static/images/' + defaultValue;
  }
  return value ? IMG_PATH + value : '/static/images/phone.png';
}


function validateForm4NotNullAndShowTips($el, opt) {
  var defaultParam = {
    validateClass: '.validate',
    tipMsg: 'msg',
    tips: true,
  };
  var o = opt || {}
  var p = $.extend({}, defaultParam, o);
  var result = [];
  $el.each(function (i, ele) {
    $(ele).find(p.validateClass).each(function (i, e) {
      if (!$(e).val() || !$.trim($(e).val())) {
        result.push($(e));
      }
    });
  });
  if (result.length) {
    $.each(result, function (e, ele) {
      if (p.tips) {
        layer.tips(ele.attr(p.tipMsg), ele[0], {tips: [2, '#F1912E'], tipsMore: true});
      } else {
        layer.msg(ele.attr(p.tipMsg));
        return false;
      }
    });
    return false;
  }
  return true;
}

function clearForm($el, val) {
  var t = $el;
  t.find('input[type=reset]').trigger('click');
  if (val) {
    if (val instanceof String) {
      t.find("[" + val + "]").removeAttr(val);
    }
    if (val instanceof Array) {
      val.forEach(function (ele, i) {
        t.find("[" + ele + "]").removeAttr(ele);
      });
    }
  }
  return t;
};


function validatePhoneNum(phone) {
  return REG_PHONE__.test(phone);
}

function validateEmail(email) {
  return REG_EMAIL__.test(email);
}

function addCss2Head(cssLocation, cssId) {
  var element = document.createElement('link');
  element.setAttribute('href', cssLocation);
  element.setAttribute('rel', 'stylesheet');
  element.setAttribute('id', cssId);
  document.getElementsByTagName('head')[0].appendChild(element);
}

function addJs2Head(jsLocation, jsId) {
  var js = document.createElement('script');
  js.setAttribute('type', 'text/javascript');
  js.setAttribute('src', jsLocation);
  js.setAttribute('id', jsId);
  document.getElementsByTagName('head')[0].appendChild(js);
}

/*日期格式化*/
Date.prototype.format = function (format) {
  /*
  * format="yyyy-MM-dd hh:mm:ss";
  */
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S": this.getMilliseconds()
  }

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4
      - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? o[k]
        : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}

/**
 * 将long类型数据转换成对应pattern格式日期字符串
 * @param value 待转换long数据
 * @param pattern 格式字符串
 * @returns {string}
 */
function formatDate(value, pattern) {
  if (!value) {
    return "";
  }
  if (!pattern) {
    pattern = "yyyy-MM-dd";
  }
  return new Date(value).format(pattern);
}

/**
 * 显示加载中
 * @param msg 需要显示的信息
 * @return {int} 返回这个层的索引
 */
function showLoading(msg) {
  return layer.msg(msg || '数据加载中', {
    time: 0,
    icon: 16,
    shade: 0.2
  });
}

/**
 * 关闭需要显示的遮罩层
 * @param index 关闭的遮罩层的索引
 */
function hideLoading(index) {
  if (undefined != index || null != index) {
    layer.close(index);
  } else {
    layer.closeAll();
  }
}

var DATA_MAP = null;


/**
 * 根式化数据源英文名
 * @param name
 * @returns {*}
 */
function loadFormatData() {
  if (DATA_MAP == null) {
    getSyn(DATA_SOURCE_API.dataSourceMap).then(function (r) {
      console.log(r);
      if (r.success) {
        DATA_MAP = r.data;
      }
    }, function (r) {

    })
  }
}

/**
 * 下载html文件
 * @param token token
 * @param $event 原生event对象
 */
function downloadJson2TableHtml(token, targetId) {
  layer.tips('数据下载中,请等待', '#' + targetId, {tips: [1, '#F1912E'], time: 3000});
  document.location.href = DATA_SOURCE_API.json2Table + token + '/download';
}


