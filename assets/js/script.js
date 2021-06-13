

// document ready
$(function(){

	var $win = $(window), $doc = $(document), $body = (document.body), $nav = $("#nav");


	// helper
	function isRTL() {
		return $('html').attr('dir') === 'rtl';
	}

	function loadWorkGrid() {
		var $container = $('#works-grid .isotope'),
        colWidth = function () {
            var w = $container.width(), 
            columnNum = 1,
            columnWidth = 0;
        
            if($('#works-grid').length > 0)  {
                if (w > 1040)     { columnNum  = 3; }  
                else if (w > 850) { columnNum  = 3; }  
                else if (w > 768) { columnNum  = 3; }  
                else if (w > 480) { columnNum  = 2; }
                else if (w > 300) { columnNum  = 1; }   
            }
            
            columnWidth = Math.floor(w/columnNum);

            //Default item width and height
            $container.find('.item').each(function() {
                var $item = $(this), 
                width = columnWidth,
                height = columnWidth;
                $item.css({ width: width, height: height });
            }); 

            return columnWidth;
        }

        $container = $('#works-grid .isotope').isotope({
            resizable: true,
            itemSelector: '.item',
            masonry: {
            	layoutMode: 'fitRows',
            	columnWidth: '.grid-sizer', 
                //columnWidth: colWidth(),
                //gutterWidth: 20,
				percentPosition: true
            }
        });

        $('#works-grid .filteration').on( 'click', 'li', function() {
            $('.filteration li').removeClass('active');
            $(this).addClass('active');
            var filterValue = $(this).attr('data-filter');
            $container.isotope({ filter: filterValue });
        });
	}


	// slick
	$('#home_slider').slick({
		prevArrow: '<button class="right_arrow"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>',
		nextArrow: '<button class="left_arrow"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>',
		rtl:isRTL()
	});

	$win.on('resize', loadWorkGrid);
	loadWorkGrid();

});