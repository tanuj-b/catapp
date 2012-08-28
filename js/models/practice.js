window.PracticeTest = Backbone.Model.extend({

    urlRoot: serverUrl+'practicetests/',

    initialize: function () {
    	
    },
    
});

window.PracticeTestCollection = Backbone.Collection.extend({
	model: PracticeTest,
	url: serverUrl+'practicetests/'	
});

var practiceTests = new PracticeTestCollection();