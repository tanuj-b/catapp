window.LandingView = Backbone.View.extend({
	
	initialize : function() {
		this.render();
	},

	events : {
		'click #flogin' : 'fConnect',
		'click #glogin' : 'gConnect',

	},

	fConnect : function() {
		user.login();
		//also send the details to the server
	},

	gConnect : function() {
		glogin();
	},

	render : function() {
		$(this.el).html(this.template());
	}
});
