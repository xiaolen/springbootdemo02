/**
 * 长连接获取结果
 * @param tokenParam
 */
function longResult(tokenParam, that) {
  layer.load(3);
  var params = {
    apiUser: that.auth.orgId,
    apiEnc: that.auth.sign,
    token: tokenParam.token
  }

  function poll() {
    $.get(API_SHOW.userData, params, function (r) {
      console.log(r);
      var code = r.code;
      switch (code) {
        case CODE_TYPE.SUCCESS.code:
          layer.closeAll()
          layer.alert("任务完成");
          that.formType = "task";
          return;
        case CODE_TYPE.TASK_ERROR.code:
        case CODE_TYPE.ERROR.code:
          layer.closeAll()
          sys_error(r.msg);
          that.formType = "task";
          return
      }
      setTimeout(function () {
        poll();
      }, 1000);
    });
  }

  poll();
}

/**
 * 短连接任务消息
 * @param tokenParam
 * @param that
 */
function shortTaskMessage(tokenParam, that) {
  layer.load(1);
  var times = 0;
  if (times >= 60) {
    layer.closeAll()
    sys_error("任务超时，请重试");
    that.$emit("update:formType", "task");
    return;
  }
  var params = {
    apiUser: that.auth.orgId,
    apiEnc: that.auth.sign,
    token: tokenParam.token
  }

  function poll() {
    $.get(API_SHOW.shortTaskMessage, params, function (r) {
      log(r);
      var code = r.code;
      switch (code) {
        case CODE_TYPE.TASK_ERROR.code:
        case CODE_TYPE.ERROR.code:
          layer.closeAll()
          sys_error(r.msg);
          that.formType = "task";
          return
        case CODE_TYPE.CODE_NEED.code:
          layer.closeAll();
          that.formType = "message";
          that.token = r.detail;
          return;
        case  CODE_TYPE.QES_CODE_NEED.code:
          layer.closeAll();
          that.formType = "question";
          that.question = JSON.parse(r.msg);
          that.token = r.detail;
          return;
        case  CODE_TYPE.QR_CODE_NEED.code:
          layer.closeAll();
          that.formType = "qrcode";
          that.qrImg = r.msg;
          that.token = r.detail;
          return;
        case CODE_TYPE.SHORT_TASK_LOAD.code:
        case CODE_TYPE.REQUEST_INVALID.code:
        case CODE_TYPE.CONTROL_MESSAGE.code:
        case CODE_TYPE.CONTROL_PROMPT.code:
        case CODE_TYPE.AUTH_SUCCESS.code:
          setTimeout(poll, 1000);
          return;
        case  CODE_TYPE.SHORT_TASK_SUCCESS.code:
          layer.closeAll()
          sys_alert("任务完成");
          that.formType = "task";
          return;
        default:
          layer.msg(r.msg, {time: 1000});
          setTimeout(poll, 1000);
      }
    });
    times++;
  }

  poll();
}
