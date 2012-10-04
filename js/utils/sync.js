window.dao =  {

    syncQuizzes: "../api/quizzes",

    initialize: function(callback) {
    },
        
    getLastSync: function(callback) {
    	var url = Config.serverUrl+'getLastSync/';
        $.ajax({
            url:url,
            dataType:"json",
            success:function (data) {
                console.log("search success: " + data.length);
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