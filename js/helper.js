window.helper = {

    // Asynchronously load templates located in separate .html files
    loadTemplate: function (views, callback) {

        var deferreds = [];

        $.each(views, function (index, view) {
            if (window[view]) {
                if (Config.phonegap == true) {
                    deferreds.push($.ajax({
                        type: "GET",
                        dataType: "html",
                        url: Config.assetPath+Config.tmplatesFolder+'/' + view + '.html',
                        async: false,
                    }).done(function (data) {
                        window[view].prototype.template = _.template(data);
                    }));

                } else {
                    deferreds.push($.get(Config.tmplatesFolder+'/' + view + '.html', function (data) {
                        window[view].prototype.template = _.template(data);
                    }));
                }
            } else {
                alert(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    },
/*
    uploadFile: function (file, callbackSuccess) {
        var self = this;
        var data = new FormData();
        data.append('file', file);
        $.ajax({
            url: 'api/upload.php',
            type: 'POST',
            data: data,
            processData: false,
            cache: false,
            contentType: false
        }).done(function () {
            console.log(file.name + " uploaded successfully");
            callbackSuccess();
        }).fail(function () {
            self.showAlert('Error!', 'An error occurred while uploading ' + file.name, 'alert-error');
        });
    },

    displayValidationErrors: function (messages) {
        for (var key in messages) {
            if (messages.hasOwnProperty(key)) {
                this.addValidationError(key, messages[key]);
            }
        }
        this.showAlert('Warning!', 'Fix validation errors and try again', 'alert-warning');
    },

    addValidationError: function (field, message) {
        var controlGroup = $('#' + field).parent().parent();
        controlGroup.addClass('error');
        $('.help-inline', controlGroup).html(message);
    },

    removeValidationError: function (field) {
        var controlGroup = $('#' + field).parent().parent();
        controlGroup.removeClass('error');
        $('.help-inline', controlGroup).html('');
    },
*/
    showAlert: function (title, text, klass) {
        $('.alert').removeClass("alert-error alert-warning alert-success alert-info");
        $('.alert').addClass(klass);
        $('.alert').html('<strong>' + title + '</strong> ' + text);
        $('.alert').show();
    },

    hideAlert: function () {
        $('.alert').hide();
    },

    updateQuizTimer: function () {
       $('#time').html(timer.count);
        var qtimer = currentQuizQuestion.get('timer');
        qtimer++;
        currentQuizQuestion.set('timer', qtimer);
        if (timer.count == currentQuiz.get('allotedTime')) {
            // timed out
        	currentQuiz.set('timeTaken',currentQuiz.get('allotedTime')); 
        	timer.stop();
            alert('time up');
            app.stopQuiz();
        }
    },
    
    updatePracticeTimer: function () {
      var qtimer = currentPracticeQuestion.get('timer');
      qtimer++;
      $('#time').html(qtimer);
      currentPracticeQuestion.set('timer', qtimer);
      if (qtimer == 10) {
    	  	currentPracticeQuestion.set('attemptedInPractice',true);
    	  	currentPracticeQuestion.set('time',qtimer);
            alert('time up');
            timer.stop();
            practiceView.questionView.renderInfo();
       }
    },
};
