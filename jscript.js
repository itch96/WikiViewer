var main = function() {
	var icon = document.getElementsByClassName('search_icon');
	var iconWidth = icon[0].clientWidth;
	$('.search_icon').on('click', function(){
		$(this).animate({width: '0px'}, 400).fadeOut(0);
		$('.search_box').animate({width: '+=60vw'}, 400).css({display: 'block'}).focus();
	});
	$('.search_icon').hover(
		function() {
			$(this).animate({width: '+=10pt'}, 400);
		},
		function(){
			$(this).animate({width: '-=10pt'}, 400);
		}
	);
	$(document).keyup(function(e){
		//pressing the escape key
		if(e.keyCode == 27 ) {
			$('.search_box').animate({width: '0px'}, 400).fadeOut(0).blur();
			console.log(iconWidth);
			$('.search_icon').animate({width: iconWidth}, 400).fadeIn(0);
		}
		// pressing the enter key
		if(e.keyCode == 13) {
			var input = $('.search_box').val();
			$('.horizontal').fadeOut('fast');
			$('.search_text').animate({margin: '0'}, 300, 'swing').delay(0).queue(function(){
				$(this).removeClass('col-xs-12').addClass('col-xs-1').css({marginTop: '-20px'}).dequeue();
			});
			var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+input+"&format=json&callback=?";
			$.ajax({
				url: url,
				type: 'GET',
				contentType: 'application/json charset=utf-8',
				async: false,
				dataType: 'json',
				success: function(data, status, jqXHR) {
					$('.result').html('');
					for(var i = 0; i < data[1].length; i ++) {
						$('.result').append("<div class='container'><div class='well'><a target='blank' href="+data[3][i]+"><h2 id='heading'>"+data[1][i]+"</h2><p id='description'>"+data[2][i]+"</p></a></div></div>");
					}
				}
			});
		}
	});
};

$(document).ready(main);
