window.Question = Backbone.Model.extend({

    urlRoot: '../api/questions',

    initialize: function () {
		
    },

    defaults: {
        id: null,
        question: '',
        options: '',
        answer:'',
        comments:'',
        difficulty:'',
        average_time:'',
        question_type_id:''
    }
});

window.QuestionSet = Backbone.Collection.extend({
	model: Question,
	url: '../api/questions'
	
});

var questions = new QuestionSet();