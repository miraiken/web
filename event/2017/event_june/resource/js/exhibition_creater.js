(function(){
  "use strict";

  m.request({method: 'GET', url: './resource/data/exhibition.json'}).then(function(response){
    var list = response;
    var org_id_to_area_id_table_ = Object.freeze({
      "rikoukaken": "chemistory",
      "ichikaken" : "chemistory",
      "nikaken"   : "chemistory",
      "chibilab"  : "chemistory",
      "chikaken"  : "geoscience",
      "seibutuken": "geoscience",
      "icibukken" : "geoscience",
      "bunguken"  : "geoscience",
      "ichisuuken": "math",
      "nisuuken"  : "math",
      "tenmonken" : "math",
      "nodaten"   : "math",
      "kikoukaken": "industrial",
      "acm"       : "industrial",
      "musenken"  : "industrial"
    });
    var order = Object.freeze(["chemistory", "geoscience", "math", "industrial"]);
    var data = Object.freeze({
      "chemistory": [],
      "geoscience": [],
      "math": [],
      "industrial": []
    });

    list.forEach(function(e){ data[org_id_to_area_id_table_[e.id]].push(e); });

    var exhibition = {
      "oninit": function(){
        this.active_area = null;
      },
      "view": function(){
        return m("section", [
          m("section",
            order.map(function(l){
                var description = Object.freeze({
                  "chemistory": "初めての化学",
                  "geoscience":"自然の不思議",
                  "math":"未知の世界",
                  "industrial":"乗り物とロボット"
                });
                return m("input", {
                  "type": "button", "class": "btn "+ l, "value": description[l],
                  "onclick": function(){this.active_area = l}.bind(this),
                });
            }, this)
          ),
          m("section", order.map(function(area){
            return m("section", {"id": "area_" + area}, data[area].map(function(e){
              return m(
                "article", {
                  "class": "project_info", "id": "description_" + e.id,
                  "style": {
                    "display": (this.active_area === org_id_to_area_id_table_[e.id]) ? "block": "none",
                  }
                }, [
                  m("div.project_title", [
                    m("h2", e.title),
                    m("p", e.org_name)
                  ]),
                  m("div.project_info_introduce", [
                    m("p", e.introduce)
                  ]),
                  m("article.project_info_detail", e.projects.map(function(p){
                    return m("section", [
                      m("h3", p.name),
                      m("p", p.description),
                      m("table", [
                        m("tr", [ m("th", "企画形態"), m("th", "対象年齢"), m("th", "所要時間") ]),
                        m("tr", [ m("td", p.type), m("td", p.target_age), m("td", p.required_time)])
                      ])
                    ]);
                  }))
                ]
              );
            }, this));
          }, this)),
        ]);

      }
    };
    var exhibition_creator = function(){ return m(exhibition); };

    if(document.readyState !== "loading"){
      m.mount(document.getElementById("description"), {"view": exhibition_creator});
    } else {
      document.addEventListener("DOMContentLoaded", function(){
        m.mount(document.getElementById("description"), {"view": exhibition_creator});
      });
    }
  });
}());