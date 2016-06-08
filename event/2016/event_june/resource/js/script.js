$(function() {

	// init
	hideAll();

	// click func
	$('.btn').on('click', function() {
		hideAll();
	    var attr = $(this).attr('class').split(' ');
	    $('#description_' + attr[1]).show();
	  });
});

var hideAll = function() {
	$('.progect_info').hide();
}