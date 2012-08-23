/**
 * The word model
 */
window.FlashCard = Backbone.Model.extend({

    urlRoot: '../api/flashcards/',

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
	
	url: '../api/flashcardlists/',
		
		initialize: function () {
	    	
	    },
	    
	    defaults: {
	        id: null,
	        description:'',
	        wordIds:'',
	        l2Id:'',
	        title:''
	    }	
});

window.FlashCardCollection = Backbone.Collection.extend({
	model:FlashCard,
	url:'../api/flashcards/'
});

window.FlashCardListCollection = Backbone.Collection.extend({
	model:FlashCardList,
	url: '../api/flashcardlists/'
});

var flashCardLists = new FlashCardListCollection();
var currentFlashCards = new FlashCardCollection();