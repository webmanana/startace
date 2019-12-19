jQuery(document).ready(function(){
	$('[data-quantity="plus"]').on("click",function(e){
				// Stop acting like a button
				e.preventDefault();
				// Get the field name
				fieldName = $(this).attr('data-field');
				// Get its current value
				var currentVal = parseInt($('input[name='+fieldName+']').val());
				// If is not undefined
				if (!isNaN(currentVal)) {
						// Increment
						$('input[name='+fieldName+']').val(currentVal + 1);
				} else {
						// Otherwise put a 0 there
						$('input[name='+fieldName+']').val(1);
				}
				if (currentVal == 0) {
					$(this).parents(".plus-minus-input").find(".minus").removeClass("disabled");
				}
		});
		// This button will decrement the value till 0
		$('[data-quantity="minus"]').click(function(e) {
				// Stop acting like a button
				e.preventDefault();
				// Get the field name
				fieldName = $(this).attr('data-field');
				// Get its current value
				var currentVal = parseInt($('input[name='+fieldName+']').val());


				if (currentVal == 1) {
			$(".minus").addClass("disabled");
				}
				// If it isn't undefined or its greater than 0
				if (!isNaN(currentVal) && currentVal > 1) {
						// Decrement one
						$('input[name='+fieldName+']').val(currentVal - 1);
				} else {
						// Otherwise put a 0 there
						$('input[name='+fieldName+']').val(1);
				}
		});
});
$('img[src$=".svg"]').each(function() {
	var $img = jQuery(this);
	var imgURL = $img.attr('src');
	var attributes = $img.prop("attributes");

	$.get(imgURL, function(data) {
		var $svg = jQuery(data).find('svg');

		$svg = $svg.removeAttr('xmlns:a');

		$.each(attributes, function() {
			$svg.attr(this.name, this.value);
		});

		$img.replaceWith($svg);
	}, 'xml');
});
$(document).ready(function(){
  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        window.location.hash = hash;
      });
    }
  });
});
$(window).on('load resize', function() {
	if ($(window).width() < 1200) {
		var $nav = $('.greedy');
		var $btn = $('.greedy button');
		var $vlinks = $('.greedy .links');
		var $hlinks = $('.greedy .dropdown_menu');

		var numOfItems = 0;
		var totalSpace = 0;
		var breakWidths = [];

		// Get initial state
		$vlinks.children().outerWidth(function(i, w) {
			totalSpace += w;
			numOfItems += 1;
			breakWidths.push(totalSpace);
		});

		var availableSpace, numOfVisibleItems, requiredSpace;

		function check() {

			// Get instant state
			availableSpace = $vlinks.width() - 10;
			numOfVisibleItems = $vlinks.children().length;
			requiredSpace = breakWidths[numOfVisibleItems - 1];

			// There is not enought space
			if (requiredSpace > availableSpace) {
				$vlinks.children().last().prependTo($hlinks);
				numOfVisibleItems -= 1;
				check();
				// There is more than enough space
			} else if (availableSpace > breakWidths[numOfVisibleItems]) {
				$hlinks.children().first().appendTo($vlinks);
				numOfVisibleItems += 1;
			}
			// Update the button accordingly
			$btn.attr("count", numOfItems - numOfVisibleItems);
			if (numOfVisibleItems === numOfItems) {
				$btn.addClass('hidden');
			} else $btn.removeClass('hidden');

		}
		// Window listeners
		$(window).resize(function() {
			check();
		});

		$btn.on('click', function() {
			$hlinks.toggleClass('hidden');
		});

		check();
		$( document ).ready(function() {
			$('.bottom_header_content').addClass('initialized');
		});
	}
	
});
