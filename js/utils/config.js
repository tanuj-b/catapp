//Config Variables

var SEPARATOR = '|:';

var config_mobile_android = {
	syncStoragePath : "",
	templatePath : "",
	serverUrl : 'http://192.168.1.7/api/',
	edition : '0',
    tmplatesFolder : "tpl-mobile",
    phonegap : true,
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
    				'QuizAnalyticsView'
    			]
};

var config_mobile_web = {
	syncStoragePath : "",
	templatePath : "",
	serverUrl : 'http://192.168.1.7/api/',
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
    				'QuizAnalyticsView'
    			]
};

var Config = config_mobile_web;	
    

