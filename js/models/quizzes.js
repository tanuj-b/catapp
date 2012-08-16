window.Quiz = Backbone.Model.extend({
	
	local: true,  // always fetched and saved only locally, never saves on remote
    remote: true, // never cached, dualStorage is bypassed entirely
    
    urlRoot: '../api/quizzes',
        
    initialize: function () {
    	
    },
    
});

window.QuizCollection = Backbone.Collection.extend({
	model: Quiz,
	url: '../api/quizzes'
});

var quizzes = new QuizCollection();