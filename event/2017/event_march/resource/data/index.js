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
                "description": "フリクションという消えるインクを使って実験します。",
                "required_time": "20分"
            }
        },
        "地球科学研究部": {
            "鉱物を観察しよう": {
                "description": "部所有の鉱物並びに化石を展示しそれを観察したり実際に触って身近に感じてもらう",
                "required_time": "5分"
            },
            "竜巻と雲を観察しよう": {
                "description": "竜巻発生装置によって竜巻を再現し解説も含めて気象事項を身近に感じてもらう",
                "required_time": "5分"
            },
            "エネルギーを感じよう": {
                "description": "白熱電球とLED電球の消費電力の違いを、実際に手回し発電機を用いて発電することによって体感してもらう。",
                "required_time": "5分"
            },
            "霧箱装置を観察しよう": {
                "description": "霧箱装置を利用してウラン鉱から出る放射線を観察してもらい放射線に対する理解を深めてもらう",
                "required_time": "5分"
            }
        },
        "サイエンスコミュニケーションサークル　chibi lab.": {
            "気体の重さについての実験": {
                "description": "ヘリウム、空気、二酸化炭素を詰めた風船の重さの違いを見せる。",
                "required_time": "5分"
            },
            "二酸化炭素の発生装置": {
                "description": "重曹とクエン酸の反応で二酸化炭素を発生させる。発生したガスで大きな風船を膨らませる。",
                "required_time": "5分"
            },
            "ドライアイスの実験": {
                "description": "ドライアイスを用いて、ゴムボール、花など身の回りの物を凍らせてみる。水、洗剤、グリセリンの混合液を用いてシャボン玉を作り、これをドライアイスの気化で生じたガスで膨らませる。",
                "required_time": "10分"
            },
            "雲を作る実験": {
                "description": "加圧したエタノール蒸気を断熱膨張により急冷し、ペットボトル内にエタノールの雲を作る。子供にこれを実際に体験してもらう。砕いたドライアイスと熱湯を混合し、雲を発生させる。",
                "required_time": "10分"
            },
            "風船とおぼん": {
                "description": "風船を乗せたトレーを床に落とす。トレーに守られて風船は空気抵抗を受けないので両者は同時に落下する。空気が入った風船、ヘリウムが入った風船の２パターンを見せる。",
                "required_time": "5分"
            },
            "風船と台車": {
                "description": "台車に風船を取り付けて、台車を押す。風船は左右どちらかに振れるが、空気より重い気体が入った風船と軽い気体が入った風船は挙動が異なる。",
                "required_time": "5分"
            },
            "風船とドライヤー": {
                "description": "ドライヤーで天井に向けて風を送り、風船を浮かべる。ドライヤーの風の向きを斜めにすると、風船は落下することなくドライヤーの向きに合わせて動く。",
                "required_time": "5分"
            },
            "風船とパイプ": {
                "description": "大きさ(膨らみの度合い)が違う二つの風船をパイプで接続する。風船の口を緩め、中の空気が自由に移動できるようにすると、小さい風船が縮み、大きい風船が膨らむ。",
                "required_time": "7分"
            }
        },
        "Aircraft Maker": {
            "模型飛行機を作ろう": {
                "description": "スチレンペーパーとヒノキ棒を使ってよく飛ぶ飛行機を一緒に作ろう！飛ばし方のコツも教えます。",
                "required_time": "15分"
            },
            "人力飛行機のことを知ろう": {
                "description": "人力飛行機についてをパネル、動画を用いて部員が説明します。",
                "required_time": "8分"
            }
        },
        "Ⅱ部研究会生物研究部": {
            "化石のレプリカを作ろう": {
                "description": "アンモナイトなどの化石のレプリカを作る",
                "required_time": "20分"
            },
            "生態展示": {
                "description": "Ⅱ部研究会生物研究部で飼育している生き物を展示する。"
            },
            "スマホ顕微鏡で微生物を見てみよう": {
                "description": "スマートフォン対応の簡易顕微鏡で微生物を観察する。",
                "required_time": "20分"
            }
        },
        "Ⅰ部化学研究部": {
            "人工イクラ": {
                "description": "塩化カルシウム溶液に色を付けたアルギン酸ナトリウム溶液を滴下し人工イクラを作ってもらう。ジップロックで持ち帰りも可能。",
                "required_time": "5分"
            },
            "不思議な液体": {
                "description": "水酸化ナトリウムとグルコースをいれたインジゴカルミン溶液とメチレンブルー溶液をペットボトルに用意し、実際に振ってもらい酸化還元反応による色の変化を体験してもらう。",
                "required_time": "5分"
            },
            "ダイラタンシー": {
                "description": "片栗粉と色水を使ってダイラタンシー現象を再現し、その不思議な触感を体験してもらう。ジップロックに作ってもらうため持ち帰りも可能。",
                "required_time": "5分"
            }
        },
        "Ⅱ部化学研究部": {
            "スーパーボールを作ってみよう": {
                "description": "洗濯糊と塩を使ってスーパーボールをつくる。",
                "required_time": "5分"
            },
            "入浴剤をつくってみよう": {
                "description": "重曹とクエン酸で入浴剤をつくる。",
                "required_time": "5分"
            },
            "発泡スチロールでつくるスタンプ": {
                "description": "発泡スチロールを特殊な液体を用いてスタンプをつくる。",
                "required_time": "5分"
            }
        },
        "理工学部化学研究会": {
            "スライムを作ってみよう！": {
                "description": "カラフルなスライムを作ってみよう！作ったスライムはお持ち帰りできます。",
                "required_time": "5～6分"
            },
            "メッキでお絵かきをしよう！": {
                "description": "液体に浸けたら、鉄板の色が変わる?変わらない？不思議な体験をしてみよう！作ったものはお持ち帰りできます。",
                "required_time": "5～6分"
            },
            "割れないシャボン玉": {
                "description": "身近なものを使って作る特別なシャボン玉を実際に触って確かめてみよう！",
                "required_time": "5～6分"
            }
        },
        "Ⅰ部Ⅱ部天文研究部": {
            "アストロボックス": {
                "description": "私達の知る星座は数あるなかの一つの姿に過ぎない。模型化にすることで星座を完全再現。さあ見よこれが星の姿だ！",
                "required_time": "3分"
            },
            "写真展示": {
                "description": "あなたを四季折々の星空へ招待します。あなたがまだ見たことない星空がここにある?",
                "required_time": "10分"
            },
            "プラネタリウム上映": {
                "description": "星座や神話に興味はありませんか？日常では見ることができない星々をゆったりとしたナレーションと共にお楽しみください。",
                "required_time": "30分"
            }
        },
        "野田天文研究部": {
            "プラネタリウム上映": {
                "description": "自作プラネタリウムを上映し、その季節に見える星座の解説を行います。(神楽坂天文研と合同)",
                "required_time": "20分"
            },
            "模型展示": {
                "description": "自作の、惑星・人工衛星の模型を展示し、解説を行います。",
                "required_time": "5分"
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
