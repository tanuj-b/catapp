window.QuestionList = Backbone.Model.extend({

    urlRoot: '../api/questions',

    initialize: function () {
    	this.questions =new QuestionSet();
		this.questions.url = '../api/questions/getQuestionsByQuestionListId/' + this.id;
    },

    defaults: {
        id: null,
        paragraph:'',
        question_count:'',
        difficulty:''
    }
});

window.QuestionListSet = Backbone.Collection.extend({
	model: Question,
	url: '../api/questions'
	
});
