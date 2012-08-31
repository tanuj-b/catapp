(function() {
  'use strict';
  var S4, dualsync, localsync, onlineSync, parseRemoteResponse, result;

  //Extenstions to Backbone.Collection

  Backbone.Collection.prototype.syncDirty = function() {
    var id, ids, model, store, _i, _len, _results;
    store = localStorage.getItem("" + this.url + "_dirty"); //list of ids in the _dirty storage
    ids = (store && store.split(',')) || [];
    _results = [];
    for (_i = 0, _len = ids.length; _i < _len; _i++) {
      id = ids[_i];
      model = id.length === 36 ? this.where({
        id: id
      })[0] : this.get(parseInt(id));
      _results.push(model.save());
    } //returns the models with ids in _dirty and calls model.save() on them. pushes output to _results array which is outputed
    return _results; 
  };

//same as above but for destroy, calls model.destroy
  Backbone.Collection.prototype.syncDestroyed = function() {
    var id, ids, model, store, _i, _len, _results;
    store = localStorage.getItem("" + this.url + "_destroyed");
    ids = (store && store.split(',')) || [];
    _results = [];
    for (_i = 0, _len = ids.length; _i < _len; _i++) {
      id = ids[_i];
      model = new this.model({
        id: id
      });
      model.collection = this;
      _results.push(model.destroy());
    }
    return _results;
  };

  Backbone.Collection.prototype.syncDirtyAndDestroyed = function() {
    this.syncDirty();
    return this.syncDestroyed();
  };

  S4 = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }; //random generator

  window.Store = (function() {

    Store.prototype.sep = '';

    function Store(name) {
      this.name = name; //name of store
      this.records = this.recordsOn(this.name); //ids in this store
    }

    Store.prototype.generateId = function() {
      return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
    };//generates 36 length random id

    Store.prototype.save = function() {
      return localStorage.setItem(this.name, this.records.join(','));
    }; //saves ids to a store's this.name

    Store.prototype.recordsOn = function(key) {
      var store;
      store = localStorage.getItem(key);
      return (store && store.split(','))|| store || [];
    }; //get the records currently on this store name

    Store.prototype.dirty = function(model) {//overall this function just adds a model id to the _dirty store, if it isn't already
      var dirtyRecords;
      dirtyRecords = this.recordsOn(this.name + '_dirty'); //ids of dirty records
      if (!_.include(dirtyRecords, model.id.toString())) { // if_.include does what i think, then this checks if the model is already dirty
        //console.log('dirtying', model);
    	  console.log('dirtying');
        dirtyRecords.push(model.id);
        localStorage.setItem(this.name + '_dirty', dirtyRecords.join(','));
      }
      return model;
    };

    Store.prototype.clean = function(model, from) { 
      var dirtyRecords, store;
      store = "" + this.name + "_" + from;
      dirtyRecords = this.recordsOn(store);
      if (_.include(dirtyRecords, model.id.toString())) {
        console.log('cleaning', model.id);
        localStorage.setItem(store, _.without(dirtyRecords, model.id.toString()).join(','));
      }
      return model;
    };//removes an id from "from" store

    Store.prototype.destroyed = function(model) { //adds item to destroyed store
      var destroyedRecords;
      destroyedRecords = this.recordsOn(this.name + '_destroyed');
      if (!_.include(destroyedRecords, model.id.toString())) {
        destroyedRecords.push(model.id);
        localStorage.setItem(this.name + '_destroyed', destroyedRecords.join(','));
      }
      return model;
    };

    Store.prototype.create = function(model) { 
      //console.log('creating', model, 'in', this.name);
    	console.log('creating', model.id, 'in', this.name);
      if (!_.isObject(model)) return model;
      if (!model.id) {
        model.id = this.generateId();
        model.set(model.idAttribute, model.id);
      }//if not object, fuck off. if no model.id, generate one.
      localStorage.setItem(this.name + this.sep + model.id, JSON.stringify(model));//add this as an entry in localStorage
      this.records.push(model.id.toString());//add this id to our store
      this.save();//save store
      return model;
    };

    Store.prototype.update = function(model) {
      //console.log('updating', model, 'in', this.name);
    	console.log('updating', model.id, 'in', this.name);
      localStorage.setItem(this.name + this.sep + model.id, JSON.stringify(model));
      if (!_.include(this.records, model.id.toString())) {
        this.records.push(model.id.toString());
      }
      this.save();
      return model;
    };

    Store.prototype.clear = function() {
      var id, _i, _len, _ref;
      _ref = this.records;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        id = _ref[_i];
        localStorage.removeItem(this.name + this.sep + id);
      }
      this.records = [];
      return this.save();
    };//clears everything from this store and all models are removed from localStorage

    Store.prototype.hasDirtyOrDestroyed = function() {
      return !_.isEmpty(localStorage.getItem(this.name + '_dirty')) || !_.isEmpty(localStorage.getItem(this.name + '_destroyed'));
    };//checks if there are any dirty or destroyed models in this store

    Store.prototype.find = function(model) {
      //console.log('finding', model, 'in', this.name);
      console.log('finding', model.id, 'in', this.name);
      return JSON.parse(localStorage.getItem(this.name + this.sep + model.id));
    }; //get model with id

    Store.prototype.findAll = function() {
      var id, _i, _len, _ref, _results;
      console.log('findAlling');
      _ref = this.records;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        id = _ref[_i];
        _results.push(JSON.parse(localStorage.getItem(this.name + this.sep + id)));
      }
      return _results;
    };//returns all models in this id

    Store.prototype.destroy = function(model) {
      //console.log('trying to destroy', model, 'in', this.name);
      console.log('trying to destroy', model.id, 'in', this.name);
      localStorage.removeItem(this.name + this.sep + model.id);
      this.records = _.reject(this.records, function(record_id) {
        return record_id === model.id.toString();
      });
      this.save();
      return model;
    };

    return Store;

  })();

  localsync = function(method, model, options) {
    var response, store;
    store = new Store(options.storeName); //new Store with this name
    response = (function() {
      switch (method) {
        case 'read':
          if (model.id) {
            return store.find(model);
          } else {
            return store.findAll();
          }
          break;
        case 'hasDirtyOrDestroyed':
          return store.hasDirtyOrDestroyed();
        case 'clear':
          return store.clear();
        case 'create':
          if (!(options.add && !options.merge && store.find(model))) {//if add = true or merge = false or model deos not already exist in store
            model = store.create(model); //create model
            if (options.dirty) {
              return store.dirty(model); //dirty it
            }
          }
          break;
        case 'update':
          store.update(model);
          if (options.dirty) {
            return store.dirty(model);
          } else {
            return store.clean(model, 'dirty');
          }
          break;
        case 'delete':
          store.destroy(model);
          if (options.dirty) {
            return store.destroyed(model);
          } else {
            if (model.id.toString().length === 36) {
              return store.clean(model, 'dirty');
            } else {
              return store.clean(model, 'destroyed');
            }
          }
      }
    })();
    if (!options.ignoreCallbacks) {
      if (response) {
        options.success(response);
      } else {
        options.error('Record not found');
      }
    }
    return response;
  }; //localsync options to read, clear,create,update,delete a model from store storename in options, other options being add or merge

  result = function(object, property) {
    var value;
    if (!object) return null;
    value = object[property];
    if (_.isFunction(value)) {
      return value.call(object);
    } else {
      return value;
    }
  };//gets result of a function or property value.

  parseRemoteResponse = function(object, response) {
    if (!(object && object.parseBeforeLocalSave)) return response;
    if (_.isFunction(object.parseBeforeLocalSave)) {
      return object.parseBeforeLocalSave(response);
    }
  }; // if there exists a object.parsebeforelocalsave, then call it

  onlineSync = Backbone.sync; //onlinesync is default backbone sync

  dualsync = function(method, model, options) {
    var error, local, originalModel, success;
    //console.log('dualsync', method, model, options);
    console.log("dualsync",method,model.id,options);
    options.storeName = result(model.collection, 'url') || result(model, 'url'); //save to store collections.url, or models.url
    if (result(model.attributes, 'remote') || result(model.collection, 'remote')) {
      return onlineSync(method, model, options);
    } //if remote is on, etiher collection or model, do a regular sync and get out.
    local = result(model, 'local') || result(model.collection, 'local');
    options.dirty = options.remote === false && !local; // dirty if remote is set to false AND local is false or unset
    if (options.remote === false || local) { //if remote set to false or local is set to true
      return localsync(method, model, options); //localsync and return
    }
    //if remote unset AND local set to false/unset then call onlineSync and then on success call local sync, then call original success
    options.ignoreCallbacks = true;
    success = options.success; //current success method stored to success
    error = options.error;
    switch (method) {
      case 'read':
        if (localsync('hasDirtyOrDestroyed', model, options)) {
          console.log("can't clear", options.storeName, "require sync dirty data first");
          return success(localsync(method, model, options));
        } else {
          options.success = function(resp, status, xhr) {
            var i, _i, _len;
            console.log('got remote', resp, 'putting into', options.storeName);
            resp = parseRemoteResponse(model, resp);
            if (!options.add) {
              localsync('clear', model, options);
            }
            if (_.isArray(resp)) {
              for (_i = 0, _len = resp.length; _i < _len; _i++) {
                i = resp[_i];
                console.log('trying to store', i);
                localsync('create', i, options);
              }
            } else {
              localsync('create', resp, options);
            }
            return success(resp, status, xhr);
          };
          options.error = function(resp) {
            console.log('getting local from', options.storeName);
            return success(localsync(method, model, options));
          };
          return onlineSync(method, model, options);
        }
        break;
      case 'create':
        options.success = function(resp, status, xhr) {
          localsync(method, resp, options);
          return success(resp, status, xhr);
        };
        options.error = function(resp) {
          options.dirty = true;
          return success(localsync(method, model, options));
        };
        return onlineSync(method, model, options);
      case 'update':
        if (_.isString(model.id) && model.id.length === 36) {
          originalModel = model.clone();
          options.success = function(resp, status, xhr) {
            localsync('delete', originalModel, options);
            localsync('create', resp, options);
            return success(resp, status, xhr);
          };
          options.error = function(resp) {
            options.dirty = true;
            return success(localsync(method, originalModel, options));
          };
          model.set({
            id: null
          });
          return onlineSync('create', model, options);
        } else {
          options.success = function(resp, status, xhr) {
            return success(localsync(method, model, options));
          };
          options.error = function(resp) {
            options.dirty = true;
            return success(localsync(method, model, options));
          };
          return onlineSync(method, model, options);
        }
        break;
      case 'delete':
        if (_.isString(model.id) && model.id.length === 36) {
          return localsync(method, model, options);
        } else {
          options.success = function(resp, status, xhr) {
            localsync(method, model, options);
            return success(resp, status, xhr);
          };
          options.error = function(resp) {
            options.dirty = true;
            return success(localsync(method, model, options));
          };
          return onlineSync(method, model, options);
        }
    }
  };

  Backbone.sync = dualsync;

}).call(this);
