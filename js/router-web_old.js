var AppRouter = Backbone.Router.extend({

    routes: {
        "": "landing",
        "menu": "menu",
        "profile": "profile",
        "practice": "practice",
        "quiz": "quiz",
        "flashcards": "flashcards",
        "quiz/:id": "startQuiz",
        "practice/:id": "startPractice",
        "getQuestion/:index": "getQuestion",
        "quizDetailedView":"quizDetailedView"

    },

    initialize: function () {
        this.headerView = new HeaderView({
            el: $('header')
        });
        /*
         * To be replaced by sync. this is just for the demo
         */
        //localStorage.clear(); //remove this line in final product.

        quizzes.fetch({
            success: function () {
                console.log('init quizzes fetched');
                quizQuestionSets.fetch({
                    success: function () {
                        console.log('init quiz question sets fetched');
                        quizQuestions.fetch({
                            success: function () {
                                console.log('init quiz questions fetched');
                            }
                        });
                    }
                });
            }

        });

        practiceTests.fetch({
            success: function () {
                console.log('init practice fetched');
                practiceQuestionSets.fetch({
                    success: function () {
                        console.log('init practice question sets fetched');
                        practiceQuestions.fetch({
                            success: function () {
                                console.log('init practice questions fetched');    
                            }
                        });
                    }
                });
            }
        });
        
       sectionL1.fetch({
       	 success: function () {
                console.log('init l1 fetched');
       	 }
       });
       
       sectionL2.fetch({
       	 success: function () {
                console.log('init l2 fetched');
       	 }
       });
       
       sectionL3.fetch({
      	 success: function () {
               console.log('init l3 fetched');
      	 }
      });   
    },

    landing: function () {
        new LandingView({
            el: $('#content')
        });
        return;
    },

    menu: function () {
        this.changePage(new MenuView());
    },

    profile: function (id) {
    	$('#active-view').html('My Profile');
    	new ProfileView({el:$('#content')});
       
    },

    flashcards: function () {
        this.changePage(new WordListView({}));
    },

    quiz: function () {
    	$('#active-view').html('Quiz');
    	/*
         * set to local, fetch quizzes, read attempted?, display all with
         * attempted <> true, those that need to be sync dimmed.
         */
        quizzes.reset();
        quizQuestionSets.reset();
        quizQuestions.reset();
        console.log('after reset before second fetch');
        quizzes.remote = false;
        quizzes.local = true;
        quizzes.fetch({
            success: function () {
                console.log('local quizzes fetched');
                quizQuestionSets.remote = false;
                quizQuestionSets.local = true;
                quizQuestionSets.fetch({
                    success: function () {
                        console.log('local question sets fetched');
                        quizQuestions.remote = false;
                        quizQuestions.local = true;
                        quizQuestions.fetch({
                            success: function () {
                                console.log('local questions fetched');
                            }
                        });
                    }
                });
            }
        });
        new QuizTopicsView({
            el: $('#content')
        });
    },

    startQuiz: function (id) {
        currentQuiz = quizzes.get(id);
        new QuizView({
            model: currentQuiz,
            index: 0,
            el: $('#content')
        });
        timer.setUpdateFunction(helper.updateQuizTimer, []);
        timer.reset();
        timer.start();
    },

    stopQuiz: function (timeTaken) {
    	currentQuiz.set('timeTaken',timeTaken); 
    	currentQuiz.calculateScores();
        new QuizResultsView({
            model: currentQuiz,
            el: $('#content')
        });
        //this.drawTimeChart();
    },
    
    quizDetailedView: function () {
   	 quizView.close();
     quizView = new QuizView({
             model: currentQuiz,
             index: 0,
        });
    },
    
    quizAnalyticsView: function () {
        new QuizAnalyticsView({});
    },

    practice: function (id) {
    	$('#active-view').html('Practice');
    	practiceTests.reset();
    	practiceQuestionSets.reset();
        practiceQuestions.reset();
        console.log('after reset before second fetch');
        practiceTests.remote = false;
        practiceTests.local = true;
        practiceTests.fetch({
        	success: function () {
                 console.log('local quizzes fetched');
                 practiceQuestionSets.remote = false;
                 practiceQuestionSets.local = true;
                 practiceQuestionSets.fetch({
                     success: function () {
                         console.log('local question sets fetched');
                         practiceQuestions.remote = false;
                         practiceQuestions.local = true;
                         practiceQuestions.fetch({
                             success: function () {
                                 console.log('local questions fetched');
                             }
                         });
                     }
                 });
             }
         });
        new PracticeTopicsView({
            el: $('#content')
        });
    },

    startPractice: function (id) {
        currentPractice = practiceTests.get(id);
        var practiceView = new PracticeView({
            model: currentPractice,
            index: 0,
            el: $('#content')
        });
    	timer.setUpdateFunction(helper.updatePracticeTimer, []);
        timer.reset();
        practiceView.renderQuestion();
    },

});

if (Config.phonegap == false) {
    $(document).ready(function () {
        helper.loadTemplate(Config.viewsArray, function () {
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

/*if (Config.phonegap == false) {
    $(document).ready(function () {
        helper.loadTemplate(['HeaderView', 'LandingView', 'QuizView', 'QuizQuestionView', 'MenuView', 'PracticeTopicsView', 'PracticeQuestionView', 'QuizTopicsView', 'QuizResultsView', 'ProfileView', 'PerformanceView', 'QuizAnalyticsView'], function () {
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
*/

function init() {
    document.addEventListener("deviceready", onDeviceReady, true);
}

var onDeviceReady = function () {
    console.log('on device ready');
    helper.loadTemplate(['HeaderView', 'LandingView', 'QuizView', 'QuizQuestionView', 'MenuView', 'PracticeTopicsView', 'PracticeQuestionView', 'QuizTopicsView', 'QuizResultsView', 'WordListItemView', 'ProfileView', 'PerformanceView', 'QuizAnalyticsView'], function () {
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