window.QuizView = Backbone.View.extend({
	
	initialize : function() {	
	},

	render : function() {
		$(this.el).html(this.template());
		return this;
	}
});

window.QuizQuestionView = Backbone.View.extend({
	initialize : function() {
		this.render();
	},

	events:{
		'change input:radio[name=option]':'optionSelected'
	},
	
	optionSelected : function(){
		var optionSelected = $('input:radio[name=option]:checked').val();
		this.model.set('option_selected',optionSelected);
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
		 $(this.el).append('<div data-role="header"><div data-role="navbar" id="but"><ul><li><a href="#getQuestion/'+(parseInt(this.options.index)-1)+'">Previous</a></li>	<li><a href="#getQuestion/'+(parseInt(this.options.index)+1)+'">Next</a></li></ul></div><!-- /navbar --></div><!-- /header -->');
		 $(this.el).append(this.template(this.model.toJSON()));
		 return this;
	}
});