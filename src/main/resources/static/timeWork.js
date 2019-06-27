var work;

/*定时任务*/
function timeWork(method, time) {
    if (work != undefined && work != null) {
        clearInterval(work);
    }
    work = setInterval(method, time);
}