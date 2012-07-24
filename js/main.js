var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "explore",
    },

    initialize: function () {
    },

	explore: function(page) {
		questions.fetch({success: function(){
			new QuestionView({collection: questions, el:$('#content')});
			//new SubmitQuestion({el:$('#submit-question')});
			//new QuestionList({collection: questions, el:$('#question-list')});
        }});
	 },
});

utils.loadTemplate(['QuestionView','QuestionList','SubmitQuestion'], function() {
    app = new AppRouter();
    Backbone.history.start();
});