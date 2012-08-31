window.PracticeTopicsView = Backbone.View.extend({

	initialize : function() {
		this.render();
	},

	render : function() {
		$(this.el).html(this.template());
		return this;
	}
});

window.PracticeView = Backbone.View.extend({
	
	initialize : function() {
		this.index = 0;
		this.questionSetIds = this.model.get('questionSetIds').split(SEPARATOR);
		this.length = this.questionSetIds.length;
		this.quizTimer = '0';
		this.model.set('timer',this.quizTimer);
		this.render();
	},
	
	events : {
		'click #previous' : 'onPreviousClick',
		'click #next' : 'onNextClick'
	},
    
	onPreviousClick : function() {
		if (this.index == 0) {
			alert('at the start dude');
		} else {
			this.index--;
			$('#question').empty();
			questionTimer.stop();
			this.renderQuestion();
		}
	},

	onNextClick : function() {
		if (this.index == (this.length-1)) {
			alert('at the end dude');
		} else {
			this.index++;
			$('#question').empty();
			questionTimer.stop();
			this.renderQuestion();
		}
	},

	render : function() {
		$(this.el).html(this.template());
		this.renderQuestion();
		return this;
	},

	renderQuestion : function() {
		var questionSet = questionSets.get(this.questionSetIds[this.index]);
		if (questionSet.get('question_count') > 1) {
					
		} else {
			var questionIds = questionSet.get('questionIds');
			var question = questions.get(questionIds);
			if(question.get('timer')==null){
				question.set('timer',new Timer(1000,utils.updateTimer,[]));
			}
			questionTimer = question.get('timer');
			new QuizQuestionView({
				model : question,
				el:$('#question'),
			});
			questionTimer.start();
		}
		return null;
	}
});

window.PracticeQuestionView = Backbone.View.extend({
	el : $('#question'),
	initialize : function() {
		this.render();
	},
	
	events : {
		'change input:radio[name=option]' : 'onOptionSelection'
	},

	onOptionSelection : function(e) {
		var oldOptionSelected = this.model.get('optionSelected');
		var optionSelected = $('input:radio[name=option]:checked').val();
		if (optionSelected == oldOptionSelected) {
			this.model.set('optionSelected', null);
			$('input:radio[name=option]:checked').attr('checked', false);
		} else {
			this.model.set('optionSelected', optionSelected);
		}
	},

	render : function() {
		$('#question').html(this.template(this.model.toJSON()));
		return this;
	}
});


window.PracticeResultsView = Backbone.View.extend({
	el : $('#question'),
	initialize : function() {
		this.questionSetIds = this.model.get('questionSetIds').split(SEPARATOR);
	},
	
	render : function() {
		var len = this.questionSetIds.length;
		for (var i = 0; i < len; i++) {
			var questionSet = questionSets.get(this.questionSetIds[i]);
			if (questionSet.get('question_count') > 1) {
					
			} else {
				var questionIds = questionSet.get('questionIds');
				var question = questions.get(questionIds);
				var qtime=null;
				if(question.get('timer')==null){
					qtime='not seen';
				}else {
					qtime = question.get('timer').count;
				}
				$(this.el).append(i+'. selected :'+question.get('optionSelected')+' | correct :'+question.get('correctOption')+' | time :'+qtime+'<br>');
			}
		}
		return this;
	}
});