window.dao =  {

    syncQuizzes: "../api/quizzes",

    initialize: function(callback) {
    },
        
    syncUp : function (){
    	var completedQuizzes = quizzes.where({hasAttempted:true,synced:false});
    	var len = completedQuizzes.length;
    	for (var i = 0; i < len ;i++){
    		var quiz = completedQuizzes[i];
    		var optionSelectedPerQuestion = quiz.get('optionSelectedPerQuestion').join(SEPARATOR);
    		var timeTakenPerQuestion = quiz.get('timeTakenPerQuestion').join(SEPARATOR);
    		var questionIds = quiz.getQuestionIds().join(SEPARATOR);
    		var timestamp = new Date().getTime();
    		var response = new Response({accountId:'1', 
    			quizId:completedQuizzes[i].get('id'), 
    			questionIds:questionIds, 
    			optionsSelected:optionSelectedPerQuestion, 
    			timeTaken:timeTakenPerQuestion,
    			timestamp : timestamp
    		});
    		helper.changeSync(1);
    		response.save();	
    		completedQuizzes[i].set('synced',true);
    		helper.changeSync(2);
    		completedQuizzes[i].save();
    		localStorage.setItem("lastSync", timestamp);
    	}
    },
    getLastSync: function(callback) {
    	var url = Config.serverUrl+'getLastSync/'+localStorage.getItem("lastSync");
        $.ajax({
            url:url,
            dataType:"json",
            success:function (data) {
                var len = data.length;
            	for (var i = 0; i < len ;i++){
            		var quiz = quizzes.get(data[i].quizId);
            		quiz.set('synced',true);
            		quiz.set('hasAttempted',true);
            		helper.changeSync(2);
            		quiz.save();
            	}
            }
        });
    },

    sync: function(callback) {
    	var self = this;
        log('Starting synchronization...');
        this.getLastSync(function(lastSync){
            self.getChanges(self.syncURL, lastSync,
                function (changes) {
                    if (changes.length > 0) {
                        self.applyChanges(changes, callback);
                    } else {
                        log('Nothing to synchronize');
                        callback();
                    }
                }
            );
        });

    },

    getChanges: function(syncURL, modifiedSince, callback) {

        $.ajax({
            url: syncURL,
            data: {modifiedSince: modifiedSince},
            dataType:"json",
            success:function (data) {
                log("The server returned " + data.length + " changes that occurred after " + modifiedSince);
                callback(data);
            },
            error: function(model, response) {
                alert(response.responseText);
            }
        });

    },

    applyChanges: function(employees, callback) {
        this.db.transaction(
            function(tx) {
                var l = employees.length;
                var sql =
                    "UPDATE quizzes (id) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?)";
                log('Inserting or Updating in local database:');
                var e;
                for (var i = 0; i < l; i++) {
                    e = employees[i];
                    log(e.id + ' ' + e.firstName + ' ' + e.lastName + ' ' + e.title + ' ' + e.officePhone + ' ' + e.deleted + ' ' + e.lastModified);
                    var params = [e.id, e.firstName, e.lastName, e.title, e.officePhone, e.deleted, e.lastModified];
                    tx.executeSql(sql, params);
                }
                log('Synchronization complete (' + l + ' items synchronized)');
            },
            this.txErrorHandler,
            function(tx) {
                callback();
            }
        );
    },

    txErrorHandler: function(tx) {
        alert(tx.message);
    }
};

function log(msg) {
    $('#log').val($('#log').val() + msg + '\n');
}