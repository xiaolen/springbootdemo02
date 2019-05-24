

function Cookie(document,name,hours)
{
  
    this.$document = document;
    this.$name = name;
    if (hours)
        this.$expiration = new Date((new Date()).getTime() + hours*3600000);
    else this.$expiration = null;
   
}

function Cookie(document,name,hours,path)
{
  
    this.$document = document;
    this.$name = name;
    this.$path = path;
    if (hours)
        this.$expiration = new Date((new Date()).getTime() + hours*3600000);
    else this.$expiration = null;
   
}

function _Cookie_store()
{
    var cookieval = "";
    for(var prop in this) {
        if ((prop.charAt(0) == '$') || ((typeof this[prop]) == 'function')) 
            continue;
        if (cookieval != "") cookieval += '&';
        cookieval += prop + ':' + escape(this[prop]);
    }
    var cookie = this.$name + '=' + cookieval;
    
     if (this.$path)
       cookie+= '; path='+this.$path;
    
    if (this.$expiration)
        cookie += '; expires=' + this.$expiration.toGMTString();
    this.$document.cookie = cookie;
}

function _Cookie_load()
{
    
    var allcookies = this.$document.cookie;
    if (allcookies == "") return false;

   
    var start = allcookies.indexOf(this.$name + '=');
    if (start == -1) return false;   
    start += this.$name.length + 1; 
    var end = allcookies.indexOf(';', start);
    if (end == -1) end = allcookies.length;
    var cookieval = allcookies.substring(start, end);

  
    var a = cookieval.split('&');    
    for(var i=0; i < a.length; i++)  
        a[i] = a[i].split(':');

 
    for(var i = 0; i < a.length; i++) {
        this[a[i][0]] = unescape(a[i][1]);
    }

 
    return true;
}

function storeUserCustom(id){
	CookieCsiiNetBank.LoginType = id;
	CookieCsiiNetBank.store();
}
 
new Cookie();
Cookie.prototype.store = _Cookie_store;
Cookie.prototype.load = _Cookie_load;

 CookieCsiiNetBank =  new Cookie(document, "spdb_login_spdb", 24*365*10,"/");
