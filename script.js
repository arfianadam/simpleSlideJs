$(document).ready(function() {

	// Getting width of the container and dividing it to the children equally

	var datesliderlength = $('.date-slider').width();
	$('.date-slider ul').width(datesliderlength);

	var contentslider = $(".content-slider li").length;
	$(".content-slider ul").css("width", contentslider*100 + "%");

	// Getting the data properties of the dates and relatively positioning them based on each other's date

	$(function() {
		function getdatevalue(elem) {
			var datetanggal = $(elem).data("tanggal");
			var datebulan = $(elem).data("bulan");
			var datetotal = [datetanggal, datebulan];
			return datetotal;
		}

		// This is the core of the mathematic function
		
		var datefirst = getdatevalue('.date-slider li:first-child');
		var datelast = getdatevalue('.date-slider li:last-child');
		var datedays = datelast[0] - datefirst[0];
		var datejarakdays = Math.abs(((datelast[1] - datefirst[1]) * 30) + (datelast[0] - datefirst[0]));

		$('.date-slider li').each(function() {
			var datecurrent = getdatevalue(this);
			var datejarakcurrentdays = Math.abs(datecurrent[0] - datefirst[0]);
			var datejarakcurrent = Math.abs(((datecurrent[1] - datefirst[1]) * 30) + (datecurrent[0] - datefirst[0]));
			$(this).css('left', datejarakcurrent/datejarakdays*97 + '%');
		})
	})

	// The slider function

	$(function() {

		var ul = $(".content-slider ul");
		var slide_count = contentslider;
		var slide_width_pc = 100.0 / slide_count;
		var slide_index = 0;

		ul.find("li").each(function(indx) {
		var left_percent = (slide_width_pc * indx) + "%";
		$(this).css({"left":left_percent});
		$(this).css({width:(100 / slide_count) + "%"});
		});

		// Listen for click of prev button
		$(".prev").click(function() {
		console.log("prev button clicked");
		slide(slide_index - 1);
		});

		// Listen for click of next button
		$(".next").click(function() {
		console.log("next button clicked");
		slide(slide_index + 1);
		});

		function slide(new_slide_index) {

		if(new_slide_index < 0 || new_slide_index >= slide_count) return; 

		var margin_left_pc = (new_slide_index * (-100)) + "%";

		ul.animate({"margin-left": margin_left_pc}, 400, function() {

		slide_index = new_slide_index

		});

		}

	});

	// Adding class to each child to make it more recognizable

	$(function() {
		for (var i = 1; i <= contentslider; i++) {
			$('.content-slider li:nth-child(' + i + ')').addClass("slidercontent" + i);
		};
	});
})