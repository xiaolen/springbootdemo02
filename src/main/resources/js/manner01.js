// JavaScript Document
var colorbefore="#000000";
var colorafter="#000000"
var colorclick="#E33539"
function toggle(ID){
	target = document.all(ID);
	var menuLayers = document.all.tags("div");
    for (i=0; i<menuLayers.length; i++) {
		//alert(menuLayers[i].id+":"+menuLayers[i].display);
      if (menuLayers[i].id.indexOf("sub") != -1 && menuLayers[i].id!=target.id) {
        menuLayers[i].style.display = "";
      }
    }
	if (target.style.display=="") {
		target.style.display="block";
		var strnum=ID.substring(9);
		var submenuLayers=document.all("sm"+strnum);
		for (i=0; i<submenuLayers.length; i++) {
			submenuLayers[i].style.color=colorbefore;
			submenuLayers[i].parentElement.style.background="#FFF2e9";
		}
	} else {
		target.style.display="";
	}
}

function chgsmbg(obj){
	var i;
	var strTemp;
	var smsun;
	var elementID=obj.id;
	var index;
	if (elementID.indexOf("sm") != -1){
		//strTemp=elementID.substr(2,1);
		index=elementID.indexOf("-");
		strTemp=elementID.substring(2,index);
		smnum = document.all("sm"+strTemp);
		//alert(smnum.length);
		for (i=0; i<smnum.length; i++) {
			//alert(smnum[i].id+":"+smnum[i].style.color)			
			//if (smnum[i].style.color==colorclick || smnum[i].style.color==""){
			//alert("a");
			smnum[i].style.color=colorbefore;
			smnum[i].parentElement.style.background="#FFF2e9";			
			}
		//}
	}
	obj.style.color=colorclick;
	obj.parentElement.style.background="#ffffff";
}

