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

    var series = {data:[]};
    var questionIds = currentQuiz.getQuestionIds();
    var len = questionIds.length;
    for (var i = 0; i < len; i++) {
        var question = quizQuestions.get(questionIds[i]);
        var timeTaken = question.get('timeTaken');
        if (timeTaken == null) {
            series.data.push({
            	x: i+1,
                y: parseInt(0),
                color: '#FF0000'
            });
        } else {
            if (question.isOptionSelectedCorrect() == true) {
                series.data.push({
                	x: i+1,
                	y: parseFloat(timeTaken),
                    color: '#339900'
                });
            } else if (question.isOptionSelectedCorrect() == false) {
                series.data.push({
                	x: i+1,
                	y: parseFloat(timeTaken),
                    color: '#CC0000'
                });

            } else if (question.isOptionSelectedCorrect() == null) {
                series.data.push({
                	x: i+1,
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
    
    var series ={data:[]};
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

window.drawDifficultyChart = function () {

	var options = {
	chart: {
		renderTo: 'container',
    	type: 'scatter',
    	zoomType: 'xy'
	},
title: {
    text: 'Height Versus Weight of 507 Individuals by Gender'
},
subtitle: {
    text: 'Source: Heinz  2003'
},
xAxis: {
    title: {
        enabled: true,
        text: 'Height (cm)'
    },
    startOnTick: true,
    endOnTick: true,
    showLastLabel: true
},
yAxis: {
    title: {
        text: 'Weight (kg)'
    }
},
tooltip: {
    formatter: function() {
            return ''+
            this.x +' cm, '+ this.y +' kg';
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
        marker: {
            radius: 10,
            states: {
                hover: {
                    enabled: true,
                    lineColor: 'rgb(100,100,100)'
                }
            }
        },
        states: {
            hover: {
                marker: {
                    enabled: false
                }
            }
        }
    }
},
series: [{
    name: 'Female',
    color: 'rgba(223, 83, 83, .5)',
    data: [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
        [176.5, 71.8], [164.4, 55.5], [160.7, 48.6], [174.0, 66.4], [163.8, 67.3]]
	}, 
	{
    name: 'Male',
    color: 'rgba(119, 152, 191, .5)',
    marker:{radius: 50,
            states: {
                hover: {
                    enabled: true,
                    lineColor: 'rgb(100,100,100)'
                }
            }
         },
    data: [[174.0, 65.6], [175.3, 71.8], [193.5, 80.7], [186.5, 72.6], [187.2, 78.8],
        [180.3, 83.2], [180.3, 83.2]]
	}]
};
};