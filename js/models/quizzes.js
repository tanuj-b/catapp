/**
 * The Quiz Model
 * @author ssachan 
 * 
 **/
window.Quiz = Backbone.Model.extend({

    urlRoot: serverUrl+'quizzes/',
    local: true, // always fetched and saved only locally, never saves on remote
    remote: false, // never cached, dualStorage is bypassed entirely

    initialize: function () {},

    defaults: {
        'hasAttempted' : false,
        'totalCorrect' : 0,
        'totalIncorrect' : 0,
        'timeTaken' : 0,
        'easyQuestionsIncorrect' : '',
        'easyQuestionsMissed' : '',
        'difficultQuestionsAnswered' : '',
        'toggleBetweenOptions' : '',
        'wastedTimeOnlengthyQuestions' : '',
        'strategicInsightsCalculated' : '',
        'accuracyInsightsCalculated' : '',
        'difficultyInsightsCalculated' : ''

    },
    
	// insights.
  	INSIGHTS : {
  	    ins1	: 'Your accuracy was very low while you utilized less than half the time. Focus more on accuracy than time',
  	    ins2	: 'Give more time to the questions to improve on your accuracy',
  	    ins3	: 'You are doing excellent on the time strategy, work on improving accuracy in the extra time you save',
  	    ins4	: 'Rockstar',
  	    ins5	: 'Your accuracy was very low while you did not utilize all the time. ',
  	    ins6	: 'Give more time to the questions to improve on your accuracy ',
  	    ins7	: 'You are doing good on the time strategy, work on improving accuracy in the extra time you save ',
  	    ins8	: 'Rockstar ',
  	    ins9	: 'You need to work on improving your accuracy',
	    ins10	: 'There is still scope of improvement in the accuracy',
	    ins11	: 'Your time strategy seems to be working, get your accuracy up there too ',
	    ins12	: 'You are doing well on both time and accuracy. Lets give you a tougher challenge',
	    ins13	: 'Get back to concepts ',
  	    ins14	: 'Better time strategy will help you pick easier questions and improve your accuracy',
	    ins15	: 'Better time strategy will help you pick easier questions and improve your accuracy',
	    ins16	: 'While you did well, you could have picked a better set of questions to answers if you managed time well',
	    
	    ins17	: 'Easy questions you did not attempt',
	    ins18	: 'Easy questions you got wrong',
	    ins19	: 'Difficult questions you got right',
	    
	    ins20	: 'Wasted time on calculation based questions',
	    ins21	: 'You toggled too many times between the options and got it wrong',
	    ins22	: 'You toggled too many times between the options but eventually got it wrong',
  	},
	
	/**
	 * accuracy insights function 
	 **/
	accuracyInsights : function (){
		var totalScrore  = this.get('totalCorrect');
		var timeTaken = this.get('timeTaken');
		var insight = '';
		var a=b=0;c=9;
		var x = 3,y = 6, z = 9; 
		if(timeTaken > c ){
			if(totalScrore < x ){
				insight = this.INSIGHTS.ins9;
			} else if(totalScrore > x && totalScrore < y){
				insight = this.INSIGHTS.ins10;
			} else if(totalScrore > y && totalScrore < z){
				insight = this.INSIGHTS.ins11;
			} else if(totalScrore > y && totalScrore < z){
				insight = this.INSIGHTS.ins12;				
			}
		} else if(timeTaken <c && timeTaken >b){
			if(totalScrore < x ){
				insight = this.INSIGHTS.ins5;
			} else if(totalScrore > x && totalScrore < y){
				insight = this.INSIGHTS.ins6;
			} else if(totalScrore > y && totalScrore < z){
				insight = this.INSIGHTS.ins7;
			} else if(totalScrore > y && totalScrore < z){
				insight = this.INSIGHTS.ins8;				
			}
		} else if(timeTaken<b && timeTaken>a){
			if(totalScrore < x ){
				insight = this.INSIGHTS.ins1;
			} else if(totalScrore > x && totalScrore < y){
				insight = this.INSIGHTS.ins2;
			} else if(totalScrore > y && totalScrore < z){
				insight = this.INSIGHTS.ins3;
			} else if(totalScrore > y && totalScrore < z){
				insight = this.INSIGHTS.ins4;				
			}
		}
		return insight;
	},
	
	/**
	 * difficulty level insights 
	 **/

	difficultyLevelInsights : function (){
		var questionIds = this.getQuestionIds();
		var len = questionIds.length;
		for(var i=0; i<len; i++ )
		{
			var question = quizQuestions.get(questionIds[i]);
			var difficulty = question.get('difficulty');
  	       	var isCorrect = question.isOptionSelectedCorrect();
  	       	if(isCorrect==null){
  	       		// question not attempted
  	       		if(difficulty==easy){
  	       			// easy question missed
  	  	    	   this.set('easyQuestionsIncorrect',this.get('easyQuestionsIncorrect')+i+'|');
  	       		}
  	       	} else if(difficulty==easy && !(isCorrect)){
  	    	   // easy questions you got wrong
  	    	   this.set('easyQuestionsMissed',this.get('easyQuestionsMissed')+i+'|');
  	       	}else if(difficulty==difficult && isCorrect){
  	    	   //this.difficultQuestionsAnswered
   	    	   this.set('difficultQuestionsAnswered',this.get('difficultQuestionsAnswered')+i+'|');
  	       	}
  	       
		}        
	},
	
	/**
	 *  strategic insights
	 **/

	strategicInsights : function (){
		var toggleThreshHold = 4;
		var questionIds = this.getQuestionIds();
		var len = questionIds.length;
		for(var i=0; i<len; i++ )
		{
			var question = quizQuestions.get(questionIds[i]);
			var tag = question.get('tagIds');
			var timeTaken = question.get('timer');
			if(timeTaken> question.get(averageTimeCorrect) && tag == 'difficult'){
	   	    	   this.set('difficultQuestionsAnswered',this.get('difficultQuestionsAnswered')+i+'|');
			}
			var numberOfToggles = 0; 
			var optionSelectedTimeStamps = question.get('optionSelectedTimeStamps');
			var optionUnSelectedTimeStamps = question.get('optionUnSelectedTimeStamps');

			for(options in optionSelectedTimeStamps){
				numberOfToggles = numberOfToggles + optionSelectedTimeStamps[options].length;
			}
			for(options in optionUnSelectedTimeStamps){
				numberOfToggles = numberOfToggles + optionUnSelectedTimeStamps[options].length;
			}
			if(numberOfToggles > toggleThreshHold){
	   	    	   this.set('toggleBetweenOptions',this.get('toggleBetweenOptions')+i+'|');
			}
        }
        
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
			}
			this.hasAttempted = true;
		}
	},
	
	/**
	 * Get all question ids belonging to this quiz 
	 **/
	getQuestionIds : function (){
		var questionIds=new Array();
		var questionSetIds = this.get('questionSetIds').split(SEPARATOR);
        var len = questionSetIds.length;
		for(var i=0; i<len; i++ )
		{
        	var questionSet = quizQuestionSets.get(questionSetIds[i]);
        	questionIds = questionIds.concat((questionSet.get('questionIds')).split(SEPARATOR));	
        }
        return questionIds ;
	}

});

window.QuizCollection = Backbone.Collection.extend({
    model: Quiz,
    url: serverUrl+'quizzes/'
});

var quizzes = new QuizCollection();