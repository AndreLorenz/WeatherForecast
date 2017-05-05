class CardDayController {
  constructor() {
  }

  loadImage(image) {
    if (image) this.img = require(`assets/weather-icons/${image}.png`);
  }

}

export const CardDay = {
  template: require('./card-day.html'),
  controller: CardDayController,
  bindings: {
    day: '=',
    date: '=',
    tempMin: '=',
    tempMax: '=',
    icon: '=',
  },
};
