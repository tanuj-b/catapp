/**
 * The quiz model
 */
window.Quiz = Backbone.Model.extend({

    urlRoot: '../api/quizzes/getnext/1',

    initialize: function () {
    	this.questionLists =new QuestionListSet();
		this.questionLists.url = '../api/quizzes/getQuestionListByQuizId/' + this.id;
    },

    defaults: {
        id: null,
        l1_id:'',
        send_time:'',
        sync_time:'',
        total_score:''
    },
    
    testFuntion: function(){
    	$.ajax({
            url     :'',
            type    : 'POST',
            data    : {document_ids : ids},
            success : _.bind(function(resp) {
              this.set(resp);
            }, this)
          });
    }
});

window.QuizSet = Backbone.Collection.extend({
	model: Quiz,
	url: '../api/quizzes/getnext/1'	
});

var quizzes = new QuizSet();