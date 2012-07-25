/**
 * The Result model
 */
window.Result = Backbone.Model.extend({

    urlRoot: '../api/results',

    initialize: function () {
    	this.questions =new QuestionSet();
		this.questions.url = 'api/tests/getQuestionsByTestId/' + this.id;
    },

    defaults: {
        id: null,
        test_id:'',
        options_selected:'',
    	time_per_question:'',
    	submit_time:'',
    	push_time:''
    }
});

window.ResultSet = Backbone.Collection.extend({
	model: Result,
	url: '../api/results'
	
});

var tests = new ResultSet();