window.FlashCardListView = Backbone.View.extend({

	initialize : function() {
		// this.render();
	},

	render : function() {
		currentEl = this.el;
		$(currentEl).empty();
		var output = '';
		this.model.forEach(function(words){
				output = output + (new FlashCardListItemView({model: words}).render().el.innerHTML);
			});
	        
	        $(currentEl).append(this.template({output: output}));
	        return this;
	}
});

window.FlashCardListItemView = Backbone.View.extend({
	
	tagName: "ul",
	flashCardList: '',
	flashCards: '',
	
	initialize: function() {
		
	},
	
	render: function(){
		$(this.el).append(this.template(this.model.toJSON()));
		return this;
	}
});

window.FlashCardView = Backbone.View.extend({

	tagName: "div",
	
	
	initialize : function() {
		// this.render();
	},
	
	events: {
        "click a": "buttonHandler",
        "change input[type='radio']" : "radioHandler"
    },
	
	radioHandler : function(event) {
			if($(event.currentTarget).hasClass("on")){
       			$(event.currentTarget).removeAttr('checked');
    		}
    		$(event.currentTarget).toggleClass("on");
    	//filter(":checked").addClass("on");
	},

	render : function() {
		//options[""] = flashCardList.get("");
		var option = {};
		var context = this;
		list= ["title","description","wordCount"];
		
		list.forEach(function(item){option[item] = context.options.flashCardList.get(item);});
		$(this.el).append(this.template({option: option, flashCards: context.options.flashCards, flashCardList: context.options.flashCardList}));
	},
	
	showCard: function(id){
		
		$(".flash-card-answers").addClass("hidden");
		$(".flash-card").addClass("hidden");
		$("#flash-card-"+id).removeClass("hidden");
		this.options.flashCardList.set("currentFlashCard",id);
	},
	showAnswer: function(id){
		
		$(".flash-card-answers").addClass("hidden");
		$(".flash-card").addClass("hidden");
		$("#flash-card-answer-"+id).removeClass("hidden");

		//read user answer

		var userAnswer = $("#fc-fs-"+id).find("input:checked").attr("value");
		var modelId = (this.options.flashCardList.get("wordIds").split("|:")[id-1]);
		var correctOption = this.options.flashCards.get(modelId).get('correctOption');

		$("#flash-card-answer-"+id).find("li").removeClass("user-answer");
		if(userAnswer != correctOption)
		{
			$("#flash-card-answer-"+id).find("#answer-opt-"+userAnswer).addClass("user-answer");
		}

		this.options.flashCardList.set("currentFlashCard",id+"A");
		//make button bind to next card, if last bind to home
	},
	buttonHandler: function(event){
		
		var context = this, match = false;
		
		/*
		if(currentCard.substr(1,1)==="A")
			{
				//if it's an answer card, clear user-answer and possibly uncheck field for the previous question.
				//This code to be populated only if we decide to show the question and not answer on clicking on the menus.
			}
		*/

		$(event.currentTarget).attr("class").split(" ").forEach(function (argument) {
			if(argument=="word-btn")
				{
				  var btnid = '' + $(event.currentTarget).attr("id");
				  var condition = true; //put actual condition to check if unattempted or not here.
				  						//if it evaluates to true, we'll show question, else answer.
				  if(condition)
				  	{
				  		context.showCard(btnid.substr(btnid.length-1,1));
					}
				  else
				  	{
				  		context.showAnswer(btnid.substr(btnid.length-1,1));	
				  	}
				  match =true;
				  return this;
				}

		});
		length = this.options.flashCardList.get("wordCount");
		if(event.currentTarget.id=="answer-btn-"+length)
			{
				app.navigate("", {trigger: true});
				return this;
			}
		if(match)
			{return this;}
		currentCard = ''+this.options.flashCardList.get("currentFlashCard");
		
		if(currentCard.substr(1,1)==="A")
			{
			//	if(parseInt(currentCard.substr(0,1))==length)
			//		{
			//			return this;
			//		}

				this.showCard(parseInt(currentCard.substr(0,1))+1);
			}
		else
			{
			//	if(parseInt(currentCard)==length){
			//		alert("I was called"+length);
			//	this.showLastAnswer(parseInt(currentCard));
			//	}
				this.showAnswer(parseInt(currentCard));
			}
		}
});

