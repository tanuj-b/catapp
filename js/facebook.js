user = new FacebookUser();

user.on('facebook:unauthorized', function(model, response) {
	console.info('facebook:unauthorized');
	$('#loginstatus').text(response.status);
});

user.on('facebook:connected', function(model, response) {
	console.info('facebook:connected');	
	$('#loginstatus').text(response.status);
	$('#login').attr('disabled', true);
	$('#logout').attr('disabled', false);
});

user.on('facebook:disconnected', function(model, response) {
	console.info('facebook:disconnected');
	$('#loginstatus').text(response.status);
	$('#login').attr('disabled', false);
	$('#logout').attr('disabled', true);
});

user.on('change', function() {
	console.info('change');
	 var table = $('.table tbody').empty();
	 
	_(user.attributes).each(
	function(value, attribute) {
		if (typeof value !== 'string')
			return;
		
		var tr = $(document.createElement('tr'));
		var attr = $(document.createElement('td')).text(attribute).appendTo(tr);
		var val = $(document.createElement('td')).text(value).appendTo(tr);
		tr.append(attr).append(val).appendTo(table);
	}, this);
	user.get('pictures').square;
});

$('#login').click(function() {
	user.login();
});
$('#logout').click(function() {
	user.logout();
});

user.updateLoginStatus();
