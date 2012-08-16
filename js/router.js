var AppRouter = Backbone.Router.extend({

	routes : {
		"" : "landing",
		"menu" : "menu",
		"profile" : "profile",
		"quiz" : "quiz",
		"flashcards" : "flashcards",
		"quiz/:id" : "startQuiz",
		"getQuestion/:index" : "getQuestion"
	},

	initialize : function() {
		/*
		 * $('.back').live('click', function(event) { window.history.back();
		 * return false; });
		 */
		this.firstPage = true;

	},

	landing : function() {
		this.changePage(new LandingView());
		return;
	},

	menu : function() {
		this.changePage(new MenuView());
	},

	profile : function(id) {
		this.changePage(new ProfileView({}));
	},
	
	flashcards : function(){
		this.changePage(new WordListView({}));
	},
	
	quiz : function(){
		quizzes.fetch({
		success : function() {
			/*$.mobile.changePage($('#quiz-topics'), {
				changeHash : false,
			// transition : transition
			});*/
			// new QuizView({collection: quizzes, el:$('body')});
		}
	});
		this.changePage(new QuizView());
	},
	
	startQuiz : function(id) {
		currentQuiz = quizzes.models[id];
		currentQuestionSetIds = currentQuiz.get('questionSetIds');
		alert(currentQuestionSetIds);
		quizzes.models[i].save();
		
		
		//quizLen = currentQuestionLists.length;
		//this.getQuestion(0);
	},

	/*
	 * displays the question at currentIndex;
	 */
	getQuestion : function(index) {
		if (index == quizLen) {
			this.changePage(new QuizAnalyticsView({}));
			//alert('last question');
			return;
		} else if (index == -1) {
			alert('first question');
			return;
		}
		currentIndex = index;
		var qList = currentQuestionLists[currentIndex];
		if (qList.get('question_count') > 1) {

		} else {
			var question = qList.get('questions').models[0];
			this.changePage(new QuizQuestionView({
				model : question,
				index : currentIndex
			}));
		}

	},
	
	
	changePage : function(page) {
		$(page.el).attr('data-role', 'page');
		page.render();
		$('body').append($(page.el));
		$(this.el).page();
		var transition = $.mobile.defaultPageTransition;
		// We don't want to slide the first page
		if (this.firstPage) {
			transition = 'none';
			this.firstPage = false;
		}
		$.mobile.changePage($(page.el), {
			transition : transition
		});
	}
});