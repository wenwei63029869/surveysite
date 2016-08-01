$("document").ready(function(){
  var colors = ["#FF5733", "#FFE333", "#A5FF33", "#33FFCA", "#3393FF", "#9633FF", "#FF33E9", "#FF3364"]

  $(".question").click(function(){
    var questionId = $(this).data("questionid")
    if ($("#answerChart"+questionId).css('display') !== "none") {
      $("#answerChart"+questionId).hide(1000);
    } else {
      var chartData = buildChartData($(this));
      createChart(questionId, chartData);
    };
  });

  var buildChartData = function(div) {
    var elements = div.children('.answer')
    var answers = [];
    var labels = [];
    var data = [];
    var backgroundColor = [];
    var count = 0;
    var chartData = {};
    $(".answerChart").hide(1000);
    for (i = 0; i < elements.length; i++) {
        labels.push($(elements[i]).data('content'));
        data.push($(elements[i]).data('counter'));
        backgroundColor.push(colors[i]);
    };
    chartData.labels = labels;
    chartData.datasets = [{data: data, backgroundColor: backgroundColor, hoverBackgroundColor: backgroundColor}];
    return chartData;

  }

  var createChart = function(questionId, data) {
    var ctx = $("#answerChart"+questionId);
    var myDoughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
          hover: {
              // Overrides the global setting
              mode: 'label'
          },
          legend: {
            display: true,
            labels: {
                fontColor: "#ffffff",
                fontFamily: "Impact, Charcoal, sans-serif"
            }
          }
      }
    });
    ctx.show(2000);
  }

});