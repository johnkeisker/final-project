import angular from 'angular';

import config from './config';
import service from './service';

import loginController from './controllers/login';
import profileController from './controllers/profile';
import registerController from './controllers/register';
import homeController from './controllers/home';

let user = angular.module("jk.user", []);

user.config(config);
user.controller('ProfileController', profileController);
user.controller('LoginController', loginController);
user.controller('RegisterController', registerController);
user.controller('HomeController', homeController);
user.service('UserService', service);

export default user;
