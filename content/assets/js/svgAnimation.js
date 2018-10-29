(function($) { // Begin jQuery
  $(function() { // DOM ready
	
	let click_circle = 0;
	let click_rect = 0;
	let r_click = 0;
  	$("circle").on("click",function(){
		$(this).attr('fill', 'red');
		let radius = $(this).attr('r');
		if(click_circle == 0)
			$(this).attr('r', "20");
		else if(click_circle == 1)
			$(this).attr('r', "50");
		else
			$(this).attr('r', "35");
		setTimeout(function () {
			if(click_circle == 0)
			{
				$('circle').attr('fill', 'blue');
				click_circle = 1;
			}
			else if(click_circle == 1)
			{
				$('circle').attr('fill', 'yellow');
				click_circle = 2;
			}
			else
			{
				$('circle').attr('fill', 'black');
				click_circle = 0;
			}
		}, 1000);
  	});

  	$("rect.square").on("click",function(){
  		setTimeout(function () {
			if(click_rect == 0)
			{	
				$('rect.square').attr('width', '150');
				click_rect = 1;
			}
			else if(click_rect == 1)
			{
				$('rect.square').attr('height', '150');
				click_rect = 2;
			}
			else
			{
				$('rect.square').attr('width', '50');
				$('rect.square').attr('height', '50');
				click_rect = 0;
			}
		}, 1000);
  	});

  	$("rect.square1").on("click",function(){

  		if(r_click==0)
  		{
	  		$(this).css('transform', 'rotate(-'+ 20 +'deg)');
			$(this).attr('x', '60%');
			$(this).attr('y', '80%');
			$(this).attr('x', '20%');
			setTimeout(function() {
				$('rect.square1').css('transform', 'rotate('+ 0 +'deg)');
			}, 1000);
			r_click=1;
		}
		else
		{
			r_click = 0;
			$('rect.square1').css('transform', 'rotate('+ 20 +'deg)');
			$(this).attr('x', '50%');
			setTimeout(function() {
				$('rect.square1').css('transform', 'rotate('+ 0 +'deg)');
			}, 1000);
		}
  	});

  }); // end DOM ready
})(jQuery); // end jQuery