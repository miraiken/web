(function(){
  "use strict";

  var c = {
    list: [],
    oninit : function() {
      m.request({method: 'GET', url: './resource/data/exhibition.json'}).then(function(response){ c.list = response; });
    },
    view: function(ctrl){
      var data = {
        "chemistory": [],
        "geoscience": [],
        "math": [],
        "industrial": []
      };
      var org_id_to_area_id_table = Object.freeze({
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
      c.list.forEach(function(e){
        var org_id = e.id.replace(/description_/, "");
        var d = data[org_id_to_area_id_table[org_id]];
        d.push(m("article", { "class": "project_info", "id": "description_" + e.id }, [
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
        ]));
      });
      return m("section", order.map(function(l){ return m("section#area_" + l, data[l]);}));
    }
  };
  document.addEventListener("DOMContentLoaded", function(){
    m.mount(document.getElementById("description"), c);
  });
}());
