var currentQuiz = null;
var currentQuestionLists = null;
var currentIndex = null;
var quizLen = null;
var user = null;
var app = null; 

$(document).ready(function() {
	utils.loadTemplate([ 'LandingView', 'QuizQuestionView', 'MenuView','QuizView','WordListItemView','ProfileView','QuizAnalyticsView' ], function() {
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
