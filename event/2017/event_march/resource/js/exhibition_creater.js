$(function(){
  'use strict';

  const description_block = document.getElementById("description");
  const c = {
    list: [],
    oninit : function() {
      m.request({method: 'GET', url: './resource/data/exhibition.json'}).then(function(response){ c.list = response; });
    },
    view: function(ctrl){
      const data = {
        "chemistory": [],
        "geoscience": [],
        "math": [],
        "industrial": []
      };
      const org_id_to_area_id_table = {
        "rikoukaken": "chemistory",
        "ichikaken" : "chemistory",
        "nikaken"   : "chemistory",
        "chibilab"  : "chemistory",
        "chikaken"  : "geoscience",
        "seibutuken": "geoscience",
        "icibukken" : "geoscience",
        "bunguken": "geoscience",
        "ichisuuken": "math",
        "nisuuken"  : "math",
        "tenmonken" : "math",
        "nodaten"   : "math",
        "kikoukaken": "industrial",
        "acm"       : "industrial",
        "musenken"  : "industrial"
      };
      const order = ["chemistory", "geoscience", "math", "industrial"];
      c.list.forEach(function(e){
        const org_id = e.id.replace(/description_/, "");
        const area_id = org_id_to_area_id_table[org_id];
        let d = data[area_id];
        d.push(m("article#" + e.id + ".project_info", [
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
                m("tr", [ m("td", "企画形態"), m("td", "対象年齢"), m("td", "所要時間") ]),
                m("tr", [ m("td", p.type), m("td", p.target_age), m("td", p.required_time)])
              ])
            ]);
          }))
        ]));
      });
      return m("section", order.map(function(l){ return m("section#area_" + l, data[l]);}));
    }
  };
  m.mount(description_block, c);
});
