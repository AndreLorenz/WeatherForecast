import { STATES_CITIES } from './../constants/states-cities';

class HeaderController {
  constructor($localStorage, forecastService) {
    this.$localStorage = $localStorage;
    this.forecastService = forecastService;
    this.getStates();
  }

  getForecast() {
    return this.forecastService.getForecast(this.stateSelected.initials, this.citySelected);
  }

  setFavorite() {
    this.forecastService.setFavorite(this.stateSelected, this.citySelected);
  }

  getStates() {
    this.states = STATES_CITIES.map(state => ({ name: state.nome, initials: state.sigla }));
    this.favorite = this.forecastService.getFavorite();
    if (this.favorite) {
      this.stateSelected = this.states.find(state => state.initials === this.favorite.state.initials);
      this.loadCities(true);
    }
  }

  loadCities(favorite) {
    if (this.stateSelected) this.cities = STATES_CITIES.find(state => state.sigla === this.stateSelected.initials).cidades;
    else this.cities = [];
    if (favorite) this.citySelected = this.favorite.city;
  }
}

export const HeaderComponent = {
  template: require('./header.html'),
  controller: HeaderController
};
