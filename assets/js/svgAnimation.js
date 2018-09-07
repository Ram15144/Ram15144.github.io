(function($) { // Begin jQuery
  $(function() { // DOM ready
	
	let click_circle = 0;
  	$("circle").on("click",function(){
		$(this).attr('fill', 'red');
		let radius = $(this).attr('r');
		if(click == 0)
			$(this).attr('r', "20");
		else if(click == 1)
			$(this).attr('r', "50");
		else
			$(this).attr('r', "35");
		$(this).css('transform', 'rotate(+'+ 45 +'deg)');
		setTimeout(function () {
			if(click == 0)
			{
				$('circle').attr('fill', 'blue');
				click = 1;
			}
			else if(click == 1)
			{
				$('circle').attr('fill', 'yellow');
				click = 2;
			}
			else
			{
				$('circle').attr('fill', 'black');
				click = 0;
			}
		}, 1000);
  	});

  	$("square").on("click",function(){
  		$(this).css('transform', 'rotate(-'+ 45 +'deg)')
		setTimeout(function() {
			$('#square').css('transform', 'rotate('+ 45 +'deg)')
		}, 1000)
  	});


  }); // end DOM ready
})(jQuery); // end jQuery