window.Question = Backbone.RelationalModel.extend({

    urlRoot: '../api/questions',

    initialize: function () {
		
    },
    
    idAttribute: 'id',
    
    defaults: {
        id: null,
        question: '',
        options: '',
        answer:'',
        comments:'',
        l3_id:'',
        difficulty:'',
        average_time:'',
        question_type_id:'',
        // we also store the details of the attempt
        option_selected:null,
        time_taken:'',
        attempted_at:''
    }
});
