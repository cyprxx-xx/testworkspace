document.observe('dom:loaded', init);

function init() {
	// Slider init
	var slide = new Slider('scroller', 'left', 'right', 'linear');
	//slide.wurstbrot();
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
		
		// left and right button observe
		$(left).observe('click', this.getData);
		$(right).observe('click', this.getData);
		
		this.wurstbrot();
	},
	wurstbrot:function() {
		alert('test');
	},	
	getData: function() {
		var id = this.id;
		var fullWidth = null;
		var singleWidth = null;
		var divToMove = $$('#wrap div')[0];
		
		// get width of all images including margin
		$$('#wrap div img').collect(function(img) {
			var marginRight = parseInt(img.getStyle('margin-right'));
			var marginLeft = parseInt(img.getStyle('margin-left'));
			var width = img.measure('width');
			fullWidth += marginRight + marginLeft + width;
			singleWidth = marginRight + marginLeft + width;
		});
		
		// Move Function
		var direction = (id == 'left') ? singleWidth : -singleWidth;
		
		// check for position of div, if end is reached: clone div and add it for endless scrolling
		new Effect.Move(divToMove, { x:direction });
		//this.wurstbrot();
	}
});

