document.observe('dom:loaded', init);

function init() {
	// Slider init
	
}






/*
 * Slider-Class
 * Last-Upadte: 2011-02-25
 * Version: 0.1
 */
var Slider = Class.Create({
	initialize: function(scroller, left, right, transition) {
		this.scroller = scroller;
		this.left = left;
		this.right = right;
		this.transition = transition;
	}
});

