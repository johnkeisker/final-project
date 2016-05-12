class BreweryDetailController {
  constructor($state, $stateParams, UserService, BreweryService) {
    this._$state = $state;
    this._UserService = UserService;
    this._BreweryService = BreweryService;

    this._UserService
      .isLoggedIn()
      .then((response) => {
        this.user = response;
        this._BreweryService.login(this.user);
        this._BreweryService.get($stateParams.id)
          .then((response) => {
            this.brewery = response;
            console.log(this.brewery);
          });
      })
      .catch((error) => {
        this._$state.go("login")
      });

  }

  isFavorite() {
    if (this.brewery) {
      return this._BreweryService.isFavorite(this.brewery.info.id);
    }

    return false;
  }

  favoriteBrewery() {
    this._BreweryService.favorite(this.brewery);
  }

  unfavoriteBrewery() {
    this._BreweryService.unfavorite(this.brewery);
  }
}

export default BreweryDetailController;
