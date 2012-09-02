window.Response = Backbone.RelationalModel.extend({

    urlRoot: Config.serverUrl + 'responses',

    initialize: function () {
    	
    },
    
    defaults : {
    	questionId:null,
    	answer:null,
    	status : null,
    	time:0,
    }
});

window.ResponseCollection = Backbone.Collection.extend({
	model: Response,
	url: Config.serverUrl + 'responses'	
});

var responses = new ResponseCollection();