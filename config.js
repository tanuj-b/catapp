//Config Variables

var SEPARATOR = '|:';

var config_mobile_local = {
	syncStoragePath : "",
	templatePath : "",
	serverUrl : 'http://localhost/nero/api/',
	edition : '0',
    tmplatesFolder : "tpl-mobile",
    phonegap : false,
    viewsArray : [	'LandingView', 
    				'QuizQuestionView',
    				'FlashCardListView',
    				'FlashCardListItemView',
    				'FlashCardView',
    				'MenuView',
    				'PracticeTopicsView',
    				'PracticeQuestionView',
    				'QuizTopicsView',
    				'QuizResultsView',
    				'ProfileView',
    			]
};

var config_web_local = {
	syncStoragePath : "",
	templatePath : "",
	serverUrl : 'http://localhost/nero/api/',
	edition : '1',
    tmplatesFolder : "tpl-web",
    phonegap : false,
    viewsArray : [	'HeaderView',
                  	'LandingView',
                  	'MenuView',
                  	'QuizView',
    				'QuizQuestionView',
    				'FlashCardListView',
    				'FlashCardListItemView',
    				'FlashCardView',
    				'MenuView',
    				'PracticeTopicsView',
    				'PracticeView',
    				'PracticeQuestionView',
    				'QuizTopicsView',
    				'QuizResultsView',
    				'ProfileView',
    			]
};


var config_mobile_server = {
		syncStoragePath : "",
		templatePath : "",
		serverUrl : 'http://www.test-rex.com/prod/api/',
		edition : '0',
	    tmplatesFolder : "tpl-mobile",
	    phonegap : false,
	    viewsArray : [	'LandingView', 
	    				'QuizQuestionView',
	    				'FlashCardListView',
	    				'FlashCardListItemView',
	    				'FlashCardView',
	    				'MenuView',
	    				'PracticeTopicsView',
	    				'PracticeQuestionView',
	    				'QuizTopicsView',
	    				'QuizResultsView',
	    				'ProfileView',
	    			]
	};

var config_web_server = {
		syncStoragePath : "",
		templatePath : "",
		serverUrl : 'http://www.test-rex.com/prod/api/',
		edition : '1',
	    tmplatesFolder : "tpl-web",
	    phonegap : false,
	    viewsArray : [	'HeaderView',
	                  	'LandingView',
	                  	'MenuView',
	                  	'QuizView',
	    				'QuizQuestionView',
	    				'FlashCardListView',
	    				'FlashCardListItemView',
	    				'FlashCardView',
	    				'MenuView',
	    				'PracticeTopicsView',
	    				'PracticeView',
	    				'PracticeQuestionView',
	    				'QuizTopicsView',
	    				'QuizResultsView',
	    				'ProfileView',
	    			]
	};

var Config = config_web_server;    

