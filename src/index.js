import angular from 'angular';
import 'jquery';
import 'ngstorage';
import 'mdbootstrap/css/bootstrap.min.css';
import 'mdbootstrap/js/bootstrap';
import 'mdbootstrap/js/mdb';
import 'angular-ui-router';
import 'mdbootstrap/css/mdb.css';
import 'mdbootstrap/css/style.css';
import 'chart.js/dist/Chart.min';
import 'angular-chart.js/dist/angular-chart.min';


import './index.scss';

// CardToday
import { CardToday } from 'components/card-today/card-today.controller';
import 'components/card-today/card-today.scss';

// CardDay
import { CardDay } from 'components/card-day/card-day.controller';
import 'components/card-day/card-day.scss';

// Recommendation
import { Recommendation } from 'components/recommendation/recommendation.controller';
import 'components/recommendation/recommendation.scss';

// Recommendation
import { WeatherChart } from 'components/weather-chart/weather-chart.controller';
import 'components/weather-chart/weather-chart.scss';

import { ForecastService } from './app/services/forecast.service';

import { App } from './app/containers/app';
import { HeaderComponent } from './app/containers/header';
import { MainComponent } from './app/containers/main';
import routesConfig from './app.routes';
import runConfig from './app.run';

angular.module('weather-forecast', ['ui.router', 'chart.js', 'ngStorage'])
  .component('app', App)
  .component('headerComponent', HeaderComponent)
  .component('mainComponent', MainComponent)
  .component('cardToday', CardToday)
  .component('cardDay', CardDay)
  .component('recommendation', Recommendation)
  .component('weatherChart', WeatherChart)
  .service('forecastService', ForecastService)
  .config(routesConfig)
  .run(runConfig);
