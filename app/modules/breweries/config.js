function config($stateProvider) {
  $stateProvider
    .state("breweries", {
      url: "/breweries",
      controller: "BreweryListController as listCtrl",
      template: require("./views/list.html")
    })
    .state("brewery", {
      url: "/breweries/:id",
      controller: "BreweryDetailController as detailCtrl",
      template: require("./views/detail.html")
    })
}

export default config;
