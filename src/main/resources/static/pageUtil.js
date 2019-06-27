/**
 * 分页方法
 * @param all 全部数据
 * @param pageNum 页码
 * @param pageSize 每页记录数
 * @returns {*}
 */
function getPageDto(all, pageNum, pageSize) {
  if (all == null || all.length == 0) {
    return null;
  }
  var first = true;//是否首页
  var last = false;//是否尾页
  //当前页记录数
  var totalPages = Math.ceil(all.length / pageSize);//总共有几页
  var totalElements = all.length;//总共记录数
  var size = pageSize;//分页记录数
  var number = pageNum - 1 > 0 ? pageNum - 1 : 0;//当前页-1
  var sort = "";//排序字段

  if (pageNum != 1) {
    first = false;
  }
  if (pageNum == totalPages) {
    last = true;
  }

  var lastIndex = pageNum * pageSize > all.length ? all.length : pageNum * pageSize;
  log("last" + lastIndex);
  var startIndex = pageSize * (pageNum - 1);
  log("start" + startIndex);
  var temp = all.slice(startIndex, lastIndex);
  var content = temp;
  var numberOfElements = content.length;
  var pageDto = {
    first: first,
    last: last,
    totalPages: totalPages,
    totalElements: totalElements,
    size: size,
    number: number,
    content: content,
    numberOfElements: numberOfElements
  }
  return pageDto;
}
