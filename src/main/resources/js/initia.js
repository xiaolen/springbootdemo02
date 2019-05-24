
// var pgeList = window.passGuards?window.passGuards:{};

//登陆页面密码控件
function writepasswordLoginObject(oid, publickeyblob, params, ts) {
    if(NewSecurityCtrl()){	//新安全控件
        pgeditor = new pge(setParamsPwd(oid,publickeyblob,"",params,ts));
        window.pgeCtrl = pgeditor;
        // pgeList[oid] = pgeditor;
        // window.passGuards = pgeList;
        (function(){
            pgInitialize();
        });
        generate();
    }else{
        if (!oid || typeof(oid) != "string") {
            alert("writePassObj Failed: oid are required!");
        } else {
            setPEXSetupUrl(oid);
            if(isInistall)
            {
                params.borderColor = "#FFFFFF";
                if (isBrowserSecurity())
                    writeObject(oid, PassCtrlClsid, setParams(params));
                else
                    writePluginObject(oid, MIME, setParams(params));

                return ts + publickeyblob;
                // document.getElementById(oid).setTimestamp(ts);
                // document.getElementById(oid).publicKeyBlob(publickeyblob);
            }
        }
    }
};

pge = function (options) {
    this.settings = extend(true, {}, pge.defaults, options);
    this.init();
};
function F() {}
function extend(overrides) {
    // Spawn
    F.prototype = this;
    var subtype = new F();

    // Augment
    if (overrides) {
        subtype.mixIn(overrides);
    }

    // Create default initializer
    if (!subtype.hasOwnProperty('init')) {
        subtype.init = function () {
            subtype.$super.init.apply(this, arguments);
        };
    }

    // Initializer's prototype is the subtype object
    subtype.init.prototype = subtype;

    // Reference supertype
    subtype.$super = this;

    return subtype;
}


function writePluginObject(oid, clsid, cfg) {
    var aa = '<object id="' + oid + '" type="' + clsid
        + '" width="' + cfg.width + '" height="' + cfg.height
        + '" style="width:' + cfg.width + 'px;height:' + cfg.height + 'px">';
    for (var name in cfg)
        var bb ='<param name="' + name + '" value="' + cfg[name] + '">';
    var cc ='</object>';

    // return aa +"---------"+ bb +"---------"+ cc;
};

//初始化密码框属性
function pgInitialize(){
    // if(isInstalled){
    //     if(this.osBrowser==1 || this.osBrowser==3){
    //         jQuery('#'+this.settings.pgeId).show();
    //     }
    //
    // }else{
    //     jQuery('#'+this.settings.pgeId+'_pge').hide();
    //     if(this.osBrowser==1 || this.osBrowser==3){
    //         jQuery('#'+this.settings.pgeId+'_down').show();
    //     }
    // }
}

//设置新安全输入控件默认属性
function setParamsPwd(oid,publickeyblob,encryptionPKBlob,params,ts) {

    if(!isEmptyString(params.width)&&(isEmptyString(params.objClass)||params.objClass=="null")){
        params.objClass = "input-passwd-w"+params.width+"-h"+params.height;
    }
    var inputReg2 = params.accepts;
    if("[:digit:]+" == inputReg2){
        inputReg2 = "[[:digit:]]+";
    }

    var defaults = {
        pgePath : "https://download.spdb.com.cn/ocx/",//控件下载目录，可以指定绝对路径，如"http://www.baidu.com/download/"
        pgeId : oid,                                  //控件id
        pgeEdittype : 0,							  //控件显示类型,0(星号),1(明文)
        pgeEreg1 : "",                       //输入过程中字符类型限制，如"[0-9]*"表示只能输入数字[\\s\\S]*
        pgeEreg2 :isEmptyString(params.accepts)?"[[:graph:]]{6,50}":inputReg2,       //输入完毕后字符类型判断条件，与pgeditor.pwdValid()方法对应
        pgeMaxlength : isEmptyString(params.maxLength)?50:Number(params.maxLength),//允许最大输入长度
        pgeMinlength : isEmptyString(params.minLength)?6:Number(params.minLength),//允许最小输入长度
        //pgeTabindex : 0,                              //tab键顺序
        pgeClass : params.objClass,                   //控件css样式
        pgeInstallClass : "oxcShow4",                //针对安装或升级的css样式
        pgeFieldName: isEmptyString(params.fieldName)?"Password":params.fieldName,        //页面隐藏域id和name
        pgeKeyType: params.keyType,
        pgeOnkeydown : "doSubmit()",                  //回车键响应函数，需焦点在控件中才能响应
        tabCallback : "input2",                       //火狐tab键回调函数,设置要跳转到的对象ID
        pgeOnfocus: "",                               //监控光标切入密码控件框
        pgeOnblur: "",                                //监控光标切出密码控件框
        pgeCert1: encryptionPKBlob,                   //测试核心公钥
        pgeCert2: publickeyblob,                      //网银公钥
        setTimes: ts,                                 //时间戳
        setDictionaryFilter:"",                 //设置简单密码库，例如（"11111,123456,54321）
        pgeWindowID:"password"+new Date().getTime()+1,
        pgeRZRandNum: params.sKey,
        pgeRZDataB: params.enStr,
        pgePlaceholder: params.placeholder
    };
    return defaults;
}

// 确定字符串是否为空
function isEmptyString(str){
    if (str==null || str=="")	{
        return true;
    }
    return false;
}
//判断是否使用新控件
function NewSecurityCtrl() {

    // return false;
    return true;
}

//用document.write()绘制控件标签代码
function generate() {
    if (this.osBrowser==10 || this.osBrowser==11) {
        return document.write(this.getpgeHtml());
    }
    if (!isInstalled) {
        return document.write(this.getDownHtml());
    }else{
        if(this.osBrowser==1){
            if(this.getConvertVersion(this.pgeVersion)<this.getConvertVersion(PGEdit_IE32_VERSION) && PGEdit_Update==1){
                this.setDownText();
                return document.write(this.getDownHtml());
            }
        } else if(this.osBrowser==3){
            if(this.getConvertVersion(this.pgeVersion)<this.getConvertVersion(PGEditt_IE64_VERSION) && PGEdit_Update==1){
                this.setDownText();
                return document.write(this.getDownHtml());
            }
        } else if(this.osBrowser==2){
            if(this.getConvertVersion(this.pgeVersion)<this.getConvertVersion(PGEdit_FF_VERSION) && PGEdit_Update==1){
                this.setDownText();
                return document.write(this.getDownHtml());
            }
        } else if (this.osBrowser==6 || this.osBrowser==8) {
            if(this.getConvertVersion(this.pgeVersion)<this.getConvertVersion(PGEdit_MacOs_VERSION)&& PGEdit_Update==1){
                this.setDownText();
                return document.write(this.getDownHtml());
            }
        }
        return document.write(this.getpgeHtml());
    }
}
function setPEXSetupUrl(oid)
{
    var DownloadPath = getDownLoadPath();
    var ObjVersion = getObjVersion();

    if(isRegisterediSecurity()==false){
        if((navigator.platform == "Win32") ||
            (navigator.platform == "Windows") ||
            (navigator.platform == "Win64") ||
            (navigator.platform == "Mac68K") ||
            (navigator.platform == "MacPPC") ||
            (navigator.platform == "Macintosh") ||
            (navigator.platform == "MacIntel")){
            document.write('<div class="oxcShow4"><a href="'+DownloadPath+'" target="_blank" style="text-decoration:underline;" class="ft-activex">网银安全控件下载</a></div>');
        }else{
            document.write('<div class="oxcShow4"><a href="#"  target="_blank" style="text-decoration:underline;" class="ft-activex">暂不支持此系统</a></div>');
        }
        isInistall = false;
    }else{
        var LocalObjVersion = getLocalObjVersion();
        if(LocalObjVersion < ObjVersion){
            document.write('<div class="oxcShow4"><a href="'+DownloadPath+'"  target="_blank" style="text-decoration:underline;" class="ft-activex">网银安全控件下载</a></div>');
            isInistall = false;
        }else{
            isInistall = true;
        }
    }
}
function getLocalObjVersion()
{
    if(LocalObjVersion == "")
    {
        LocalObjVersion = document.getElementById("versionObj").getVersion();
    }
    return LocalObjVersion;
}

function getObjVersion()
{
    if((navigator.platform == "Win64" || navigator.cpuClass == "x64")){
        if (isBrowserSecurity())
            return WIN_64_ACTIVEX_VERSION;         // Windows系统下64位控件版本
        else
            return WIN_PLUGIN_VERSION;             // Windows系统下插件版本
    }else if((navigator.platform == "Win32") || (navigator.platform == "Windows")){
        if (isBrowserSecurity())
            return WIN_32_ACTIVEX_VERSION;         // Windows系统下32位控件版本
        else
            return WIN_PLUGIN_VERSION;             // Windows系统下插件版本
    }else if((navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel")){
        return MAC_PLUGIN_VERSION;		  		  			// Mac系统下插件版本
    }
    return "";
}
//判断是否为IE浏览器
function isBrowserSecurity() {
    // if(_app == 'Microsoft Internet Explorer' || navigator.userAgent.indexOf("Trident")>0){
    // return true;
    // }
    return false;
}
function getDownLoadPath()
{
    if((navigator.platform == "Win64") || (navigator.cpuClass == "x64") || (navigator.platform == "Win32") || (navigator.platform == "Windows")) {
        if (((navigator.platform == "Win32") || (navigator.platform == "Windows")) && (_app == 'Microsoft Internet Explorer'))
            return WIN_SETUP_PATH;
        else
            return WIN_SETUP_PATHALL;				//Windows OS
    } else if((navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel")) {
        return MAC_SETUP_PATH;		    	//MAC OS
    }
    return WIN_SETUP_PATH;
}