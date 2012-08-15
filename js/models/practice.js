window.PracticeTest = Backbone.RelationalModel.extend({

    urlRoot: '../api/practicetests',

    initialize: function () {
    	
    },
    
});

window.PracticeTestCollection = Backbone.Collection.extend({
	model: PracticeTest,
	url: '../api/practicetests'	
});

var practiceTests = new PracticeTestCollection();