/**
 * 
 */
window.Test = Backbone.Model.extend({

    urlRoot: '../api/tests',

    initialize: function () {
		
    },

    defaults: {
        id: null,
        question: '',
        options: '',
        
    }
});

window.TestSet = Backbone.Collection.extend({
	model: Test,
	url: '../api/tests'
	
});

var tests = new TestSet();