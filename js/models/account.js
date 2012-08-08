window.Account = Backbone.Model.extend({

    urlRoot: ' ',

    initialize: function () {
   
    },
        
    defaults: {
        id: null,
        isAuthenticated:'false',
    }
});

var account = new Account();