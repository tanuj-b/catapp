/**
 * The word model
 */
window.Word = Backbone.RelationalModel.extend({

    urlRoot: '../api/words',

    initialize: function () {
    	
    },
    
    defaults: {
        id: null,
        l1_id:'',
        send_time:'',
        sync_time:'',
        total_score:''
    },

});

window.WordList = Backbone.Collection.extend({
	model: Word,
	url: '../api/words'	
});

var words = new WordList();