/**
 * The QuestionSet Model
 * @author ssachan 
 * 
 **/
window.QuestionSet = Backbone.Model.extend({

    urlRoot: '../api/questionsets/',

    initialize: function () {

    },

});

window.QuestionSetCollection = Backbone.Collection.extend({
    model: QuestionSet,
    url: '../api/questionsets/'
});

var questionSets = new QuestionSetCollection();