window.fbAsyncInit = function() {

	console.info('FB jssdk loaded');
	FB.init({
		appId : '345218642220354', // App ID
		status : true, // check login status
		cookie : true, // enable cookies to allow the server to access the
		xfbml : true
	});

	user = new FacebookUser();

	user.on('facebook:unauthorized', function(model, response) {
		console.info('facebook:unauthorized');
	});

	user.on('facebook:connected', function(model, response) {
		console.info('facebook:connected');
	});

	user.on('facebook:disconnected', function(model, response) {
		console.info('facebook:disconnected');
		$('#loginstatus').text(response.status);
		$('#login').attr('disabled', false);
		$('#logout').attr('disabled', true);
	});

	user.on('change', function() {
		console.info('change');
		console.log(user.attributes);
		app.menu();
		var table = $('.table tbody').empty();

		_(user.attributes).each(
				function(value, attribute) {
					if (typeof value !== 'string')
						return;

					var tr = $(document.createElement('tr'));
					var attr = $(document.createElement('td')).text(attribute)
							.appendTo(tr);
					var val = $(document.createElement('td')).text(value)
							.appendTo(tr);
					tr.append(attr).append(val).appendTo(table);
				}, this);
		user.get('pictures').square;
	});
	
	user.updateLoginStatus();
};

$('#login').click(function(){ user.login(); });

$('#logout').click(function(){ user.logout(); });

