/**
 * The QuestionSet Model
 * @author ssachan 
 * 
 **/
window.QuestionSet = Backbone.Model.extend({

    urlRoot: serverUrl+'questionsets/',

    initialize: function () {

    },

});

window.QuestionSetCollection = Backbone.Collection.extend({
    model: QuestionSet,
    url: serverUrl+'questionsets/'
});

var questionSets = new QuestionSetCollection();