/**
 * The Quiz Model
 * @author ssachan 
 * 
 **/
window.Quiz = Backbone.Model.extend({

    urlRoot: Config.serverUrl+'quizzes/',
    /*local: true, // always fetched and saved only locally, never saves on remote
    remote: false, // never cached, dualStorage is bypassed entirely
	*/
    initialize: function () {
    	
    	 if (!this.get('questionIds')) {
             this.set({
            	 questionIds: new Array()
             });
         }
         
    	 if (!this.get('optionSelectedPerQuestion')) {
             this.set({
            	 optionSelectedPerQuestion: new Array()
             });
         }
    	 
    	 if (!this.get('timeTakenPerQuestion')) {
             this.set({
            	 timeTakenPerQuestion: new Array()
             });
         }
    },

    defaults: {
        'hasAttempted' : false,
        'totalCorrect' : 0,
        'totalIncorrect' : 0,
        'timeTaken' : 0,
        'strategicInsightsCalculated' : false,
        'accuracyInsightsCalculated' : false,
        'difficultyInsightsCalculated' : false,
        'synced':false
    },
    
	/**
	 * Calculates the total correct incorrect and stores them in totalCorrect and totalIncorrect  
	 **/
	calculateScores : function(){
		if(!(this.get('hasAttempted'))){
			var questionIds = this.getQuestionIds();
			var len = questionIds.length;
			for(var i=0; i<len; i++ )
			{
				var question = quizQuestions.get(questionIds[i]);
				if(question.isOptionSelectedCorrect()==true){
					this.set('totalCorrect', this.get('totalCorrect')+1);
				}else if (question.isOptionSelectedCorrect()==false){
					this.set('totalIncorrect', this.get('totalIncorrect')+1);
				}
				this.get('optionSelectedPerQuestion').push(question.get('optionSelected'));
				this.get('timeTakenPerQuestion').push(question.get('timeTaken'));
			}
			this.set('hasAttempted',true);
		}
	},
	
	/**
	 * Get all question ids belonging to this quiz 
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
	},
});

window.QuizCollection = Backbone.Collection.extend({
    model: Quiz,
    url: Config.serverUrl+'quizzes/',
    store: new WebSQLStore(db, "quizzes")
});

var quizzes = new QuizCollection();
