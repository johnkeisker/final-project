class BreweryService {
  constructor($http, $q) {
    this._$q = $q;
    this._$http = $http;
    this.baseUrl = 'https://dry-wave-65036.herokuapp.com';
  }

  all() {
    return this._$q((resolve, reject) => {
      let promises = [];

      promises.push(this._$http.get(`${this.baseUrl}/v2/locations?region=Arkansas&locality=Little Rock`));
      promises.push(this._$http.get(`${this.baseUrl}/v2/locations?region=Arkansas&locality=North Little Rock`));

      this._$q.all(promises)
        .then((response) => {
          this.breweries = [];

          response.forEach((city) => {
            city.data.data.forEach((brewery) => {
              this.breweries.push(brewery);
            });
          })

          resolve(this.breweries);
        })
        .catch((error) => {
          reject(error);
        });
    });

  }

  get(id) {

    return this._$q((resolve, reject) => {
      let promises = [];

      promises.push(this._$http.get(`${this.baseUrl}/v2/brewery/${id}`));
      promises.push(this._$http.get(`${this.baseUrl}/v2/brewery/${id}/locations`));
      promises.push(this._$http.get(`${this.baseUrl}/v2/brewery/${id}/beers`));
      promises.push(this._$http.get(`${this.baseUrl}/v2/brewery/${id}/socialaccounts`));

      this._$q.all(promises)
        .then((response) => {
          let brewery = {
            info: response[0].data.data,
            location: response[1].data.data[0],
            beers: response[2].data.data,
            social: response[3].data.data
          };

          resolve(brewery);
        })
        .catch((error) => {
          reject(error);
        });
    });

  }

}

export default BreweryService;
