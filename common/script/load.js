/**
 * @brief use Ajax(jQuey) to get external html and extract by id and insert by id.
 *
 * @param  {string} html_url url or lelative path or...
 * @param  {string[][]} insert_info_arr 2d-array like std::vector<std::array<std::string, 2>>.
 * @param  {string} lelative_path_to_root
 * @return none.
 */
var load_html_and_insert = function (html_url, insert_info_arr, lelative_path_to_root){
    $.ajax(html_url, {
        timeout : 1500,
        datatype: "html"
    }).then(function(data){
        var data_t = data.replace(/\.\//g, lelative_path_to_root);
        var out_html = $($.parseHTML(data_t));//parse1
        var i;
        for(i = 0; i < insert_info_arr.length; ++i){
            var size = insert_info_arr[i].length;
            if(size < 2 || 3 < size) continue;
            var $jqObj = $("#" + insert_info_arr[i][1]);
            if(size === 2 || insert_info_arr[i][2]) $jqObj.empty();
            $jqObj.append(out_html.filter("#" + insert_info_arr[i][0])[0].innerHTML);//insert
        }
    }, function(jqXHR, textStatus) {
        if(textStatus!=="success") {
            var txt = "<p>textStatus:"+ textStatus + "</p>" +
                "<p>status:"+ jqXHR.status + "</p>" +
                "<p>responseText : </p><pre>" + jqXHR.responseText.replace(/</g, "&lt;") +"</pre>";
            var i;
            for(i = 0; i < insert_info_arr.length; ++i){
                var size = insert_info_arr[i].length;
                if(size < 2 || 3 < size) continue;
                var $jqObj = $("#" + insert_info_arr[i][1]);
                if(size === 2 || insert_info_arr[i][2]) $jqObj.empty();
                $jqObj.append(txt);//insert
            }
        }
    });
};
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
/**
 * @param  {string} lelative_path_to_root
 * @param  {string[][]} insert_info_arr 2d-array like std::vector<std::array<std::string, 2>>.
 */
load_parts = function(lelative_path_to_root, insert_info_arr){
    if(lelative_path_to_root !== undefined){
        load_html_and_insert(
            lelative_path_to_root + "common/html/parts.html", 
            (insert_info_arr === undefined) ? [["page_body_sub", "page_body_sub"]] : insert_info_arr, 
            lelative_path_to_root
        );
    }
    update_date();
};
