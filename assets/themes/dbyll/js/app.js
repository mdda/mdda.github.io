$( document ).ready(function() {

	/* Sidebar height set */
	$('.sidebar').css('min-height',$(document).height());

	/* Secondary contact links */
	var scontacts = $('#contact-list-secondary');
	var contact_list = $('#contact-list');
	
	scontacts.hide();
	
	contact_list.mouseenter(function(){ scontacts.fadeIn(); });
	contact_list.mouseleave(function(){ scontacts.fadeOut(); });

    var settings = {
		"size" : {
			"grid" : 8, // word spacing, smaller is more tightly packed
			"factor" : 0, // font resize factor, 0 means automatic
			"normalize" : true // reduces outliers for more attractive output
		},
		"options" : {
			"color" : "random-dark",
			"printMultiplier" : 3,
			"sort" : "highest" // "highest" to show big words first, "lowest" to do small words first, "random" to not care
		},
		"font" : "Futura, Helvetica, sans-serif",
		"shape" : "square"
	}
	$("#wordCloud").awesomeCloud( settings );
	
	$('#wordCloud canvas').click(function (e) {
		console.log("Clicked ", e);
		if($(this).parent('li').hasClass('active')){
			$( $(this).attr('href') ).hide();
		}
		else {
			e.preventDefault();
			$(this).tab('show');
		}
	});

});

