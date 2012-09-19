window.drawTimeChart = function () {

    var options = {
        chart: {
            renderTo: 'time-chart',
            type: 'column'
        },
        title: {
            text: 'Time Taken Per Question'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Time (sec)'
            }
        },
        legend: {
            layout: 'vertical',
            backgroundColor: '#FFFFFF',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            shadow: true
        },

        tooltip: {
            formatter: function () {
                return '' + 'Q' + this.x + ': ' + this.y + ' sec';
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [],
    };

    var series = {
        data: []
    };
    var questionIds = currentQuiz.getQuestionIds();
    var len = questionIds.length;
    for (var i = 0; i < len; i++) {
        var question = quizQuestions.get(questionIds[i]);
        var timeTaken = question.get('timeTaken');
        if (timeTaken == null) {
            series.data.push({
                x: i + 1,
                y: parseInt(0),
                color: '#FF0000'
            });
        } else {
            if (question.isOptionSelectedCorrect() == true) {
                series.data.push({
                    x: i + 1,
                    y: parseFloat(timeTaken),
                    color: '#339900'
                });
            } else if (question.isOptionSelectedCorrect() == false) {
                series.data.push({
                    x: i + 1,
                    y: parseFloat(timeTaken),
                    color: '#CC0000'
                });

            } else if (question.isOptionSelectedCorrect() == null) {
                series.data.push({
                    x: i + 1,
                    y: parseFloat(timeTaken),
                    color: '#FF0000'
                });
            }
        }
    }
    options.series.push(series);
    chart = new Highcharts.Chart(options);
};


window.drawStratChart = function () {

    var options = {
        chart: {
            renderTo: 'time-chart',
            type: 'columnrange'
        },
        title: {
            text: 'Time Taken Per Question'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: questionIds
        },
        yAxis: {
            title: {
                text: 'Time (sec)'
            }
        },
        legend: {
            layout: 'vertical',
            backgroundColor: '#FFFFFF',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            shadow: true
        },

        tooltip: {
            formatter: function () {
                return '' + 'Q' + this.x + ': ' + this.y + ' sec';
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [],
    };

    var series = {
        data: []
    };
    var questionIds = currentQuiz.getQuestionIds();
    var len = questionIds.length;
    var startTime = quizQuestions.get(questionIds[0]).get('openTimeStamp')[0];
    
    for (var i = 0; i < len; i++) {
        var question = quizQuestions.get(questionIds[i]);
        if (question.get('timeTaken') == null) {
            series.data.push({
                y: parseInt(0),
                color: '#FF0000'
            });
            timeTaken.push(parseFloat('0'));
        } else {
            if (question.isOptionSelectedCorrect() == true) {
                series.data.push({
                    y: parseFloat(question.get('timeTaken')),
                    color: '#339900'
                });
            } else if (question.isOptionSelectedCorrect() == false) {
                series.data.push({
                    y: parseFloat(question.get('timeTaken')),
                    color: '#CC0000'
                });

            } else if (question.isOptionSelectedCorrect() == null) {
                series.data.push({
                    y: parseFloat(question.get('timeTaken')),
                    color: '#FF0000'
                });
            }
        }
        questionNos[i] = i + 1;
    }
    options.series.push(series);
    chart = new Highcharts.Chart(options);
};

window.getObjectByL2 = function(series, l2){
	 for (var i = 0; i < series.length; i++) {
		    if (series[i].name == l2) {
		      return series[i];
		    }
		  }
	 return null;
}, 

window.drawDifficultyChart = function () {
	var options = {
        chart: {
            renderTo: 'difficulty-chart',
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Difficulty'
        },
        xAxis: {
            title: {
                text: 'Difficulty Level'
            },
            min: 0,
            max: 5,

            minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: null,
          plotLines: [{
            color: '#FF0000',
            width: 2,
            value: 2
        },{
            color: '#FF0000',
            width: 2,
            value: 4
        }],
            plotBands: [{ // Light air
                from: 0,
                to: 2,
                label: {
                    text: 'RC',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Light breeze
                from: 2,
                to: 4,
                label: {
                    text: 'VR',
                    style: {
                        color: '#606060'
                    }
                
                }}]
        },
      yAxis: {
            title: {
                text: 'Difficulty Level'
            },
            min: 0,
          max:4,  
              minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: null,
            plotBands: [{ // Light air
                from: 0,
                to: 1,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: 'Easy',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Light breeze
                from: 1,
                to: 2,
                color: 'rgba(68, 170, 500, 0.1)',
                label: {
                    text: 'Normal',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Gentle breeze
                from: 2,
                to: 3,
                color: 'rgba(68, 170, 1000, 0.1)',
                label: {
                    text: 'Normal',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Moderate breeze
                from: 3,
                to: 4,
                color: 'rgba(0, 0, 0, 0)',
                label: {
                    text: 'Difficult',
                    style: {
                        color: '#606060'
                    }
                }
            }]
        },
        tooltip: {
            formatter: function() {
                return '' + this.x + ' cm, ' + this.y + ' kg';
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            backgroundColor: '#FFFFFF',
            borderWidth: 1
        },
        plotOptions: {
            scatter: {

                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                }
            }
        },
        series: []
    };    
    
    var series =[];
    var questionIds = currentQuiz.getQuestionIds();
    var len = questionIds.length;
    for (var i = 0; i < len; i++) {
        var question = quizQuestions.get(questionIds[i]);
        var l3 = sectionL3.get(question.get('l3Id'));
        var l2 = sectionL2.get(l3.get('l2_id'));
        var difficulty = question.get('difficulty');
        var obj = getObjectByL2(series,l2.get('shortName'));
        if(obj==null){
        	obj = {name:l2.get('shortName'), data:[]};
            series.push(obj);
        }
        obj.data.push({x:1,y:parseFloat(difficulty)});
        //var series = [{name:''},{name:''}];
    }
    
    options.series=series;
    chart = new Highcharts.Chart(options);
};