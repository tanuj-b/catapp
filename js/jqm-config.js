$(document).bind("mobileinit", function () {
    console.log('mobileinit');
    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;

    // disable pushState because it messes with the Router
    $.mobile.pushStateEnabled = false;
    $.mobile.changePage.defaults.changeHash = false;
    

    $('div[data-role="page"]').live('pagehide', function (event, ui) {
        $(event.currentTarget).remove();
    });
});