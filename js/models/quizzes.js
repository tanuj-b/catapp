window.Quiz = Backbone.Model.extend({

    urlRoot: '../api/quizzes',
        
    initialize: function () {
    	
    },
    
});

window.QuizCollection = Backbone.Collection.extend({
	model: Quiz,
	url: '../api/quizzes',
	local: false , // always fetched and saved only locally, never saves on remote
	remote: true, // never cached, dualStorage is bypassed entirely

});

var quizzes = new QuizCollection();