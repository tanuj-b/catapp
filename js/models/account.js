window.QuestionList = Backbone.RelationalModel.extend({

    urlRoot: '../api/questions',

    initialize: function () {
   
    },
    
    idAttribute: 'id',
    relations: [{
        type: Backbone.HasMany,
        key: 'questions',
        relatedModel: 'Question',
        reverseRelation: {
            key: '',
            includeInJSON: '',
        },
    }],
    
    defaults: {
        id: null,
        paragraph:'',
        question_count:'',
        difficulty:''
    }
});