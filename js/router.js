var AppRouter = Backbone.Router.extend({

	routes : {
		"" : "landing",
		"menu" : "menu",
		"profile" : "profile",
		"practice" : "practice",
		"quiz" : "quiz",
		"flashcards" : "flashcards",
		"quiz/:id" : "startQuiz",
		"getQuestion/:index" : "getQuestion"
	},

	initialize : function() {
		/*
		 * To be replaced by sync. this is just for the demo
		 */
		localStorage.clear();
		quizzes.fetch({
			success : function() {
				console.log('init quizzes fetched');
				questionSets.fetch({
					success : function() {
						console.log('init question sets fetched');
						questions.fetch({
							success : function() {
								console.log('init questions fetched');

							}
						});
					}
				});
			}
		});
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

	flashcards : function() {
		this.changePage(new WordListView({}));
	},
	
	practice : function(id) {
		this.changePage(new PracticeView({}));
	},

	quiz : function() {
		/*
		 * set to local, fetch quizzes, read attempted?, display all with
		 * attempted <> true, those that need to be sync dimmed.
		 */
		quizzes.reset();
		questionSets.reset();
		questions.reset();
		console.log('after reset before second fetch');
		quizzes.remote=false;
		quizzes.local=true;
		quizzes.fetch({
			success : function() {
				console.log('local quizzes fetched');
				questionSets.remote=false;
				questionSets.local=true;
				questionSets.fetch({
					success : function() {
						console.log('local question sets fetched');
						questions.remote=false;
						questions.local=true;
						questions.fetch({
							success : function() {
								console.log('local questions fetched');
							}
						});
					}
				});
			}
		});

		this.changePage(new QuizView());
	},

	startQuiz : function(id) {
		currentQuiz = quizzes.models[id];
		currentQuestionSetIds = currentQuiz.get('questionSetIds').split(SEPARATOR);
		quizLen = currentQuestionSetIds.length;
		this.getQuestion(0);
	},

	/*
	 * displays the question at currentIndex;
	 */
	getQuestion : function(index) {
		if (index == quizLen) {
			this.changePage(new QuizAnalyticsView({}));
			// alert('last question');
			return;
		} else if (index == -1) {
			alert('first question');
			return;
		}
		currentIndex = index;
		var qSet = questionSets.get(currentQuestionSetIds[currentIndex]);
		if (qSet.get('question_count') > 1) {

		} else {
			var questionIds = qSet.get('questionIds');
			var question = questions.get(questionIds);
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