window.BookMark = Backbone.RelationalModel.extend({

    urlRoot: Config.serverUrl + 'bookmarks',

    initialize: function () {
    	
    },
    
});

window.BookMarkCollection = Backbone.Collection.extend({
	model: BookMark,
	url: Config.serverUrl + 'bookmarks'
});

var bookmarks = new BookMarkCollection();