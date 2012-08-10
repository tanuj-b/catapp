/**
 * The word model
 */
window.Word = Backbone.RelationalModel.extend({

    urlRoot: '../api/words',

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

});

window.WordSet = Backbone.Collection.extend({
	model: Word,
	url: '../api/words'	
});

var words = new WordSet();