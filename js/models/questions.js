/**
 * The Question Model
 * @author ssachan 
 * 
 **/
window.Question = Backbone.Model.extend({

    urlRoot: serverUrl+'questions/',

    initialize: function () {
        if (!this.get('openTimeStamps')) {
            this.set({
                openTimeStamps: new Array()
            });
        }
        if (!this.get('closeTimeStamps')) {
            this.set({
                closeTimeStamps: new Array()
            });
        }
    },

    defaults: {
        'optionSelected': null,
        'status': null,
        'timer': null,
        'attemptedInPractice':false
    }
});

window.QuestionCollection = Backbone.Collection.extend({
    model: Question,
    url: serverUrl+'questions/'
});

var quizQuestions = new QuestionCollection();
var practiceQuestions = new QuestionCollection();