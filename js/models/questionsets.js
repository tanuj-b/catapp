/**
 * The QuestionSet Model
 * @author ssachan 
 * 
 **/
window.QuestionSet = Backbone.Model.extend({

    urlRoot: Config.serverUrl+'questionsets/',
    key: "questionIds",

    initialize: function () {

    },

});

window.QuestionSetCollection = Backbone.Collection.extend({
    model: QuestionSet,
    url: Config.serverUrl+'questionsets/'
});

var quizQuestionSets = new QuestionSetCollection();
var practiceQuestionSets = new QuestionSetCollection();