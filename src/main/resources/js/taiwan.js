var map, cityList, roadList, tableDefautl, specialItemArr, specialStatus, nowSearchType, data, nowPageNum, nowPos, nowSerId;
var nowPages;
var iconArray = [];
var nowLevel = 10;
specialItemArr = [];
specialStatus = "";
(document).ready(function () {
    map();
    setInputEnter();
    showPage("default");
    setSpecialItem();
    ("#croadWord").click(function () {
        ("#croadWord").val("");
    });
    ("#zipSearch,#shopNameSearch,#shopNoSearch,#shopServiceSearch,#croadSearch,#landmarkSearch").click(function () {
        searchFunction(this.id);
    });
    ("#specialItemSearch").click(function () {
        if (nowSearchType != "") {
            searchFunction(nowSearchType);
        } else {
            // showAllCity();
            map.ShowCityList(specialItemArr, "ShowAllCityBySpecial");

        }
    });
});
function ShowAllCityBySpecial(d) {
    ("#showServiceCity").css("display", "none");
    showLoading();
    var c = "";
    var _cityList = [];
    for (var i = 1; i < cityList.length; i += 1) {
        var _c = cityList[i].split(",")[1];
        for (var k = 0; k < d.length; k += 1) {
            if (_c == d[k].city) {
                _cityList.push(_c);
                break;
            }
        }
    };
    for (var i = 0; i < _cityList.length; i += 1) {
        var v = _cityList[i];
        c += "<li><a href='#' onclick='showByCity(\"" + v + "\")'>" + v + "</a></li>";
    }
    ("#specialCityList").html(c);
    showPage("specialItem");
    ("#showShopList").css("display", "none");
    ("#b_service").css("display", "block");
}
function showAllCity() {
    //顯示所有城市列表
    ("#showServiceCity").css("display", "none");
    showLoading();
    var c = "";
    for (var i = 1; i < cityList.length; i += 1) {
        var v = cityList[i].split(",")[1];
        c += "<li><a href='#' onclick='showByCity(\"" + v + "\")'>" + v + "</a></li>";
    }
    ("#specialCityList").html(c);
    showPage("specialItem");
    ("#showShopList").css("display", "none");
    ("#b_service").css("display", "none");
}
function setInputEnter() { //按enter不要有反應
    ("#zip,#shopName,#shopNo,#shopService,#croadWord,#croadWord,#landmarkWord").keydown(function (e) {
        if (e.keyCode == 13) {
            return false;
        }
    });
}
function showSpecailByCity(city) {
    city = city.replace(/^\s+|\s+/g, "");
    showLoading();
    var c = "";
    for (var i = 1; i < cityList.length; i += 1) {
        var v = cityList[i].split(",")[1];
        c += "<li><a href='#' onclick='showByCity(\"" + v + "\")'>" + v + "</a></li>";
    }
    ("#specialCityList").html(c);
    ("[name='showCity']").html(city);
    map.getShopSpecialList(city, specialItemArr, "getBySpeailItem");
}
function showByCity(city) {
    ("#showServiceCity").css("display", "block");
    city = city.replace(/^\s+|\s+/g, "");
    ("[name='showCity']").html(city);
    searchFunction("adminArea")
}
function showLoading() {
    var w = ("#map_right").width();
    var h = (window).height() - 200;
    ("#loadingDiv").css({ "width": w, "height": h, "display": "block" });
    var l = (w - ("#loading").width()) / 2;
    var t = (h - ("#loading").height()) / 2;
    ("#loading").css({ "left": l, "top": t });
}
function hiddenLoading() {
    ("#loadingDiv").css("display", "none");
}
function searchFunction(id) {
    var v = "";
    var a = "";
    var r = "";
    nowSearchType = id;
    showLoading();
    switch (id) {
        case "zipSearch":
            v = ("#zip").val();
            a = "請輸入郵遞區號";
            r = "符合郵遞區號為<a href='#'>" + v + "</a>的店舖，共有";
            ("#b_otherContent").html("郵遞區號");
            break;
        case "shopNameSearch":
            v = ("#shopName").val();
            a = "請輸入店名";
            r = "符合店名為<a href='#'>" + v + "</a>的店舖，共有";
            ("#b_otherContent").html("店名");
            break;
        case "shopNoSearch":
            v = ("#shopNo").val();
            a = "請輸入店號";
            r = "符合店號為<a href='#'>" + v + "</a>的店舖，共有";
            ("#b_otherContent").html("店號");
            break;
        case "shopServiceSearch":
            v = ("#shopService").val();
            a = "請輸入服務編號";
            r = "符合服務編號為<a href='#'>" + v + "</a>的店舖，共有";
            ("#b_otherContent").html("服務編號");
            break;
        case "croadSearch":
            v = ("#croadWord").val();
            a = "請輸入街道路名";
            r = "符合街道路名為<a href='#'>" + v + "</a>的店舖，共有";
            break;
        case "adminArea":
            var city = ("[name='showCity']").html();
            v = "no";
            map.getShopTownList(city, specialItemArr, "storeTownList");
            break;
        case "byCityTown":
            v = "no";
            var city = ("[name='showCity']").html();
            var town = ("[name='showTown']").html();
            map.getShopList(city, town, "", specialItemArr, "showStoreList");
            break;
        case "byRoad":
            v = "no";
            var city = ("[name='showCity']").html();
            var town = ("[name='showTown']").html();
            var road = ("[name='showRoad']").html();
            r = "符合路名為<a href='#' onclick='searchFunction(\"byCityTown\")'>" + road + "</a>的店舖，共有";
            map.getShopList(city, town, road, specialItemArr, "showSingleRoadStore");
            break;
        case "landmarkSearch":
            v = ("#landmarkWord").val();
            a = "請輸入關鍵字";
            if (v != "") {
                r = "在地標<a href='#'>" + v + "</a>的附近店舖，共有";
                var city = ("[name='showCity']").html();
                ("[name='showLandmark']").html(v);
                map.landmarkList(city, "", v, "landmarkList");
            } else {
                hiddenLoading();
            }
            break;
        case "landmarkMap":
            v = ("[name='showLandmark']").html();
            r = "在地標<a href='#'>" + v + "</a>的附近店舖，共有";
            map.showStore(specialItemArr, "showLandmarkStore");
            break;
        case "map":
            v = "no";
            map.showStore(specialItemArr, "addSmallShop");
            break;
    }
    if (v == "") {
        alert(a);
    } else {
        ("[name='showOther']").html(v);
        switch (id) {
            case "zipSearch":
                getCityByZip(v, "getCityByZipReturn");
                break;
            case "shopNameSearch":
                map.getShopName(v, specialItemArr, "getByName");
                break;
            case "shopNoSearch":
                map.getShopNo(v, specialItemArr, "getByName");
                break;
            case "shopServiceSearch":
                map.getServiceNo(v, specialItemArr, "getByName");
                break;
            case "croadSearch":
                getAddrXY2(v, "croadStep");
                break;

        }
        ("#conditionDiv").html(r);
    }
}
function landmarkList(o) {
    var c = "";
    ("#landmarkCount").html(o.length);
    for (var i = 0; i < o.length; i += 1) {
        c += "<li><a href='#' onclick='showLandmarkMap(" + o[i].px + "," + o[i].py + ",\"" + o[i].landmark + "\")'>" + o[i].landmark + "</a></li>";
    }
    ("#landmarkList").html(c);
    showPage("landmarkList");
}
function croadStep(o) {
    var v = ("#croadWord").val();
    var r = o.locate.road;
    var c = o.locate.baddr2;
    var t = o.locate.bname2;
    if (r != "") {
        if (v.indexOf(c) == -1) {
            c = "";
        } else {
            v = v.replace(c, "");
        }
        if (v.indexOf(t) == -1) {
            t = "";
        } else {
            v = v.replace(t, "");
        }
        if (v.indexOf(r) == -1) {
            r = v.trim();
        }
        var pos = 0;
        for (var i = 0; i < r.length; i += 1) {
            var _s = r.substring(i, i + 1);
            if (isNumber(_s)) {
                pos = i;
                break;
            }
        }
        if (pos !== 0) {
            r = r.substring(0, pos);
        }
        if (c != "" || t != "") {
            map.getShopListByRoad(c, t, r, specialItemArr, "getByName");
        } else {
            map.getShopListByRoad(c, t, r, specialItemArr, "groupByCity");
        }
    } else {
        alert("您輸入的不是完整地址，請輸入縣市及街道名稱。Ex:台北市中山北路二段、新北市中正路。謝謝!");
        hiddenLoading();
    }
    hiddenLoading();
}
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
function groupByCity(d) {
    var cityArr = [];
    var r = "";
    for (var i = 0; i < d.length; i += 1) {
        var ctiy = d[i].addr.substring(0, 3);
        r = d[i].road;
        var f = jQuery.inArray(ctiy, cityArr);
        if (f == -1) {
            cityArr.push(ctiy);
        }
    }
    var c = "";
    for (var i = 0; i < cityArr.length; i += 1) {
        var v = cityArr[i];
        c += "<li><a href='#' onclick='map.getShopListByRoad(\"" + v + "\",\"\",\"" + r + "\", specialItemArr, \"getByNameRoad\");'>" + v + "</a></li>";
    }
    ("#roadConditionList ul").html(c);
    ("#b_otherContent").html("查詢路名");
    showPage("road");
}
function resetSpecialItem() {
    var checkbox = ("[name='specialItem']");
    checkbox.each(function () {
        (this).attr('checked', false);
    });
    specialItemArr = [];
}
function setSpecialItem() {
    ("[name='specialItem']").click(function () {
        var s = this.value;
        var f = jQuery.inArray(s, specialItemArr);
        if (f == -1) {
            specialItemArr.push(s);
        } else {
            specialItemArr = jQuery.grep(specialItemArr, function (value) {
                return value != s;
            });
        }
        if (nowPages != "default") {
            ("#specialItemSearch").click();
        }
        specialStatus = "";
        for (var i = 0; i < specialItemArr.length; i += 1) {
            var _item = specialItemArr[i].toLowerCase();
            switch (_item) {
                case "Preorder":
                    specialStatus += "<a href='#'>商品預售</a>";
                    break;
                case "sharepot":
                    specialStatus += "<a href='#'>咖啡分享壺</a>";
                    break;
                case "coffeedeliver":
                    specialStatus += "<a href='#'>咖啡外送</a>";
                    break;
                case "SingleOrigin":
                    specialStatus += "<a href='#'>單品咖啡</a>";
                    break;
                case "coffee":
                    specialStatus += "<a href='#'>Let's Café</a>";
                    break;
                case "sweetpotato":
                    specialStatus += "<a href='#'>夯番薯</a>";
                    break
                case "spicykantoni":
                    specialStatus += "<a href='#'>麻辣關東煮</a>";
                    break
                case "kantoni":
                    specialStatus += "<a href='#'>關東煮</a>";
                    break
                case "icecream":
                    specialStatus += "<a href='#'>Fami 霜淇淋 單口味</a>";
                    break;
                case "twoice":
                    specialStatus += "<a href='#'>Fami 霜淇淋 雙口味</a>";
                    break;
                case "freshfruit":
                    specialStatus += "<a href='#'>鮮水果</a>";
                    break;
                case "tanhou":
                    specialStatus += "<a href='#'>天和鮮物</a>";
                    break;
                case "wifi":
                    specialStatus += "<a href='#'>Fami-WiFi</a>";
                    break;
                case "photo":
                    specialStatus += "<a href='#'>相片立可得</a>";
                    break;
                case "rest":
                    specialStatus += "<a href='#'>休憩區</a>";
                    break;
                case "toilet":
                    specialStatus += "<a href='#'>廁所</a>";
                    break;
                case "parking":
                    specialStatus += "<a href='#'>停車場</a>";
                    break;
                case "muffin":
                    specialStatus += "<a href='#'>鬆餅</a>";
                    break;
                case "sunmai":
                    specialStatus += "<a href='#'>金色三麥</a>";
                    break;
                case "bbqchicken":
                    specialStatus += "<a href='#'>bb.q CHICKEN</a>";
                    break;
            }
            specialStatus += "、";
        }
        specialStatus = specialStatus.substring(0, specialStatus.length - 1);
        ("[name='showService']").html(specialStatus);
    });
}
function getCityByZipReturn(d) {
    if (d.length != 0) {
        if ([0].COUNTY != "" && d[0].TOWN != "") {
            searchByCity(d[0].COUNTY, d[0].TOWN);
        } else {
            alert("錯誤的郵遞區號");
            hiddenLoading();
        }
    } else {
        alert("錯誤的郵遞區號");
        hiddenLoading();
    }
}
function getBySpeailItem(d) {
    var c = retrunStr(d, true, 0, d.length);
    ("#showShopList table").html(c);
    ("[name='StoreNum']").html(d.length);
    showPage("specialItem");
}
function showZipCity(d) {
    ("[name='showCity']").html(d[0].COUNTY);
    ("[name='showTown']").html(d[0].TOWN);
}
function getByName(d) {
    if (d.length == 1) {
        getCityByZip(d[0].post, "showZipCity");
        nowSerId = d[0].SERID;
        showSingleShop(d[0]);
        if (nowLevel < 10) {
            nowLevel = 10;
        }
        map.centerMap(new Point(d[0].px, d[0].py), nowLevel);
        map.showStore(specialItemArr, "addSmallShop");
    } else if (d.length == 0) {
        alert("沒有符合條件的店鋪");
    } else {
        var r = "<span class='result'>" + ("#conditionDiv").html() + "<a href='#'>" + d.length + "</a>家</span>";
        var c = retrunStr(d, true, 0, d.length);
        ("#showShopList table").html(c);
        ("#conditionDiv").html(r);
        showPage("storeList");
    }
    hiddenLoading();
}
function getByNameRoad(d) {
    var city = d[0].addr.substring(0, 3);
    ("[name='showCity']").html(city);
    if (d.length == 1) {
        getCityByZip(d[0].post, "showZipCity");
        nowSerId = d[0].SERID;
        showSingleShop(d[0]);
        if (nowLevel < 10) {
            nowLevel = 10;
        }
        map.centerMap(new Point(d[0].px, d[0].py), nowLevel);
        map.showStore(specialItemArr, "addSmallShop");
    } else if (d.length == 0) {
        alert("沒有符合條件的店鋪");
    } else {
        var r = "<span class='result'>" + ("#conditionDiv").html() + "<a href='#'>" + d.length + "</a>家</span>";
        var c = retrunStr(d, true, 0, d.length);
        ("#showShopList table").html(c);
        ("#conditionDiv").html(r);
        showPage("storeList2");
    }
    hiddenLoading();
}
function showPage(v) {
    nowPages = v;
    ("#adminArea").css("display", "none");
    ("#roadSearchBar").css("display", "none");
    ("#taiwanMap").css("display", "none");
    ("#searchList").css("display", "none");
    ("#chgSearchList").css("display", "none");
    ("#streetArea").css("display", "none");
    ("#showShopList").css("display", "none");
    ("#conditionDiv").css("display", "none");
    ("#specialConditionList").css("display", "none");
    ("#MapLayer").css("display", "none");

    ("#breadCrumbs").css("display", "none");
    ("#b_city").css("display", "none");
    ("#b_town").css("display", "none");
    ("#b_store").css("display", "none");
    ("#b_landmark").css("display", "none");
    ("#b_other").css("display", "none");
    ("#b_service").css("display", "none");
    ("#specialSearch").css("display", "none");

    ("#landmarkListDiv").css("display", "none");
    ("#specialList").css("display", "none");
    ("#scaleBar").css("display", "none");
    ("#specialSearch").css("display", "none");
    ("#roadConditionList").css("display", "none");
    ("#specialListShow").html("依特定服務項目篩選");
    switch (v) {
        case "default": //首頁
            nowSearchType = "";
            ("#specialListShow").html("依特定服務項目查詢");
            ("#specialSearch").css("display", "block"); //特別在首頁顯示
            ("#taiwanMap").css("display", "block");
            ("#roadSearchBar").css("display", "block");
            ("#searchList").css("display", "block");
            ("#specialList").css("display", "block");
            ("#page_bu").css("display", "none");
            resetSpecialItem(); //重置checkbox
            break;
        case "adminArea": //顯示行政區搜尋
            ("#breadCrumbs").css("display", "block");
            ("#b_city").css("display", "block");

            ("#adminArea").css("display", "block");
            ("#chgSearchList").css("display", "block");
            ("#specialList").css("display", "block");
            ("#page_bu").css("display", "none");
            break;
        case "streetArea": //顯示街道搜尋
            ("#breadCrumbs").css("display", "block");
            ("#b_city").css("display", "block");
            ("#b_town").css("display", "block");


            ("#chgSearchList").css("display", "block");
            ("#streetArea").css("display", "block");
            ("#showShopList").css("display", "block");
            ("#specialList").css("display", "block");
            break;
        case "singleRoad":
            ("#breadCrumbs").css("display", "block");
            ("#b_city").css("display", "block");
            ("#b_town").css("display", "block");

            ("#chgSearchList").css("display", "block");
            ("#showShopList").css("display", "block");
            ("#conditionDiv").css("display", "block");
            ("#specialList").css("display", "block");
            break;
        case "storeList":
            ("#breadCrumbs").css("display", "block");
            ("#b_other").css("display", "block");

            ("#chgSearchList").css("display", "block");
            ("#showShopList").css("display", "block");
            ("#conditionDiv").css("display", "block");
            ("#specialList").css("display", "block");
            break;
        case "storeList2":
            ("#breadCrumbs").css("display", "block");
            ("#b_city").css("display", "block");
            ("#b_other").css("display", "block");

            ("#chgSearchList").css("display", "block");
            ("#showShopList").css("display", "block");
            ("#conditionDiv").css("display", "block");
            ("#specialList").css("display", "block");
            break;
        case "specialItem":
            ("#b_service").css("display", "block");
            ("#breadCrumbs").css("display", "block");

            ("#chgSearchList").css("display", "block");
            ("#showShopList").css("display", "block");
            ("#specialList").css("display", "block");
            ("#specialConditionList").css("display", "block");
            break;
        case "map":
            ("#breadCrumbs").css("display", "block");
            ("#b_city").css("display", "block");
            ("#b_town").css("display", "block");
            ("#b_store").css("display", "block");

            ("#specialSearch").css("display", "none");
            ("#page_bu").css("display", "none");
            ("#chgSearchList").css("display", "block");
            ("#showShopList").css("display", "block");
            ("#specialList").css("display", "block");
            ("#MapLayer").css("display", "block");
            var p = ("#MapLayer").position();
            var l = p.left + ("#MapLayer").width() - 32;
            var t = p.top + ((("#MapLayer").height()) / 2) - 32;
            ("#scaleBar").css({ "display": "block", "left": l, "top": t });
            break;
        case "landmarkList":
            ("#breadCrumbs").css("display", "block");
            ("#b_landmark").css("display", "block");
            ("#b_city").css("display", "block");

            ("#chgSearchList").css("display", "block");
            ("#landmarkListDiv").css("display", "block");
            break;
        case "landmarkMap":
            ("#breadCrumbs").css("display", "block");
            ("#b_landmark").css("display", "block");
            ("#b_city").css("display", "block");

            ("#chgSearchList").css("display", "block");
            ("#showShopList").css("display", "block");
            ("#conditionDiv").css("display", "block");
            ("#specialList").css("display", "block");
            break;
        case "road": //只輸入路名沒有縣市
            ("#breadCrumbs").css("display", "block");
            ("#b_other").css("display", "block");

            ("#roadConditionList").css("display", "block");
            ("#chgSearchList").css("display", "block");
            ("#specialList").css("display", "block");
            ("#page_bu").css("display", "none");
            break;
    }
    hiddenLoading();
}
function map() {
    map = new iMap(document.getElementById("MapLayer"));
    var iEvent = new Event();
    iEvent.addListener(map, "scaled", function () {
        nowLevel = map.getZoomLevel();
    });
    map.centerMap(new Point(121.52, 25.035), 10);
    cityList = map.CityList().split(";");
}
function showMap(pos) {
    nowSearchType = "map";
    nowPos = pos;
    getCityByZip(data[pos].post, "showZipCity");
    nowSerId = data[pos].SERID;
    var p = new Point(data[pos].px, data[pos].py);
    map.centerMap(p, 10);
    map.showStore(specialItemArr, "addSmallShop");
}
function showLandmarkMap(x, y, landmark) {
    nowSearchType = "landmarkMap";
    ("[name='showLandmark']").html(landmark);
    var r = "在地標<a href='#'>" + landmark + "</a>的附近店舖，共有";
    ("#conditionDiv").html(r);
    var p = new Point(x, y);
    map.centerMap(p, 10);
    map.showStore(specialItemArr, "showLandmarkStore");
}
function showLandmarkStore(d) {
    var r = "<span class='result'>" + ("#conditionDiv").html() + "<a href='#'>" + d.length + "</a>家</span>";
    var c = retrunStr(d, true, 0, d.length);
    ("#showShopList table").html(c);
    ("#conditionDiv").html(r);
    showPage("landmarkMap");
}
function showSingleShop(d) {
    showPage("map");
    var p = new Point(d.px, d.py);
    if (tableDefautl == null) {
        tableDefautl = ("#showShopList table").html();
    }
    var c = tableDefautl; //顯示單店鋪資料
    c += "<tr>";
    c += " <td class='graybox'>" + d.NAME + "</td>";
    c += " <td class='graybox'>";
    c += "  店舖號：" + d.pkey + "<br/>";
    c += "  服務編號：" + d.SERID + "<br/>";
    c += "  地址：" + d.addr + "<br/>";
    if (d.POSTel != null && d.POSTel.length >= 7) {
        c += "  電話：" + d.POSTel + ", " + d.TEL;
    } else {
        c += "  電話：" + d.TEL;
    }
    c += "</td>";
    c += " <td class='graybox'>";
    c += conditionStr(d.all);
    c += "</td>";
    c += "</tr>";
    ("#showShopList table").html(c);
}
function addSmallShop(d) {
    resetIcon();
    data = d;
    if (d.length == 0) {
        //("#showShopList table").html("");
        //if (nowLevel > 8) {
        //    //alert("附近無您選擇的條件店鋪");
        //}
    }
    var isCenterShopExist = false;
    var iEvents = new Event();
    for (var i = 0; i < d.length; i += 1) {
        var p = new Point(d[i].px, d[i].py);
        var img = "images/FMIconSmall.gif";
        if (nowSerId == d[i].SERID) {
            img = "images/FMIconBig.gif";
            showSingleShop(d[i]);
            isCenterShopExist = true;
        }
        var content = "<div class='storeInfo'>" + d[i].NAME + "<br/>" + d[i].addr + "<br/>" + "</div>";

        var m = new Marker(p, d[i].SERID, content, img, "Position1");
        if (nowSerId != d[i].SERID) {
            iEvent.addListener(m, "mouseover", function () {
                this.openTip();
            });
            iEvent.addListener(m, "mouseout", function () {
                this.closeTip();
            });
            iEvent.addListener(m, "mouseup", function () {
                nowSerId = this.contentinfo;
                if (nowLevel < 10) {
                    nowLevel = 10;
                }
                map.centerMap(new Point(this.lng, this.lat), nowLevel);
                map.showStore(specialItemArr, "addSmallShop");
            });
        }
        iconArray.push(m);
        map.addOverlay(m);
    }
    //if (!isCenterShopExist && d.length != 0 && nowSerId != null) {
    //    var p = new Point(d[0].px, d[0].py);
    //    var img = "images/FMIconBig.gif";
    //    showSingleShop(d[0]);
    //    var m = new Marker(p, "TestMark", "", img, "Position1");
    //    iconArray.push(m);
    //    map.addOverlay(m);
    //}
    iEvent.removeListener(map, "mousemoveend");
    iEvent.addListener(map, "mousemoveend", function () {
        map.showStore(specialItemArr, "addSmallShop");
    });
    hiddenLoading();
}

function resetIcon() {
    for (var i = 0; i < iconArray.length; i += 1) {
        map.removeOverlay(iconArray[i]);
    }
    iconArray = [];
}
function showAdminArea(city) {
    //縣市條件1:顯示有店鋪的行政區
    city = city.replace(/^\s+|\s+/g, "");
    ("[name='showCity']").html(city); //所有name = showCity的顯示
    searchFunction("adminArea");
}

function searchByCity(city, town) {
    //縣市條件2:顯示有店鋪的路
    city = city.replace(/^\s+|\s+/g, "");
    ("[name='showCity']").html(city); //所有name = showCity的顯示
    ("[name='showTown']").html(town);
    searchFunction("byCityTown");
}
function searchByRoad(city, town, road) {
    //縣市條件3:顯示在某路的店鋪
    ("[name='showRoad']").html(road);
    var r = "符合路名為<a href='#' onclick='searchByCity(\"" + city + "\",\"" + town + "\")'>" + road + "</a>的店舖，共有";
    ("#conditionDiv").html(r);
    searchFunction("byRoad");
}
function storeTownList(d) {
    //縣市結果1:顯示有店鋪的行政區
    var city = ("[name='showCity']").html();
    var c = "";
    for (var i = 0; i < d.length; i += 1) {
        var t = d[i].town
        c += "<li><a href='#' onclick='searchByCity(\"" + city + "\",\"" + t + "\",\"\")'>" + t + "</a></li>";
    }
    if (i == 0) {
        c = "<li>該縣市沒有您選擇的服務項目店鋪，<a href='#' onclick='showAllCity()'>回上一頁</a></li>";
    }
    ("#showTownList").html(c);
    showPage("adminArea");

}
function showStoreList(d) {
    //縣市結果2:顯示有店鋪的路
    var ctiy = ("[name='showCity']").html();
    var town = ("[name='showTown']").html();
    roadList = [];
    var c = retrunStr(d, true, 0, d.length);
    ("[name='showShopNum']").html(d.length);
    for (var i = 0; i < d.length; i += 1) {
        var f = jQuery.inArray(d[i].road, roadList);
        if (f == -1) {
            roadList.push(d[i].road);
        }
    }
    ("#showShopList table").html(c);
    c = "";
    for (var i = 0; i < roadList.length; i += 1) {
        var r = roadList[i];
        if (r == "") {
            r = "無路名店鋪";
        }
        c += "<li><a href='#' onclick='searchByRoad(\"" + ctiy + "\",\"" + town + "\",\"" + r + "\")'>" + r + "</a></li>";
    }
    ("#showRoadList").html(c);
    showPage("streetArea");
}
function showSingleRoadStore(d) {
    //縣市結果3:顯示在某路的店鋪
    ("[name='showShopNum']").html(d.length);
    var c = retrunStr(d, true, 0, d.length);
    var r = "<span class='result'>" + ("#conditionDiv").html() + "<a href='#'>" + d.length + "</a>家</span> ";
    ("#conditionDiv").html(r);
    ("#showShopList table").html(c);
    showPage("singleRoad");
}
function prePage() { //上一頁
    nowPageNum -= 1;
    if (nowPageNum < 1) {
        nowPageNum = 1;
        alert("已經是第一頁");
    }
    createPageCount(data.length);
    chgPage(nowPageNum);
}
function nextPage() { //下一頁
    nowPageNum += 1;
    var count = data.length;
    var pageMod = count % 4;
    var page = parseInt(count / 4) + 1;
    if (pageMod != 0) {
        page += 1;
    }
    if (nowPageNum == page) {
        alert("已經是最後一頁");
        nowPageNum = page - 1;
    }
    createPageCount(data.length);
    chgPage(nowPageNum);
}
function chgPage(p) { //跳頁
    nowPageNum = p;
    var startCount = (p - 1) * 4;
    var endCount = p * 4;
    if (tableDefautl == null) {
        tableDefautl = ("#showShopList table").html();
    }
    var c = retrunStr(data, false, startCount, endCount);
    createPageCount(data.length);
    ("#showShopList table").html(c);
}
function createPageCount(count) {  //產生頁數
    var pageMod = count % 4;
    var page = parseInt(count / 4) + 1;
    if (pageMod != 0) {
        page += 1;
    }
    var p = "";
    for (var i = 1; i < page; i += 1) {
        if (i == nowPageNum) { //目前選擇頁數
            p += "<li class='page_bu_select'>" + i + "</li>";
        } else {
            p += "<li><a href='#' onclick='chgPage(" + i + ")'>" + i + "</a></li>";
        }
    }
    ("#page_bu_content").html(p);
    ("#page_bu").css("display", "block");
}
function retrunStr(d, createFirst, startCount, endCount) {
    ("#page_bu").css("display", "none");
    if (tableDefautl == null) {
        tableDefautl = ("#showShopList table").html();
    }
    var c = tableDefautl;
    data = d;
    var count = d.length;
    if (createFirst && count > 4) { //第一次產生,看店鋪列表是否>4決定是否有頁數
        nowPageNum = 1;
        createPageCount(count);
        endCount = 4;
    }
    if (endCount > count) {
        endCount = count;
    }

    for (var i = startCount; i < endCount; i += 1) {
        c += "<tr onclick='showMap(" + i + ")' style='cursor:pointer'>";
        c += " <td class='graybox'>" + d[i].NAME + "</td>";
        c += " <td class='graybox'>";
        c += "   <table width='100%'> ";
        c += "     <tr> ";
        c += "       <td> 店舖號：" + d[i].pkey + "</td>";
        c += "       <td align='right'><div class='shop_add_map'><a href='#' onclick='showMap(" + i + ")'><span class='add_map_word'>地圖檢視</span></a></div></td>";
        c += "     </tr> ";
        c += "   </table> ";
        //c += "  店舖號：" + d[i].pkey + "<br/>";
        c += "  服務編號：" + d[i].SERID + "<br/>";
        c += "  地址：" + d[i].addr + "<br/>";
        if (d[i].POSTel != null && d[i].POSTel.length >= 7) {
            c += "  電話：" + d[i].POSTel + " , " + d[i].TEL;
        } else {
            c += "  電話：" + d[i].TEL;
        }
        c += "</td>";
        c += " <td class='graybox'>";
        c += conditionStr(d[i].all);
        c += "</td>";
        c += "</tr>";
    }
    return c;
}
function conditionStr(all) { //回傳有此項服務要產生什麼字串
    var c = "";
    if (all != null) {
        all = all.toString().toLowerCase();
        var v = all.split(",");
        var a = [];
        for (var i = 0; i < v.length; i += 1) {
            var found = jQuery.inArray(v[i], a);
            if (found == -1) {
                a.push(v[i]);
            }
        }
        for (var i = 0; i < a.length; i += 1) {
            switch (a[i]) {
                case "coffee":
                    c += "<span class='store01'>1</span>";
                    break;
                case "sweetpotato":
                    c += "<span class='store02'></span>";
                    break;
                case "photo":
                    c += "<span class='store08'></span>";
                    break;
                case "wifi":
                    c += "<span class='store07'></span>";
                    break;
                case "icecream":
                    c += "<span class='store05'></span>";
                    break;
                case "twoice":
                    c += "<span class='store10'></span>";
                    break;
                case "rest":
                    c += "<span class='store04'></span>";
                    break;
                case "toilet":
                    c += "<span class='store03'></span>";
                    break;
                case "parking":
                    c += "<span class='store09'></span>";
                    break;
                case 'veg':
                    c += "<span class='store06'></span>";
                    break;
                case 'muffin':
                    c += "<span class='store11'></span>";
                    break;
                case "coffeedeliver":
                    c += "<span class='store12'></span>";
                    break;
                case "sharepot":
                    c += "<span class='store13'></span>";
                    break;
                case 'sunmai':
                    c += "<span class='store14'></span>";
                    break;
                case 'kantoni':
                    c += "<span class='store15'></span>";
                    break;
                case "singleorigin":
                    c += "<span class='store16'></span>";
                    break;
                case "freshfruit":
                    c += "<span class='store17'></span>";
                    break;
                case "tanhou":
                    c += "<span class='store18'></span>";
                    break;
                case "bbqchicken":
                    c += "<span class='store19'></span>";
                    break;
                case "spicykantoni":
                    c += "<span class='store20'></span>";
                    break;
                case "preorder":
                    c += "<span class='store21'></span>";
                    break;
            }
        }
    }
    return c;
}
function showHidePost() {
    if (("#openPost").css("display") == "none") {
        ("#openPost").show(500);
        ("#closePost").css("display", "none");
    } else {
        ("#closePost").css("display", "block");
        ("#openPost").hide();
    }

}