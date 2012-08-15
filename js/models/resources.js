window.Resource = Backbone.RelationalModel.extend({

    urlRoot: '../api/resources',

    initialize: function () {
    	
    },
    
});

window.ResourceCollection = Backbone.Collection.extend({
	model: Resource,
	url: '../api/resources'	
});

var resources = new ResourceCollection();