class CardTodayController {
}

export const CardToday = {
  template: require('./card-today.html'),
  controller: CardTodayController,
  bindings: {
    typeTemp: '@',
    day: '=',
    date: '=',
    tempMin: '=',
    tempMax: '=',
    icon: '=',
    description: '=',
  },
};
