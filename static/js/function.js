// functions

$(document).ready(function() {

// Portfolio Loading

	function loadWork(id) {
		$('#loader').show();
		$('.portfolio article').load('portfolio-work.php #' + id + '',function(){ 

			$('.portfolio article').animate({
				'opacity': 1
				}, 100)
				
				$('.portfolio article')
					.slideDown(700,'swing');	
				});

		}

	$(document)
		.on('click','.portfolio > a',function(e){
			e.preventDefault();
			
			$('body').animate({scrollTop: $('.portfolio').offset().top +150 }, 400);
			
			var id = $(this).attr('class');
			
			loadWork(id);
			})
			
		.on('click','[href="#close"]',function(e){
			e.preventDefault();
			$('.portfolio article').slideUp(700,function(){
				$('.portfolio article').empty();
				});
			$('body').animate({scrollTop: $('.portfolio').position().top }, 400);
			});
			


		
	});
	
	// Smooth Scrolling Internal Links
	
	$(document).ready(function(){
		$('a[href^="#"]').on('click',function (e) {
		    e.preventDefault();
		    var target = this.hash,
		    $target = $(target);
		    $('html, body').stop().animate({
		        'scrollTop': $target.offset().top
		    }, 900, 'swing', function () {
		        window.location.hash = target;
		    });
		});
	});
	
// Retina Image replacement

$(function () {

	if (window.devicePixelRatio == 2) {

          var images = $("img.hires");

          // loop through the images and make them hi-res
          for(var i = 0; i < images.length; i++) {

            // create new image name
            var imageType = images[i].src.substr(-4);
            var imageName = images[i].src.substr(0, images[i].src.length - 4);
            imageName += "@2x" + imageType;

            //rename image
            images[i].src = imageName;
          }
     }

});

$(document).ready(function(){

	$(document).scroll(function() {

    if ( $(document).scrollTop() >= 300 )
        $('body > div.returning').addClass('return_scroll');
    else
        $('body > div.returning').removeClass('return_scroll');

    });

});

