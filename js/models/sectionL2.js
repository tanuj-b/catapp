/**
 * The SectionL1 Model
 * @author ssachan 
 * 
 **/
window.SectionL2 = Backbone.Model.extend({

    urlRoot: serverUrl+'l1/',
    local: true, // always fetched and saved only locally, never saves on remote
    remote: false, // never cached, dualStorage is bypassed entirely

    initialize: function () {},

});

window.SectionL2Collection = Backbone.Collection.extend({
    model: SectionL2,
    url: serverUrl+'l2/'
});

var sectionL2 = new SectionL2Collection();