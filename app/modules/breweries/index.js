import angular from 'angular';

import config from './config';
import service from './service';
import detailController from './controllers/detail';
import listController from './controllers/list';

let breweries = angular.module('jk.breweries', []);

breweries.config(config);
breweries.service('BreweryService', service);
breweries.controller('BreweryListController', listController);
breweries.controller('BreweryDetailController', detailController);

export default breweries;
