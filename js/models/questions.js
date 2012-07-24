window.Question = Backbone.Model.extend({

    urlRoot: '../api/questions',

    initialize: function () {
		
    },

    defaults: {
        id: null,
        question: '',
        options: '',
    }
});

window.QuestionSet = Backbone.Collection.extend({
    
	model: Question,
	url: '../api/questions'
	
});

var questions = new QuestionSet();