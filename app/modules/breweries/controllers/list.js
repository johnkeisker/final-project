class BreweryListController {
  constructor($state, UserService, BreweryService) {
    this._$state = $state;
    this._UserService = UserService;
    this._BreweryService = BreweryService;

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

  showDetail(brewery) {
    console.log(brewery);
  }
}

export default BreweryListController;
