/**
 * The initialization logic
 * @author ssachan 
 * 
 **/
window.initialization =  {
  
	initializeWEBSQL : function(){
		
	},
	
    getQuizzes : function (){
    	//check if quizzes are present in the storage
    	quizzes.fetch
    	
    },
    
    getPracticeTests: function() {
   
    },

    getQuizQuestions: function() {
    
    },
    
    getPracticeQuestions: function() {
        
    },

    getL1 : function(){
    	
    },
    
    getL2 : function(){
    	
    },
    
    getL3 : function(){
    	
    }
};

function log(msg) {
    $('#log').val($('#log').val() + msg + '\n');
}