window.Post = Backbone.Model.extend({

    urlRoot: 'http://wp.localhost/?json=get_recent_posts',

    initialize: function () {
   
    }
});

var post = new Post();