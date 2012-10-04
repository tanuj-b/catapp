if(Config.phonegap)
{
    window.fileSystemAccess =
    {
        fileSystem : null,
        dbDirectory : null,
        
        gotFS : function(fileSystem)
        {
            this.fileSystem = fileSystem;
        },

        gotDbDirectory : function(directoryEntry)
        {
            this.dbDirectory = directoryEntry;
        },

        fail : function(error)
        {
            //console.log(error.code);
        },

        DbDirectory : function(operation, directoryEntry)
        {
            gotDbDirectory(directoryEntry);
            switch(operation)
            {
                case("read") :
                    //statement
                    break;

            }
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