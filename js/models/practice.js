window.PracticeTest = Backbone.Model.extend({

    urlRoot: Config.serverUrl+'practicetests/',

    initialize: function () {
    	
    }
});

window.PracticeTestCollection = Backbone.Collection.extend({
	model: PracticeTest,
	url: Config.serverUrl+'practicetests/'	
});

var practiceTests = new PracticeTestCollection();