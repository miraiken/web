const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

function omitDummy() {
  this.plugin("emit", (compilation, callback) => {
    delete compilation.assets.dummy;
    callback();
  });
}

module.exports = {
  entry: [
    "./common/css/camera_kai.css",
    "./common/css/event_project.css",
    "./common/css/style.css",
    "./event/2014/event_june/description/kikaku_01.jpg",
    "./event/2014/event_june/description/kikaku_02.jpg",
    "./event/2014/event_june/description/kikaku_03.jpg",
    "./event/2014/event_june/description/kikaku_04.jpg",
    "./event/2014/event_june/description/kikaku_05.jpg",
    "./event/2014/event_june/description/kikaku_06.jpg",
    "./event/2014/event_june/description/kikaku_07.jpg",
    "./event/2014/event_june/description/kikaku_08.jpg",
    "./event/2014/event_june/description/kikaku_09.jpg",
    "./event/2014/event_june/resource/lightbox.css",
    "./event/2014/event_june/resource/lightbox_plus_min.js",
    "./event/2015/event_june/resource/exhibition.css",
    "./event/2015/event_june/resource/pseudo_color_transition_jCanvas.js",
    "./event/2015/event_june/resource/science_show.css",
    "./event/2015/event_march/map/first_floor_chikaken.png",
    "./event/2015/event_march/map/first_floor_hidden.png",
    "./event/2015/event_march/map/first_floor_plain.png",
    "./event/2015/event_march/map/first_floor_tenmonken.png",
    "./event/2015/event_march/map/second_floor_bunngukenn.png",
    "./event/2015/event_march/map/second_floor_hidden.png",
    "./event/2015/event_march/map/second_floor_plain.png",
    "./event/2015/event_march/map/second_floor_seibutuken.png",
    "./event/2015/event_march/map/third_floor_acm.png",
    "./event/2015/event_march/map/third_floor_chibilab.png",
    "./event/2015/event_march/map/third_floor_hidden.png",
    "./event/2015/event_march/map/third_floor_ichikaken.png",
    "./event/2015/event_march/map/third_floor_nikaken.png",
    "./event/2015/event_march/map/third_floor_plain.png",
    "./event/2015/event_march/map/third_floor_rikoukaken.png",
    "./event/2015/event_march/resource/pseudo_screen_transition.js",
    "./event/2016/event_june/resource/css/style.css",
    "./event/2016/event_june/resource/js/script.js",
    "./event/2017/event_june/resource/css/style.css",
    "./event/2017/event_june/resource/css/table_style.css",
    "./event/2017/event_march/resource/css/xxx.css",
    "./event/2017/event_march/resource/js/exhibition_creater.js",
    "./for_freshman/resource/camera_kai_pre.css",
    "./for_freshman/resource/201406配布ビラ表.pdf",
    "./for_freshman/resource/2014年度　6月期表紙　.pdf",
    "./for_freshman/resource/2014年度3月期　アンケート　見やすくした.pdf",
    "./for_freshman/resource/学内周知用ポスター 2014.pdf",
    "./for_freshman/resource/当日用ビラ　2014年度3月期.pdf",
  ].reduce((object, name) => {
    object[name] = name;
    return object;
  }, [
    "./common/html/parts",
    "./contact/index",
    "./event/2014/event_june/about_june",
    "./event/2014/event_june/access",
    "./event/2014/event_june/exhibition",
    "./event/2014/event_june/index",
    "./event/2014/event_june/lecture",
    "./event/2015/event_june/about_june",
    "./event/2015/event_june/access",
    "./event/2015/event_june/exhibition",
    "./event/2015/event_june/exhibition_editing",
    "./event/2015/event_june/exhibition_old",
    "./event/2015/event_june/index",
    "./event/2015/event_june/pinhole_camera",
    "./event/2015/event_june/science_show",
    "./event/2015/event_june/wars_and_nisokon",
    "./event/2015/event_march/about_march",
    "./event/2015/event_march/access",
    "./event/2015/event_march/exhibition",
    "./event/2015/event_march/index",
    "./event/2016/event_june/access",
    "./event/2016/event_june/exhibition",
    "./event/2016/event_june/index",
    "./event/2016/event_june/lecture",
    "./event/2016/event_june/nisokon",
    "./event/2016/event_june/workshop",
    "./event/2016/event_march/about_march",
    "./event/2016/event_march/access",
    "./event/2016/event_march/exhibition",
    "./event/2016/event_march/index",
    "./event/2017/event_june/access",
    "./event/2017/event_june/exhibition",
    "./event/2017/event_june/index",
    "./event/2017/event_march/resource/data/exhibition",
    "./event/2017/event_march/access",
    "./event/2017/event_march/exhibition",
    "./event/2017/event_march/index",
    "./event/index",
    "./for_freshman/general_affairs_department",
    "./for_freshman/index",
    "./for_freshman/planning_department",
    "./for_freshman/public_relations_department",
    "./googlea583e982345d2026",
    "./index",
    "./introduction/index",
    "./link/index",
    "./members/index",
    "./no_supported_browser",
    "./privacy",
    "./web_update_log",
  ].reduce((object, name) => {
    object[name + ".html"] = name + ".pug";
    return object;
  }, {
    "common.js": "./common/script",
    "slideshow.js": "./slideshow",
  })),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract([
          "css-loader",
          "postcss-loader",
        ]),
      }, {
        test: /\.pug$/,
        exclude: path.join(__dirname, "include"),
        use: ExtractTextPlugin.extract([
          "./call-loader",
          {
            loader: "pug-loader",
            options: {root: __dirname},
          },
        ]),
      }, {
        test: /\.pug$/,
        include: path.join(__dirname, "include"),
        loader: "pug-loader",
      }, {
        test: /\.(gif|jpg|pdf|png)$/,
        loader: "file-loader",
      },
    ],
  },
  output:  {
    filename: "[name]",
    path: path.join(__dirname, "build"),
    publicPath: "/web"
  },
  plugins: [omitDummy, new ExtractTextPlugin("[name]")],
};
