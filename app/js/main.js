angular
    .module('BAI', ['ui.router', 'mgo-angular-wizard'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('index', {
                url: '/inventories',
                templateUrl: '/index.html',
                controller: 'IndexController',
                resolve: {
                    postPromise: ['InventoriesService', function (InventoriesService) {
                        return InventoriesService.index();
                    }]
                }
            })
            .state('show', {
                url: '/inventories/{id}',
                templateUrl: '/show.html',
                controller: 'ShowController'
            });
        $urlRouterProvider.otherwise('inventories');
    }])
    .factory('InventoriesService', ['$http', function ($http) {
        API = {
            inventories: [],
            index: function () {
                return $http({
                    url: '/api/inventories',
                    method: 'get'
                })
                .success(function (data) {
                    angular.copy(data, API.inventories);
                });
            },
            show: function (inventory) {
                return $http({
                    url: '/api/inventories/' + inventory._id,
                    method: 'get'
                })
                .success(function (data) {
                    console.log(data)
                });
            },
            destroy: function (inventory) {
                return $http({
                    url: '/api/inventories/' + inventory._id,
                    method: 'delete'
                })
                .success(function () {
                    var index = API.inventories.indexOf(inventory);
                    API.inventories.splice(index, 1);
                });
            },
            list: function () {
                return symptoms;
            },
            listByCategory: function (category) {
                return _.where(symptoms, {category: category});
            },
            listCategories: function () {
                var array = symptoms,
                    unique = {},
                    distinct = [];
                for (var i in array) {
                    if (typeof unique[array[i].category] == "undefined") {
                        distinct.push(array[i].category);
                    }
                    unique[array[i].category] = 0;
                }
                return distinct;
            }
        };
        return API;
    }])
    .controller('IndexController', ['InventoriesService', function (InventoriesService) {
        var self = this;
        self.inventories = InventoriesService.inventories;
        self.showInventory = function (inventory) {
            return InventoriesService.show(inventory);
        };
        self.deleteInventory = function (inventory) {
            return InventoriesService.destroy(inventory);
        };
        self.formatDate = function (date) {
            return moment(date).format('dddd');
        };
    }])
    .controller('ShowController', [function () {
        var self = this;
    }]);
