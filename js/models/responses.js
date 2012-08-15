window.Response = Backbone.RelationalModel.extend({

    urlRoot: '../api/responses',

    initialize: function () {
    	
    },
    
    defaults : {
    	questionId:null,
    	answer:null,
    	status : null,
    	time:null,
    }
});

window.ResponseCollection = Backbone.Collection.extend({
	model: Response,
	url: '../api/responses'	
});

var responses = new ResponseCollection();