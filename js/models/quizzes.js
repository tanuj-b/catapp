/**
 * The quiz model
 */
window.Quiz = Backbone.RelationalModel.extend({

    urlRoot: '../api/quizzes/getnext/',

    initialize: function () {
    	
    },
    
    idAttribute: 'id',
    relations: [{
        type: Backbone.HasMany,
        key: 'questionLists',
        relatedModel: 'QuestionList',
        reverseRelation: {
            key: '',
            includeInJSON: '',
        },
    }],
    
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