var AppRouter = Backbone.Router.extend({

    routes: {
        "": "landing",
        "menu": "menu",
        "profile": "profile",
        "practice": "practice",
        "quiz": "quiz",
        "flashcards": "flashcardlist",
        "flashcards/:id": "flashcards",
        "quiz/:id": "startQuiz",
        "practice/:id": "startPractice",
        "getQuestion/:index": "getQuestion",
        "sync":"sync",
        "quizDetailedView":"quizDetailedView",
        "quizAnalyticsView":"quizAnalyticsView",
    },
    
    sync: function(){
        sync.setUserId(1); //get actual account id and set it
        alert(sync.fetchIdsFromCollection(quizzes));
        alert(sync.fetchIdsFromLocalStorage(quizzes));
     },


    /**
     * Routing logic added by ssachan 
     * 
     **/

    initialize: function () {
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
        this.firstPage = true;
        this.changePage(new LandingView());
        return;
    },

    menu: function () {
        this.changePage(new MenuView());
    },

    profile: function (id) {
        this.changePage(new ProfileView({}));
    },

    quiz: function () {
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
        this.changePage(new QuizTopicsView());
    },

    startQuiz: function (id) {
        currentQuiz = quizzes.get(id);
        quizView = new QuizView({
            model: currentQuiz,
            index: 0,
        });
        this.changePage(quizView);
    	timer.setUpdateFunction(helper.updateQuizTimer, []);
        timer.reset();
        quizView.renderQuestion();
        timer.start();
    },

    stopQuiz: function (timeTaken) {
    	currentQuiz.set('timeTaken',timeTaken);
    	currentQuiz.calculateScores();
    	app.changePage(new QuizResultsView({
            model: currentQuiz
        }));
        drawTimeChart();
        drawDifficultyChart();
        drawStratChart();
    },
    
    quizDetailedView: function () {
    	 quizView.close();
    	 quizView = new QuizView({
             model: currentQuiz,
             index: 0,
         });
         this.changePage(quizView);
         quizView.renderQuestion();
    },
    
    quizAnalyticsView: function () {
        this.changePage(new QuizAnalyticsView({model: currentQuiz}));
        this.drawTimeChart();
    },

    practice: function (id) {
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
         this.changePage(new PracticeTopicsView());
    },
    
    startPractice: function (id) {
        currentPractice = practiceTests.get(id);
        practiceView = new PracticeView({
            model: currentPractice,
            index: 0,
        });
        this.changePage(practiceView);
    	timer.setUpdateFunction(helper.updatePracticeTimer, []);
        timer.reset();
        practiceView.renderQuestion();
    },
    
    flashcardlist: function () {
        var context = this;
        flashCardLists.fetch({
            success: function () {
                console.log('flash cards fetched');
                context.changePage(new FlashCardListView({
                    model: flashCardLists
                }));
            }
        });
    },

    flashcards: function (id) {
        var context = this;
        var currentFlashCardList = flashCardLists.get(id);
        flashCardIDs = currentFlashCardList.get("wordIds").split("|:");

        currentFlashCards = new FlashCardCollection();

        _.each(flashCardIDs, function (id) {
            currentFlashCards.add({
                id: id
            });

        });

        //This is where flashCards are being fetched and stored into a Collection.
        //I have added a model with just id attribute set. I am running model.fetch() on each item in collection.
        //The first fetch loads them and saves them
        //creating a deferred variable and chaining them for calling final success callback

        var successCounter = 0,
            dfd = [];
        currentFlashCards.forEach(

        function (item) {
            dfd[successCounter] = item.fetch({
                add: true
            });
            successCounter++;
        });
        $.when.apply(this, dfd).then(function () {
            currentFlashCardList.set("currentFlashCard", 1);
            activeFlashCardView = new FlashCardView({
                flashCardList: currentFlashCardList,
                flashCards: currentFlashCards
            });
            context.changePage(activeFlashCardView);
            activeFlashCardView.showCard(1);

            //This following function should ideally bind to views events.
            /*$("input[type='radio']").click(function(){
			if($(this).hasClass("on")){
       			$(this).removeAttr('checked');
    		}
    		$(this).toggleClass("on");
    	}).filter(":checked").addClass("on");*/
        });

        //Make provisions for failure
    },

    showView: function (selector, view) {
        if (this.currentView) this.currentView.close();
        $(selector).html(view.render().el);
        this.currentView = view;
        return view;
    },

    changePage: function (page) {
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
            transition: 'none'
        });
    }
});

if (Config.phonegap == false) {
    $(document).ready(function () {
        helper.loadTemplate(Config.viewsArray, function () {
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
    helper.loadTemplate(Config.viewsArray, function () {
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
        
        if(Config.phonegap){
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemAccess.gotFS, fileSystemAccess.fail);
        }
        Backbone.history.start();
    });
};
