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

var activeFlashCardView = new FlashCardView();

var AppView = function AppView(){

  /* this.showView(view) = function(){
    if (this.currentView){
      this.currentView.close();
    }

    this.currentView = view;
    return this.currentView.render();

    //$("#mainContent").html(this.currentView.el);
    //think about what to do with this
  }*/

};

Backbone.View.prototype.close = function(){
  if (this.beforeClose){
    this.beforeClose();
  };
  this.remove();
  this.unbind();
  if (this.onClose){
    this.onClose();
  }
};


$(document).ready(function() {

	helper.loadTemplate([ 'LandingView', 'QuizQuestionView','FlashCardListView', 'FlashCardListItemView', 'FlashCardView', 'MenuView','PracticeTopicsView','PracticeQuestionView','QuizTopicsView','QuizResultsView','ProfileView','QuizAnalyticsView' ], function() {
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
	helper.loadTemplate([ 'LandingView', 'QuizQuestionView', 'FlashCardListItemView', 'MenuView','PracticeView','QuizView','FlashCardView','ProfileView','QuizAnalyticsView' ], function() {
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