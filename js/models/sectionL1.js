/**
 * The SectionL1 Model
 * @author ssachan 
 * 
 **/
window.SectionL1 = Backbone.Model.extend({

    urlRoot: serverUrl+'l1/',
    local: true, // always fetched and saved only locally, never saves on remote
    remote: false, // never cached, dualStorage is bypassed entirely

    initialize: function () {},

});

window.SectionL1Collection = Backbone.Collection.extend({
    model: SectionL1,
    url: serverUrl+'l1/'
});

var sectionL1 = new SectionL1Collection();