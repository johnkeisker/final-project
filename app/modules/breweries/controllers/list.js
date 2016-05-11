class BreweryListController {
  constructor($state, UserService, BreweryService, NgMap) {
    NgMap.getMap(0).then((map) => {
      this.map = map;
    });

    this._$state = $state;
    this._UserService = UserService;
    this._BreweryService = BreweryService;
    this.selectedBrewery = {};

    this._UserService
      .isLoggedIn()
      .then((response) => {
        this.user = response;
        this._BreweryService.all()
          .then((response) => {
            this.breweries = response;
            console.log(this.breweries);
          });
      })
      .catch((error) => {
        this._$state.go("login")
      });

  }

  showWindow(e, brewery) {
    this.map.brewery = brewery;
    this.map.showInfoWindow('brewery_window', `brewery_${brewery.id}`);
  }


}

export default BreweryListController;
