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
        question_type_id:'',
        // we also store the details of the attempt
        attempted_time:'',
        option_selected:'',
        time_taken:'',
        attempted_at:'',
    }
});

window.QuestionSet = Backbone.Collection.extend({
	model: Question,
	url: '../api/questions'
	
});

var questions = new QuestionSet();