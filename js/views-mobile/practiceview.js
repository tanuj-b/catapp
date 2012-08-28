/**
 * The practice views
 * @author ssachan 
 * 
 **/
window.PracticeTopicsView = Backbone.View.extend({

    initialize: function () {},

    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});

window.PracticeView = Backbone.View.extend({

    initialize: function () {
        this.index = this.options.index;
        this.questionView = null;
        this.questionSetIds = this.model.get('questionSetIds').split(SEPARATOR);
        this.length = this.questionSetIds.length;
        this.question = null;
    },

    events: {
        'click #previous': 'onPreviousClick',
        'click #next': 'onNextClick',
        'click .q-nav' : 'onQNoClick'
    },

    onPreviousClick: function () {
        //this.question.get('closeTimeStamps').push(new Date().getTime());
        if (this.index == 0) {
            alert('at the start dude');
        } else {
            this.index--;
            this.renderQuestion();
        }
    },

    onNextClick: function () {
    	//this.question.get('closeTimeStamps').push(new Date().getTime());
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
    
    render: function () {
        $(this.el).append('<div data-role="header"><div data-role="navbar" id="but"><ul><li><a id="previous">Previous</a></li><li>Time : <span id="time"></span></span></li><li><a id="next">Next</a></li></ul></div><!-- /navbar --><!-- /header -->');
        $(this.el).append('<div>');
        for(var i = 0; i< this.length; i++){
        	$(this.el).append('<a id="q-'+i+'" class="q-nav"> '+i+' </a>');
        }	
        $(this.el).append('</div></div>');
        $(this.el).append('<div data-role="content" id="question"></div>');
        return this;
    },

    renderQuestion: function () {
        var questionSet = practiceQuestionSets.get(this.questionSetIds[this.index]);
        if (questionSet.get('question_count') > 1) {
            // TODO : handle para questions

        } else {
            var questionIds = questionSet.get('questionIds');
            this.question = practiceQuestions.get(questionIds);
            if(this.question.get('timer')==null){
            	this.question.set('timer', 0);
            }
            if (this.questionView == null) {
                this.questionView = new PracticeQuestionView({
                    el: $('#question'),
                    // timer : 
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
        }
        return null;
    }
});

window.PracticeQuestionView = Backbone.View.extend({

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
        this.model.set('attemptedInPractice',true);
        timer.stop();
        this.renderInfo();
    },

    render: function () {
        $('#question').empty();
        $('#question').html(this.template(this.model.toJSON()));
        $('#option-list').listview();
        $('#option-selector').trigger('create'); 
        if(this.model.get('attemptedInPractice')==true){
        	this.renderInfo();
        }
        return this;
    },
    
    renderInfo : function(){
    	$('#info').html('<h3>info</h3>correct answer-'+this.model.get('correctOption'));
      	$('#info').append('<br>'+this.model.get('explanation'));
      	$("input[type='radio']").checkboxradio('disable');   
      	$('#time').html(this.model.get('timer'));
    }
});
