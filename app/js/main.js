var app = angular.module('app', ['mongolabResourceHttp', 'ui.router', 'mgo-angular-wizard']);

app.constant('MONGOLAB_CONFIG', {
    API_KEY: 'ysOae0ahHW4A1IXU-e7PFkaG9LhOKVSG',
    DB_NAME: 'anxiety-inventory'
});

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('index', {
            url: '/inventories',
            templateUrl: '/index.html',
            controller: 'IndexController'
        })
        .state('show', {
            url: '/inventories/{id}',
            templateUrl: '/show.html',
            controller: 'ShowController'
        });
    $urlRouterProvider.otherwise('inventories');
}]);

app.factory('Inventory', function ($mongolabResourceHttp) {
    return $mongolabResourceHttp('inventories');
});

app.controller('IndexController', ['Inventory', function (Inventory) {
    var self = this;
    Inventory.all().then(function (inventories) {
        self.inventories = inventories;
        self.formatDate = function (date) {
            return moment(date).format('dddd');
        };
    });
}]);

app.controller('ShowController', ['Inventory', '$stateParams', function (Inventory, $stateParams) {
    var self = this;
    Inventory.getById($stateParams.id).then(function (inventory) {
        self.inventory = inventory;
        self.formatDate = function (date) {
            return moment(date).format('dddd');
        };
    });
}]);
