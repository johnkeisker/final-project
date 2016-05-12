class BreweryService {
  constructor($http, $q, $firebaseArray, UserService) {
    this._$q = $q;
    this._$http = $http;
    this._$firebaseArray = $firebaseArray;
    this._UserService = UserService;
    this.baseUrl = 'https://dry-wave-65036.herokuapp.com';

  }

  login(user) {
    this.user = user;
    this.firebase_breweries = this._$firebaseArray(this._UserService.ref.child('users').child(this.user.uid).child('breweries'));
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

          let info = response[0].data.data;
          let location = response[1].data.data[0];
          let beers = response[2].data.data;
          let social = response[3].data.data;

          if (info === undefined) {
            info = null;
          }

          if (location === undefined) {
            location = null;
          }

          if (beers === undefined) {
            beers = null;
          }

          if (social === undefined) {
            social = null;
          }

          let brewery = {
            info,
            location,
            beers,
            social
          };

          resolve(brewery);
        })
        .catch((error) => {
          reject(error);
        });
    });

  }

  favorite(brewery) {
    this.firebase_breweries.$add(brewery);
  }

  unfavorite(brewery) {

    if (this.firebase_breweries !== undefined && this.firebase_breweries.length > 0) {
      this.firebase_breweries.forEach((firebase_brewery) => {
        if (brewery.info.id === firebase_brewery.info.id) {
          this.firebase_breweries.$remove(firebase_brewery);
        }
      });
    }

  }

  isFavorite(brewery_id) {
    let favorite = false;

    if (this.firebase_breweries !== undefined && this.firebase_breweries.length > 0) {
      this.firebase_breweries.forEach((firebase_brewery) => {
        if (brewery_id === firebase_brewery.info.id) {
          favorite = true;
        }
      });
    }

    return favorite;
  }

}

export default BreweryService;
