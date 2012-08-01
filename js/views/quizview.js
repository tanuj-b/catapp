window.QuizView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },
	
	
    render: function () {
	//$(this.el).html(this.template());
	/*for (){
	
	}*/
	new SubmitQuestion({el:$('#submit-question')});
	var questions = this.collection.models;
	var len = questions.length;
        for (var i = 0; i < len; i++) {
                  $('#question-body').append(new QuestionList({model: questions[i]}).render().el);
        }
	return this;
	}
});

window.QuizQuestionView = Backbone.View.extend({
    initialize: function () {
        this.render();
    },
    
events:{
			
	},
     
	saveQuestion: function () {
        var self = this;
        this.model.save(null, {
            success: function (model) {
                self.render();
                app.navigate('wines/' + model.id, false);
                utils.showAlert('Success!', 'Wine saved successfully', 'alert-success');
            },
            error: function () {
                utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
            }
        });
    },
	
    render: function () {
		$(this.el).html(this.template());
		return this;
	}
});