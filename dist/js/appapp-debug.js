$(document).ready(function(){
	alert('dasdsa');

	$('.page-change').on('click',function(){
		$('.section.active').removeClass('active');
		var elem = $(this).attr('href');
		console.log(elem);
		$(elem).addClass('active');
	});




});

