/**
 * The quiz views
 * @author ssachan 
 * 
 **/
window.QuizTopicsView = Backbone.View.extend({

    initialize: function () {
    	this.render();
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});

window.QuizView = Backbone.View.extend({

    initialize: function () {
        this.index = this.options.index;
        this.qqView = null;
        this.questionSetIds = this.model.get('questionSetIds').split(SEPARATOR);
        this.length = this.questionSetIds.length;
        this.render();
    },

    events: {
        'click #previous': 'onPreviousClick',
        'click #next': 'onNextClick',
        'click .q-nav' : 'onQNoClick'
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
    
	render : function() {
		$(this.el).html(this.template());
		this.renderQuestion();
		return this;
	},

    renderQuestion: function () {
        var questionSet = questionSets.get(this.questionSetIds[this.index]);
        if (questionSet.get('question_count') > 1) {
            // TODO : handle para questions

        } else {
            var questionIds = questionSet.get('questionIds');
            this.question = questions.get(questionIds);
            this.question.set('timer', 0);
            if (this.qqView == null) {
                this.qqView = new QuizQuestionView({
                    el: $('#question'),
                });
            }
            this.qqView.model = this.question;
            this.qqView.hasAttempted = this.model.get('hasAttempted');
            this.qqView.render();
            this.question.get('openTimeStamps').push(
            new Date().getTime());
            currentQuizQuestion = this.question;
        }
        return null;
    }
});

window.QuizQuestionView = Backbone.View.extend({

    initialize: function () {
    	this.render();
    },

    events: {
        'change input[name=option]': 'onOptionSelection'
    },

    onOptionSelection: function (e) {
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

window.QuizResultsView = Backbone.View.extend({
    initialize: function () {
        this.questionSetIds = this.model.get('questionSetIds').split(SEPARATOR);
    },

    render: function () {
        var len = this.questionSetIds.length;
        for (var i = 0; i < len; i++) {
            var questionSet = questionSets.get(this.questionSetIds[i]);
            if (questionSet.get('question_count') > 1) {

            } else {
                var questionIds = questionSet.get('questionIds');
                var question = questions.get(questionIds);
                var qtime = null;
                if (question.get('timer') == null) {
                    qtime = 'not seen';
                } else {
                    qtime = question.get('timer');
                }
                $(this.el).append(
                i + '. selected :' + question.get('optionSelected') + ' | correct :' + question.get('correctOption') + ' | time :' + qtime + '|openTimeStamps :' + question.get('openTimeStamps') + '|closeTimeStamps :' + question.get('closeTimeStamps') + '<br>');
               
            }
        }
        $(this.el).append('<a href="#quizDetailedView">Detailed Assessment</a><br>');
        $(this.el).append('<a href="#quizAnalyticsView">View Analytics </a><br><br>');       
        $(this.el).append('<div id="quiz-insights"><h3>Detailed Insights</h3> </div>');
        return this;
    }
});
