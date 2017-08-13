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
/******/ 	__webpack_require__.p = "/web";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * @param redirect_to {string} The URL to redirect
 */
redirect_when_no_support = function(redirect_to) {
	/**
	 * @param str {string} base URL
	 * @param param {string} A GET param
	 */
	var append_get_param = function(str, param){
		return str + ((str.match(/\?/)) ? "&" : "?") + param;
	};

	if(document.uniqueID && window.matchMedia && document.documentMode === 10){
		location.href = append_get_param(redirect_to, "cause=" + encodeURIComponent("detect IE10"));
	} else {
		var basic_tests = function(){
			var tests = [
				{ "testcase": typeof window.addEventListener === "undefined", "message": "missing: window.addEventListener" },
				{ "testcase": typeof document.getElementsByClassName === "undefined", "message": "missing: document.getElementsByClassName" },
				{ "testcase": typeof navigator.userAgent === "undefined", "message": "missing: navigator.userAgent" },
				{ "testcase": typeof document.querySelector === "undefined", "message": "missing: document.querySelector" },
				{ "testcase": typeof Array.prototype.forEach === "undefined", "message": "missing: Array.prototype.forEach" }
			];
			var i;
			var cause = "";
			for(i = 0; i < tests.length; ++i) if(tests[i].testcase) {
				cause += (cause.length === 0) ? "[" : ",";
				cause += "\"" + tests[i].message + "\"";
			}
			if(cause.length !== 0) {
				var ua = window.navigator.userAgent.toLowerCase();
				if (ua.indexOf("msie") >= 0 && parseFloat(ua.replace(/mozilla\/([0-9.]+).*/g, "$1")) < 5.0) {
					/* Before IE8, goto Shift-JIS page */
					return append_get_param(redirect_to.slice(0, -5) + "-sjis.html", "cause=" + encodeURIComponent(cause + ",\"brefore IE8\"]"));
				} else {
					return append_get_param(redirect_to, "cause=" + encodeURIComponent(cause + "]"));
				}
			}
			return "";
		};
		var additional_tests = function(){
			var tests = [
				{ "testcase": typeof JSON === "object", "message": "missing: JSON" },
				{ "testcase": parseInt("010") === 10, "message": "missing feature: parseInt ignores leading zeros" },
				{
					"testcase": { __proto__ : [] } instanceof Array && !({ __proto__ : null } instanceof Object),
					"message": "missing feature: __proto__ in object literals(basic support)"
				},
				{
					"testcase": function(){
						var obj = {
							2: true,
							0: true,
							1: true,
							" ": true,
							9: true,
							D: true,
							B: true,
							"-1": true
						};
						obj.A = true;
						obj[3] = true;
						var tmp = "EFGHIJKLMNOPQRSTUVWXYZ".split("");
						var i;
						for(i = 0; i < tmp.length; ++i){
							obj[tmp[i]] = true;
						}
						try{
							Object.defineProperty(obj, "C", { value: true, enumerable: true });
							Object.defineProperty(obj, "4", { value: true, enumerable: true });
							delete obj[2];
						} catch(e){
							return false;
						}
						obj[2] = true;

						return Object.getOwnPropertyNames(obj).join("") === "012349 DB-1AEFGHIJKLMNOPQRSTUVWXYZC";
					}(),
					"message": "missing: Object.getOwnPropertyNames"
				}
			];
			var i;
			var cause = "";
			for(i = 0; i < tests.length; ++i) if(!tests[i].testcase) {
				cause += (cause.length === 0) ? "[" : ",";
				cause += tests[i].message;
			}
			if(cause.length !== 0) {
				return append_get_param(redirect_to, "cause=" + encodeURIComponent(cause + "]"));
			}
			return "";
		}
		var redirect_to = basic_tests();
		if(redirect_to.length !== 0) {
			location.href = redirect_to;
		} else {
			redirect_to = additional_tests();
			if(redirect_to.length !== 0) {
				location.href = redirect_to;
			}
		}
	}
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

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


/***/ }),
/* 3 */
/***/ (function(module, exports) {

﻿(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-61470721-1', 'auto');
ga('require', 'dnt');
ga('send', 'pageview');


/***/ })
/******/ ]);