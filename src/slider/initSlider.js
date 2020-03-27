
(function ($) {
	$(document).ready(function () {
		$('.Slider').slick({
			dots: true,
			customPaging: function (slider, i) {
				const thumb = $(slider.$slides[i]).data();
				return '<a class="dot">' + i + '</a>';
			},
		});
	});
}(jQuery));

