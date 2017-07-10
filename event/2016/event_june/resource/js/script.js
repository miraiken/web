require("./particles_config");

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
