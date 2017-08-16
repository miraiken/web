particlesJS('particles_js', {
  particles: {
    number: {
      value: 9,
      density: {
        enable: false,
        value_area: 800
      }
    },
    color: {
      value: '#fff'
    },
    shape: {
      type: 'image',
      stroke: {
        width: 0,
        color: '#000000'
      },
      polygon: {
        nb_sides: 7
      },
      image: {
        src: require('../img/puzzle.png'),
        width: 500,
        height: 500
      }
    },
    opacity: {
      value: 0.39102088370719684,
      random: true,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 15.960036069681504,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: false,
      distance: 500,
      color: '#ffffff',
      opacity: 0.4,
      width: 2
    },
    move: {
      enable: true,
      speed: 5,
      direction: 'bottom',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: true,
        rotateX: 718,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: false,
        mode: 'bubble'
      },
      onclick: {
        enable: false,
        mode: 'repulse'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 0.5
        }
      },
      bubble: {
        distance: 400,
        size: 4,
        duration: 0.3,
        opacity: 1,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: false
});
