window.PerformanceView = Backbone.View.extend({

	el : $('#content'),
	initialize : function() {
		this.render();
	},

	render : function() {
		$(this.el).html(this.template());
		return this;
	}
});
