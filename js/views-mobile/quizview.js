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
        this.qqView = null;
        this.questionSetIds = this.model.get('questionSetIds').split(SEPARATOR);
        this.length = this.questionSetIds.length;
    },

    events: {
        'click #previous': 'onPreviousClick',
        'click #next': 'onNextClick'
    },

    onPreviousClick: function () {
        this.question.get('closeTimeStamps').push(new Date().getTime());
        if (this.index == 0) {
            alert('at the start dude');
        } else {
            this.index--;
            $('#question').empty();
            this.renderQuestion();
        }
    },

    onNextClick: function () {
        this.question.get('closeTimeStamps').push(new Date().getTime());
        if (this.index == (this.length - 1)) {
            alert('at the end dude');
        } else {
            this.index++;
            $('#question').empty();
            this.renderQuestion();
        }
    },

    render: function () {
        $(this.el).append('<div data-role="header"><div data-role="navbar" id="but"><ul><li><a id="previous">Previous</a></li><li>Time : <span id="time"></span></span></li><li><a id="next">Next</a></li></ul></div><!-- /navbar --></div><!-- /header -->');
        $(this.el).append('<div data-role="content" id="question"></div>');
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
            this.qqView.render();
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
        } else {
            this.model.set('optionSelected', optionSelected);
        }
    },

    render: function () {
        $('#question').empty();
        $('#question').html(this.template(this.model.toJSON()));
        $('#option-list').listview();
        $('#option-selector').trigger('create');
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
        return this;
    }
});