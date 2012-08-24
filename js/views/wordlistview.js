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
        "click a": "buttonHandler"
    },
	
	render : function() {
		//options[""] = flashCardList.get("");
		var option = {};
		var context = this;
		list= ["title","description","wordCount"];
		
		list.forEach(function(item){option[item] = context.options.flashCardList.get(item);});
		$(this.el).append(this.template({option: option, flashCards: context.options.flashCards, flashCardList: context.options.flashCardList}));
		console.log(context.options.flashCardList.get("currentFlashCard"));
	},
	
	showCard: function(id){
		
		$(".flash-card-answers").addClass("hidden");
		$(".flash-card").addClass("hidden");
		$("#flash-card-"+id).removeClass("hidden");
		this.options.flashCardList.set("currentFlashCard",id);
		//make button bind to answer of this card
	},
	showAnswer: function(id){
		
		$(".flash-card-answers").addClass("hidden");
		$(".flash-card").addClass("hidden");
		$("#flash-card-answer-"+id).removeClass("hidden");
		this.options.flashCardList.set("currentFlashCard",id+"A");
		//make button bind to next card, if last bind to home
	},
	showLastAnswer: function(id){
		
		$("#answer-btn-"+id).trigger('refresh');
		$(".flash-card-answers").addClass("hidden");
		$(".flash-card").addClass("hidden");
		$("#flash-card-answer-"+id).removeClass("hidden");
		
		this.options.flashCardList.set("currentFlashCard",id+"A");
	},
	
	buttonHandler: function(event){
		currentCard = ''+this.options.flashCardList.get("currentFlashCard");
		length = this.options.flashCardList.get("wordCount");
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

