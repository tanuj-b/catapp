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
		"getQuestion/:index" : "getQuestion",
		"performance" : "performance"
	},

	initialize : function() {
        this.headerView = new HeaderView({el : $('header')});
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
	},

	landing : function() {
		new LandingView({el : $('#content')});
		return;
	},

	menu : function() {
		this.changePage(new MenuView());
	},

	profile : function(id) {
		this.changePage(new ProfileView({}));
	},
	
	performance : function(id) {
		new PerformanceView();
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
		new QuizTopicsView({el : $('#content')});
	},

	startQuiz : function(id) {
		currentQuiz = quizzes.models[id];
		new QuizView({
			model : currentQuiz,
		});	
	},
	
	quizStop: function(){
    	currentQuiz.get('timer').stop();
		app.changePage(new QuizResultsView({
			model : currentQuiz
		}));
    },
    
	quizAnalyticsView : function (){
		new QuizAnalyticsView({});
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
	
});

if (phonegap == false) {
    $(document).ready(function () {
    	helper.loadTemplate([ 'HeaderView','LandingView', 'QuizView','QuizQuestionView', 'MenuView','PracticeTopicsView','PracticeQuestionView','QuizTopicsView','QuizResultsView','ProfileView','PerformanceView','QuizAnalyticsView' ], function() {
            $('body').append('<header></header><div id="content"></div>');
    		app = new AppRouter();
            (function (d) {
                var js, id = 'facebook-jssdk';
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement('script');
                js.id = id;
                js.async = true;
                js.src = "//connect.facebook.net/en_US/all.js";
                d.getElementsByTagName('head')[0].appendChild(js);
            }(document));
            Backbone.history.start();
        });
    });
}

function init() {
    document.addEventListener("deviceready", onDeviceReady, true);
}

var onDeviceReady = function () {
    console.log('on device ready');
	helper.loadTemplate([ 'HeaderView','LandingView', 'QuizView','QuizQuestionView', 'MenuView','PracticeTopicsView','PracticeQuestionView','QuizTopicsView','QuizResultsView','WordListItemView','ProfileView','PerformanceView','QuizAnalyticsView' ], function() {
        app = new AppRouter();
        (function (d) {
            var js, id = 'facebook-jssdk';
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement('script');
            js.id = id;
            js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            d.getElementsByTagName('head')[0].appendChild(js);
        }(document));
        Backbone.history.start();
    });
};