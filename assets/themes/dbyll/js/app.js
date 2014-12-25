$( document ).ready(function() {

	/* Sidebar height set */
	$('.sidebar').css('min-height',$(document).height());

	/* Secondary contact links */
	var scontacts = $('#contact-list-secondary');
	var contact_list = $('#contact-list');
	
	scontacts.hide();
	
	contact_list.mouseenter(function(){ scontacts.fadeIn(); });
	contact_list.mouseleave(function(){ scontacts.fadeOut(); });

    if(false) {
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
	}
	if(true) {
		var settings = {
			height: 400,          //height of sphere container
			width: 400,           //width of sphere container
			radius: 150,          //radius of sphere
			speed: 1,             //rotation speed
			slower: 0.8,          //sphere rotations slower
			timer: 5,             //delay between update position
			fontMultiplier: 15,   //dependence of a font size on axis Z
			
			//tag css stylies on mouse over
			hoverStyle: {
				border: 'none',
				color: '#0b2e6f'
			},
			
			//tag css stylies on mouse out
			mouseOutStyle: {
				border: '',
				color: ''
			}
		};
 
		$('#tagCloud').tagoSphere(settings);
	 }


});

