/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/web/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 49);
/******/ })
/************************************************************************/
/******/ ({

/***/ 49:
/***/ (function(module, exports) {

﻿$(function(){
  'use strict';

  var description_block = document.getElementById("description");
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
      var order = ["chemistory", "geoscience", "math", "industrial"];
      c.list.forEach(function(e){
        var org_id = e.id.replace(/description_/, "");
        var d = data[org_id_to_area_id_table[org_id]];
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


/***/ })

/******/ });