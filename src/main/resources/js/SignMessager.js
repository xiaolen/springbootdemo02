Ajax = function() {  
    function request(opt) {  
        function fn() {  
        }  
        var url = opt.url || "";  
        var async = opt.async !== false, method = opt.method || 'GET', data = opt.data  
                || null, success = opt.success || fn, error = opt.failure  
                || fn;  
        method = method.toUpperCase();  
        if (method == 'GET' && data) {  
            var args = "";  
            if(typeof data == 'string'){  
                //alert("string")  
            args = data;  
            }else if(typeof data == 'object'){  
                //alert("object")  
                var arr = new Array();  
                for(var k in data){  
                    var v = data[k];  
                    arr.push(k + "=" + v);  
                }  
                args = arr.join("&");  
            }  
        url += (url.indexOf('?') == -1 ? '?' : '&') + args;  
            data = null;  
        }  
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest()  
                : new ActiveXObject('Microsoft.XMLHTTP');  
        xhr.onreadystatechange = function() {  
            _onStateChange(xhr, success, error);  
        };  
        xhr.open(method, url, async);  
        if (method == 'POST') {  
            xhr.setRequestHeader('Content-type',  
                    'application/x-www-form-urlencoded;');  
        }  
        xhr.send(data);  
        return xhr;  
    }  
    function _onStateChange(xhr, success, failure) {  
        if (xhr.readyState == 4) {  
            var s = xhr.status;  
            if (s >= 200 && s < 300) {  
                success(xhr);  
            } else {  
                failure(xhr);  
            }  
        } else {  
        }  
    }  
    return {  
        request : request  
    };  
}();
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

//格式化参数
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(name + '=' + encodeURIComponent(data[name]));
    }
    return arr.join('&');
}
var cert1;
/**
 * SignMessenger.js
 * @param the tag id
 * @return control obj
 */
function SignMessenger(id,signFlag,hashAlgorithm,sKey,enStr) {
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
	var ua = navigator.userAgent.toLowerCase();
	// check chrome
	var chr="" , regStr_chrome = /chrome\/[\d.]+/gi ;
	if(navigator.platform == "Win64" && navigator.userAgent.indexOf("Firefox") > -1){
		chr = "chromeh";
	}
	var frf="", regStr_firefox =  /firefox\/[\d.]+/gi ;
	if(ua.indexOf("firefox")>0){
		var firefoxVersion = navigator.userAgent.match(regStr_firefox).toString();
		firefoxVersion = parseInt(firefoxVersion.replace(/[^0-9.]/gi,""));
		if(firefoxVersion >= 54){
			frf="frfh";

		}else{
			frf="frfl";
			
		}
	}
/*	if(ua.indexOf("chromeframe")>0){
		var regStr_chromeframe=/chromeframe\/[\d.]+/gi;
		var chromeVersionFrame=ua.match(regStr_chromeframe).toString();
		chr="chromel";
	};*/
	if(ua.indexOf("chrome")>0&&ua.indexOf("chromeframe")==-1){
		var chromeVersion = ua.match(regStr_chrome).toString();
		chromeVersion = parseInt(chromeVersion.replace(/[^0-9.]/gi,""));
		if(chromeVersion >= 42){
			chr="chromeh";
		}else{
			chr="chromel";
		}
	}
	// check OS & browser
	this.env = {
		isWindows : (ua.indexOf("windows") != -1 || ua.indexOf("win32") != -1),
		isMac : (ua.indexOf("macintosh") != -1 || ua.indexOf("mac os x") != -1),
		isLinux : (ua.indexOf("linux") != -1),
		ie : (ua.indexOf('msie') != -1 || ua.indexOf("trident") != -1),
		firefox : ua.indexOf('firefox') != -1,
		chrome : ua.indexOf('chrome') != -1,
		opera : ua.indexOf('opera') != -1,
		safari : ua.indexOf('version') != -1,
		edge : ua.indexOf('edge') != -1 || chr.indexOf('chrome') != -1 || ua.indexOf('firefox') != -1
	};
	// create control tag
	this.createTag = function() {
		if(this.env.edge){
			return "";
		}else if (this.env.isWindows && this.env.ie) {
			return "<object id='"
					+ id
					+ "' classid='CLSID:4F8201E4-08A0-417D-966E-208F86B9123E' width='0' height='0'></object>";
		} else if (this.env.isWindows || this.env.isMac ) {
			return "<embed id='"
					+ id
					+ "' type='application/spdb-sign-messenger' width='0' height='0'>";
		} else {
			return "<object type='application/spdb-sign-messenger' id=''></object>";
		}
	};
	this.high = null,this.admin = null;
	// get control object
	this.getObj = function(admin) {
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
	this.dnConvert = function(dn) {
		var dn_new = dn.replace(/\s=/g, '=');
		dn_new = dn_new.replace(/=\s/g, '=');
		dn_new = dn_new.replace(/=/g, ':"');
		dn_new = dn_new.replace(/cn:/g, 'CN:');
		dn_new = "{" + dn_new.replace(/,/g,'",') + '"}';
		if (dn_new.toUpperCase().indexOf("SN:") != -1) {
			dn_new = dn_new.toUpperCase();
			dn_new = dn_new.replace(/SN/g, 'SN');
			//dn_new = dn_new.replace(/\s/g, '');
			//dn_new = dn_new.replace(/"(0+)/g, '"');
		}
		return dn_new;
	};
	this.getCertList = function() {
		if(this.env.edge){
			var SETJSON = {"interfacetype":0,"data":{}};
	    	SETJSON.id = sid,SETJSON.data.pcode = 15;
			var datac = getEnStr(pgeRZRandNum , SETJSON);
			var RZCIJSON = {"rankey":pgeRZRandNum,"datab":pgeRZDataB,"datac":datac};
			var x = this.pwdGetData(RZCIJSON);
			return x.certlist;
		}else if(this.env.ie||this.env.firefox||(this.env.chrome)){   //T-lub1 
			var obj= document.getElementById(id);
			var sn = "";
			var cn = "";
			var my = obj.keychain("");
			var myctc = my.query();
			var myctclen = myctc.length;
			for(var i=0;i<myctclen;i++)
			{
				var cert = myctc.item(i);
				if(cert.hasPrivateKey)
				{
					var subject = cert.subject(new Object());
					cn += "CN=" + subject.CN + "," + cert.SerialNumber + ";";
				}
			}
			var spdb = obj.keychain("spdb");
			var spdbctc = spdb.query();
			var spdbctclen = spdbctc.length;
			for(var i=0;i<spdbctclen;i++)
			{
				var cert = spdbctc.item(i);
				if(cert.hasPrivateKey)
				{
					var subject = cert.subject(new Object());
					cn += "CN=" + subject.CN + "," + cert.SerialNumber + ";";
				}
				
			}
			return cn;
			
		}else if(this.env.isMac && this.hasMacUKey){
			var dn="C=CN";
	        var cn="";
	        for(var i=0;i<2;i++){
		 	this.getMacUKeyCertificate(dn,i);
			if(cert1 == null) return null;
			var certObj = cert1.subject(new Object);
			var SN=cert1.SerialNumber;
			var CN=certObj.CN;
			cn=cn+"CN="+CN+","+SN+";";
		}
	        return cn;
		}
		
	};
	this.trimRight = function(s){
	    if(s == null) return "";
	    var whitespace = new String(" \t\n\r");
	    var str = new String(s);
	    if (whitespace.indexOf(str.charAt(str.length-1)) != -1){
	        var i = str.length - 1;
	        while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1){
	           i--;
	        }
	        str = str.substring(0, i+1);
	    }
	    return str;
	}


	//发同步ajax请求
	this.pwdGetData = function(datas){
		var d = 0;
		var str = JSON.stringify(datas).replace(/\+/g,"%2B");
		Ajax.request( {
			timeout : 1000,
			url : urls,
			type : 'GET',
			async:false,
			data : {
				"jsoncallback":"cb",
				"str" : str
			},
			success : function(x) {
				x = x.responseText.substr("cb(".length);
				x = x.substring(0, x.length-1);
				x = JSON.parse(x);
				d = x;
			},
			error : function(x){
				d = -1;
			}
		});
		return d;
	};
	// get control version
    this.getVersion = function (callf) {
    	var returnStr,version , obj = this;
    	try{
    		if(this.env.edge){
    			var INCJSON = {"interfacetype":1,"data":{}};
    			var datac = getEnStr(pgeRZRandNum,INCJSON);
    			var RZCIJSON = {"rankey":pgeRZRandNum,"datab":pgeRZDataB,"datac":datac};
    			urls = url + ":" + port;
    			jsonp( {
    				time : 1000,
    				url : urls,
    				data:{
    					"str" : JSON.stringify(RZCIJSON),"jsoncallback":"cb"
    				},
    				callback : "jsoncallback",
    				success : function(x) {
    					version = x.data;
    					var m = version.split(".");
    					version = parseInt(m[0]*1000) + parseInt(m[1]*100) + parseInt(m[2]*10) + parseInt(m[3]);
    					if(!!callf) callf(version);
    				},
    				fail : function(jqXHR, textStatus, errorThrown){
    					console.log("检测端口:"+port);
    					if(port < 5530){
    						port++;
    						obj.getVersion(callf);
    					}else{
    						if(!!callf) callf(false);
    					}
    				}
    			});
    			return ;
    		}else{
		    	if( this.env.ie ){
		    		returnStr = this.getObj(false).version;
		    	} else {
		    		returnStr = navigator.plugins['SignMessenger_spdb'].description;
		    	}
	    	}
			if(returnStr.indexOf(":")>0){
				arr = returnStr.split(":");
				version = arr[1];
			}
			if(version == undefined || version == ""){
				return 0;
			} else {
				var flag = false,m = "";
				if(version.indexOf(",") > -1) flag = true;
				if(flag) m = version.split(",")
				else m = version.split(".");
				var v = parseInt(m[0]*1000) + parseInt(m[1]*100) + parseInt(m[2]*10) + parseInt(m[3]);
				return v;
			}
    	}catch(err){
    		return 0;
    	}
    };
	var keychain, cert, collection;
	//get cert obj
	this.getSCertificate = function(dn,flag,fl){  
		cert = null;
		if (dn == "") return null;
		try {
			if(this.env.isMac && this.hasMacUKey){
				this.getMacUKeyCertificate(dn,fl);  
			}else{
				if(flag==549){
					keychain = this.getObj(false).keychain("SPDB");	
				}else{
					keychain = this.getObj(false).keychain("");
				}
				
				var dn_new = this.dnConvert(dn);
				dn_new = eval("(" + dn_new + ")");
				collection = keychain.query(dn_new);
				collection.length > 1 ? cert = collection.userChoose() : cert = collection.item(0);
			}
		} catch (err) {}
	};
	//get cert info
	this.getSCertInfo = function(dn,attrNum,flag) {
		if (dn == "") return null;
		if(this.env.edge){
			if(this.env.isMac && this.hasMacUKey){
				var cl = this.getTokenAndSelKey(dn);
			}else{
				var cl = this.getCL(dn,flag);
			}
			if(cl == null){
				return null;
			}
			var certnumber = cl.certnumber , isUI = 1;
			if(certnumber > 0){
				certlist = cl.certlist;
				certid = certlist[0].certid;
				if(certnumber == 1){
					isUI = 0;
				}
				var cc = this.selectCert(pid , certid , 6 , isUI);
				if(cc.code == 0){
					var ci = this.getCertInfo(pid, 0);
					var certObj = ci.certinfo;
					switch(attrNum){
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
				}else{
					return null;
				}
			}else{
				return null;
			}
		}else{
			if(flag == 549){   
				var fl = 1;
			}
			if(flag == 544){
				var fl = 0
			}
			this.getSCertificate(dn,flag,fl);
			
			if(cert == null) return null;
			var certObj = cert.subject(new Object);
			switch(attrNum){
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
	var content,pid,code,certid,certlist,result,version;
	//data sign
	this.sSign = function(dn , content , flag) {
		if (dn == "" || content == "")	return "";
		if(this.env.edge){
			if(this.env.isMac && this.hasMacUKey){
				var cl = this.getTokenAndSelKey(dn);
			}else{
				var cl = this.getCL(dn,flag);
			}
			if(cl == null){
				return null;
			}
			var certnumber = cl.certnumber ,isUI = 0;
			if(certnumber > 0){
				certlist = cl.certlist;
				certid = certlist[0].certid;
				if(certnumber > 1){
					isUI = 1;
				}else if(certnumber == 1){
					isUI = 0;
				}
			}else{
				return false;
			}
			this.selectCert(pid , certid , 6 , isUI);
    		content = base64encode(utf16to8(this.trimRight(content)));
    		var st = this.signature(pid , content , flag , 1);
    		if(st.code != 0){
    			result = false;
    		}else{
    			result = st.signed;
    		}
    		return result;
		}else{
			if(flag == 549){   
				var fl = 1;
			}
			if(flag == 544){
				var fl = 0
			}
			this.getSCertificate(dn,flag,fl);
			if(this.env.isMac){
				//var ss=	cert1.issuer(new Object());
				return cert1.sign(content , parseInt(flag));
			}else{
				return cert.sign(content , parseInt(flag));
			}
		}
	};
	//create the csr(pkcs#10 standard)
	this.getCsr = function(mask , type){
		try {
			if(this.env.edge){
				pid = this.getProvider("" , 0 , 0);
				return this.getCertCSR(pid , 1, mask)
			}/*else{
				keychain =  this.getObj(false).keychain();
				return keychain.createCSR(mask , type);
			}*/
		} catch (err) { return false; }
	};
	// import cert to certmgr
	this.importCert = function(certStr , type , location){
		if(certStr == undefined || type == undefined || location == undefined || certStr == "") return false;
		try {
			if(this.env.edge){
				pid = this.getProvider("" , 0 , 0);
				code = this.importCert2(pid , 1 , certStr , 2);
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
		} catch (err) { return false; }
	};
	// delete the cert
	this.sDelCert = function(dn) {
		if(this.env.edge){
			var dn_new = this.dnConvert(dn);
			dn_new = eval("(" + dn_new + ")");
			pid = this.getProvider("" , 0 , 0);
			var cl = this.getCLByFlag(pid , 5 , dn_new);
			var certnumber = cl.certnumber;
			certlist = cl.certlist;
			certid=certlist[0].certid;
			if(certnumber == 1){
				var cc = this.selectCert(pid ,certid , 6 , 0);
				if(cc.code != 0){
					return null;
				}else{
					code = this.delCert2(pid , certid , 4)
					return code == 0 ? true : false;
				}
			}else if(certnumber > 1){
				var cc = this.selectCert(pid ,certid , 6 , 1);
				if(cc.code != 0){
					return null;
				}else{
					code = this.delCert2(pid , certid , 4)
					return code == 0 ? true : false;
				}
			}else{
				return null;
			}
		}/*else{
			this.getSCertificate(dn);
			if(cert == null) return null;
			return cert.remove();
		}*/
	};
	// get the certobj by ukey(only in Mac OS X)
	this.getMacUKeyCertificate = function(dn,fl){  //T-lub1
		cert = null;
		var token_ft1 , token_ft , token_zj;
		token_ft1 = iesign.getObj(false).token("libD4Token_SPDB");//tdr
		token_ft = iesign.getObj(false).token("libshuttle_p11v220_spdb");// ft
		//token_zj = signObj.getObj(false).token("ZJMacUkey");// zj
		if (token_ft1 == null && token_ft == null ){// && token_zj == null) {
			return false;
		}
		if (token_ft1 != null && token_ft1.keyCount()) {
			cert1=null;
			var keyCount = parseInt(token_ft1.keyCount() + "");
			for(var i = 0;i < keyCount;i++ ){
				token_ft1.selectKey(i);
				var certCount = parseInt(token_ft1.certificateCount() + "");
				if (certCount > 0) {
					token_ft1.selectCertificate(fl);   
					cert = token_ft1.getActiveCertificate();
					cert1=cert;
				}
			}
		}
		if( cert == null ){
			if (token_ft != null && token_ft.keyCount()) {
				cert1=null;
				var keyCount = parseInt(token_ft.keyCount() + "");
				for(var i=0;i < keyCount;i++ ){
					token_ft.selectKey(i);
					var certCount = parseInt(token_ft.certificateCount() + "");
					if (certCount > 0) {
						token_ft.selectCertificate(fl);
						cert = token_ft.getActiveCertificate();
						cert1=cert;
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
	this.getCL = function(dn,flag){
		if(flag==549){
			pid = this.getProvider("SPDB" , 0 , 0);
		}else{
			pid = this.getProvider("" , 0 , 0);
		}
		var dn_new = this.dnConvert(dn);
		dn_new = eval("(" + dn_new + ")");
		return this.getCLByFlag(pid , 5 , dn_new);
	};
	// get csp provider
	this.getProvider = function(name , type , pcode){
    	var SETJSON = {"interfacetype":0,"data":{}};
    	SETJSON.id = sid,SETJSON.data.name = name,SETJSON.data.type = type,SETJSON.data.pcode = pcode;
		var datac = getEnStr(pgeRZRandNum , SETJSON);
		var RZCIJSON = {"rankey":pgeRZRandNum,"datab":pgeRZDataB,"datac":datac};
		var x = this.pwdGetData(RZCIJSON);
		return x.pid;
	};
	//get cert list
	this.getCLByFlag = function(pid , pcode , query){
		var res , SETJSON = {"interfacetype":0,"data":{}};
    	SETJSON.id = sid,SETJSON.data.pid = pid,SETJSON.data.pcode = pcode,SETJSON.data.query = query;
		var datac = getEnStr(pgeRZRandNum,SETJSON);
		var RZCIJSON = {"rankey":pgeRZRandNum,"datab":pgeRZDataB,"datac":datac};
		res = this.pwdGetData(RZCIJSON);
		return res;
	};
	//select cert
	this.selectCert = function(pid , certid , pcode , type){
		var res , SETJSON = {"interfacetype":0,"data":{}};
    	SETJSON.id = sid , SETJSON.data.pid = pid,SETJSON.data.certid = certid;
    	SETJSON.data.pcode = pcode , SETJSON.data.type = type;
		var datac = getEnStr(pgeRZRandNum,SETJSON);
		var RZCIJSON = {"rankey":pgeRZRandNum,"datab":pgeRZDataB,"datac":datac};
		res = this.pwdGetData(RZCIJSON);
		return res;
	};
	//sign data
	this.signature = function(pid , sign , flags , ccode){
		var res,SETJSON = {"interfacetype":0,"data":{}};
    	SETJSON.id = sid,SETJSON.data.pid = pid , SETJSON.data.sign = sign;
    	SETJSON.data.flags = flags , SETJSON.data.ccode = ccode;
		var datac = getEnStr(pgeRZRandNum,SETJSON);
		var RZCIJSON = {"rankey":pgeRZRandNum,"datab":pgeRZDataB,"datac":datac};
		res = this.pwdGetData(RZCIJSON);
		return res;
	};
	//get certinfo
	this.getCertInfo = function(pid , ccode){
		var res,SETJSON = {"interfacetype":0,"data":{}};
    	SETJSON.id = sid,SETJSON.data.pid = pid , SETJSON.data.ccode = ccode;
		var datac = getEnStr(pgeRZRandNum,SETJSON);
		var RZCIJSON = {"rankey":pgeRZRandNum,"datab":pgeRZDataB,"datac":datac};
		res = this.pwdGetData(RZCIJSON);
		return res;
	};
	//create csr
	this.getCertCSR = function(pid , pcode , csrinfo){
		var csr = null , SETJSON = {"interfacetype":0,"data":{}};
    	SETJSON.id = sid , SETJSON.data.pid = pid , SETJSON.data.pcode = pcode , SETJSON.data.csrinfo = csrinfo;
		var datac = getEnStr(pgeRZRandNum,SETJSON);
		var RZCIJSON = {"rankey":pgeRZRandNum,"datab":pgeRZDataB,"datac":datac};
		csr = this.pwdGetData(RZCIJSON).csr;
		return csr;
	};
	//import cert
	this.importCert2 = function(pid , format , data , pcode){
		var code = 3 , SETJSON = {"interfacetype":0,"data":{}};
    	SETJSON.id = sid , SETJSON.data.pid = pid , SETJSON.data.format = format;
    	SETJSON.data.data = data , SETJSON.data.pcode = pcode;
		var datac = getEnStr(pgeRZRandNum,SETJSON);
		var RZCIJSON = {"rankey":pgeRZRandNum,"datab":pgeRZDataB,"datac":datac};
		code = this.pwdGetData(RZCIJSON).code;
		return code;
	};
	//delete cert
	this.delCert2 = function(pid , certid , pcode){
		var code = 3 , SETJSON = {"interfacetype":0,"data":{}};
    	SETJSON.id = sid , SETJSON.data.pid = pid , SETJSON.data.certid = certid , SETJSON.data.pcode = pcode;
		var datac = getEnStr(pgeRZRandNum,SETJSON);
		var RZCIJSON = {"rankey":pgeRZRandNum,"datab":pgeRZDataB,"datac":datac};
		code = this.pwdGetData(RZCIJSON).code;
		return code;
	};
	//the api in mac os x
	// get token and select key
	this.getTokenAndSelKey = function(dn){
		var pid_ft = this.getProvider("libBOCD" , 1 , 0);
		var pid_ft1 = this.getProvider("libePass_BOCD" , 1 , 0);
		var pid_zj = this.getProvider("ZJMacUkey" , 1 , 0);
		var cl = null;
		if(cl == null){
			if(pid_zj != -1){
				var keyCount = this.getKeyCount(pid_zj , 7);
				if(keyCount){
					var code = this.selectKey(pid_zj , 0 , 8);
				    var dn_new = this.dnConvert(dn);
				    dn_new = eval("(" + dn_new + ")");
				    cl = this.getCLByFlag(pid_zj , 5 , dn_new);
				    pid = pid_zj;
				}
			}
		}
		if(cl == null){
			if(pid_ft != -1){
				var keyCount = this.getKeyCount(pid_ft , 7);
				if(keyCount){
					var code = this.selectKey(pid_ft , 0 , 8);
				    var dn_new = this.dnConvert(dn);
				    dn_new = eval("(" + dn_new + ")");
				    cl = this.getCLByFlag(pid_ft , 5 , dn_new);
				    pid = pid_ft;
				}
			}
		}
		if(cl == null){
			if(pid_ft1 != -1){
				var keyCount = this.getKeyCount(pid_ft1 , 7);
				if(keyCount){
					var code = this.selectKey(pid_ft1 , 0 , 8);
				    var dn_new = this.dnConvert(dn);
				    dn_new = eval("(" + dn_new + ")");
				    cl = this.getCLByFlag(pid_ft1 , 5 , dn_new);
				    pid = pid_ft1;
				}
			}
		}
		return cl;
	};
	//get key count
	this.getKeyCount = function(pid , pcode){
		var SETJSON = {"interfacetype":0,"data":{}};
    	SETJSON.id = sid , SETJSON.data.pid = pid , SETJSON.data.pcode = pcode;
		var datac = getEnStr(pgeRZRandNum,SETJSON);
		var RZCIJSON = {"rankey":pgeRZRandNum,"datab":pgeRZDataB,"datac":datac};
		var x = this.pwdGetData(RZCIJSON);
		return x.keycount;
	};
	//select key
	this.selectKey = function(pid , keyindex , pcode){
    	var SETJSON = {"interfacetype":0,"data":{}};
    	SETJSON.id = sid , SETJSON.data.pid = pid , SETJSON.data.keyindex = keyindex;
    	SETJSON.data.pcode = pcode;
		var datac = getEnStr(pgeRZRandNum,SETJSON);
		var RZCIJSON = {"rankey":pgeRZRandNum,"datab":pgeRZDataB,"datac":datac};
		this.pwdGetData(RZCIJSON);
	};
	//SPDBSIGN JS
	this.SignFormData = function(){//SignFormData
		var DNStr = getDNByCNStr(this.CN);
		var signResult;
		if(this.SignData == ""){
			return "E:1000";
		}
		try{
			signResult = this.sSign(DNStr, this.SignData,getFlag(this.HashAlgorithm,this.SignFlag));
		}catch(err){}
		
		return signResult?signResult:"E:1000";
	}
	this.SignCert = function(){
		var DNStr = getDNByCNStr(this.CN);
		if(this.CN == ""){
			return "E:1000";
		}
		var signResult = this.getSCertInfo(DNStr , 6, getFlag(this.HashAlgorithm,this.SignFlag));
		return signResult?signResult:"E:1000";
	}
}

/**
 * 根据CN获取DN
 * @param vTmpPairItem
 * @returns {String}
 */
function getDNByCNStr(CNString){
	var CNLen = CNString.substring(0,2);
	var CNStr = CNString.substring(2,Number(CNLen)+2);
	var SNStr = CNString.substring(Number(CNLen)+4);
	return CNStr+",SN="+SNStr;
}

/**获取证书签名属性flag
 * @param signType 0 - P7 Attach;16 - P7 Detach;32 - Raw
 * @param hashAlgorithm 0 - SHA1;6 - SHA256;5 - SM3;
 * @param keyType 512 - 二代UKey;0 - 一代Ukey/软证书
*/
function getFlag(hashAlgorithm,flag){
	return "sha1"==hashAlgorithm?(Number(flag)):("sha256"==hashAlgorithm?(Number(flag)+6):(Number(flag)+5));
}
/**
 * js aes 256 encrypt
 * @param sKey randomkey
 * @param jsonStr 
 * @return encrypt str
 */
function getEnStr(sKey,jsonStr) {
	var neiKey = [ 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x1A, 0x2A, 0x2B,
			0x2C, 0x2D, 0x2E, 0x2F, 0x3A, 0x3B, 0x11, 0x22, 0x33, 0x44, 0x55,
			0x66, 0x77, 0x1A, 0x2A, 0x2B, 0x2C, 0x2D, 0x2E, 0x2F, 0x3A, 0x3B ];
	var fkey = "" , lx = "";
	for (var i = 0; i < sKey.length; i++) {
		lx = String.fromCharCode(sKey[i].charCodeAt(0) ^ neiKey[i]);
		fkey += lx;
	}
	var hexKey = CryptoJS.enc.Utf8.parse(fkey);
	var enStr = CryptoJS.AES.encrypt(JSON.stringify(jsonStr), hexKey, {
		mode : CryptoJS.mode.ECB,
		padding : CryptoJS.pad.Pkcs7
	});
	return enStr.toString();
}

var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if(i == len)
    {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt((c1 & 0x3) << 4);
        out += "==";
        break;
    }
    c2 = str.charCodeAt(i++);
    if(i == len)
    {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt((c2 & 0xF) << 2);
        out += "=";
        break;
    }
    c3 = str.charCodeAt(i++);
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
    out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}

function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
    /* c1 */
    do {
        c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while(i < len && c1 == -1);
    if(c1 == -1)
        break;

    /* c2 */
    do {
        c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while(i < len && c2 == -1);
    if(c2 == -1)
        break;

    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

    /* c3 */
    do {
        c3 = str.charCodeAt(i++) & 0xff;
        if(c3 == 61)
        return out;
        c3 = base64DecodeChars[c3];
    } while(i < len && c3 == -1);
    if(c3 == -1)
        break;

    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

    /* c4 */
    do {
        c4 = str.charCodeAt(i++) & 0xff;
        if(c4 == 61)
        return out;
        c4 = base64DecodeChars[c4];
    } while(i < len && c4 == -1);
    if(c4 == -1)
        break;
    out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}

function utf16to8(str) {
    var out, i, len, c;

    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if ((c >= 0x0001) && (c <= 0x007F)) {
        out += str.charAt(i);
    } else if (c > 0x07FF) {
        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
        out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
    } else {
        out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
    }
    }
    return out;
}

function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = str.length;
    i = 0;
    while(i < len) {
    c = str.charCodeAt(i++);
    switch(c >> 4)
    { 
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += str.charAt(i-1);
        break;
      case 12: case 13:
        // 110x xxxx   10xx xxxx
        char2 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = str.charCodeAt(i++);
        char3 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x0F) << 12) |
                       ((char2 & 0x3F) << 6) |
                       ((char3 & 0x3F) << 0));
        break;
    }
    }

    return out;
}

function CharToHex(str) {
    var out, i, len, c, h;
    out = "";
    len = str.length;
    i = 0;
    while(i < len) 
    {
	    c = str.charCodeAt(i++);
	    h = c.toString(16);
	    if(h.length < 2)
	    	h = "0" + h;
	    
	    out += "\\x" + h + " ";
	    if(i > 0 && i % 8 == 0)
	    	out += "\r\n";
    }

    return out;
}
