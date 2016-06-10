var load_pazzle = function(){
  particlesJS("particles-js", {
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