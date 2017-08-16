require('./particles_config');

var CustomEvent;
if (typeof window.CustomEvent === 'function') {
  CustomEvent = window.CustomEvent;
} else {
  CustomEvent = function(event, params) {
    params = params || {bubbles: false, cancelable: false, detail: undefined};
    var customEvent = document.createEvent('CustomEvent');
    customEvent.initCustomEvent(event,
                                params.bubbles,
                                params.cancelable,
                                params.detail);

    return event;
  };

  CustomEvent.prototype = window.Event.prototype;
}

// initialize
hideAll();
var isFirstClick = true;

// register click event handler
$('.btn').on('click', function() {
  hideAll();
  $('#aria_' + $(this).attr('class').split(' ')[1]).show();

  if (isFirstClick) {
    var event = new CustomEvent('resize');
    window.dispatchEvent(event);
    isFirstClick = false;
  }
});

function hideAll() {
  $('.section').hide();
}
