require('./index.css');

document.addEventListener('DOMContentLoaded', function() {
  var slideshow = document.getElementById('slideshow');
  var previousUnbound = slideshow.lastChild;

  Array.prototype.forEach.call(slideshow.children, function(current, index) {
    var previous = previousUnbound;
    var next = slideshow.children[(index + 1) % slideshow.children.length];

    current.onanimationend = function() {
      previous.className = '';
      current.className = 'active';
      next.className = 'next active';
    };

    previousUnbound = current;
  });

  slideshow.firstChild.onanimationend();
});
