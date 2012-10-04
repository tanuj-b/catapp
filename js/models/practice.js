window.PracticeTest = Backbone.Model.extend({

    urlRoot: Config.serverUrl+'practicetests/',

    initialize: function () {
    	 if (!this.get('questionIds')) {
             this.set({
            	 questionIds: new Array()
             });
         }
    },
    
	/**
	 * Get all question ids belonging to this practice 
	 **/
	getQuestionIds : function (){
		var questionIds=this.get('questionIds');
		if(questionIds.length==0){		
			var questionSetIds = this.get('questionSetIds').split(SEPARATOR);
			var len = questionSetIds.length;
			for(var i=0; i<len; i++ )
			{
				var questionSet = quizQuestionSets.get(questionSetIds[i]);
				questionIds = questionIds.concat((questionSet.get('questionIds')).split(SEPARATOR));	
			}
		}
        return questionIds ;
	}
});

window.PracticeTestCollection = Backbone.Collection.extend({
	model: PracticeTest,
	url: Config.serverUrl+'practicetests/',
    store: new WebSQLStore(db, "practice")
});

var practiceTests = new PracticeTestCollection();