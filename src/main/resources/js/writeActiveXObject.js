var WIN_32_ACTIVEX_VERSION = 2004040000;                	// Windows系统下32位控件版本号，例如2.4.1.3版本号则为2004001003
var WIN_64_ACTIVEX_VERSION = 2004040000;                	// Windows系统下64位控件版本号，例如2.4.1.3版本号则为2004001003
var WIN_PLUGIN_VERSION = 2004040000;                    	// Windows系统下插件版本号，例如2.4.1.3版本号则为2004001003
var MAC_PLUGIN_VERSION = 2004036000;                    	// Windows系统下插件版本号，例如2.4.1.3版本号则为2004001003
var downloadExe = "https://download.spdb.com.cn/ocx/";
var downloadOcx = "https://download.spdb.com.cn/ocx/";
var WIN_SETUP_PATH = downloadExe + "spdbsign_v5_x86.zip";       	// Windows系统下安装程序下载路径 32位系统
var WIN_SETUP_PATHALL = downloadExe + "spdbsign_v5.zip";          	// Windows系统下安装程序下载路径 合集
var MAC_SETUP_PATH = downloadExe + "iSecuritySPDBANK.pkg";				    // Mac OS系统下安装程序下载路径
var WIN_32_OCX_PATH = downloadOcx + "spdbsafe_v5.ocx#version=2,4,40,0";          //32位密码控件
var WIN_64_OCX_PATH = downloadOcx + "spdbsafe_x64_v5.ocx#version=2,4,40,0";      //64位密码控件
var WIN_32_SIGN_DLL_PATH = downloadOcx + "spdbsign_v5.dll#version=1,0,0,11";     //32位签名控件
var WIN_64_SIGN_DLL_PATH = downloadOcx + "spdbsign_x64_v5.dll#version=1,0,0,11"; //64位签名控件
var seNetMsg = "https://download.spdb.com.cn/ikeeper/iKeeperSPDBSetup.zip";        //安全网银管家的下载地址

var codeBaseFile = "";
var LocalObjVersion = "";
var isInistall = false;
// var _app = navigator.appName;
var pgeditor;
// var pgeList = window.passGuards?window.passGuards:{};

//安全输入控件
var PassCtrlClsid = "clsid:B2B30029-3454-44DD-ADC7-5A24E235009E";
var EditCtrlClsid = "clsid:65B8907F-539F-438D-BF63-C0C311D077F5";
var UtilCtrlClsid = "clsid:D96169A6-97D4-420E-9E38-917D2D6526E7";
var CtlName = "POWERENTERSPDBANK.PowerUtilityXSPDBANKCtrl.1";

//数字签名控件
var SignCtrlClsid = "clsid:4F45C67C-69C6-452C-BA00-0DC1AA70A207";

//安全输入插件
var MIME = "application/x-vnd-sa-isecurity-spdbank";
var PluginDescription = "SA-iSecurity Plug-in for SPDBANK";

//v7安全控件
var PluginV7 = 'SPDBPassGuardX';

//数字签名插件
var Sign_MIME = "application/x-vnd-csii-powersign-spdb";


//安全输入控件默认属性
function setParams(args) {
    var defaults = {
        "width": 1,
        "height": 1,
        "maxLength": 50,
        "minLength": 6,
        "maskChar": "*",
        "backColor": "#FFFFFF",
        "textColor": "#000000",
        "borderColor": "#7F9DB9",
        "accepts": "[:graph:]+",
        "caption": "浦发银行",
        "captionColor": "#87011f",
        "captionFont": "",
        "captionSize": 0,
        "captionBold": "true",
        "lang": "zh_CN",
        "softKeyboard": "false",
        "softkbdRandom": "true",
        "adjustTime": "false"
    };
    for (var p in args)
        if (args[p] != null) defaults[p] = args[p];
    return defaults;
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

//签名控件
function writeSignObject(oid, signFlag, hashAlgorithm, sKey, enStr) {
    if (NewSecurityCtrl()) {
        //init signmessenger
        var iesign = new SignMessenger(oid, signFlag, hashAlgorithm, sKey, enStr);
        //refresh the plugin array(in W3C Browser)
        // if (navigator.userAgent.indexOf("MSIE") < 0) {
        //     navigator.plugins.refresh();
        // }
        // window.iesign = iesign;
        // document.write(iesign.createTag());
        // return iesign.createTag();
        return JSON.stringify(iesign);
        if (!isBrowserSecurity()) {
            // window.onload = function () {
            //     //判断是否需要使用非插件签名控件，10表示是要用非插件的浏览器
            //     if (checkOsBrowser() == 10) {
                    iesign.env.edge = true;
                // }
            // }
        }
    } else {
        if (!oid || typeof (oid) != "string") {
            alert("writeSignObj Failed: oid are required!");
        } else {
            if (isBrowserSecurity()) {

                if ((navigator.platform == "Win64" || navigator.cpuClass == "x64"))
                    codeBaseFile = WIN_64_SIGN_DLL_PATH;
                else
                    codeBaseFile = WIN_32_SIGN_DLL_PATH;
                writeObject(oid, SignCtrlClsid, {"width": 1, "height": 1, "display": "none"});

            } else {
                writePluginObject(oid, Sign_MIME, {"width": 1, "height": 1, "display": "none"});
            }
        }
    }
};


//判断是否使用新控件
function NewSecurityCtrl() {
    // if (checkOsBrowser() == 10	//chrome42以上
    //     || (navigator.userAgent.indexOf("Chrome") > 0 && !!navigator.plugins[PluginV7])	//chrome42以下安装新控件
    //     || (navigator.userAgent.indexOf("Firefox") > 0 && !!navigator.plugins[PluginV7])	//firefox51以下安装新控件
    //     || (isBrowserSecurity() && window.pgeCtrl && window.pgeCtrl.checkInstall())  //IE 安装新控件
    //     || (isMacSafari() && window.pgeCtrl && window.pgeCtrl.checkInstall()))  //mac端Safari浏览器，且已安装新版安全控件
    //     return true;
    // else
        return false;
    // return true;
}

//判断是否为IE浏览器
function isBrowserSecurity() {
    // if(_app == 'Microsoft Internet Explorer' || navigator.userAgent.indexOf("Trident")>0){
    // return true;
    // }
    return false;
}

function writeObject(oid, clsid, cfg) {
    document.write('<object id="' + oid + '" codebase="' + codeBaseFile + '" classid="' + clsid
        + '" width="' + cfg.width + '" height="' + cfg.height + '"  class="' + cfg.objClass + '" >');
    for (var name in cfg)
        document.write('<param name="' + name + '" value="' + cfg[name] + '">');
    document.write('</object>');
};

function writePluginObject(oid, clsid, cfg) {
    var aa = '<object id="' + oid + '" type="' + clsid
        + '" width="' + cfg.width + '" height="' + cfg.height
        + '" style="width:' + cfg.width + 'px;height:' + cfg.height + 'px">';
    for (var name in cfg)
        var bb ='<param name="' + name + '" value="' + cfg[name] + '">';
    var cc ='</object>';

    // return aa +"---------"+ bb +"---------"+ cc;
};


//========================


var cert1;

/**
 * SignMessenger.js
 * @param the tag id
 * @return control obj
 */
function SignMessenger(id, signFlag, hashAlgorithm, sKey, enStr) {
    this.CN = ""; //选择签名的证书信息，可包含多种","分割
    this.HashAlgorithm = hashAlgorithm;	//hash算法 hashType 0 - SHA1;6 - SHA256;5 - SM3;
    this.SignData = "";//待签名数据
    this.SignFlag = signFlag;
    this.pgeRZRandNum = sKey;
    this.pgeRZDataB = enStr;
    var pgeRZRandNum = this.pgeRZRandNum;
    var pgeRZDataB = this.pgeRZDataB;
// the js version
    this.sdkVersion = "1.0.0.1";
    var url = "https://windows10.microdone.cn";
    var port = 5526;
    var urls = url + ":" + port;
    this.hasMacUKey = true;
    var sid = "sign" + new Date().getTime() + 1;
    // var ua = navigator.userAgent.toLowerCase();
// check chrome
    var chr = "chromeh", regStr_chrome = /chrome\/[\d.]+/gi;
    // if (navigator.platform == "Win64" && navigator.userAgent.indexOf("Firefox") > -1) {
    //     chr = "chromeh";
    // }

    //修改了
    var frf = "frfh", regStr_firefox = /firefox\/[\d.]+/gi;
    // if (ua.indexOf("firefox") > 0) {
    //     var firefoxVersion = navigator.userAgent.match(regStr_firefox).toString();
    //     firefoxVersion = parseInt(firefoxVersion.replace(/[^0-9.]/gi, ""));
    //     if (firefoxVersion >= 54) {
    //         frf = "frfh";
    //
    //     } else {
    //         frf = "frfl";
    //
    //     }
    // }
    /*	if(ua.indexOf("chromeframe")>0){
            var regStr_chromeframe=/chromeframe\/[\d.]+/gi;
            var chromeVersionFrame=ua.match(regStr_chromeframe).toString();
            chr="chromel";
        };*/
    // if (ua.indexOf("chrome") > 0 && ua.indexOf("chromeframe") == -1) {
    //     var chromeVersion = ua.match(regStr_chrome).toString();
    //     chromeVersion = parseInt(chromeVersion.replace(/[^0-9.]/gi, ""));
    //     if (chromeVersion >= 42) {
    //         chr = "chromeh";
    //     } else {
    //         chr = "chromel";
    //     }
    // }
// check OS & browser
    this.env = {
        isWindows: ("windows"),
        // isWindows: (ua.indexOf("windows") != -1 || ua.indexOf("win32") != -1),
        // isMac: (ua.indexOf("macintosh") != -1 || ua.indexOf("mac os x") != -1),
        // isLinux: (ua.indexOf("linux") != -1),
        // ie: (ua.indexOf('msie') != -1 || ua.indexOf("trident") != -1),
        // firefox: ua.indexOf('firefox') != -1,
        // chrome: ua.indexOf('chrome') != -1,
        // opera: ua.indexOf('opera') != -1,
        // safari: ua.indexOf('version') != -1,
        // edge: ua.indexOf('edge') != -1 || chr.indexOf('chrome') != -1 || ua.indexOf('firefox') != -1
    };
// create control tag
    this.createTag = function () {
        if (this.env.edge) {
            return "";
        } else if (this.env.isWindows && this.env.ie) {
            return "<object id='"
                + id
                + "' classid='CLSID:4F8201E4-08A0-417D-966E-208F86B9123E' width='0' height='0'></object>";
        } else if (this.env.isWindows || this.env.isMac) {
            return "<embed id='"
                + id
                + "' type='application/spdb-sign-messenger' width='0' height='0'>";
        } else {
            return "<object type='application/spdb-sign-messenger' id=''></object>";
        }
    };
    this.high = null, this.admin = null;
// get control object
    this.getObj = function (admin) {
        var obj = document.getElementById(id);
        obj.license = "Tm15SkJtS3piR25ZMXY4c0ZQY0t5Z1RpREhITHhOSG1RUHNqVjZTa2lFUUpVT09aYUlqVlExUWo0MUVNbFFyTWgramhGcVE3dFZ5QVFDaFdBVWcwYWNLTEN0NlJ2WDJQL3JoRVVKMUVXVU5xTnlpQkhQbzRQbll6U2lnNlZ2dWEwaTkweFhOTEZoSzA5SU95Q2FnRGczay9IdWI0RW5PWFlhY0E0Y1RORm1NPXsiaWQiOjEsInR5cGUiOiJ0ZXN0IiwicGxhdGZvcm0iOjgsIm5vdGJlZm9yZSI6IjIwMTcxMDE5Iiwibm90YWZ0ZXIiOiIyMDE4MDExOSJ9";
        if ((admin != undefined) && this.env.ie) {
            if (admin) {
                if (this.admin == null) {
                    this.admin = obj.getAdmin(admin);
                }
                return this.admin;
            } else {
                if (this.high == null) {
                    this.high = obj.getAdmin(admin);
                }
                return this.high;
            }
            return obj.getAdmin(admin);
        }
        return obj;
    };
// DN convert
    this.dnConvert = function (dn) {
        var dn_new = dn.replace(/\s=/g, '=');
        dn_new = dn_new.replace(/=\s/g, '=');
        dn_new = dn_new.replace(/=/g, ':"');
        dn_new = dn_new.replace(/cn:/g, 'CN:');
        dn_new = "{" + dn_new.replace(/,/g, '",') + '"}';
        if (dn_new.toUpperCase().indexOf("SN:") != -1) {
            dn_new = dn_new.toUpperCase();
            dn_new = dn_new.replace(/SN/g, 'SN');
            //dn_new = dn_new.replace(/\s/g, '');
            //dn_new = dn_new.replace(/"(0+)/g, '"');
        }
        return dn_new;
    };
    this.getCertList = function () {
        if (this.env.edge) {
            var SETJSON = {"interfacetype": 0, "data": {}};
            SETJSON.id = sid, SETJSON.data.pcode = 15;
            var datac = getEnStr(pgeRZRandNum, SETJSON);
            var RZCIJSON = {"rankey": pgeRZRandNum, "datab": pgeRZDataB, "datac": datac};
            var x = this.pwdGetData(RZCIJSON);
            return x.certlist;
        } else if (this.env.ie || this.env.firefox || (this.env.chrome)) {   //T-lub1
            var obj = document.getElementById(id);
            var sn = "";
            var cn = "";
            var my = obj.keychain("");
            var myctc = my.query();
            var myctclen = myctc.length;
            for (var i = 0; i < myctclen; i++) {
                var cert = myctc.item(i);
                if (cert.hasPrivateKey) {
                    var subject = cert.subject(new Object());
                    cn += "CN=" + subject.CN + "," + cert.SerialNumber + ";";
                }
            }
            var spdb = obj.keychain("spdb");
            var spdbctc = spdb.query();
            var spdbctclen = spdbctc.length;
            for (var i = 0; i < spdbctclen; i++) {
                var cert = spdbctc.item(i);
                if (cert.hasPrivateKey) {
                    var subject = cert.subject(new Object());
                    cn += "CN=" + subject.CN + "," + cert.SerialNumber + ";";
                }

            }
            return cn;

        } else if (this.env.isMac && this.hasMacUKey) {
            var dn = "C=CN";
            var cn = "";
            for (var i = 0; i < 2; i++) {
                this.getMacUKeyCertificate(dn, i);
                if (cert1 == null) return null;
                var certObj = cert1.subject(new Object);
                var SN = cert1.SerialNumber;
                var CN = certObj.CN;
                cn = cn + "CN=" + CN + "," + SN + ";";
            }
            return cn;
        }

    };
    this.trimRight = function (s) {
        if (s == null) return "";
        var whitespace = new String(" \t\n\r");
        var str = new String(s);
        if (whitespace.indexOf(str.charAt(str.length - 1)) != -1) {
            var i = str.length - 1;
            while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1) {
                i--;
            }
            str = str.substring(0, i + 1);
        }
        return str;
    }
//发同步ajax请求
    this.pwdGetData = function (datas) {
        var d = 0;
        var str = JSON.stringify(datas).replace(/\+/g, "%2B");
        Ajax.request({
            timeout: 1000,
            url: urls,
            type: 'GET',
            async: false,
            data: {
                "jsoncallback": "cb",
                "str": str
            },
            success: function (x) {
                x = x.responseText.substr("cb(".length);
                x = x.substring(0, x.length - 1);
                x = JSON.parse(x);
                d = x;
            },
            error: function (x) {
                d = -1;
            }
        });
        return d;
    };
// get control version
    this.getVersion = function (callf) {
        var returnStr, version, obj = this;
        try {
            if (this.env.edge) {
                var INCJSON = {"interfacetype": 1, "data": {}};
                var datac = getEnStr(pgeRZRandNum, INCJSON);
                var RZCIJSON = {"rankey": pgeRZRandNum, "datab": pgeRZDataB, "datac": datac};
                urls = url + ":" + port;
                jsonp({
                    time: 1000,
                    url: urls,
                    data: {
                        "str": JSON.stringify(RZCIJSON), "jsoncallback": "cb"
                    },
                    callback: "jsoncallback",
                    success: function (x) {
                        version = x.data;
                        var m = version.split(".");
                        version = parseInt(m[0] * 1000) + parseInt(m[1] * 100) + parseInt(m[2] * 10) + parseInt(m[3]);
                        if (!!callf) callf(version);
                    },
                    fail: function (jqXHR, textStatus, errorThrown) {
                        console.log("检测端口:" + port);
                        if (port < 5530) {
                            port++;
                            obj.getVersion(callf);
                        } else {
                            if (!!callf) callf(false);
                        }
                    }
                });
                return;
            } else {
                if (this.env.ie) {
                    returnStr = this.getObj(false).version;
                } else {
                    returnStr = navigator.plugins['SignMessenger_spdb'].description;
                }
            }
            if (returnStr.indexOf(":") > 0) {
                arr = returnStr.split(":");
                version = arr[1];
            }
            if (version == undefined || version == "") {
                return 0;
            } else {
                var flag = false, m = "";
                if (version.indexOf(",") > -1) flag = true;
                if (flag) m = version.split(",")
                else m = version.split(".");
                var v = parseInt(m[0] * 1000) + parseInt(m[1] * 100) + parseInt(m[2] * 10) + parseInt(m[3]);
                return v;
            }
        } catch (err) {
            return 0;
        }
    };
    var keychain, cert, collection;
//get cert obj
    this.getSCertificate = function (dn, flag, fl) {
        cert = null;
        if (dn == "") return null;
        try {
            if (this.env.isMac && this.hasMacUKey) {
                this.getMacUKeyCertificate(dn, fl);
            } else {
                if (flag == 549) {
                    keychain = this.getObj(false).keychain("SPDB");
                } else {
                    keychain = this.getObj(false).keychain("");
                }

                var dn_new = this.dnConvert(dn);
                dn_new = eval("(" + dn_new + ")");
                collection = keychain.query(dn_new);
                collection.length > 1 ? cert = collection.userChoose() : cert = collection.item(0);
            }
        } catch (err) {
        }
    };
//get cert info
    this.getSCertInfo = function (dn, attrNum, flag) {
        if (dn == "") return null;
        if (this.env.edge) {
            if (this.env.isMac && this.hasMacUKey) {
                var cl = this.getTokenAndSelKey(dn);
            } else {
                var cl = this.getCL(dn, flag);
            }
            if (cl == null) {
                return null;
            }
            var certnumber = cl.certnumber, isUI = 1;
            if (certnumber > 0) {
                certlist = cl.certlist;
                certid = certlist[0].certid;
                if (certnumber == 1) {
                    isUI = 0;
                }
                var cc = this.selectCert(pid, certid, 6, isUI);
                if (cc.code == 0) {
                    var ci = this.getCertInfo(pid, 0);
                    var certObj = ci.certinfo;
                    switch (attrNum) {
                        case 0:
                            return certObj.sn;
                        case 1:
                            return certObj.cn;
                        case 2:
                            return certObj.c;
                        case 3:
                            return certObj.o;
                        case 4:
                            return certObj.ou;
                        case 5:
                            return certObj.e;
                        case 6:
                            return certObj.pub;
                    }
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } else {
            if (flag == 549) {
                var fl = 1;
            }
            if (flag == 544) {
                var fl = 0
            }
            this.getSCertificate(dn, flag, fl);

            if (cert == null) return null;
            var certObj = cert.subject(new Object);
            switch (attrNum) {
                case 0:
                    return cert.SerialNumber;
                case 1:
                    return certObj.CN;
                case 2:
                    return certObj.C;
                case 3:
                    return certObj.O;
                case 4:
                    return certObj.OU;
                case 5:
                    return certObj.emailAddress;
                case 6:
                    return cert.toString();
            }
        }
    };
    var content, pid, code, certid, certlist, result, version;
//data sign
    this.sSign = function (dn, content, flag) {
        if (dn == "" || content == "") return "";
        if (this.env.edge) {
            if (this.env.isMac && this.hasMacUKey) {
                var cl = this.getTokenAndSelKey(dn);
            } else {
                var cl = this.getCL(dn, flag);
            }
            if (cl == null) {
                return null;
            }
            var certnumber = cl.certnumber, isUI = 0;
            if (certnumber > 0) {
                certlist = cl.certlist;
                certid = certlist[0].certid;
                if (certnumber > 1) {
                    isUI = 1;
                } else if (certnumber == 1) {
                    isUI = 0;
                }
            } else {
                return false;
            }
            this.selectCert(pid, certid, 6, isUI);
            content = base64encode(utf16to8(this.trimRight(content)));
            var st = this.signature(pid, content, flag, 1);
            if (st.code != 0) {
                result = false;
            } else {
                result = st.signed;
            }
            return result;
        } else {
            if (flag == 549) {
                var fl = 1;
            }
            if (flag == 544) {
                var fl = 0
            }
            this.getSCertificate(dn, flag, fl);
            if (this.env.isMac) {
                //var ss=	cert1.issuer(new Object());
                return cert1.sign(content, parseInt(flag));
            } else {
                return cert.sign(content, parseInt(flag));
            }
        }
    };
//create the csr(pkcs#10 standard)
    this.getCsr = function (mask, type) {
        try {
            if (this.env.edge) {
                pid = this.getProvider("", 0, 0);
                return this.getCertCSR(pid, 1, mask)
            }/*else{
				keychain =  this.getObj(false).keychain();
				return keychain.createCSR(mask , type);
			}*/
        } catch (err) {
            return false;
        }
    };
// import cert to certmgr
    this.importCert = function (certStr, type, location) {
        if (certStr == undefined || type == undefined || location == undefined || certStr == "") return false;
        try {
            if (this.env.edge) {
                pid = this.getProvider("", 0, 0);
                code = this.importCert2(pid, 1, certStr, 2);
                return code == 0 ? true : false;
            }/*else{
				if (this.env.isMac) {
					if (location == 0) { //root cert
						keychain = this.getObj(false).keychain("root");
					} else if (location == 1) {
						keychain = this.getObj(false).keychain();
					}
				} else {
					if (location == 0) { //dotrust root cert
						keychain = this.getObj(false).keychain("root");
					} else if (location == 1) {
						keychain = this.getObj(false).keychain();
					} else if (location == 2){//middle cert
						keychain = this.getObj(false).keychain("CA");
					}
				}
				return keychain.importCertificate(certStr , type);
			}*/
        } catch (err) {
            return false;
        }
    };
// delete the cert
    this.sDelCert = function (dn) {
        if (this.env.edge) {
            var dn_new = this.dnConvert(dn);
            dn_new = eval("(" + dn_new + ")");
            pid = this.getProvider("", 0, 0);
            var cl = this.getCLByFlag(pid, 5, dn_new);
            var certnumber = cl.certnumber;
            certlist = cl.certlist;
            certid = certlist[0].certid;
            if (certnumber == 1) {
                var cc = this.selectCert(pid, certid, 6, 0);
                if (cc.code != 0) {
                    return null;
                } else {
                    code = this.delCert2(pid, certid, 4)
                    return code == 0 ? true : false;
                }
            } else if (certnumber > 1) {
                var cc = this.selectCert(pid, certid, 6, 1);
                if (cc.code != 0) {
                    return null;
                } else {
                    code = this.delCert2(pid, certid, 4)
                    return code == 0 ? true : false;
                }
            } else {
                return null;
            }
        }/*else{
			this.getSCertificate(dn);
			if(cert == null) return null;
			return cert.remove();
		}*/
    };
// get the certobj by ukey(only in Mac OS X)
    this.getMacUKeyCertificate = function (dn, fl) {  //T-lub1
        cert = null;
        var token_ft1, token_ft, token_zj;
        token_ft1 = iesign.getObj(false).token("libD4Token_SPDB");//tdr
        token_ft = iesign.getObj(false).token("libshuttle_p11v220_spdb");// ft
        //token_zj = signObj.getObj(false).token("ZJMacUkey");// zj
        if (token_ft1 == null && token_ft == null) {// && token_zj == null) {
            return false;
        }
        if (token_ft1 != null && token_ft1.keyCount()) {
            cert1 = null;
            var keyCount = parseInt(token_ft1.keyCount() + "");
            for (var i = 0; i < keyCount; i++) {
                token_ft1.selectKey(i);
                var certCount = parseInt(token_ft1.certificateCount() + "");
                if (certCount > 0) {
                    token_ft1.selectCertificate(fl);
                    cert = token_ft1.getActiveCertificate();
                    cert1 = cert;
                }
            }
        }
        if (cert == null) {
            if (token_ft != null && token_ft.keyCount()) {
                cert1 = null;
                var keyCount = parseInt(token_ft.keyCount() + "");
                for (var i = 0; i < keyCount; i++) {
                    token_ft.selectKey(i);
                    var certCount = parseInt(token_ft.certificateCount() + "");
                    if (certCount > 0) {
                        token_ft.selectCertificate(fl);
                        cert = token_ft.getActiveCertificate();
                        cert1 = cert;
                    }
                }
            }
        }
        /*if( cert == null ){
            if (token_zj != null && token_zj.keyCount()) {
                var keyCount = parseInt(token_zj.keyCount() + "");
                for(var i=0;i < keyCount;i++ ){
                    token_zj.selectKey(i);
                    var certCount = parseInt(token_zj.certificateCount() + "");
                    if (certCount > 0) {
                        cert = token_zj.getActiveCertificate();
                    }
                }

            }
        }*/
    };
// the edge && chrome45+ api
// get cl
    this.getCL = function (dn, flag) {
        if (flag == 549) {
            pid = this.getProvider("SPDB", 0, 0);
        } else {
            pid = this.getProvider("", 0, 0);
        }
        var dn_new = this.dnConvert(dn);
        dn_new = eval("(" + dn_new + ")");
        return this.getCLByFlag(pid, 5, dn_new);
    };
// get csp provider
    this.getProvider = function (name, type, pcode) {
        var SETJSON = {"interfacetype": 0, "data": {}};
        SETJSON.id = sid, SETJSON.data.name = name, SETJSON.data.type = type, SETJSON.data.pcode = pcode;
        var datac = getEnStr(pgeRZRandNum, SETJSON);
        var RZCIJSON = {"rankey": pgeRZRandNum, "datab": pgeRZDataB, "datac": datac};
        var x = this.pwdGetData(RZCIJSON);
        return x.pid;
    };
//get cert list
    this.getCLByFlag = function (pid, pcode, query) {
        var res, SETJSON = {"interfacetype": 0, "data": {}};
        SETJSON.id = sid, SETJSON.data.pid = pid, SETJSON.data.pcode = pcode, SETJSON.data.query = query;
        var datac = getEnStr(pgeRZRandNum, SETJSON);
        var RZCIJSON = {"rankey": pgeRZRandNum, "datab": pgeRZDataB, "datac": datac};
        res = this.pwdGetData(RZCIJSON);
        return res;
    };
//select cert
    this.selectCert = function (pid, certid, pcode, type) {
        var res, SETJSON = {"interfacetype": 0, "data": {}};
        SETJSON.id = sid , SETJSON.data.pid = pid, SETJSON.data.certid = certid;
        SETJSON.data.pcode = pcode , SETJSON.data.type = type;
        var datac = getEnStr(pgeRZRandNum, SETJSON);
        var RZCIJSON = {"rankey": pgeRZRandNum, "datab": pgeRZDataB, "datac": datac};
        res = this.pwdGetData(RZCIJSON);
        return res;
    };
//sign data
    this.signature = function (pid, sign, flags, ccode) {
        var res, SETJSON = {"interfacetype": 0, "data": {}};
        SETJSON.id = sid, SETJSON.data.pid = pid , SETJSON.data.sign = sign;
        SETJSON.data.flags = flags , SETJSON.data.ccode = ccode;
        var datac = getEnStr(pgeRZRandNum, SETJSON);
        var RZCIJSON = {"rankey": pgeRZRandNum, "datab": pgeRZDataB, "datac": datac};
        res = this.pwdGetData(RZCIJSON);
        return res;
    };
//get certinfo
    this.getCertInfo = function (pid, ccode) {
        var res, SETJSON = {"interfacetype": 0, "data": {}};
        SETJSON.id = sid, SETJSON.data.pid = pid , SETJSON.data.ccode = ccode;
        var datac = getEnStr(pgeRZRandNum, SETJSON);
        var RZCIJSON = {"rankey": pgeRZRandNum, "datab": pgeRZDataB, "datac": datac};
        res = this.pwdGetData(RZCIJSON);
        return res;
    };
//create csr
    this.getCertCSR = function (pid, pcode, csrinfo) {
        var csr = null, SETJSON = {"interfacetype": 0, "data": {}};
        SETJSON.id = sid , SETJSON.data.pid = pid , SETJSON.data.pcode = pcode , SETJSON.data.csrinfo = csrinfo;
        var datac = getEnStr(pgeRZRandNum, SETJSON);
        var RZCIJSON = {"rankey": pgeRZRandNum, "datab": pgeRZDataB, "datac": datac};
        csr = this.pwdGetData(RZCIJSON).csr;
        return csr;
    };
//import cert
    this.importCert2 = function (pid, format, data, pcode) {
        var code = 3, SETJSON = {"interfacetype": 0, "data": {}};
        SETJSON.id = sid , SETJSON.data.pid = pid , SETJSON.data.format = format;
        SETJSON.data.data = data , SETJSON.data.pcode = pcode;
        var datac = getEnStr(pgeRZRandNum, SETJSON);
        var RZCIJSON = {"rankey": pgeRZRandNum, "datab": pgeRZDataB, "datac": datac};
        code = this.pwdGetData(RZCIJSON).code;
        return code;
    };
//delete cert
    this.delCert2 = function (pid, certid, pcode) {
        var code = 3, SETJSON = {"interfacetype": 0, "data": {}};
        SETJSON.id = sid , SETJSON.data.pid = pid , SETJSON.data.certid = certid , SETJSON.data.pcode = pcode;
        var datac = getEnStr(pgeRZRandNum, SETJSON);
        var RZCIJSON = {"rankey": pgeRZRandNum, "datab": pgeRZDataB, "datac": datac};
        code = this.pwdGetData(RZCIJSON).code;
        return code;
    };
//the api in mac os x
// get token and select key
    this.getTokenAndSelKey = function (dn) {
        var pid_ft = this.getProvider("libBOCD", 1, 0);
        var pid_ft1 = this.getProvider("libePass_BOCD", 1, 0);
        var pid_zj = this.getProvider("ZJMacUkey", 1, 0);
        var cl = null;
        if (cl == null) {
            if (pid_zj != -1) {
                var keyCount = this.getKeyCount(pid_zj, 7);
                if (keyCount) {
                    var code = this.selectKey(pid_zj, 0, 8);
                    var dn_new = this.dnConvert(dn);
                    dn_new = eval("(" + dn_new + ")");
                    cl = this.getCLByFlag(pid_zj, 5, dn_new);
                    pid = pid_zj;
                }
            }
        }
        if (cl == null) {
            if (pid_ft != -1) {
                var keyCount = this.getKeyCount(pid_ft, 7);
                if (keyCount) {
                    var code = this.selectKey(pid_ft, 0, 8);
                    var dn_new = this.dnConvert(dn);
                    dn_new = eval("(" + dn_new + ")");
                    cl = this.getCLByFlag(pid_ft, 5, dn_new);
                    pid = pid_ft;
                }
            }
        }
        if (cl == null) {
            if (pid_ft1 != -1) {
                var keyCount = this.getKeyCount(pid_ft1, 7);
                if (keyCount) {
                    var code = this.selectKey(pid_ft1, 0, 8);
                    var dn_new = this.dnConvert(dn);
                    dn_new = eval("(" + dn_new + ")");
                    cl = this.getCLByFlag(pid_ft1, 5, dn_new);
                    pid = pid_ft1;
                }
            }
        }
        return cl;
    };
//get key count
    this.getKeyCount = function (pid, pcode) {
        var SETJSON = {"interfacetype": 0, "data": {}};
        SETJSON.id = sid , SETJSON.data.pid = pid , SETJSON.data.pcode = pcode;
        var datac = getEnStr(pgeRZRandNum, SETJSON);
        var RZCIJSON = {"rankey": pgeRZRandNum, "datab": pgeRZDataB, "datac": datac};
        var x = this.pwdGetData(RZCIJSON);
        return x.keycount;
    };
//select key
    this.selectKey = function (pid, keyindex, pcode) {
        var SETJSON = {"interfacetype": 0, "data": {}};
        SETJSON.id = sid , SETJSON.data.pid = pid , SETJSON.data.keyindex = keyindex;
        SETJSON.data.pcode = pcode;
        var datac = getEnStr(pgeRZRandNum, SETJSON);
        var RZCIJSON = {"rankey": pgeRZRandNum, "datab": pgeRZDataB, "datac": datac};
        this.pwdGetData(RZCIJSON);
    };
//SPDBSIGN JS
    this.SignFormData = function () {//SignFormData
        var DNStr = getDNByCNStr(this.CN);
        var signResult;
        if (this.SignData == "") {
            return "E:1000";
        }
        try {
            signResult = this.sSign(DNStr, this.SignData, getFlag(this.HashAlgorithm, this.SignFlag));
        } catch (err) {
        }

        return signResult ? signResult : "E:1000";
    }
    this.SignCert = function () {
        var DNStr = getDNByCNStr(this.CN);
        if (this.CN == "") {
            return "E:1000";
        }
        var signResult = this.getSCertInfo(DNStr, 6, getFlag(this.HashAlgorithm, this.SignFlag));
        return signResult ? signResult : "E:1000";
    }
}


function checkOsBrowser() {
    var userosbrowser;
    // var regStr_chrome = /chrome\/[\d.]+/gi;
    // var regStr_firefox = /firefox\/[\d.]+/gi;
    // if ((navigator.platform == "Win32") || (navigator.platform == "Windows")) {
    //     if (navigator.userAgent.indexOf("MSIE") > 0 || navigator.userAgent.indexOf("msie") > 0 || navigator.userAgent.indexOf("Trident") > 0 || navigator.userAgent.indexOf("trident") > 0) {
    //         if (navigator.userAgent.indexOf("ARM") > 0) {
    //             userosbrowser = 9; // win8 RAM Touch
    //
    //         } else {
    //             userosbrowser = 1;// windows32ie32
    //
    //         }
    //     } else if (navigator.userAgent.indexOf("Edge") > 0) {
    //         userosbrowser = 10;
    //
    //     } else if (navigator.userAgent.indexOf("Chrome") > 0) {
    //         var chromeVersion = navigator.userAgent.match(regStr_chrome).toString();
    //         chromeVersion = parseInt(chromeVersion.replace(/[^0-9.]/gi, ""));
    //         if (chromeVersion >= 42) {
    //             userosbrowser = 10;
    //
    //         } else {
    //             userosbrowser = 2;
    //
    //         }
    //     } else if (navigator.userAgent.indexOf("Firefox") > 0) {
    //         var firefoxVersion = navigator.userAgent.match(regStr_firefox).toString();
    //         firefoxVersion = parseInt(firefoxVersion.replace(/[^0-9.]/gi, ""));
    //         if (firefoxVersion >= 51) {
    //             userosbrowser = 10;
    //
    //         } else {
    //             userosbrowser = 2;
    //
    //         }
    //     } else {
    //         userosbrowser = 2; // windowsff
    //     }
    // } else if ((navigator.platform == "Win64")) {
    //     if ((navigator.userAgent.indexOf("Windows NT 6.2") > 0 || navigator.userAgent.indexOf("windows nt 6.2") > 0) && navigator.userAgent.indexOf("Firefox") == -1) {
    //         userosbrowser = 1;// windows32ie32
    //
    //     } else if (navigator.userAgent.indexOf("MSIE") > 0 || navigator.userAgent.indexOf("msie") > 0 || navigator.userAgent.indexOf("Trident") > 0 || navigator.userAgent.indexOf("trident") > 0) {
    //         userosbrowser = 3;//windows64ie64
    //
    //     } else if (navigator.userAgent.indexOf("Edge") > 0) {
    //         userosbrowser = 10;
    //
    //     } else if (navigator.userAgent.indexOf("Firefox") > 0) {
    //         var firefoxVersion = navigator.userAgent.match(regStr_firefox).toString();
    //         firefoxVersion = parseInt(firefoxVersion.replace(/[^0-9.]/gi, ""));
    //         if (firefoxVersion >= 51) {
    //             userosbrowser = 10;
    //
    //         } else {
    //             userosbrowser = 2;
    //
    //         }
    //     } else if (navigator.userAgent.indexOf("Chrome") > 0) {
    //         var chromeVersion = navigator.userAgent.match(regStr_chrome).toString();
    //         chromeVersion = parseInt(chromeVersion.replace(/[^0-9.]/gi, ""));
    //         if (chromeVersion >= 42) {
    //             userosbrowser = 10;
    //
    //         } else {
    //             userosbrowser = 2;
    //
    //         }
    //     } else {
    //         userosbrowser = 2;
    //
    //     }
    // } else if (navigator.userAgent.indexOf("Macintosh") > 0) {
    //     if (navigator.userAgent.indexOf("Safari") > 0 && (navigator.userAgent.indexOf("Version/5.1") > 0 || navigator.userAgent.indexOf("Version/5.2") > 0 || navigator.userAgent.indexOf("Version/6") > 0)) {
    //         userosbrowser = 8;//macos Safari 5.1 more
    //
    //     } else if (navigator.userAgent.indexOf("Firefox") > 0 || navigator.userAgent.indexOf("Chrome") > 0) {
    //         var chromeVersion = navigator.userAgent.match(regStr_chrome);
    //         var firefoxVersion = navigator.userAgent.match(regStr_firefox);
    //         if (chromeVersion != null) {
    //             chromeVersion = chromeVersion.toString();
    //             chromeVersion = parseInt(chromeVersion.replace(/[^0-9.]/gi, ""));
    //             if (chromeVersion >= 42) {
    //                 userosbrowser = 11;
    //
    //             } else {
    //                 userosbrowser = 6;
    //
    //             }
    //         }
    //
    //         if (firefoxVersion != null) {
    //             firefoxVersion = firefoxVersion.toString();
    //             firefoxVersion = parseInt(firefoxVersion.replace(/[^0-9.]/gi, ""));
    //             if (firefoxVersion >= 50) {
    //                 userosbrowser = 11;
    //
    //             } else {
    //                 userosbrowser = 6;
    //
    //             }
    //         }
    //     } else if (navigator.userAgent.indexOf("Opera") >= 0 && (navigator.userAgent.indexOf("Version/11.6") > 0 || navigator.userAgent.indexOf("Version/11.7") > 0)) {
    //         userosbrowser = 6;//macos
    //
    //     } else if (navigator.userAgent.indexOf("Safari") >= 0) {
    //         userosbrowser = 6;//macos
    //
    //     } else {
    //         userosbrowser = 0;//macos
    //
    //     }
    // }
    return userosbrowser = 10;
}

//===========客户端控件信息获取===========bat.lib
//客户端信息获取控件
function writeUtilityObject(oid,publickeyblob, params,ts) {

    if(!NewSecurityCtrl()){

        if (!oid || typeof(oid) != "string") {
            alert("writePassObj Failed: oid are required!");
        } else {
            if(!isRegisterediSecurity()){
                return ;
            }
            if (isBrowserSecurity()){
                if((navigator.platform == "Win64" || navigator.cpuClass == "x64"))
                    codeBaseFile = WIN_64_OCX_PATH;
                else
                    codeBaseFile = WIN_32_OCX_PATH;


                writeObject(oid, UtilCtrlClsid, setParams(params));
            }else{
                writePluginObject(oid, MIME, setParams(params));
            }

            return ts + publickeyblob;
            // document.getElementById(oid).setTimestamp(ts);
            // document.getElementById(oid).publicKeyBlob(publickeyblob);
        }
    }
};


//判断是否为IE浏览器
function isBrowserSecurity() {
    // if(_app == 'Microsoft Internet Explorer' || navigator.userAgent.indexOf("Trident")>0){
    //     return true;
    // }
    return false;
}

function isRegisterediSecurity(){
    try{
        if (isBrowserSecurity()){
            new ActiveXObject(CtlName);
        }else{
            // if(isMacSafari() && window.pgeCtrl &&window.pgeCtrl.checkInstall())  //
                return true;

            // var powerEnterPlugin = navigator.plugins[PluginDescription];
            // if(powerEnterPlugin == null)
            //     return false;
        }
    }catch(e){
        return false;
    }
    return true;
}

//判断是否为MAC,只有safari
function isMacSafari(){
    // if((navigator.platform == "Mac68K") ||
    //     (navigator.platform == "MacPPC") ||
    //     (navigator.platform == "Macintosh") ||
    //     (navigator.platform == "MacIntel")) {
    //     //只有mac自带浏览器
    //     var useragent = navigator.userAgent.toLowerCase();
    //     if(useragent.indexOf("chrome") >=  0 || useragent.indexOf("firefox") >=  0) {
    //         return false;
    //     }
    //     return true;
    // }
    return false;
}


//===============================================================
//TLUkey、WLUkey
//TLUkey
function writeUkeyObject(oid) {
   var tmpoid = oid+"_TL"   //天地融液晶key
   var clsid="0DCFA6B1-11F0-4BF2-B9B7-BBE2D1C0CFE6";
   var ss = '<object id="' + tmpoid + '" name="' + tmpoid + '" classid="clsid:' + clsid
        + '" width="0" height="0" border=0 " '
        + '" style="width:0px;height:0px;display:none">';

    var aa = '</object>';

    tmpoid = oid+"_WL"  //握奇液晶key
    clsid="BFA95A5D-E76F-46AA-A06A-54F736533FCE";
    var bb = '<object id="' + tmpoid + '" name="' + tmpoid + '" classid="clsid:' + clsid
        + '" width="0" height="0" border=0 " '
        + '" style="width:0px;height:0px;display:none">';

    var cc = '</object>';

    return ss + aa + bb + cc;
};


//==================================密码的控件加载=====================
//登陆页面密码控件
function writepasswordLoginObject(oid, publickeyblob, params, ts) {
    if(NewSecurityCtrl()){	//新安全控件
        pgeditor = new pge(setParamsPwd(oid,publickeyblob,"",params,ts));
        window.pgeCtrl = pgeditor;
        pgeList[oid] = pgeditor;
        window.passGuards = pgeList;
        (function(){
            pgeditor.pgInitialize();
        });
        pgeditor.generate();
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


function jsonp(options) {
    options = options || {};
    if (!options.url || !options.callback) {
        throw new Error("参数不合法");
    }
    var callbackName = ('jsonp_' + Math.random()).replace(".", "");
    var oHead = document.getElementsByTagName('head')[0];
    options.data[options.callback] = callbackName;
    var params = formatParams(options.data);
    var oS = document.createElement('script');
    oHead.appendChild(oS);

    //创建jsonp回调函数
    window[callbackName] = function (json) {
        oHead.removeChild(oS);
        clearTimeout(oS.timer);
        window[callbackName] = null;
        options.success && options.success(json);
    };

    //发送请求
    oS.src = options.url + '?' + params;

    //超时处理
    if (options.time) {
        oS.timer = setTimeout(function () {
            window[callbackName] = null;
            oHead.removeChild(oS);
            options.fail && options.fail({ message: "超时" });
        }, options.time);
    }
};