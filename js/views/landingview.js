window.LandingView = Backbone.View.extend({

	initialize : function() {
		// this.render();
	},

	events : {
		'click #glogin' : 'googleConnect'
	},
	
	googleConnect : function (){
		
	},
	
	render : function() {
		$(this.el).html(this.template());

	}
});
