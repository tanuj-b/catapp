window.ProfileView = Backbone.View.extend({

	initialize : function() {
		this.render();
		this.activeMenu = 'suggestions';
	},
	
	events : {
		'click .menu' : 'onMenuClick',
	},

	onMenuClick : function (e) {
    	$('#'+this.activeMenu+'-div').hide();
    	this.activeMenu = e.target.getAttribute('id');
    	$('#'+this.activeMenu+'-div').show();
	},
	
	render : function() {
		$(this.el).html(this.template());
		$('#news-div').hide();
		$('#challenges-div').hide();
		this.activeMenu = 'suggestions';
		return this;
	}
});
