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

if (Config.phonegap == false) {
    $(document).ready(function(){
        helper.loadTemplate(Config.viewsArray, function () {
        //$('body').append('<header></header><div id="content"></div>');
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
        if(!Config.phonegap)
                $('body').append('<header></header><div id="content"></div>');
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
};
