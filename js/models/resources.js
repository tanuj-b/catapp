window.Resource = Backbone.RelationalModel.extend({

    urlRoot: Config.serverUrl + 'resources',

    initialize: function () {
    	
    },
    
});

window.ResourceCollection = Backbone.Collection.extend({
	model: Resource,
	url: Config.serverUrl + 'resources'	
});

var resources = new ResourceCollection();