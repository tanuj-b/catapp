window.Question = Backbone.Model.extend({
	
	urlRoot: '../api/questions/',

    initialize: function () {
		
    }
});

window.QuestionCollection = Backbone.Collection.extend({
	model: Question,
	url: '../api/questions/'	
});

var questions = new QuestionCollection();