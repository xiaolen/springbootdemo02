/*跨域站点信息*/
var SERVER_IP = "http://192.168.1.90:8081";
var H5_ORIGIN = "https://192.168.1.90:8081/h5/";
var commonParams = {
  saveFileApi: SERVER_IP + ":8888/fileManger/jsonp",
  fileServer: "https://image.xinyan.com/ftpfile/qzftp/",
  prefixUrl: SERVER_IP + '/api'
};
// 数据源相关接口
var DATA_SOURCE_API = {
  /*获取数据源类型集合*/
  type: commonParams.prefixUrl + '/front/dataSource/type',
  /*获取申请数据源详情*/
  info: commonParams.prefixUrl + '/front/dataSource/info',
  /* 获取数据源映射*/
  dataSourceMap: commonParams.prefixUrl + '/front/dataSource/map',
  /*查询所有注册信息集合*/
  register: commonParams.prefixUrl + '/front/dataSource/register',
  /*分页查询用户注册记录*/
  reg_pageQuery: commonParams.prefixUrl + '/front/dataSource/register/query-with-condition',
  /*导出用户全部注册记录*/
  reg_exportExcel: commonParams.prefixUrl + '/front/dataSource/register/export-excel',
  addWebsiteViewNum: commonParams.prefixUrl + '/front/websiteView/add',
  browseCount: commonParams.prefixUrl + '/front/website/view/aggregation',
  batchDeleteCurrentUserRegisterDataSource: commonParams.prefixUrl + '/front/dataSource/register/batch-delete-current-user-register-data-source',
  batchRegisterCurrentUserDataSource: commonParams.prefixUrl + '/front/dataSource/register/batch-register-current-user-data-source',
  json2Table: commonParams.prefixUrl + '/front/json2table/',
  dataReport: commonParams.prefixUrl + '/front/dataSource/data-report/'
};
/*用户相关接口*/
var USER_API = {
  user_login: commonParams.prefixUrl + '/front/login',
  user_logout: commonParams.prefixUrl + '/front/logout',
  user_isLogin: commonParams.prefixUrl + '/front/user/isLogin',
  user_auth: commonParams.prefixUrl + '/front/user/auth',
  user_task_history: commonParams.prefixUrl + '/front/taskHistory/detail',
  orgReport: commonParams.prefixUrl + '/front/taskHistory/orgReport',
  user_task_history_exportExcel: commonParams.prefixUrl + '/front/taskHistory/export-excel',
  /*url path 请求{token}*/
  user_task_data: commonParams.prefixUrl + '/front/taskHistory/data/',
  statisticsCurrentUserCostMoney: commonParams.prefixUrl + '/fron/statistics/statistics-current-user-cost-money',
  validateUserIdExists: commonParams.prefixUrl + '/front/user/validate-user-id-exists',
  validatePhoneExists: commonParams.prefixUrl + '/front/user/validate-phone-exists',
  validateEmailExists: commonParams.prefixUrl + '/front/user/validate-email-exists',
  sendRegisterValidateCode: commonParams.prefixUrl + '/front/user/send-register-validate-code',
  registerUser: commonParams.prefixUrl + '/front/user/register-user',
  sendUpdatePwdValidateCode: commonParams.prefixUrl + '/front/user/send-update-pwd-validate-code',
  validateUserUpdatePwdValidateCode: commonParams.prefixUrl + '/front/user/validate-user-update-pwd-code',
  updateCurrentUserPassword: commonParams.prefixUrl + '/front/user/update-current-user-password',
  updateCurrentUserConfiguration: commonParams.prefixUrl + '/front/user/update-current-user-configuration',
  selectCurrentUserChildAccounts: commonParams.prefixUrl + '/front/user/select-current-user-child-accounts',
  checkCurrentUserHasChildAccount: commonParams.prefixUrl + '/front/user/check-current-user-has-child-account',
  selectUserSetting: commonParams.prefixUrl + '/front/user/setting/select',
  selectCurrentUserSetting: commonParams.prefixUrl + '/front/user/setting/select-current-user-setting',
  saveOrUpdateUserSetting: commonParams.prefixUrl + '/front/user/setting/save-or-update',
  h5TestParams: commonParams.prefixUrl + '/front/user/h5TestParams'
}
/*目录相关接口*/
var Category_API = {
  category: commonParams.prefixUrl + '/front/category',
  categoryMap: commonParams.prefixUrl + '/front/category/map',
  detail: commonParams.prefixUrl + '/front/category/detail',
}
/*分页常量*/
var PAGE_SIZE = 10;
var PAGE_NUM = 1;
var TASK_TYPE = "long";
/*api演示相关接口*/
var API_SHOW = {
  siteType: commonParams.prefixUrl + '/source/type',
  site: commonParams.prefixUrl + '/source/name',
  loginInfo: commonParams.prefixUrl + '/source/detail',
  longTask: commonParams.prefixUrl + '/task/long',
  shortTask: commonParams.prefixUrl + '/task/short',
  shortTaskMessage: commonParams.prefixUrl + '/task/short/message',
  checkValidateCode: commonParams.prefixUrl + '/user/message',
  questionMessage: commonParams.prefixUrl + '/user/questionMessage',
  refreshValidateCode: commonParams.prefixUrl + '/user/refreshMessage',
  refreshQRCodeMessage: commonParams.prefixUrl + '/user/refreshQRCodeMessage',
  userData: commonParams.prefixUrl + '/user/data',
  provinces: commonParams.prefixUrl + '/source/provinces',
  cities: commonParams.prefixUrl + '/source/cities',
  detail: commonParams.prefixUrl + '/source/details',

  optimizedTask: commonParams.prefixUrl + '/optimized/task',
  optimizedDetail: commonParams.prefixUrl + '/optimized/detail'
};
// api ui内嵌接口
var API_UI_SHOW = {
  auth: commonParams.prefixUrl + '/v2/auth',
  callback: commonParams.prefixUrl + '/v2/callback',
}
// 数据字典
var DATA_DICT = {
  /** 获取数据字典的信息 */
  get_dict_by_type: commonParams.prefixUrl + '/front/dictionary/get-dictionary'
}

//用户系统账号
var SYS_USER_ACCOUNT = {
  queryAllEnableSysAccount: commonParams.prefixUrl + '/front/query-all-enable-sys-account',
  /** 获取用户曾经使用过的加款账号 */
  exist_pay_account: commonParams.prefixUrl + '/front/query-user-exist-pay-account'
}

// 用户加款
var SYS_USER_PLUS_APPLY = {
  /** 人工加款申请 */
  plus_apply: commonParams.prefixUrl + '/front/user-plus-fund/apply'
}

// 热门数据
var HOT_DATA = commonParams.prefixUrl + '/front/host/select-hot-data';

// 用户中心，已申请的数据
var USER_CENTER_APPLY_DATA_STATISTICS = commonParams.prefixUrl + '/fron/statistics/apply-data-statistics';
// 卖家数据源
var SUPPLIER_DATA_API = {
  dataSources: commonParams.prefixUrl + "/front/org/dataSources",
  setting: commonParams.prefixUrl + "/front/org/dataSources/setting",
  queryData: commonParams.prefixUrl + "/front/org/dataSources/queryData",
  destroy: commonParams.prefixUrl + "/front/org/dataSources/destroyById",
  excelData: commonParams.prefixUrl + "/front/org/dataSources/excelData",
  detail: commonParams.prefixUrl + "/front/org/dataSources/detail",
};
var SUPPLIER_API = {
  supplier: commonParams.prefixUrl + "/front/supplier",
}
// 发票
var INVOICE = {
  selectUserInvoiceAddress: commonParams.prefixUrl + "/front/invoice-address/select-user-invoice-address",
  addNewInvoiceAddress: commonParams.prefixUrl + "/front/invoice-address/add",
  deleteInvoiceAddress: commonParams.prefixUrl + "/front/invoice-address/delete",
  selectCurrentLoginUserAddressById: commonParams.prefixUrl + "/front/invoice-address/select-current-login-user-address-by-id",
  updateInvoiceAddress: commonParams.prefixUrl + '/front/invoice-address/update',
  selectBefore3MonthFundRecord: commonParams.prefixUrl + '/front/fund-record/select-before-3month-fund-record',
  getCurrentUserInUseInvoiceTitle: commonParams.prefixUrl + '/front/invoice-title/get-current-user-in-use-invoice-title',
  addNewInvoiceApply: commonParams.prefixUrl + '/front/invoice-apply/add',
  findUserInvoiceApplyList: commonParams.prefixUrl + '/front/invoice-apply/find-user-invoice-apply-page',
  viewApplyDetail: commonParams.prefixUrl + "/front/invoice-apply/view-apply-detail"
};

// apiShow code类型
var CODE_TYPE = {
  PARAM_ERROR: {code: "19990", desc: "参数验证错误"},

  SIGN_ERROR: {code: "19991", desc: "验签(sign)错误"},
  NOT_ONLINE_ERROR: {code: "19992", desc: "数据源未上线"},
  NOT_APPLY_ERROR: {code: "19993", desc: "数据源未申请"},
  FUND_SHORT_ERROR: {code: "19994", desc: "账户资金不足"},

  SUCCESS: {code: "20000", desc: "流程操作成功"},
  CODE_NEED: {code: "20001", desc: "需要用户消息"},
  QES_CODE_NEED: {code: "20002", desc: "需要回答问题"},
  QR_CODE_NEED: {code: "20003", desc: "需要扫描二维码"},
  QR_CODE_WAIT_CONFIRM: {code: "20004", desc: "二维码已扫描等待确认"},
  QR_CODE_NEED_AGAIN: {code: "20005", desc: "需要再次扫描二维码"},
  QR_CODE_NEED_AGAIN_CONFIRM: {code: "20006", desc: "再次扫描二维码已确认"},

  SHORT_TASK_LOAD: {code: "29993", desc: "短连接任务录入成功"},
  REQUEST_INVALID: {code: "29994", desc: "暂无消息"},
  SHORT_TASK_INPUT: {code: "29995", desc: "短连接任务创建成功，请耐心等待"},
  AUTH_SUCCESS: {code: "29996", desc: "授权成功，开始采集"},
  CONTROL_MESSAGE: {code: "29997", desc: "流程消息"},
  SHORT_TASK_SUCCESS: {code: "29998", desc: "短连接任务完成"},
  CONTROL_PROMPT: {code: "29999", desc: "流程提示消息"},

  TASK_ERROR: {code: "49999", desc: "任务失败"},

  ERROR: {code: "50000", desc: "服务器异常"},
  PARSE_ERROR: {code: "50001", desc: "json解析异常"},
  WARN_ERROR: {code: "50002", desc: "警告异常，未知反馈"},
}
// 资金变动
var FUND_RECORD = {
  selectCurrentUserFundRecord: commonParams.prefixUrl + '/front/fund-record/select-current-user-fund-record',
  findParentAndChildMonthBillDetail: commonParams.prefixUrl + '/front/statistics-month-bill/find-parent-and-child-month-bill-detail'
};

var SYSTEM_INFO = {
  config: commonParams.prefixUrl + "/front/system/settings"
}

/*个人已申请数据源查询接口*/
var WEBSITE_API = {
  types: commonParams.prefixUrl + "/source/type",
  names: commonParams.prefixUrl + "/source/name",
  zones: commonParams.prefixUrl + "/source/zones",
  detail: commonParams.prefixUrl + "/source/detail",
  applyTypes: commonParams.prefixUrl + "/apply/source/types",
  applyNames: commonParams.prefixUrl + "/apply/source/names",
  applyZones: commonParams.prefixUrl + "/apply/source/zones",
  applyDetail: commonParams.prefixUrl + "/apply/source/detail"
}
