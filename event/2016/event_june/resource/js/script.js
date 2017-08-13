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
/******/ 	return __webpack_require__(__webpack_require__.s = 89);
/******/ })
/************************************************************************/
/******/ ({

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(90);

(function () {
	if ( typeof window.CustomEvent === "function" ) return false;
	function CustomEvent ( event, params ) {
		params = params || { bubbles: false, cancelable: false, detail: undefined };
		var evt = document.createEvent( 'CustomEvent' );
		evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
		return evt;
	}
	CustomEvent.prototype = window.Event.prototype;
	window.CustomEvent = CustomEvent;
})();
$(function() {
	var $canvas = $("#particles_js > canvas");
	// init
	hideAll();
	var is_first_click = true;
	// click func
	$('.btn').on('click', function() {
		hideAll();
	    var attr = $(this).attr('class').split(' ');
	    $('#aria_' + attr[1]).show();
	    if(is_first_click){
		    if(CustomEvent != null){
			    var event = new CustomEvent("resize");
				window.dispatchEvent(event);
			}
		    is_first_click = false;
		}
	});
});

var hideAll = function() {
	$('.section').hide();
}


/***/ }),

/***/ 90:
/***/ (function(module, exports) {

var load_pazzle = function(){
  particlesJS("particles_js", {
    "particles": {
      "number": {
        "value": 9,
        "density": {
          "enable": false,
          "value_area": 800
        }
      },
      "color": {
        "value": "#fff"
      },
      "shape": {
        "type": "image",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 7
        },
        "image": {
          "src": "./resource/img/puzzle.png",
          "width": 500,
          "height": 500
        }
      },
      "opacity": {
        "value": 0.39102088370719684,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 15.960036069681504,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 500,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 2
      },
      "move": {
        "enable": true,
        "speed": 5,
        "direction": "bottom",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": true,
          "rotateX": 718,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "bubble"
        },
        "onclick": {
          "enable": false,
          "mode": "repulse"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 0.5
          }
        },
        "bubble": {
          "distance": 400,
          "size": 4,
          "duration": 0.3,
          "opacity": 1,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": false
  });

}
$(function(){
  load_pazzle();
});
// var /*count_particles, stats,*/ update;
// // stats = new Stats;
// // stats.setMode(0);
// // stats.domElement.style.position = 'absolute';
// // stats.domElement.style.left = '0px';
// // stats.domElement.style.top = '0px';
// //document.body.appendChild(stats.domElement);
// // count_particles = document.querySelector('.js-count-particles');
// update = function() {
//   // stats.begin();
//   // stats.end();
//   // if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
//   //   count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
//   // }
//   requestAnimationFrame(update);
// };
// requestAnimationFrame(update);;

/***/ })

/******/ });