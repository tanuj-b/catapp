var currentQuiz = null;
var currentQuestionLists = null;
var currentIndex = null;
var quizLen = null;

var AppRouter = Backbone.Router.extend({

	routes : {
		"" : "landing",
		"menu" : "menu",
		"profile" : "profile",
		"quiz/:id" : "startQuiz",
		"questions/:id" : "questions",
		"nextQuizQuestion" : "nextQuizQuestion",
		"previousQuizQuestion" : "previousQuizQuestion"
	},

	initialize : function() {
		/*
		 * $('.back').live('click', function(event) { window.history.back();
		 * return false; });
		 */
		this.firstPage = true;
		quizzes.fetch({
			success : function() {
				$.mobile.changePage($('#quiz-topics'), {
					changeHash : false,
				// transition : transition
				});
				// new QuizView({collection: quizzes, el:$('body')});
			}
		});
		// this.searchResults = new EmployeeCollection();

	},

	landing : function() {
		return;
		// this.changePage(new LandingView());
	},

	menu : function() {
		this.changePage(new MenuView());
	},

	profile : function(id) {
		var employee = new Employee({
			id : id
		});
		employee.reports.fetch();
		this.changePage(new DirectReportPage({
			model : employee.reports
		}));
	},

	startQuiz : function(id) {
		currentQuiz = quizzes.models[id];
		currentQuestionLists = currentQuiz.get('questionLists').models;
		currentIndex = 0;
		quizLen = currentQuestionLists.length;
		this.displayQuestion();
	},

	previousQuizQuestion : function() {
		currentIndex--;
		console.log('currentIndex' + currentIndex);
		this.displayQuestion();
	},

	nextQuizQuestion : function() {
		currentIndex++;
		console.log('currentIndex' + currentIndex);
		this.displayQuestion();
	},

	/*
	 * displays the question at currentIndex;
	 */
	displayQuestion : function() {
		if (currentIndex == quizLen) {
			alert('last question');
			// return;
		}

		var qList = currentQuestionLists[currentIndex];
		if (qList.get('question_count') > 1) {

		} else {
			var question = qList.get('questions').models[0];
			this.changePage(new QuizQuestionView({
				model : question
			}));
		}

	},

	changePage : function(page) {
		$(page.el).attr('data-role', 'page');
		page.render();
		$('body').append($(page.el));
		$(this.el).page();
		var transition = $.mobile.defaultPageTransition;
		// We don't want to slide the first page
		if (this.firstPage) {
			transition = 'none';
			this.firstPage = false;
		}
		$.mobile.changePage($(page.el), {
			transition : transition
		});
	}

});

var app = null;

$(document).ready(function() {
	utils.loadTemplate([ 'LandingView', 'QuizQuestionView' ], function() {
		app = new AppRouter();
		Backbone.history.start();
	});
});