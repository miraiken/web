const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');
const path = require('path');

function createSpecializedExtractTextPlugin(extension) {
  return new ExtractTextPlugin({
    filename(getPath) {
      return getPath('[name]').replace(/[^.]*$/, extension);
    },
  });
}

function* listFilesRecursively(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const entryPath = path.join(dir, entry);

    if (fs.statSync(entryPath).isDirectory()) {
      for (const file of listFilesRecursively(entryPath)) {
        yield path.join(entry, file);
      }
    } else {
      yield entry;
    }
  }
}

function omitDummy() {
  this.plugin('emit', (compilation, callback) => {
    for (const key in compilation.assets) {
      if (key.startsWith('dummy')) {
        delete compilation.assets[key];
      }
    }

    callback();
  });
}

const extractCSSPlugin = createSpecializedExtractTextPlugin('css');
const extractHTMLPlugin = createSpecializedExtractTextPlugin('html');

const entry = {
  'index.js': '.',
  'common/google_analytics.js': './common/google_analytics',
  'common/layout.css': './common/layout/index.css',
};

for (const name of listFilesRecursively('./raw')) {
  entry[`dummy${ name}`] = `./raw/${ name}`;
}

for (const name of [
  './event/2014/event_june/resource/lightbox.css',
  './event/2014/event_june/resource/lightbox_plus.js',
  './event/2015/event_june/resource/exhibition.css',
  './event/2015/event_june/resource/science_show.css',
  './event/2015/event_june/resource/simple_slideshow.js',
  './event/2015/event_march/resource/pseudo_screen_transition.js',
  './event/2016/event_june/resource/css/style.css',
  './event/2016/event_june/resource/js/script.js',
  './event/2017/event_june/resource/css/style.css',
  './event/2017/event_june/resource/css/table_style.css',
  './event/2017/event_june/resource/js/exhibition_creater.js',
  './event/2017/event_march/resource/css/xxx.css',
  './event/2017/event_march/resource/js/exhibition_creater.js',
  './event/2018/march/exhibition.css',
  './event/2018/march/index.css',
  './event/2018/june/exhibition.css',
  './event/2018/june/index.css',
  './event/2019/march/index.css',
  './event/2019/june/index.css',
  './event/access.css',
  './event/date.css',
  './event/june.css',
  './event/lecture.css',
  './event/march.css',
  './event/project.css',
  './for_freshmen/public_relations_department.css',
]) {
  entry[name] = name;
}

for (const name of [
  './contact/index',
  './event/2014/event_june/about_june',
  './event/2014/event_june/access',
  './event/2014/event_june/exhibition',
  './event/2014/event_june/index',
  './event/2014/event_june/lecture',
  './event/2015/event_june/about_june',
  './event/2015/event_june/access',
  './event/2015/event_june/exhibition',
  './event/2015/event_june/exhibition_old',
  './event/2015/event_june/index',
  './event/2015/event_june/pinhole_camera',
  './event/2015/event_june/science_show',
  './event/2015/event_june/wars_and_nisokon',
  './event/2015/event_march/about_march',
  './event/2015/event_march/access',
  './event/2015/event_march/exhibition',
  './event/2015/event_march/index',
  './event/2016/event_june/access',
  './event/2016/event_june/exhibition',
  './event/2016/event_june/index',
  './event/2016/event_june/lecture',
  './event/2016/event_june/nisokon',
  './event/2016/event_june/workshop',
  './event/2016/event_march/about_march',
  './event/2016/event_march/access',
  './event/2016/event_march/exhibition',
  './event/2016/event_march/index',
  './event/2017/event_june/access',
  './event/2017/event_june/exhibition',
  './event/2017/event_june/index',
  './event/2017/event_march/access',
  './event/2017/event_march/exhibition',
  './event/2017/event_march/index',
  './event/2018/march/exhibition',
  './event/2018/march/index',
  './event/2018/june/exhibition',
  './event/2018/june/index',
  './event/2019/march/index',
  './event/2019/june/index',
  './event/index',
  './for_freshmen/general_affairs_department',
  './for_freshmen/index',
  './for_freshmen/planning_department',
  './for_freshmen/public_relations_department',
  './googlea583e982345d2026',
  './index',
  './introduction/index',
  './kagucho',
  './links/index',
  './members/index',
  './privacy',
  './web_update_log',
]) {
  entry[`${name }.html`] = `${name }.pug`;
}

module.exports = {
  devServer: {contentBase: path.join(__dirname, 'build')},
  entry,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractCSSPlugin.extract([
          'css-loader',
          'postcss-loader',
        ]),
      }, {
        test: /\.pug$/,
        exclude: path.join(__dirname, 'common'),
        use: extractHTMLPlugin.extract([
          './pug-executing-loader',
          {
            loader: 'pug-loader',
            options: {root: path.join(__dirname, 'common')},
          },
        ]),
      }, {
        test: /\.pug$/,
        include: path.join(__dirname, 'common'),
        loader: 'pug-loader',
      }, {
        include: path.join(__dirname, 'raw'),
        loader: 'file-loader?context=raw&name=[path][name].[ext]',
      }, {
        test: /\.(gif|jpg|pdf|png|svg)$/,
        exclude: path.join(__dirname, 'raw'),
        loader: 'file-loader',
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  output: {
    filename: '[name]',
    path: path.join(__dirname, 'build'),
    publicPath: '/web/',
  },
  plugins: [omitDummy, extractCSSPlugin, extractHTMLPlugin],
  resolve: {alias: {miraiken: __dirname}},
};
