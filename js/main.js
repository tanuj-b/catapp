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
