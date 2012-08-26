/*
 * THE GLOBALS
 */
var SEPARATOR = '|:';

var currentQuiz = null;
var currentQuizQuestion = null;

var currentPractice = null;
var user = null;
var app = null;
var currentQuiz = null;

$(document).ready(function() {
	utils.loadTemplate([ 'LandingView', 'QuizQuestionView', 'MenuView','PracticeTopicsView','PracticeQuestionView','QuizTopicsView','QuizResultsView','WordListItemView','ProfileView','QuizAnalyticsView' ], function() {
		app = new AppRouter();
		(function(d){
		      var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
		      js = d.createElement('script'); js.id = id; js.async = true;
		      js.src = "//connect.facebook.net/en_US/all.js";
		      d.getElementsByTagName('head')[0].appendChild(js);
		}(document));
		Backbone.history.start();
	});
});

var onDeviceReady = function(){
	console.log('on device ready');
	utils.loadTemplate([ 'LandingView', 'QuizQuestionView', 'MenuView','PracticeView','QuizView','WordListItemView','ProfileView','QuizAnalyticsView' ], function() {
		app = new AppRouter();
		(function(d){
		      var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
		      js = d.createElement('script'); js.id = id; js.async = true;
		      js.src = "//connect.facebook.net/en_US/all.js";
		      d.getElementsByTagName('head')[0].appendChild(js);
		}(document));
		Backbone.history.start();
	});	
};