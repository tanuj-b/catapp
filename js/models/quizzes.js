/**
 * The Quiz Model
 * @author ssachan 
 * 
 **/
window.Quiz = Backbone.Model.extend({

    urlRoot: serverUrl+'quizzes/',
    local: true, // always fetched and saved only locally, never saves on remote
    remote: false, // never cached, dualStorage is bypassed entirely

    initialize: function () {},

    defaults: {
        'timer': new Timer(1000, helper.updateTimer, [])
    }

});

window.QuizCollection = Backbone.Collection.extend({
    model: Quiz,
    url: serverUrl+'quizzes/'
});

var quizzes = new QuizCollection();