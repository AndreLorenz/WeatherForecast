class MainController {
  constructor($scope) {
    this.$scope = $scope;
    this.tab = true;
    this.initializer();
  }

  initializer() {
    this.$scope.$on('getForecastChart', (event, chart) => {
      this.forecastChart = chart;
    });
    this.$scope.$on('getWeekendBeach', (event, weekend) => {
      this.weekendBeach = weekend;
    });
    this.$scope.$on('getWeekForecast', (event, forecastWeek) => {
      this.forecastWeek = forecastWeek;
    });
    this.$scope.$on('getAverageWeek', (event, average) => {
      this.average = average;
    });
  }
}

export const MainComponent = {
  template: require('./main.html'),
  controller: MainController
};
