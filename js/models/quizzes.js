window.Quiz = Backbone.RelationalModel.extend({

    urlRoot: '../api/quizzes',

    initialize: function () {
    	
    },
    
});

window.QuizCollection = Backbone.Collection.extend({
	model: Quiz,
	url: '../api/quizzes'	
});

var quizzes = new QuizCollection();