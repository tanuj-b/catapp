//Config Variables
var db = openDatabase("nero", "", "nero client tables", 10*1024*1024);

db.transaction(function (tx) {
   tx.executeSql("DROP TABLE quizzes");
});
db.transaction(function (tx) {
	tx.executeSql("DROP TABLE questionsets");
});
db.transaction(function (tx) {
	tx.executeSql("DROP TABLE questions");
});
db.transaction(function (tx) {
	tx.executeSql("DROP TABLE practice");
});

var SEPARATOR = '|:';

var config_mobile_local = {
	syncStoragePath : "",
	templatePath : "",
	serverUrl : 'http://localhost/nero/api/',
	edition : '0',
	editionName : 'mobile',
	assetPath : '',
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
	editionName : 'web',
	assetPath : '',
    tmplatesFolder : "tpl-web",
    phonegap : false,
    viewsArray : [	
    				//'HeaderView',
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
		editionName : 'mobile',
		assetPath : '',
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
		editionName : 'web',
		assetPath : '',
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

var Config = config_web_local;    

