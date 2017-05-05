export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  }).hashPrefix('!');
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state({
      name: 'app',
      url: '/',
      component: 'app'
    });
}
