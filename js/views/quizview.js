window.QuizTopicsView = Backbone.View.extend({

	initialize : function() {
	},

	render : function() {
		// $('header').html();
		$(this.el).html(this.template());
		return this;
	}
});

window.QuizView = Backbone.View
		.extend({

			initialize : function() {
				this.index = this.options.index;
			},

			events : {
				'click input:radio[name=option]' : 'onOptionSelection'
			},

			render : function() {
				var questionSetIds = currentQuiz.get('questionSetIds').split(
						SEPARATOR);
				$(this.el).append(
								'<div data-role="header"><div data-role="navbar" id="but"><ul><li><a id="previous">Previous</a></li><li><a id="next">Next</a></li></ul></div><!-- /navbar --></div><!-- /header -->');

				var qSet = questionSets.get(questionSetIds[this.index]);
				if (qSet.get('question_count') > 1) {

				} else {
					var questionIds = qSet.get('questionIds');
					var question = questions.get(questionIds);
					$(this.el).append((new QuizQuestionView({
						model : question,
					})).el);
				}
				return this;
			}
		});

window.QuizQuestionView = Backbone.View.extend({
	initialize : function() {
		this.render();
	},

	events : {
		'change input:radio[name=option]' : 'onOptionSelection'
	},

	onOptionSelection : function(e) {
		var oldOptionSelected = this.model.get('optionSelected');
		var optionSelected = $('input:radio[name=option]:checked').val();
		if (optionSelected == oldOptionSelected) {
			this.model.set('optionSelected', null);
			$('input:radio[name=option]:checked').attr('checked', false);

		} else {
			this.model.set('optionSelected', optionSelected);
		}
	},

	saveQuestion : function() {
		var self = this;
		this.model.save(null, {
			success : function(model) {
				self.render();
				app.navigate('wines/' + model.id, false);
				utils.showAlert('Success!', 'Wine saved successfully',
						'alert-success');
			},
			error : function() {
				utils.showAlert('Error',
						'An error occurred while trying to delete this item',
						'alert-error');
			}
		});
	},

	render : function() {
		$(this.el).empty();
		$(this.el).append(this.template(this.model.toJSON()));
		return this;
	}
});