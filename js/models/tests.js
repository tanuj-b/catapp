/**
 * The Test model
 */
window.Test = Backbone.Model.extend({

    urlRoot: '../api/tests',

    initialize: function () {
    	this.questions =new QuestionSet();
		this.questions.url = 'api/tests/getQuestionsByTestId/' + this.id;
    },

    defaults: {
        id: null,
        name:''
    }
});

window.TestSet = Backbone.Collection.extend({
	model: Test,
	url: '../api/tests'
	
});

var tests = new TestSet();