var AppRouter = Backbone.Router.extend({

	routes : {
		"" : "landing",
		"menu" : "menu",
		"profile" : "profile",
	},

	initialize : function() {
		/*
		 * $('.back').live('click', function(event) { window.history.back();
		 * return false; });
		 */
		this.firstPage = true;
		// this.searchResults = new EmployeeCollection();

	},

	landing : function() {
		this.changePage(new LandingView());
	},

	menu : function() {
		this.changePage(new MenuView());
	},

	profile : function(id) {
		var employee = new Employee({
			id : id
		});
		employee.reports.fetch();
		this.changePage(new DirectReportPage({
			model : employee.reports
		}));
	},

	changePage : function(page) {
		$(page.el).attr('data-role', 'page');
		page.render();
		$('body').append($(page.el));
		var transition = $.mobile.defaultPageTransition;
		// We don't want to slide the first page
		if (this.firstPage) {
			transition = 'none';
			this.firstPage = false;
		}
		$.mobile.changePage($(page.el), {
			changeHash : false,
			transition : transition
		});
	}

});

$(document).ready(function() {
	utils.loadTemplate([ 'LandingView' ], function() {
		app = new AppRouter();
		Backbone.history.start();
	});
});