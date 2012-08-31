/**
 * The word model
 */
window.FlashCard = Backbone.Model.extend({

    urlRoot: serverUrl + 'flashcards/',

    initialize: function () {
    	
    },
    
    defaults: {
        id: null,
        word:'',
        meaning:'',
        description:'',
        pronunciation:'',
        options: '',
        correctOption:'',
        usage:'',
        l3Id:''
    }

});

window.FlashCardList = Backbone.Model.extend({
	
	url: serverUrl + 'flashcardlists/',
		
		initialize: function () {
	    	
	    },
	    
	    defaults: {
	        id: null,
	        description:'',
	        wordCount: '',
	        wordIds:'',
	        l2Id:'',
	        title:'',
	        key:'wordIds'
	    }	
});

window.FlashCardCollection = Backbone.Collection.extend({
	model:FlashCard,
	url:serverUrl + 'flashcards/'
});

window.FlashCardListCollection = Backbone.Collection.extend({
	model:FlashCardList,
	url: serverUrl + 'flashcardlists/'
});

var flashCardLists = new FlashCardListCollection();
var currentFlashCards = new FlashCardCollection();