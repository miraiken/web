var list = require('../data/exhibition.json');
var orgToArea = Object.freeze({
  rikoukaken: 'chemistory',
  ichikaken: 'chemistory',
  nikaken: 'chemistory',
  chibilab: 'chemistory',
  chikaken: 'geoscience',
  seibutuken: 'geoscience',
  icibukken: 'geoscience',
  bunguken: 'geoscience',
  ichisuuken: 'math',
  nisuuken: 'math',
  tenmonken: 'math',
  nodaten: 'math',
  kikoukaken: 'industrial',
  acm: 'industrial',
  musenken: 'industrial'
});
var order = Object.freeze(['chemistory', 'geoscience', 'math', 'industrial']);
var data = Object.freeze({
  chemistory: [],
  geoscience: [],
  math: [],
  industrial: []
});

list.forEach(function(e) {
  data[orgToArea[e.id]].push(e);
});

var exhibition = {
  oninit: function() {
    this.activeArea = null;
  },
  view: function() {
    return m('section', [
      m('section',
        order.map(function(l) {
          var description = Object.freeze({
            chemistory: 'みじかな化学の実験室',
            geoscience: '自然のふしぎラボ',
            math: '未知のせかいドーム',
            industrial: '機械のしくみ工場'
          });
          return m('input', {
            type: 'button', class: 'btn ' + l, value: description[l],
            onclick: function() {
              this.activeArea = l;
            }.bind(this),
          });
        }, this)
      ),
      m('section', order.map(function(area) {
        return m(
          'section',
          {
            id: 'area_' + area,
            style: {
              display: (this.activeArea === area) ? 'block' : 'none',
            }
          },
          data[area].map(function(e) {
            return m('article', {
              class: 'project_info',
              id: 'description_' + e.id
            }, [
              m('div.project_title', [
                m('h2', e.title),
                m('p', e.org_name)
              ]),
              m('div.project_info_introduce', [
                m('p', e.introduce)
              ]),
              m('article.project_info_detail', e.projects.map(function(p) {
                return m('section', [
                  m('h3', p.name),
                  m('p', p.description),
                  m('table', [
                    m('tr', [
                      m('th', '企画形態'),
                      m('th', '対象年齢'),
                      m('th', '所要時間'),
                    ]),
                    m('tr', [
                      m('td', p.type),
                      m('td', p.target_age),
                      m('td', p.required_time),
                    ])
                  ])
                ]);
              }))
            ]);
          }, this)
        );
      }, this)),
    ]);

  }
};

function createExhibition() {
  return m(exhibition);
}

if (document.readyState !== 'loading') {
  m.mount(document.getElementById('description'), {view: createExhibition});
} else {
  document.addEventListener('DOMContentLoaded', function() {
    m.mount(document.getElementById('description'), {view: createExhibition});
  });
}
