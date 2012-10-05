var AppRouter = Backbone.Router.extend({

    routes: {
        "landing": "landing",
        "menu": "menu",
        "profile": "profile",
        "practice": "practice",
        "quiz": "quiz",
        "flashcards": "flashcards",
        "quiz/:id": "startQuiz",
        "practice/:id": "startPractice",
        "getQuestion/:index": "getQuestion",
        "quizResultsView/:id":"quizResultsView"
        "quizDetailedView":"quizDetailedView",
        "learn" : "main"

    },
    
    getL1:function () {
        var url = Config.serverUrl+'l1/';
        $.ajax({
            url:url,
            dataType:"json",
            success:function (data) {
                console.log("search success: " + data.length);
                sectionL1.reset(data);
            }
        });
    },
    
    getL2:function () {
        var url = Config.serverUrl+'l2/';
        $.ajax({
            url:url,
            dataType:"json",
            success:function (data) {
                console.log("search success: " + data.length);
                sectionL2.reset(data);
            }
        });
    },
    
    getL3:function () {
        var url = Config.serverUrl+'l3/';
        $.ajax({
            url:url,
            dataType:"json",
            success:function (data) {
                console.log("search success: " + data.length);
                sectionL3.reset(data);
            }
        });
    },
    
    getQuizzes:function () {
        var url = Config.serverUrl+'quizzes/';
        $.ajax({
            url:url,
            dataType:"json",
            success:function (data) {
                console.log("search success: " + data.length);
                quizzes.reset(data);
                quizzes.each(function(quiz) {
                quiz.save();
            });
            }
        });
    },
    
    getQuizQuestionSets:function () {
        var url = Config.serverUrl+'questionsets/';
        $.ajax({
            url:url,
            dataType:"json",
            success:function (data) {
                console.log("search success: " + data.length);
                quizQuestionSets.reset(data);
                quizQuestionSets.each(function(quizQuestionSet) {
                    quizQuestionSet.save();
            });
            }
        });
    },

    getQuizQuestions:function () {
        var url = Config.serverUrl+'questions/';
        $.ajax({
            url:url,
            dataType:"json",
            success:function (data) {
                console.log("search success: " + data.length);
                quizQuestions.reset(data);
                quizQuestions.each(function(quizQuestion) {
                    quizQuestion.save();
            });
            }
        });
    },
    
    getPracticeTests:function () {
        var url = Config.serverUrl+'practicetests/';
        $.ajax({
            url:url,
            dataType:"json",
            success:function (data) {
                console.log("search success: " + data.length);
                practiceTests.reset(data);
                practiceTests.each(function(practiceTest) {
                	practiceTest.save();
            });
            }
        });
    },
    
    getPracticeQuestionSets:function () {
        var url = Config.serverUrl+'questionsets/';
        $.ajax({
            url:url,
            dataType:"json",
            success:function (data) {
                console.log("search success: " + data.length);
                practiceQuestionSets.reset(data);
                practiceQuestionSets.each(function(practiceQuestionSets) {
                	practiceQuestionSets.save();
            });
            }
        });
    },

    getPracticeQuestions:function () {
        var url = Config.serverUrl+'questions/';
        $.ajax({
            url:url,
            dataType:"json",
            success:function (data) {
                console.log("search success: " + data.length);
                practiceQuestions.reset(data);
                practiceQuestions.each(function(practiceQuestion) {
                	practiceQuestion.save();
            });
            }
        });
    },
    
    initialize: function () {
    	// store the defualt sync in ajaxSync
    	Backbone.ajaxSync = Backbone.sync;
        this.headerView = new HeaderView({
            el: $('header')
        });
        
        helper.changeSync(2);

        this.getL1();
        this.getL2();
        this.getL3();

        quizzes.reset();
        quizQuestionSets.reset();
        quizQuestions.reset();
        console.log('attempt to fetch from local');
        var self = this;
        quizzes.fetch({
            success: function () {
                console.log('local quizzes fetched');
                if(quizzes.length==0){
                	self.getQuizzes();
                    app.landing();
                }else{
                    app.landing();
                }
            }
        });
      
        quizQuestionSets.fetch({
            success: function () {
                console.log('local question sets fetched');
                if(quizQuestionSets.length==0){
                	self.getQuizQuestionSets();
                }        
            }
        });
        
        quizQuestions.fetch({
            success: function () {
                console.log('local questions fetched');
                if(quizQuestions.length==0){
                	self.getQuizQuestions();
                }
            }
        });
         
        practiceTests.fetch({
            success: function () {
                console.log('local quizzes fetched');
                if(practiceTests.length==0){
                	self.getPracticeTests();
                }
            }
        });
      
        practiceQuestionSets.fetch({
            success: function () {
                console.log('local question sets fetched');
                if(practiceQuestionSets.length==0){
                	self.getPracticeQuestionSets();
                }        
            }
        });
        
        practiceQuestions.fetch({
            success: function () {
                console.log('local questions fetched');
                if(practiceQuestions.length==0){
                	self.getPracticeQuestions();
                }
            }
        });
        /*
         * To be replaced by sync. this is just for the demo
         */
        //localStorage.clear(); //remove this line in final product.
        
        /*quizzes.fetch({
            success: function () {
            	//Backbone.sync = Backbone.WebSQLsync;
            	//quizzes.sync();
            	quizzes.each(function(quiz) {
            		  // we try to save things here. Lets see
            			Backbone.sync = Backbone.WebSQLsync;
            			quiz.save();
            		});
            }
        });*/
        /*quizzes.fetch({
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

        });*/
        
        
        /*practiceTests.fetch({
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
        */
       /*sectionL1.fetch({
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
      */   
    },
	
    landing: function () {
        new LandingView({
            el: $('#content')
        });
        var html = [];
    	var quizzesTaken = quizzes.where({hasAttempted:true});
    	if(quizzesTaken.length == 0){
        	$('#history').html("You haven't taken any quizzes yet.<br> Please check out our quiz section and try out an appropriate quiz.");

    	}else{
    	for(var i = 0; i< quizzesTaken.length; i++){
    		html.push('<a href="#quizResultsView/'+quizzesTaken[i].get('id')+'">Quiz Taken '+(i+1)+'  </a><br>');
    	};
    	$('#history').html(html.join(' '));
    	}
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
        new QuizTopicsView({
            el: $('#content')
        });
    },

    startQuiz: function (l1Id) {
    	var remainingQuizzes = quizzes.where({l1Id: l1Id, hasAttempted:false});
    	//quizzes.get();
        currentQuiz = remainingQuizzes[0];//quizzes.get(id);
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
    	currentQuiz.save();
    	var qIds = currentQuiz.getQuestionIds();
		var qlen = qIds.length;
		for(var j=0; j< qlen; j++){
			var question = quizQuestions.get(qIds[j]); 
			question.save();
		}
    	new QuizResultsView({
            model: currentQuiz,
            el: $('#content')
        });
    	
    },
    
    quizResultsView: function (quizId) {
    	currentQuiz = quizzes.get(quizId);
    	new QuizResultsView({
            model: currentQuiz,
            el: $('#content')
        });
    },
    
    quizAnalyticsView: function () {
        new QuizAnalyticsView({});
    },

    practice: function (id) {
    	$('#active-view').html('Practice');
    	/*practiceTests.reset();
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
         */
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

    main: function () {
        var currentMainView = new MainView();
        currentMainView.el = $("#content");
        currentMainView.render();

        Reveal.initialize({
        controls: true,
        progress: true,
        history: false,
        keyboard: true,
        mouseWheel : false,
        
        theme: 'simple', // available themes are in /css/theme
        transition: 'linear', // default/cube/page/concave/linear(2d)

        // Optional libraries used to extend on reveal.js
        dependencies: [{ src: 'js/lib/classList.js', condition: function() { return !document.body.classList; } }]
  
      });

    while(currentMainView.scripts.length > 0)
    {
        eval(currentMainView.scripts.pop());
    }
    
    Reveal.addEventListener( 'fragmentshown', function( event ) {
                        currentMainView.currentFragment = $(event.fragment).attr("id");
                    }
                 );

    Reveal.addEventListener( 'slidechanged', function( event ) {
        pgno = event.indexh+1;
        currentMainView.currentFragment = $(".slides").find("section[pgno="+pgno+"] :first-child").attr("id");
    } );
    }

});