$(document).ready(function(){
	$('.button-collapse').sideNav({
	    menuWidth: 200, // Default is 240
	    edge: 'right', // Choose the horizontal origin
	    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
	  }
	);
	$('.button-collapse').sideNav('show');
	$("div.canvas-container").css({margin:"0 auto"});

});