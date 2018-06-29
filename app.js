//MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource'])

//ROUTES
weatherApp.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })
        .when('/forecast', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        })
})

// SERVICES
weatherApp.service('cityService', function () {

    this.city = 'London,uk'

})

// CONTROLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {

    $scope.city = cityService.city

    $scope.$watch('city', function () {
        cityService.city = $scope.city
    })

}])

weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function ($scope, $resource, cityService) {

    $scope.city = cityService.city

    $scope.weatherAPI =
        $resource('https://api.openweathermap.org/data/2.5/forecast?appid=079a2a6a8a77674bd35ef01cb8111d46', {
            callback: "JSON_CALLBACK"
        }, { get: { method: "JSONP" } })

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: 2 })

}])
