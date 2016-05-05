class Beer {
  constructor($http) {
    this._$http = $http;
    this.getData();
  }

  all() {
    return this._$http
      .get(`https://dry-wave-65036.herokuapp.com`)
  }

  get(id) {
    const token ="1777530e66b689898b9295236f9cc1c8";
    const url =`https://dry-wave-65036.herokuapp.com`;
  }

}
