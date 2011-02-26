document.observe('dom:loaded', init);

function init() {
	// Slider init
	var slide = new Slider('scroller', 'left', 'right', 'linear');
}






/*
 * Slider-Class
 * Last-Upadte: 2011-02-25
 * Version: 0.1
 */
var Slider = Class.create({
	initialize: function(scroller, left, right, transition) {
		this.scroller = scroller;
		this.left = left;
		this.right = right;
		this.transition = transition;
		
		this.eventHandler(left, right);
	},
	eventHandler:function(left, right) {
		$(left).observe('click', this.getData);
		$(right).observe('click', this.getData);
	},
	getData:function() {
		var id = this.id;
		console.debug(id);
	}
	
	
	
});

