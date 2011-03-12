document.observe('dom:loaded', init);

function init() {
	new Slider('scroller', 'left', 'right');
}

/*
 * Slider-Class
 * Last-Update: 2011-03-12
 * Version: 0.2
 */
var Slider = Class.create({
	initialize: function(scroller, left, right, transition) {
		this.fullWidth = null;
		this.singleWidth = null;
		var id = null;
			
		this.scroller = scroller;
		this.left = left;
		this.right = right;
		
		this._moveDiv = this.moveDiv;
		this._cancel = this.cancel;
		this._observe = this.observeButtons;
		
		this.observeButtons(id);
		this.getData();
	},
	
	/* elements to observe  */
	observeButtons:function(id) {
		
		$(this.right).observe('click', this.moveDiv.bind(this));
		$(this.left).observe('click', this.moveDiv.bind(this));
		
		if(id == 'right') {
			var firstLi = $$('#wrap ul li').first().clone(true);
			$$('#wrap ul li').first().remove();
			$$('#wrap ul').first().insert({ bottom:firstLi });
			$$('#wrap ul').first().setStyle({ left:'0px' });
		}
	},
	
	getData: function() {
		/* get width of all images + margin */
		var img = $$('#wrap li').first();
		var marginRight = parseInt(img.getStyle('margin-right'));
		var marginLeft = parseInt(img.getStyle('margin-left'));
		var width = img.measure('width');
		
		this.singleWidth = marginRight + marginLeft + width;
		this.fullWidth = this.singleWidth * ($$('#wrap li').size());
				
		$$('#wrap ul').first().setStyle({ width:this.fullWidth+'px' });
	},	
		
	/* remove observers as long as effect is active */
	cancel:function() {
		$(this.right).stopObserving('click');
		$(this.left).stopObserving('click');
	},
	
	/* move div inside #wrap including direction */
	moveDiv:function(e) {
		var id = e.element().id;
		var divToMove = $$('#wrap ul').first();
		var direction = (id == 'left') ? this.singleWidth : this.singleWidth * (-1);
		
		/* clone and insert li's */
		var firstLi = $$('#wrap ul li').first().clone(true);
		var lastLi = $$('#wrap ul li').last().clone(true);
		
		if(id == 'left') {
			$$('#wrap ul').first().setStyle({ left:-this.singleWidth+'px' });
			$$('#wrap ul').first().insert({ top:lastLi });
			$$('#wrap ul li').last().remove();
		}
		
		new Effect.Move(divToMove, { 
			x:direction, 
			duration:0.5,
			beforeStart:this._cancel.bind(this),
			afterFinish:this._observe.bind(this, id)
		});
		
		
	}
});

