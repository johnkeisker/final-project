function config($stateProvider) {
  $stateProvider
  .state("home", {
    url: "/",
    controller: "HomeController as homeCtrl",
    template: require("./views/home.html")
  })
  .state("profile", {
    url:"/profile",
    controller: "ProfileController as profileCtrl",
    template: require('./views/profile.html')
  })
  .state('login', {
    url:"/login",
    controller: "LoginController as loginCtrl",
    template: require('./views/login.html')
  })
  .state("register", {
    url:"/register",
    controller: "RegisterController as registerCtrl",
    template: require('./views/register.html')
  });
}

export default config;
