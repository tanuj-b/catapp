window.HeaderView = Backbone.View.extend({

	initialize : function() {
		this.render();
	},

	menuChange : function(e) {
		this.currentSelection = $(e.currentTarget).attr('id');
		this.setContents(this.currentSelection);
	},

	setContents : function(menuItem) {
		if (menuItem == 'buy') {
			$('#'+menuItem).addClass('active');
			//window.location = '#buy';
			app.buy('1');
		} else if (menuItem == 'explore') {
			window.location = '';
		} else if (menuItem == 'contact') {
			this.showModal();
		}
	},
	
	render : function() {
		$(this.el).html(this.template());
		return this;
	},

	selectMenuItem : function(menuItem) {
		if (menuItem) {
			$('#' + menuItem).addClass('active');
		}
	},
});