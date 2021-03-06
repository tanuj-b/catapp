/**
 * The practice views
 * @author ssachan 
 * 
 **/

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
		 this.index = this.options.index;
	     this.questionView = null;
	     this.questionSetIds = this.model.get('questionSetIds').split(SEPARATOR);
	     this.questionIds = this.model.getQuestionIds();
	     this.questionSetIds = this.model.get('questionSetIds').split(SEPARATOR);
	     this.totalQuestions = this.questionIds.length;
	     this.question = null;
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
			this.renderQuestion();
		}
	},

	onNextClick : function() {
		if (this.index == (this.length-1)) {
			alert('at the end dude');
		} else {
			this.index++;
			$('#question').empty();
			this.renderQuestion();
		}
	},

	render : function() {
		$(this.el).html(this.template({'totalQuestions':this.totalQuestions}));
		return this;
	},

	renderQuestion : function() {
		this.question = practiceQuestions.get(this.questionIds[this.index]);
        if(this.question.get('timeTaken')==null){
        	this.question.set('timeTaken', 0);
        }
        if (this.questionView == null) {
            this.questionView = new PracticeQuestionView({
            	el : $('#question'),
            });
        }
        this.questionView.model = this.question;
        currentPracticeQuestion = this.question;
        this.questionView.render();
        if(this.question.get('attemptedInPractice')==true){
        	timer.stop();
        }else{
        	timer.start();
        }
        this.question.get('openTimeStamps').push(
        new Date().getTime());
	        return null; 
	}
});

window.PracticeQuestionView = Backbone.View.extend({
	initialize : function() {
	},
	
	events : {
        'click div.btn-group button': 'onOptionSelection'
	},

	onOptionSelection : function(e) {
		var oldOptionSelected = this.model.get('optionSelected');
		var optionSelected = e.target.value;
	    if (optionSelected == oldOptionSelected) {
	            this.model.set('optionSelected', null);
	    } else {
	            this.model.set('optionSelected', optionSelected);
	    } 
	    this.model.set('attemptedInPractice',true);
	    timer.stop();
	    this.renderInfo();
	},

	render : function() {
		$('#question').html(this.template(this.model.toJSON()));
		if(this.model.get('attemptedInPractice')==true){
	    	this.renderInfo();
	    }
		return this;
	},
	
	renderInfo : function(){
    	$('#info').html('<h3>info</h3>correct answer-'+this.model.get('correctOption'));
      	$('#info').append('<br>'+this.model.get('explanation'));
      	$("input[type='radio']").checkboxradio('disable');   
      	$('#time').html(this.model.get('timeTaken'));
	}
});