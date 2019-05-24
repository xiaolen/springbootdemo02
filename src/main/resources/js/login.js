/*登陆页面js*/

function change_tab(id){
	for(var i=1;i<=3;i++){
		if(i==id){
			document.getElementById("tab"+i).className = "tab_selected";
		}else{
		    document.getElementById("tab"+i).className = "tab_normal";
		}
	}
}

/*登陆页面广告轮播方法*/
function loginPageImgscroll(){
	var $jcarousel = $('.jcarousel');
	$jcarousel.jcarousel();

	$('.jcarousel-pagination').on('jcarouselpagination:active','a',function(){
		$(this).addClass('active');}).on('jcarouselpagination:inactive','a',function(){
			$(this).removeClass('active');}).jcarouselPagination().find('a').text('').each(function(ind){
				$(this).click(function(){
					i = ind+1;
				});
	});

	var $ul = $jcarousel.find('ul');
	var $last = $ul.find('li:last').clone();

	var i = 1;//当前展示图片的下标，1~max
	var max = 2;//图片个数

	function next(){
		if(i%max == 0){
			$last.prependTo($ul);
			$ul.css('left', 0);
		}else if(i%max == 1){
			$last.detach();
			$ul.css('left', 0);
	    }
	    $jcarousel.jcarousel('scroll', i++%max);
	}

	var inter = setInterval(next,10000);
	$jcarousel.hover(function(){
		clearInterval(inter);},function(){
			inter = setInterval(next, 10000);
	});
}

//内网ip验证
var host="ebank.spdb.com.cn";
var hosts="ebanks.spdb.com.cn";
var reg ="^(10)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{1}|[1-9]|0)";
$(function(){
	if((location.host).match(reg)){
	   IpCheck();
	}
	});

	function IpCheck(){
	   doRequest_loginjs(document.form1,processReturnData_login);
	}
	var _debugEnbabled;
	var xmlHttp1; 
	xmlHttp1 = createXmlRequests();
	_initializes();
	function _initializes(){
	   _debugEnbabled = false;  
	}
	function createXmlRequests(){
	   if(window.ActiveXObject && !window.XMLHttpRequest){
	      //IE浏览器
	      var msxmls = ['Msxml2.XMLHTTP.5.0','Msxml2.XMLHTTP.4.0','Msxml2.XMLHTTP.3.0','Msxml2.XMLHTTP','Microsoft.XMLHTTP'];
	      for (var i = 0; i < msxmls.length; i++) {
	         try {
	            return new ActiveXObject(msxmls[i]);
	         } catch (e) {
	         }
	      }
	   }else if(window.XMLHttpRequest){
	       //Mozilla、Opera 等非IE浏览器
	      return new XMLHttpRequest();      
	   }else
	   {
	      return null;
	   }  
	}
	function processReturnData_login()
	{
	   if(xmlHttp1&&xmlHttp1.readyState==4){
	         if(xmlHttp1.status==200){
	            root =xmlHttp1.responseXML;
	            if (root == null){
	                return;  
	            }
	            host=getNodeText(root.getElementsByTagName('Host')[0]);
	            hosts=getNodeText(root.getElementsByTagName('Hosts')[0]);
	         }
	   }     
	}
	function doRequest_loginjs(form1,callback){
	   if(xmlHttp1&&form1){
	      window.status="正在请求数据，请您稍候....";
	      var urlArray=form1.action.split("/");
	      var urlRe=new Array(urlArray[0],urlArray[2]);
	      var url=urlRe.join("//");
	      var url = url+"/newent/main"+"?"+"transName=QueryNetHostIp"+"&ip="+location.hostname;
	      xmlHttp1.open("POST",url,true);
	      if(callback){
	         xmlHttp1.onreadystatechange = callback;
	      }else{
	         debug("系统错误！请设置回调函数！");
	      }
	      xmlHttp1.send(null);
	   }  
	   window.status="";
	   return ;
	}




/*1表示直通车、2表示专业版*/
function changeurl(str,obj){
	if(str=="1"){
   		self.location.href="https://"+host+"/newent/"+obj+NEW_SIMPLIFY_LOGIN;
   	} else if(str == '2'){
	   	self.location.href="https://"+host+"/newent/"+obj+NEW_PROFESSIONAL_LOGIN;
	}
}

function changeurlNew(str,obj){
	if(str == "1"){
   		self.location.href="https://"+host+"/newent/"+obj+NEW_SIMPLIFY_LOGIN_NEW;
   	} else if(str == '2'){
	   	self.location.href="https://"+host+"/newent/"+obj+NEW_PROFESSIONAL_LOGIN_NEW;
	}
}

function changeurlfin(str,obj){
	if(str == "1"){
   		self.location.href="https://"+host+"/newent/"+obj+FIN_SIMPLIFY_LOGIN;
   	} else if(str == '2'){
	   	self.location.href="https://"+host+"/newent/"+obj+FIN_PROFESSIONAL_LOGIN;
	}
}

function changeurlfinNew(str,obj){
	if(str == "1"){
   		self.location.href="https://"+host+"/newent/"+obj+NEW_FIN_SIMPLIFY_LOGIN;
   	} else if(str == '2'){
	   	self.location.href="https://"+host+"/newent/"+obj+NEW_FIN_PROFESSIONAL_LOGIN;
	}
}

function changeurlosa(str,obj){
    if(str == "1"){
   		self.location.href="https://"+host+"/newent/"+obj+OSA_SIMPLIFY_LOGIN;
   	} else if(str == '2'){
	   	self.location.href="https://"+host+"/newent/"+obj+OSA_PROFESSIONAL_LOGIN;
	}
}

function changeurlosaNew(str, obj){
    if(str == "1"){
   		self.location.href="https://"+host+"/newent/"+obj+NEW_OSA_SIMPLIFY_LOGIN;
   	} else if(str == '2'){
	   	self.location.href="https://"+host+"/newent/"+obj+NEW_OSA_PROFESSIONAL_LOGIN;
	}
}

function showInfo(e,context,n1){
	e=e||windows.event;
	$("#LoginTip").css("display","block");
	$("#LoginTip").css("left",e.clientX -120 + n1 +"px");
	$("#LoginTip").css("top",e.clientY -100+"px");
	$("#LoginTip").text(context);
}

function hideInfo(){
	$("#LoginTip").css("display","none");
}

function emptyCertList(){
	var urlArray=form1.action.split("/");
	var url=new Array(urlArray[0],urlArray[2]);
	url=url.join("//");
	location.href=url+"/newent/errorNew.html"; 
}

/* 登陆页面轮播广告图片ajax联动获取 addby zjn 2018-4-17 09:56:05 */
$(function(){
	var ServiceSet = $("[name=ServiceSet]").val();//服务范围
	var Channel = $("[name=Channel]").val();//渠道
	var $jcarousel = $('.jcarousel');//登陆页面轮播图div
	var $imgs = $jcarousel.find("img");//登陆页面轮播图div-img标签
	$.ajax({
  		type:"post",
  		url:"/newent/main?transName=NewEntQueryLoginAdvertInfo&ServiceSet="+ServiceSet+"&Channel="+Channel,
  		dataType:"xml",
  		success:function(data){
  			var $LoginAdverList = data.getElementsByTagName("LoginAdverList");
  			switch ($LoginAdverList.length) {
			case 0:
				break;
			case 1:
				var imgsrc = getNodeText($LoginAdverList[0].getElementsByTagName("FilePath")[0]);
				var link = getNodeText($LoginAdverList[0].getElementsByTagName("Link_address")[0]);
				$imgs.eq(0).attr("src","/newent/www/"+imgsrc);
				$imgs.eq(0).parent().attr("href",link==''?'javascript:void(0)':link);
				if(link) $imgs.eq(0).parent().attr("target","_blank");
				break;
			default:
				for(var i=0;i<$LoginAdverList.length;i++){
					var imgsrc = getNodeText($LoginAdverList[i].getElementsByTagName("FilePath")[0]);
					var link = getNodeText($LoginAdverList[i].getElementsByTagName("Link_address")[0]);
					$imgs.eq(i).attr("src","/newent/www/"+imgsrc);
					$imgs.eq(i).parent().attr("href",link==''?'javascript:void(0)':link);
					if(link) $imgs.eq(i).parent().attr("target","_blank");
				}
				break;
			}
  			loginPageImgscroll();
		},
		error:function(data){
			loginPageImgscroll();
		}
  	});
});