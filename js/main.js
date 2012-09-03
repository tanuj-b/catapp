/*
 * THE GLOBALS
 */
var currentQuiz = null;
var currentQuizQuestion = null;
var quizView = null;

var currentPractice = null;
var currentPracticeQuestion = null;
var practiceView = null;

var user = null;
var app = null;
var activeFlashCardView = new FlashCardView();

var timer = new Timer(1000, null, []); // we will have just one global timer object shared across quizzes and practice

var AppView = function AppView() {

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

Backbone.View.prototype.close = function () {
    if (this.beforeClose) {
        this.beforeClose();
    };
    this.remove();
    this.unbind();
    if (this.onClose) {
        this.onClose();
    }
};
