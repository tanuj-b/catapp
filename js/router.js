var AppRouter = Backbone.Router.extend({

	routes : {
		"" : "landing",
		"menu" : "menu",
		"profile" : "profile",
		"practice" : "practice",
		"quiz" : "quiz",
		"flashcards" : "flashcards",
		"quiz/:id" : "startQuiz",
		"practice/:id" : "startPractice",
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
		
		practiceTests.fetch({
			success : function() {
				console.log('init practice fetched');
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
		practiceTests.reset();
		questionSets.reset();
		questions.reset();
		console.log('after reset before second fetch');
		practiceTests.remote=false;
		practiceTests.local=true;
		practiceTests.fetch({
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
		this.changePage(new PracticeTopicsView());
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
		this.changePage(new QuizTopicsView());
	},

	startQuiz : function(id) {
		currentQuiz = quizzes.models[id];
		var quizView = new QuizView({
			model : currentQuiz,
			index : 0,
		});	
		this.changePage(quizView);
		quizView.renderQuestion();
		currentQuiz.get('timer').start();
	},
	
	quizStop: function(){
    	app.changePage(new QuizResultsView({
			model : currentQuiz
		}));
    },
    
	quizAnalyticsView : function (){
		this.changePage(new QuizAnalyticsView({}));
	},

	startPractice : function(id){
		currentPractice = practiceTests.models[id];
		var practiceView = new PracticeView({
			model : currentPractice,
			index : 0,
		});	
		this.changePage(practiceView);
		practiceView.renderQuestion();
	},
	
	changePage : function(page) {
		$(page.el).attr('data-role', 'page');
		page.render();
		$('body').append($(page.el));
		$(page.el).page();
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