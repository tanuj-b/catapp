/**
 * The quiz views
 * @author ssachan 
 * 
 **/
window.QuizTopicsView = Backbone.View.extend({

    initialize: function () {},

    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});

window.QuizView = Backbone.View.extend({

    initialize: function () {
        this.index = this.options.index;
        this.questionView = null;
        this.questionSetIds = this.model.get('questionSetIds').split(SEPARATOR);
        this.length = this.questionSetIds.length;
    },

    events: {
        'click #previous': 'onPreviousClick',
        'click #next': 'onNextClick',
        'click .q-nav' : 'onQNoClick',
        'click #submitQuiz' : 'submitQuiz',
    },
    
    
    onPreviousClick: function () {
        this.question.get('closeTimeStamps').push(new Date().getTime());
        if (this.index == 0) {
            alert('at the start dude');
        } else {
            this.index--;
            this.renderQuestion();
        }
    },

    onNextClick: function () {
        this.question.get('closeTimeStamps').push(new Date().getTime());
        if (this.index == (this.length - 1)) {
            alert('at the end dude');
        } else {
            this.index++;
            this.renderQuestion();
        }
    },
    
    onQNoClick : function (e){
    	this.index = e.target.getAttribute('id').split('-')[1];
        this.question.get('closeTimeStamps').push(new Date().getTime());
    	this.renderQuestion();
    },
    

    submitQuiz : function (){
    	this.model.set('timeTaken',timer.count); 
    	timer.stop();
        alert('Quiz Up');
        app.stopQuiz();
    },
    
    render: function () {
        $(this.el).append('<div data-role="header"><div data-role="navbar" id="but"><ul><li><a id="previous">Previous</a></li><li>Time : <span id="time"></span></span></li><li><a id="next">Next</a></li></ul></div><!-- /navbar --><!-- /header -->');
        $(this.el).append('<div>');
        for(var i = 0; i< this.length; i++){
        	$(this.el).append('<a id="q-'+i+'" class="q-nav"> '+i+' </a>');
        }	
        $(this.el).append('</div>');
        $(this.el).append('<a id="submitQuiz" class="q-nav">Submit Quiz</a>');
        $(this.el).append('<div data-role="content" id="question"></div>');
        return this;
    },
    
    renderQuestion: function () {
        var questionSet = quizQuestionSets.get(this.questionSetIds[this.index]);
        if (questionSet.get('question_count') > 1) {
            // TODO : handle para questions

        } else {
            var questionIds = questionSet.get('questionIds');
            this.question = quizQuestions.get(questionIds);
            if(this.question.get('timeTaken')==null){
            	this.question.set('timeTaken', 0);
            }
            if (this.questionView == null) {
                this.questionView = new QuizQuestionView({
                    el: $('#question'),
                });
            }
            this.questionView.model = this.question;
            this.questionView.hasAttempted = this.model.get('hasAttempted');
            this.questionView.render();
            this.question.get('openTimeStamps').push(
            new Date().getTime());
            currentQuizQuestion = this.question;
        }
        return null;
    }
});

window.QuizQuestionView = Backbone.View.extend({

    initialize: function () {},

    events: {
        'change input[name=option]': 'onOptionSelection'
    },

    onOptionSelection: function (e) {
        var oldOptionSelected = this.model.get('optionSelected');
        var optionSelected = $('input:radio[name=option]:checked').val();
        if (optionSelected == oldOptionSelected) {
            this.model.set('optionSelected', null);
            $('input:radio[name=option]:checked').attr('checked', false);
            if(!this.model.get('optionUnSelectedTimeStamps')[optionSelected]){
            	this.model.get('optionUnSelectedTimeStamps')[optionSelected] = new Array();
            }
            (this.model.get('optionUnSelectedTimeStamps')[optionSelected]).push(new Date().getTime());
        } else {
            this.model.set('optionSelected', optionSelected);
            if(!this.model.get('optionSelectedTimeStamps')[optionSelected]){
            	this.model.get('optionSelectedTimeStamps')[optionSelected] = new Array();
            }
            (this.model.get('optionSelectedTimeStamps')[optionSelected]).push(new Date().getTime());
        }
    },

    render: function () {
        $('#question').empty();
        $('#question').html(this.template(this.model.toJSON()));
        $('#option-list').listview();
        $('#option-selector').trigger('create');
        if(this.hasAttempted){
        	this.renderInfo(); 
        }
        return this;
    },
    
    renderInfo : function(){
    	$('#info').html('<h3>info</h3>'+this.model.get('explanation'));
   	 	$('#info').append('<br>correct answer-'+this.model.get('correctOption'));
   	 	$('#time').html(this.model.get('timeTaken'));
    }
});

window.QuizResultsView = Backbone.View.extend({
    initialize: function () {
        this.questionSetIds = this.model.get('questionSetIds').split(SEPARATOR);
    },
    
    events: {
        'click #viewInsights': 'viewInsights',
    },

    viewInsights: function () {
      $('#results1').hide();
      $('#insights').show();
    },
	
    render: function () {
        var len = this.questionSetIds.length;
        $(this.el).empty();
        $(this.el).append('Total Correct :'+this.model.get('totalCorrect')+'<br>');
        $(this.el).append('Total Incorrect :'+this.model.get('totalIncorrect')+'<br>' );
        for (var i = 0; i < len; i++) {
            var questionSet = quizQuestionSets.get(this.questionSetIds[i]);
            if (questionSet.get('question_count') > 1) {

            } else {
                var questionIds = questionSet.get('questionIds');
                var question = quizQuestions.get(questionIds);
                var qtime = null;
                if (question.get('timeTaken') == null) {
                    qtime = 'not seen';
                } else {
                    qtime = question.get('timeTaken');
                }
                $(this.el).append(
                'Q'+(i+1) + '. option selected :' + question.get('optionSelected') + ' | option correct :' + question.get('correctOption') + ' | time taken :' + qtime + '<br>openTimeStamps :' + question.get('openTimeStamps') + '|closeTimeStamps :' + question.get('closeTimeStamps') +'|no of optionSelectedTimeStamps :' + question.get('optionSelectedTimeStamps').length +'|no of optionUnSelectedTimeStamps :' + question.get('optionUnSelectedTimeStamps').length + '<br>');
            }
        }
        $(this.el).append('<a href="#quizDetailedView">Detailed Assessment</a><br>');
        $(this.el).append('<a id="viewInsights">View Insights </a>');  
        
        $(this.el).append('<h3>Accuracy Insights :</h3><br>');
		$(this.el).append('You got '+this.model.get('totalCorrect')+' q correct and '+this.model.get('totalIncorrect')+' q incorrect<br>');
		$(this.el).append(this.model.accuracyInsights()+'<br>');
		$(this.el).append('<div id="time-chart"></div>' );
		
		this.model.difficultyLevelInsights();
		$(this.el).append('<h3>Difficulty Insights :</h3><br>');
		
		$(this.el).append('Easy questions you got wrong :'+this.model.get('easyQuestionsIncorrect')+' <br>' );
		$(this.el).append('Easy questions you did not attempt :'+this.model.get('easyQuestionsMissed')+' <br>' );
		$(this.el).append('Difficult Questions you got right :'+this.model.get('difficultQuestionsAnswered')+' <br>' );
		$(this.el).append('<div id="difficulty-chart"></div>' );

		this.model.strategicInsights();
		$(this.el).append('<h3>Strategic Insights :</h3><br>');
		$(this.el).append('you wasted time on lengthy questions :'+this.model.get('wastedTimeOnlengthyQuestions')+'<br>' );
		$(this.el).append('toggled more number of times between options :'+this.model.get('toggleBetweenOptions')+'<br>' );
		$(this.el).append('<div id="strat-chart"></div>' );
		return this;
    }
});
