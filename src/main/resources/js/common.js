function _initializtionPage(){
	document.write("<div id='loading' class='loading' style='position:absolute;LEFT:42%; top:340px; display:none;z-index:1000'></div>");
}

function closePromptArea(){
	var promptdiv = document.getElementById("loading");
	if(promptdiv){
		promptdiv.style.display="none";
	}
}

function createPromptArea(infoStr){
	var promptdiv = document.getElementById("loading");
		
	if(promptdiv){
		promptdiv.style.display="block";
		promptdiv.innerHTML=infoStr;
	    var iwidth = promptdiv.offsetWidth;  
	    var iheight = promptdiv.offsetHeight;
	}
}
	
_initializtionPage();
closePromptArea();

//外网单向认证企业网银域名地址
var SIGLE_ADDRESS = "https://ebank.spdb.com.cn/ent/";
//外网双向认证企业网银域名地址
var DOUBLE_ADDRESS = "https://ebanks.spdb.com.cn/ent/";

//内网单向认证企业网银域名地址
var INNER_SIGLE_ADDRESS = "https://10.1.1.212/ent/";//"https://ebank.spdb.com.cn/ent/";
//内网双向认证企业网银域名地址
var INNER_DOUBLE_ADDRESS = "https://10.1.1.213/ent/";//"https://ebanks.spdb.com.cn/ent/";

//新版公司网银企业网银域名地址
var SIGLE_ADDRESS_NEW = "https://ebank.spdb.com.cn/newent/";

//外网usbkey提示页面
var PROMOTE_PAGE = "promoteinfo.html";

//内网usbkey提示页面
var INNER_PROMOTE_PAGE = "in_promoteinfo.html";

//老版公司网银登录入口定义
/*
	var PROFESSIONAL_LOGIN = "/login.jsp";//公司网银登录入口
	var SIMPLIFY_LOGIN = "/query_login.jsp";//信息直通车登录入口
	var PAY_LOGIN = "/pay_login.jsp";//支付登录入口
*/
//新版公司网银登录入口定义
var NEW_PROFESSIONAL_LOGIN = "/login/prof.jsp";//公司网银登录入口
var NEW_SIMPLIFY_LOGIN = "/login/query.jsp";//信息直通车登录入口

//新版公司网银（网银编号）
var NEW_PROFESSIONAL_LOGIN_NEW = "/login/new_prof.jsp";//公司网银登录入口
var NEW_SIMPLIFY_LOGIN_NEW = "/login/new_query.jsp";//信息直通车登录入口

//金融机构网银登录入口定义
var FIN_PROFESSIONAL_LOGIN="/login/fin_prof.jsp";//金融机构专业版登录入口
var FIN_SIMPLIFY_LOGIN="/login/fin_query.jsp";//同业直通车登录入口

//新版金融机构网银登录入口定义
var NEW_FIN_PROFESSIONAL_LOGIN="/login/new_fin_prof.jsp";//金融机构专业版登录入口
var NEW_FIN_SIMPLIFY_LOGIN="/login/new_fin_query.jsp";//同业直通车登录入口

//离岸网银登录入口定义
var OSA_PROFESSIONAL_LOGIN = "/login/osa_prof.jsp";//离岸专业版登录入口
var OSA_SIMPLIFY_LOGIN = "/login/osa_query.jsp";//离岸简化版登录入口

//新版离岸网银登录入口定义
var NEW_OSA_PROFESSIONAL_LOGIN = "/login/new_osa_prof.jsp";//离岸专业版登录入口
var NEW_OSA_SIMPLIFY_LOGIN = "/login/new_osa_query.jsp";//离岸简化版登录入口