var correctCode = '#339900';
var incorrectCode = '#CC0000';
var unattemptedCode = '#eae8e8';

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
                    color: correctCode
                });
            } else if (question.isOptionSelectedCorrect() == false) {
                series.data.push({
                    x: i + 1,
                    y: parseFloat(timeTaken),
                    color: incorrectCode
                });

            } else if (question.isOptionSelectedCorrect() == null) {
                series.data.push({
                    x: i + 1,
                    y: parseFloat(timeTaken),
                    color: unattemptedCode
                });
            }
        }
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
            minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: null,
            tickInterval: 1,
            labels: {
                formatter: function() {
                    return '';
                }
            },
          plotLines: [{
            color: '#FF0000',
            width: 2,
            value: 2
        },{
            color: '#FF0000',
            width: 2,
            value: 4
        }],
            plotBands: [{ 
                from: 0,
                to: 2,
                label: {
                    text: 'RC',
                    style: {
                        color: '#606060'
                    }
                }
            }, { 
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
            plotBands: [{ 
                from: 0,
                to: 1,
                color: 'rgba(0, 0, 0, 0)',
                label: {
                    text: 'Easy',
                    style: {
                        color: '#606060'
                    }
                }
            }, { 
                from: 1,
                to: 2,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: 'Normal',
                    style: {
                        color: '#606060'
                    }
                }
            }, { 
                from: 2,
                to: 3,
                color: 'rgba(0, 0, 0, 0)',
                label: {
                    text: 'Normal',
                    style: {
                        color: '#606060'
                    }
                }
            }, { 
                from: 3,
                to: 4,
                color: 'rgba(68, 170, 213, 0.1)',
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
                return '';// + this.x + ' cm, ' + this.y + ' kg';
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
        var dat={x:0,y:parseFloat(difficulty),marker:null};
        var marker = {radius: 10,states: { hover: { fillColor: null, radius: 10}}};
        if (question.isOptionSelectedCorrect() == true) {
        	marker.fillColor = correctCode;
        	marker.states.hover.fillColor = correctCode;
        } else if (question.isOptionSelectedCorrect() == false) {
        	marker.fillColor = incorrectCode;
        	marker.states.hover.fillColor = incorrectCode;
        } else if (question.isOptionSelectedCorrect() == null) {
        	marker.fillColor= unattemptedCode;
        	marker.states.hover.fillColor = incorrectCode;
        }
        dat.marker=marker;
    	obj.data.push(dat);
     }
    var seriesLen = series.length;
    var offset = 0;
    for (var j=0; j< seriesLen; j++){
    	var ob = series[j];
    	//change the bandName 
    	options.xAxis.plotBands[j].label.text=ob.name;
    	var len = ob.data.length;
    	var diff = [0,0,0,0,0];
    	for(var i = 0; i< len; i++){
    		var difficulty = ob.data[i].y;
    		diff[difficulty] = diff[difficulty]+.25;
    		ob.data[i].x=offset + diff[difficulty];
    		ob.data[i].y=difficulty -.5;
    	}
    	offset=offset+2;
    }
    options.xAxis.max = (2*seriesLen);
    options.series=series;
    chart = new Highcharts.Chart(options);
};


window.drawStratChart = function () {
    var options = {
        chart: {
            renderTo: 'strat-chart',
            type: 'columnrange'
            	
        },
        title: {
            text: 'Time distribution'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
        	title: {
                text: 'Questions'
            },
            tickInterval: 1
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
        series: []
    };
    
    var series = {
        data: [],
        /*dataLabels: {
            enabled: true,
            color: '#FFFFFF',
            align: 'right',
            x: -3,
            y: 10,
            formatter: function() {
                return this.y;
            },
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }*/
    };
    var questionIds = currentQuiz.getQuestionIds();
    var len = questionIds.length;
    var offset = quizQuestions.get(questionIds[0]).get('openTimeStamps')[0];
    for (var i = 0; i < len; i++) {
        var question = quizQuestions.get(questionIds[i]);
        var openTimeStamps = question.get('openTimeStamps');
        var closeTimeStamps = question.get('closeTimeStamps');
        var num = openTimeStamps.length;
        for(var j=0;j<num;j++){
        	min = (openTimeStamps[j] - offset)/1000;
        	min = parseFloat(min.toFixed(1));
        	if(!closeTimeStamps[j]){
        		max = parseFloat(currentQuiz.get('timeTaken'));
        	}else{
        	max = (closeTimeStamps[j] - offset)/1000;
        	max = parseFloat(max.toFixed(1));
        	}
        	series.data.push({x:(i+1), low: min, high: max});
        }
    }
    options.yAxis.max = currentQuiz.get('timeTaken');
    options.xAxis.max = len;
    options.series.push(series);
    chart = new Highcharts.Chart(options);
};

