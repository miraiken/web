require('./index.css');

document.addEventListener('DOMContentLoaded', function() {
  var actives = document.getElementsByClassName('slideshow-active');
  var tallests = Array.prototype.map.call(actives, function(active) {
    var parent = active.parentNode;
    var previousUnbound = parent.lastChild;
    var tallest;
    var tallestHeight = 0;

    Array.prototype.forEach.call(parent.children, function(current, index) {
      var previous = previousUnbound;
      var next = parent.children[(index + 1) % parent.children.length];
      var height = current.getBoundingClientRect().height;

      if (tallestHeight < height) {
        tallest = current;
        tallestHeight = height;
      }

      current.onanimationend = function() {
        previous.className = 'slideshow-inactive';
        current.className = 'slideshow-active';
        next.className = 'slideshow-next';
      };

      previousUnbound = current;
    });

    active.onanimationend();

    return tallest;
  });

  onresize = requestAnimationFrame.bind(undefined, function() {
    tallests.forEach(function(tallest) {
      var height = tallest.getBoundingClientRect().height;
      tallest.parentNode.style.height = height + 'px';
    });
  });

  onresize();
});
