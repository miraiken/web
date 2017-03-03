const cheerio = require("cheerio");
const fsp = require("fs-promise");
//http://qiita.com/hosomichi/items/84b05c1b0c09d26cd11e
//https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
const deepFreeze = (o) => {
    const oFrz = Object.assign({}, o);
    Object.keys(oFrz).forEach((key) => {
        if (oFrz.hasOwnProperty(key) && (typeof oFrz[key] === "object") && !Object.isFrozen(oFrz[key])) {
        oFrz[key] = deepFreeze(oFrz[key]);
        }
    });
    return Object.freeze(oFrz);
}

/**
 *
 * @param contents{string} HTML full text
 */
const parseHTML = (contents) => {
    const $ = cheerio.load(contents);
    let event_lists = [];
    $("#page_body_main > article").each(function(index){
        const project_info_main = $(this).find(".project_info_main")[0];
        const project_title = $(project_info_main).find(".project_title")[0];
        let event_list = {};
        event_list.id = $(this).attr("id");
        event_list.title = $(project_title).find("h2").text();
        event_list.org_name = $(project_title).find("p").text();
        event_list.introduce = $(project_info_main).find(".project_info_introduce > p").text();
        const table = $(this).find(".project_info_detail")[0];
        let table_header = [];
        const table_header_mapper = deepFreeze({
            "企画名": "name",
            "企画形態": "type",
            "対象年齢": "target_age"
        });
        event_list.projects = [];
        $(table).find("tr").each(function(i, row){
            $(row).find("td").each(function(j, col){
                const text = $(col).text().trim();
                if(0 === i) {
                    table_header[j] = text;
                }
                else {
                    if("No." !== table_header[j]){
                        if(null == event_list.projects[i - 1]) event_list.projects[i - 1] = {};
                        event_list.projects[i - 1][table_header_mapper[table_header[j]]] = text;
                    }
                }
            });
        });
        event_lists[index] = event_list;
    });
    return event_lists;
};

console.log("exhibition.htmlを読み込むよー");
fsp.readFile("exhibition.html").then((contents) => {
    console.log("パースを始めるよー");
    let event_lists = parseHTML(contents);
    console.log("情報を追加するゾイ！");
    const additional_information = {
        "文具研究同好会": {
            "もくねんさん": {
                "description": "もくねんさんという粘土を使ってストラップを作ります。",
                "required_time": "15分"
            },
            "消えるインク": {
                "description": "フリクションという消えるインクを使って実験します。"
            }
        }
    };
    for(const e of event_lists) if(additional_information.hasOwnProperty(e.org_name)){
        const info = additional_information[e.org_name];
        for(const p of e.projects) if(info.hasOwnProperty(p.name)){
            const i = info[p.name];
            if(i.hasOwnProperty("description")) p.description = i.description;
            p.required_time = (i.hasOwnProperty("required_time")) ? i.required_time : "-";
        }
    }
    console.log("JSON化するよー");
    const result_json = JSON.stringify(event_lists, null, '\t');
    fsp.writeFile("exhibition.json", "\ufeff" + result_json, { encoding: 'utf8' }).then(() => {
        console.log("かんせー！");
    })
});
