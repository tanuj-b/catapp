/**
 * The Question Model
 * @author ssachan 
 * 
 **/
window.Question = Backbone.Model.extend({

    urlRoot: '../api/questions/',

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
        'timer': null
    }
});

window.QuestionCollection = Backbone.Collection.extend({
    model: Question,
    url: '../api/questions/'
});

var questions = new QuestionCollection();