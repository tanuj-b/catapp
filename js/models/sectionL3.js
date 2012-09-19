/**
 * The SectionL3 Model
 * @author ssachan 
 * 
 **/
window.SectionL3 = Backbone.Model.extend({

    urlRoot: Config.serverUrl+'l3/',
    local: true, // always fetched and saved only locally, never saves on remote
    remote: false, // never cached, dualStorage is bypassed entirely

    initialize: function () {},

});

window.SectionL3Collection = Backbone.Collection.extend({
    model: SectionL3,
    url: Config.serverUrl+'l3/'
});

var sectionL3 = new SectionL3Collection();