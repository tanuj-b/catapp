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
	
	render : function() {
		//options[""] = flashCardList.get("");
		var option = {};
		var context = this;
		list= ["title","description"];
		list.forEach(function(item){option[item] = context.options.flashCardList.get(item);});
		
		list = [
		        "word",
		        "meaning",
		        "description",
		        "pronunciation",
		        "options",
		        "correctOption",
		        "usage"
		        ];
		/*list.forEach(function(value){option[value]=[];});
		
		context.options.flashCards.forEach(function(item){
			list.forEach(function(value){option[value].push(context.options.flashCards.get(value));});
		});*/
		
		$(this.el).append(this.template({option: option, flashCards: context.options.flashCards, flashCardList: context.options.flashCardList}));
	}
});

