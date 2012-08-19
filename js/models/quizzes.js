window.Quiz = Backbone.Model.extend({
	
	urlRoot: '../api/quizzes/',
	local: true,  // always fetched and saved only locally, never saves on remote
    remote: false, // never cached, dualStorage is bypassed entirely

    initialize: function () {
    	
    },
    
});

window.QuizCollection = Backbone.Collection.extend({
	model: Quiz,
	url: '../api/quizzes/'
});

var quizzes = new QuizCollection();