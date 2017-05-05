class WeatherChartController {

  constructor() {
    this.onClick = function (points, evt) {
      console.log(points, evt);
    };
    this.series = ['Temperatura'];
    this.datasetOverride = [{ yAxisID: 'y-axis-1' }];
    this.options = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          }
        ]
      }
    };
  }
}

export const WeatherChart = {
  template: require('./weather-chart.html'),
  controller: WeatherChartController,
  bindings: {
    labels: '=',
    data: '=',
  },
};
