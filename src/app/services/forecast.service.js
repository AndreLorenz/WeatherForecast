import { FORECAST_URL, FORECAST_APPID, FORECAST_UNIT, FORECAST_LANG, FORECAST_CNT, MONTH_NAME, DAY_NAME } from '../constants/forecast.constant';

export class ForecastService {

  /** @ngInject */
  constructor($rootScope, $http) {
    this.$rootScope = $rootScope;
    this.$http = $http;
  }

  getForecast(state, city) {
    const config = {
      method: 'GET',
      url: `${FORECAST_URL}q=${city},${state}&cnt=${FORECAST_CNT}&units=${FORECAST_UNIT}&lang=${FORECAST_LANG}&appid=${FORECAST_APPID}`
    };
    this.$http(config).then(res => {
      this.forecasts = res.data.list.map(forecast => {
        const date = new Date(forecast.dt * 1000);
        return Object.assign(this.convertDate(date), { temp: forecast.temp, rain: forecast.rain }, this.getIconDescription(forecast.weather[0]));
      });
      this.getChartValues();
      this.getWeekendBeach();
      this.getWeekValues();
      this.getAverageWeek();
    }).catch(err => {
      this.$rootScope.$broadcast('forecastError', err);
    });
  }

  getChartValues() {
    const chartConfig = {};
    chartConfig.temperatures = [];
    chartConfig.temperatures.push(this.forecasts.map(forecast => forecast.temp.day));
    chartConfig.dates = this.forecasts.map(forecast => forecast.shortWeekday);
    this.$rootScope.$broadcast('getForecastChart', chartConfig);
  }

  getWeekValues() {
    this.$rootScope.$broadcast('getWeekForecast',
      this.forecasts.map(forecast => ({
        weekday: forecast.fullWeekday,
        date: forecast.fullDate,
        tempMin: forecast.temp.min,
        tempMax: forecast.temp.max,
        icon: forecast.icon
      })));
  }

  getAverageWeek() {
    this.$rootScope.$broadcast('getAverageWeek', {
      min: this.forecasts.find(f => f.temp.day === Math.min(...this.forecasts.map(o => o.temp.day))),
      max: this.forecasts.find(f => f.temp.day === Math.max(...this.forecasts.map(o => o.temp.day))),
    });
  }

  getWeekendBeach() {
    const obj = {};
    this.forecasts
      .filter(forecast => forecast.weekday === 6 || !forecast.weekday)
      .forEach((day, key) => {
        if (!key) {
          obj.date = day.fullDate;
          obj.rain = day.rain || 0;
          obj.temp = day.temp.day;
        } else {
          obj.date += ` e ${day.fullDate}`;
          obj.rain = Math.round((obj.rain + day.rain || 0) / 2);
          obj.temp = Math.round((obj.temp + day.temp.day) / 2);
        }
      });

    if (obj.temp >= 25 && obj.rain >= 20) obj.message = `Apesar da temperatura estar agradável no final de semana em torno de ${obj.temp} graus,
        não é aconselhado ir para praia pela grande chance de chuvas no final de semana.`;
    else if (obj.temp >= 25 && obj.rain >= 5) obj.message = `A temperatura este final de semana vai estar bem agradável em torno de ${obj.temp} graus,
        porém possui chances de chover ao decorrer do dia.`;
    else if (obj.temp >= 25 && obj.rain < 5) obj.message = `O próximo final de semana é ideal para pegar seu carro e curtir uma praia. 
      A temperatura vai estar em média de ${obj.temp} graus sem chances de chuva durante o dia.`;
    else if (obj.temp < 25 && obj.rain >= 20) obj.message = `Este final de semana é aconselhado ir para casa de campo ou assistir um bom filme a temperatura vai ficar em torno de 
     ${obj.temp} graus e com grande possibilidade de chuva.`;
    else if (obj.temp < 25 && obj.rain >= 5) obj.message = `Este final de semana é ótimo para quem quer ir relaxar na casa de praia, porém não é aconselhado caso 
    você queira tomar banho de mar. A temperatura vai ficar na média de ${obj.temp} graus e com chances de chuva ao decorrer dos dias.`;
    else if (obj.temp < 25 && obj.rain < 5) obj.message = `Este final de semana é ótimo para quem quer ir relaxar na casa de praia, porém não é aconselhado caso 
    você queira tomar banho de mar. A temperatura vai ficar na média de ${obj.temp} graus sem riscos de chuva.`;

    this.$rootScope.$broadcast('getWeekendBeach', obj);
  }

  convertDate(date) {
    const obj = {};
    const weekday = date.getDay();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    obj.fullDate = `${day} de ${MONTH_NAME[month]} de ${year}`;
    obj.fullWeekday = DAY_NAME[weekday].full;
    obj.shortWeekday = DAY_NAME[weekday].short;
    obj.weekday = weekday;
    return obj;
  }

  getIconDescription(weather = {}) {
    const obj = {};
    obj.icon = weather.icon;
    if (['01d', '01n'].includes(weather.icon)) obj.description = 'Céu aberto sem possibilidades de chuva.';
    else if (['02d', '02n'].includes(weather.icon)) obj.description = 'Algumas nuvens, porém com poucas possibilidades de chuva.';
    else if (['03d', '03n'].includes(weather.icon)) obj.description = 'Céu encoberto por nuvens com poucas possibilidades de chuva.';
    else if (['04d', '04n'].includes(weather.icon)) obj.description = 'Céu encoberto por nuvens com chances de garoa a qualquer hora.';
    else if (['09d', '09n'].includes(weather.icon)) obj.description = 'Previsão de chuva durante todo o dia.';
    else if (['10d', '10n'].includes(weather.icon)) obj.description = 'Céu encoberto por nuvens e previsão de chuva a qualquer hora.';
    else if (['11d', '11n'].includes(weather.icon)) obj.description = 'Durante todo o dia muita chuva, com possibilidade de temporais.';
    else if (['13d', '13n'].includes(weather.icon)) obj.description = 'Ceu encoberto por nubens com chances de neve ao decorrer do dia.';
    else if (['50d', '50n'].includes(weather.icon)) obj.description = 'O Tempo está bastante misto com possibilidades de vento forte.';
    else {
      obj.description = '';
      obj.icon = 'none-available';
    }
    return obj;
  }

}
