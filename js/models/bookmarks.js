window.BookMark = Backbone.RelationalModel.extend({

    urlRoot: '../api/bookmarks',

    initialize: function () {
    	
    },
    
});

window.BookMarkCollection = Backbone.Collection.extend({
	model: BookMark,
	url: '../api/bookmarks'	
});

var bookmarks = new BookMarkCollection();