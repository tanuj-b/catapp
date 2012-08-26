window.Question = Backbone.Model.extend({
	
	urlRoot: '../api/questions/',

    initialize: function () {
    	//this.openTimeStamps=[];
    	//this.closeTimeStamps=[];
    },

	defaults:{
		optionSelected:null,
		status : null,
    	timer:null,
    	openTimeStamps:[],
    	closeTimeStamps:[]
   	}
});

window.QuestionCollection = Backbone.Collection.extend({
	model: Question,
	url: '../api/questions/'	
});

var questions = new QuestionCollection();