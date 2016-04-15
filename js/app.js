$(document).ready(function(){



	$('.goto').on('click',function(e){
		e.preventDefault();
		$('.section.active').removeClass('active');
		var elem = $(this).attr('href');
		$('.imageBackground').removeClass('active');
		if ($(this).hasClass('billboard')){
			$('.block-navigation').addClass('active');
			$(elem+'-bg').addClass('active');
	    }else{
	    	$('.block-navigation').removeClass('active');
	    	$('.imageBackground').removeClass('active');
	    	$('#home-bg').addClass('active');
	    }

		$(elem).addClass('active');
	});





});

