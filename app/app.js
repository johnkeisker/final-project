import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngmap from 'ngmap';

import firebase from 'firebase';
import angularFire from 'angularfire';

import user from './modules/user';
import breweries from './modules/breweries';

let App = angular.module('app', [
  'ui.router',
  'firebase',
  'ngMap',

  'jk.user',
  'jk.breweries'
]);

function config($urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
}

App.config(config);
