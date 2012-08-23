window.FlashCardListView = Backbone.View.extend({

	initialize : function() {
		// this.render();
	},

	render : function() {
		currentEl = this.el;
		$(currentEl).empty();
		var output = '';
		this.model.forEach(function(words){
				output = output + (new FlashCardListItemView({model: words}).render().el.innerHTML);
			});
	        
	        $(currentEl).append(this.template({output: output}));
	}
});

window.FlashCardListItemView = Backbone.View.extend({
	
	tagName: "ul",
	
	initialize: function() {
		
	},
	
	render: function(){
		$(this.el).append(this.template(this.model.toJSON()));
		return this;
	}
});

window.FlashCardView = Backbone.View.extend({

	tagName: "li",
	
	initialize : function() {
		// this.render();
	},
	
	render : function() {
		$(this.el).append(this.template(this.model.toJSON()));
	}
});

