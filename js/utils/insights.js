/**
 * The insights calculated on quizzes
 * 
 * @author ssachan
 * 
 */
window.insights = {

	INSIGHTS : {
		ins1 : 'Your accuracy was very low while you utilized less than half the time. Focus more on accuracy than time',
		ins2 : 'Give more time to the questions to improve on your accuracy',
		ins3 : 'You are doing excellent on the time strategy, work on improving accuracy in the extra time you save',
		ins4 : 'Rockstar',
		ins5 : 'Your accuracy was very low while you did not utilize all the time. ',
		ins6 : 'Give more time to the questions to improve on your accuracy ',
		ins7 : 'You are doing good on the time strategy, work on improving accuracy in the extra time you save ',
		ins8 : 'Rockstar ',
		ins9 : 'You need to work on improving your accuracy',
		ins10 : 'There is still scope of improvement in the accuracy',
		ins11 : 'Your time strategy seems to be working, get your accuracy up there too ',
		ins12 : 'You are doing well on both time and accuracy. Lets give you a tougher challenge',
		ins13 : 'Get back to concepts ',
		ins14 : 'Better time strategy will help you pick easier questions and improve your accuracy',
		ins15 : 'Better time strategy will help you pick easier questions and improve your accuracy',
		ins16 : 'While you did well, you could have picked a better set of questions to answers if you managed time well',

		ins17 : 'Easy questions you did not attempt',
		ins18 : 'Easy questions you got wrong',
		ins19 : 'Difficult questions you got right',

		ins20 : 'Wasted time on calculation based questions',
		ins21 : 'You toggled too many times between the options and got it wrong',
		ins22 : 'You toggled too many times between the options but eventually got it wrong',
	},

	/**
	 * accuracy insights function
	 */
	accuracyInsights : function(quiz) {

		var insights = [];
		var insight ='';
		var allotedTime = quiz.get('allotedTime');
		var questionCount = quiz.getQuestionIds().length;
		var totalScrore = quiz.get('totalCorrect');
		var timeTaken = quiz.get('timeTaken');

		var a = (9 * parseInt(allotedTime)) / 10;
		var b = (5 * parseInt(allotedTime)) / 10;

		var x = (9 * parseInt(questionCount)) / 10;
		var y = (6 * parseInt(questionCount)) / 10;
		var z = (3 * parseInt(questionCount)) / 10;

		if (timeTaken >= a) {
			// case if time taken is more than 90
			if (totalScrore >= x) {
				insight = this.INSIGHTS.ins12;
			} else if (totalScrore < x && totalScrore >= y) {
				insight = this.INSIGHTS.ins11;
			} else if (totalScrore < y && totalScrore >= z) {
				insight = this.INSIGHTS.ins10;
			} else if (totalScrore < z) {
				insight = this.INSIGHTS.ins9;
			}
		} else if (timeTaken < a && timeTaken >= b) {
			// case if time taken is between 90 and 50
			if (totalScrore >= x) {
				insight = this.INSIGHTS.ins8;
			} else if (totalScrore < x && totalScrore >= y) {
				insight = this.INSIGHTS.ins7;
			} else if (totalScrore < y && totalScrore >= z) {
				insight = this.INSIGHTS.ins6;
			} else if (totalScrore < z) {
				insight = this.INSIGHTS.ins5;
			}
		} else if (timeTaken < b) {
			// if time table is less that 50
			if (totalScrore >= x) {
				insight = this.INSIGHTS.ins4;
			} else if (totalScrore < x && totalScrore >= y) {
				insight = this.INSIGHTS.ins3;
			} else if (totalScrore < y && totalScrore >= z) {
				insight = this.INSIGHTS.ins2;
			} else if (totalScrore < z) {
				insight = this.INSIGHTS.ins1;
			}
		}
		
		insights.push(insight);
		return insights;
	},

	/**
	 * difficulty level insights
	 */

	difficultyLevelInsights : function(quiz) {
		
		var insights = [];
		var easyQuestionsMissed = [];
		var easyQuestionsIncorrect = [];
		var difficultQuestionsAnswered = [];
		var questionIds = quiz.getQuestionIds();
		var len = questionIds.length;
		var easy = 1; // define whats easy and difficult
		var difficult = 4;
		for ( var i = 0; i < len; i++) {
			var question = quizQuestions.get(questionIds[i]);
			var difficulty = question.get('difficulty');
			var isCorrect = question.isOptionSelectedCorrect();
			if (isCorrect == null) {
				// question not attempted
				if (difficulty == easy) {
					// easy question missed
					easyQuestionsMissed.push(i+1);
				}
			} else if (difficulty == easy && !(isCorrect)) {
				// easy questions you got wrong
				easyQuestionsIncorrect.push(i+1);
			} else if (difficulty == difficult && isCorrect) {
				// this.difficultQuestionsAnswered
				difficultQuestionsAnswered.push(i+1);
			}
		}
		insights.push('Easy questions you missed '+ easyQuestionsMissed+'' );
		insights.push('Easy questions you got wrong '+ easyQuestionsIncorrect+'' );
		insights.push('Difficult questions you got right '+difficultQuestionsAnswered);
		return insights.join('<br>');
	},

	/**
	 * strategic insights
	 */

	strategicInsights : function(quiz) {
		var insights = [];
		var wastedTimeOnlengthyQuestions = [];
		var toggleBetweenOptions = [];
		var toggleThreshHold = 4;
		var questionIds = quiz.getQuestionIds();
		var len = questionIds.length;
		for ( var i = 0; i < len; i++) {
			var question = quizQuestions.get(questionIds[i]);
			var tagIds = question.get('tagIds');
			var timeTaken = question.get('timer');
			var avgTime = question.get('averageTimeCorrect');
			if (avgTime != null && timeTaken > avgTime
					&& (tagIds.indexof("1") != -1)) {
				// lengthy question answered
				wastedTimeOnlengthyQuestions.push(i+1);
			}
			var numberOfToggles = 0;
			var optionSelectedTimeStamps = question
					.get('optionSelectedTimeStamps');
			var optionUnSelectedTimeStamps = question
					.get('optionUnSelectedTimeStamps');

			for (options in optionSelectedTimeStamps) {
				if (optionSelectedTimeStamps[options] != null) {
					numberOfToggles = numberOfToggles
							+ optionSelectedTimeStamps[options].length;
				}
			}
			for (options in optionUnSelectedTimeStamps) {
				if (optionUnSelectedTimeStamps[options] != null) {
					numberOfToggles = numberOfToggles
							+ optionUnSelectedTimeStamps[options].length;
				}
			}
			if (numberOfToggles > toggleThreshHold) {
				toggleBetweenOptions.push(i+1);
			}
		}
		insights.push('Time wasted on lengthy questions '+wastedTimeOnlengthyQuestions);
		insights.push('Toggled too many times between options '+toggleBetweenOptions);
		return insights.join('<br>');
	},
};
