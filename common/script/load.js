/**
 * @param  {Date} date
 */
var to_date_string = function(date){
    return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + date.getHours() + "時" + date.getMinutes() + "分";
};
var update_date = function(){
    var last_update_date = new Date(document.lastModified);
    $("#copyright_year").empty().append(last_update_date.getFullYear());
    $("#last_modified").empty().append("更新日:" + to_date_string(last_update_date));
};
