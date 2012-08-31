if(phonegap)
{
    window.fileSystemAccess =
    {
        fileSystem : null,
        
        gotFS : function(fileSystem)
        {
            this.fileSystem = fileSystem;
        }
        
        fail : function(error)
        {
            console.log(error.code);
        }


    }
}
window.sync = 
{
	online : false,
	userId : '',
	lastFullSync : '',
	
    setUserId: function(uid)
    {
        this.userId = uid;
    },

    getUserId: function()
    {
        return this.userId;
    },

    syncCollection : function(collection, options)
    {
        localIds = fetchIdsFromLocalStorage(collection);
        var serverIds =[];
        
        fetchIdsFromServer(collection,
            function(args)
            {
                //args = data,text,jqXHR
                data = args[0];
                serverIds = JSON.parse(data); 
                var notOnLocal = _.difference(serverIds,localIds);
                var removeFromLocal = _.difference(localIds,serverIds);
                if(options.fullSync)
                {
                    //call removeFromLocal?
                   addFromServer(collection, notOnLocal,
                    function(args){
                        //fetch success
                    },
                    function(args){
                        //fetch error
                    });
                }

            },
            function(args)
            { /*error*/
                //data = jqXHR, textStatus, errorText
            });
    },
	
    addFromServer : function(collection, notOnLocal, success, error)
    {
        success = success || function(args){};
        error = error || function(args){};

        var successCounter = 0,
            dfd = [];
        
        _.each(notOnLocal,function(id)
                        {
                            collection.add({id:id});
                            
            dfd[successCounter] = collection.get(id).fetch({add: true, success: function(){console.log("fetched <object> " + id);}});
            successCounter++;
        });

        $.when.apply(this, dfd).then(function (args)
        {
            console.log("<objects> fetched from server "+notOnLocal.join(","));
            success(args);
        },error);
        //$.when.apply(this, dfd).then(success,error);
    },

    addToLocalStorageFromFileSystem: function(collection, notOnLocal, success, error)
    {

    },

    //Pass a collection, calls a collection.url/sync/:userid
    fetchIdsFromServer : function(collection, success, error){
        success = success || function(args){
            //default ajax success code
        };
        error = error || function(args){
            //default ajax error code
        };

        var params = {
            type: "GET",
            dataType: 'json',
            url: collection.url+'sync/'+this.userId,
            success : success,
            error : error
            };

         return $.ajax(params);   
    },

	fetchIdsFromCollection : function(collection){
        var Ids = [];
        collection.forEach(function(model){
            Ids= _.union(Ids, model.get(model.get("key")).split(SEPARATOR));
        });
        return Ids;
    },

	fetchIdsFromLocalStorage : function(collection){
        return (""+(new Store(collection.url)).records).split(",");
    },
    
    clearLocalStorage : function()
    {
        localStorage.clear();
    },

    pushResponses : function(){},
	OtherSyncFromServer : function(){}
	
}


/*
 window.dao =  {

    syncURL: "../api/employees",

    initialize: function(callback) {
        var self = this;
        this.db = window.openDatabase("syncdemodb", "1.0", "Sync Demo DB", 200000);

        // Testing if the table exists is not needed and is here for logging purpose only. We can invoke createTable
        // no matter what. The 'IF NOT EXISTS' clause will make sure the CREATE statement is issued only if the table
        // does not already exist.
        this.db.transaction(
            function(tx) {
                tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='employee'", this.txErrorHandler,
                    function(tx, results) {
                        if (results.rows.length == 1) {
                            log('Using existing Employee table in local SQLite database');
                        }
                        else
                        {
                            log('Employee table does not exist in local SQLite database');
                            self.createTable(callback);
                        }
                    });
            }
        );

    },
        
    createTable: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql =
                    "CREATE TABLE IF NOT EXISTS employee ( " +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "firstName VARCHAR(50), " +
                    "lastName VARCHAR(50), " +
                    "title VARCHAR(50), " +
                    "officePhone VARCHAR(50), " +
                    "deleted INTEGER, " +
                    "lastModified VARCHAR(50))";
                tx.executeSql(sql);
            },
            this.txErrorHandler,
            function() {
                log('Table employee successfully CREATED in local SQLite database');
                callback();
            }
        );
    },

    dropTable: function(callback) {
        this.db.transaction(
            function(tx) {
                tx.executeSql('DROP TABLE IF EXISTS employee');
            },
            this.txErrorHandler,
            function() {
                log('Table employee successfully DROPPED in local SQLite database');
                callback();
            }
        );
    },

    findAll: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql = "SELECT * FROM EMPLOYEE";
                log('Local SQLite database: "SELECT * FROM EMPLOYEE"');
                tx.executeSql(sql, this.txErrorHandler,
                    function(tx, results) {
                        var len = results.rows.length,
                            employees = [],
                            i = 0;
                        for (; i < len; i = i + 1) {
                            employees[i] = results.rows.item(i);
                        }
                        log(len + ' rows found');
                        callback(employees);
                    }
                );
            }
        );
    },

    getLastSync: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql = "SELECT MAX(lastModified) as lastSync FROM employee";
                tx.executeSql(sql, this.txErrorHandler,
                    function(tx, results) {
                        var lastSync = results.rows.item(0).lastSync;
                        log('Last local timestamp is ' + lastSync);
                        callback(lastSync);
                    }
                );
            }
        );
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
                    "INSERT OR REPLACE INTO employee (id, firstName, lastName, title, officePhone, deleted, lastModified) " +
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

dao.initialize(function() {
    console.log('database initialized');
});

$('#reset').on('click', function() {
    dao.dropTable(function() {
       dao.createTable();
    });
});


$('#sync').on('click', function() {
    dao.sync(renderList);
});

$('#render').on('click', function() {
    renderList();
});

$('#clearLog').on('click', function() {
    $('#log').val('');
});

function renderList(employees) {
    log('Rendering list using local SQLite data...');
    dao.findAll(function(employees) {
        $('#list').empty();
        var l = employees.length;
        for (var i = 0; i < l; i++) {
            var employee = employees[i];
            $('#list').append('<tr>' +
                '<td>' + employee.id + '</td>' +
                '<td>' +employee.firstName + '</td>' +
                '<td>' + employee.lastName + '</td>' +
                '<td>' + employee.title + '</td>' +
                '<td>' + employee.officePhone + '</td>' +
                '<td>' + employee.deleted + '</td>' +
                '<td>' + employee.lastModified + '</td></tr>');
        }
    });
}

function log(msg) {
    $('#log').val($('#log').val() + msg + '\n');
}*/