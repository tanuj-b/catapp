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
    url: Config.serverUrl+'questionsets/',
    store: new WebSQLStore(db, "questionSets")
});

var quizQuestionSets = new QuestionSetCollection();
var practiceQuestionSets = new QuestionSetCollection();