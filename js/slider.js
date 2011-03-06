document.observe('dom:loaded', init);

function init() {
	// Slider init
	new Slider('scroller', 'left', 'right', 'linear');
}

/*
 * Slider-Class
 * Last-Update: 2011-03-06
 * Version: 0.1a
 */
var Slider = Class.create({
	initialize: function(scroller, left, right, transition) {
		this.scroller = scroller;
		this.left = left;
		this.right = right;
		this.transition = transition;
		
		this._moveDiv = this.moveDiv;
		this._cancel = this.cancel;
		this._observe = this.observeButtons;
		this.observeButtons();
	},
	
	/* eventhandlers to observe  */
	observeButtons:function() {
		$(this.right).observe('click', this.getData.bind(this));
		$(this.left).observe('click', this.getData.bind(this));
	},
	
	/* get all needed values to move div */
	getData: function(e) {
		var id = e.element().id;
		var fullWidth = null;
		var singleWidth = null;
		var divToMove = $$('#wrap div')[0];
		
		/* get width of all images including margin */
		$$('#wrap div img').collect(function(img) {
			var marginRight = parseInt(img.getStyle('margin-right'));
			var marginLeft = parseInt(img.getStyle('margin-left'));
			var width = img.measure('width');
			//fullWidth += marginRight + marginLeft + width;    	   /* needed ? */
			singleWidth = marginRight + marginLeft + width;
		});
		
		var direction = (id == 'left') ? singleWidth : -singleWidth;
		this._moveDiv(direction, divToMove);
	},
	
	/* remove observers as long as effect is running */
	cancel:function() {
		$(this.right).stopObserving('click');
		$(this.left).stopObserving('click');
	},
	
	/* move div inside #wrap including direction */
	moveDiv:function(direction, divToMove) {
		new Effect.Move(divToMove, { 
			x:direction, 
			duration:0.6,
			beforeStart:this._cancel.bind(this),
			afterFinish:this._observe.bind(this)
		});
	}
});

