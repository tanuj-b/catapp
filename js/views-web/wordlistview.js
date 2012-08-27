window.WordListView = Backbone.View.extend({

	initialize : function() {
		// this.render();
	},

	render : function() {
		$(this.el).empty();
		$(this.el).append('<div data-role="header"><div data-role="navbar" id="but"><ul>');
		var words = this.collection;
		var len = words.length;
	        for (var i = 0; i < len; i++) {
	        	$(this.el).append(new WordListItemView({model: words[i]}).render().el);
	    }
		$(this.el).append('</ul></div><!-- /navbar --></div><!-- /header -->');
	}
});

window.WordListItemView = Backbone.View.extend({

	tagName: "li",
	
	initialize : function() {
		// this.render();
	},
	
	render : function() {
		$(this.el).append(this.template(this.model.toJSON()));
	}
});
