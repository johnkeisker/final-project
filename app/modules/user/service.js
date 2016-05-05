class UserService {
  constructor($q, $firebaseAuth) {
    this._$q = $q;

    this.ref = new Firebase("https://jk-final-project.firebaseIO.com");
    this.auth = $firebaseAuth(this.ref);
  }

  isLoggedIn() {
    return this.auth.$requireAuth();
  }


  login(user) {
    return new this._$q((resolve, reject) => {
      this.auth.$authWithPassword(user)
        .then((response) => {
          this.user = response;
          resolve(this.user);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }


  logout() {
    this.auth.$unauth();
  }


  new() {
    return {
      email: "",
      password: ""
    }
  }

  create(user) {
    return new this._$q((resolve, reject) => {

      this.auth.$createUser(user)
        .then((response) => {
          return this.auth.$authWithPassword(user);
        })
        .then((response) => {
          this.user = response;
          resolve(this.user);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default UserService;
