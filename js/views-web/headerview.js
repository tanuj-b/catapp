window.HeaderView = Backbone.View.extend({

	initialize : function() {
		this.render();
	},
	
	events : {
		'click #sync' : 'onSyncClick',
	},
    
	onSyncClick : function() {
		// the list of completed unsynced quizzes
    	var completedQuizzes = quizzes.where({hasAttempted:true,synced:false});
    	var len = completedQuizzes.length;
    	for (var i = 0; i < len ;i++){
    		var qIds = completedQuizzes[i].getQuestionIds();
    		var qlen = qIds.length;
    		for(var j=0; j< qlen; j++){
    			var question = quizQuestions.get(qIds[j]); 
        		var response = new Response({accountId:'1', quizId:completedQuizzes[i].get('id'), questionId:qIds[j], optionSelected:question.get('optionSelected'), timeTaken:question.get('timeTaken')});
        		helper.changeSync(1);
        		response.save();
    		}
    		completedQuizzes[i].set('synced',true);
    		helper.changeSync(2);
    		completedQuizzes[i].save();
    	}
	},

	menuChange : function(e) {
		this.currentSelection = $(e.currentTarget).attr('id');
		this.setContents(this.currentSelection);
	},

	setContents : function(menuItem) {
		if (menuItem == 'buy') {
			$('#'+menuItem).addClass('active');
			//window.location = '#buy';
			app.buy('1');
		} else if (menuItem == 'explore') {
			window.location = '';
		} else if (menuItem == 'contact') {
			this.showModal();
		}
	},
	
	render : function() {
		$(this.el).html(this.template());
		return this;
	},

	selectMenuItem : function(menuItem) {
		if (menuItem) {
			$('#' + menuItem).addClass('active');
		}
	},
});