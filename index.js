require('./index.css');

onload = function() {
  var actives = document.getElementsByClassName('slideshow-active');

  Array.prototype.forEach.call(actives, function(active) {
    var parent = active.parentNode;
    var previousUnbound = parent.lastChild;

    Array.prototype.forEach.call(parent.children, function(current, index) {
      var previous = previousUnbound;
      var next = parent.children[(index + 1) % parent.children.length];

      current.addEventListener(
        'animationend',
        advance.bind(undefined, previous, current, next));

      previousUnbound = current;
    });

    advance(active.previousElementSibling || parent.lastChild,
            active,
            active.nextElementSibling || parent.firstChild);
  });

  function advance(previous, current, next) {
    previous.className = 'slideshow-inactive';
    current.className = 'slideshow-active';
    next.className = 'slideshow-next';
  }
};
