import { STATES_CITIES } from './../constants/states-cities';

class HeaderController {
  constructor(forecastService) {
    this.forecastService = forecastService;
    this.getStates();
  }

  getForecast() {
    const a = undefined;
    return this.forecastService.getForecast(this.stateSelected.initials, this.citySelected, a);
  }

  getStates() {
    this.states = STATES_CITIES.map(state => ({ name: state.nome, initials: state.sigla }));
  }

  loadCities() {
    if (this.stateSelected) this.cities = STATES_CITIES.find(state => state.sigla === this.stateSelected.initials).cidades;
    else this.cities = [];
  }
}

export const HeaderComponent = {
  template: require('./header.html'),
  controller: HeaderController
};
