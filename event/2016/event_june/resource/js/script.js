$(function() {

	// init
	hideAll();

	// click func
	$('.btn').on('click', function() {
		hideAll();
	    var attr = $(this).attr('class').split(' ');
	    $('#aria_' + attr[1]).show();
	  });
});

var hideAll = function() {
	$('.section').hide();
}