var app = {};
(function (angular) {
    'use strict';
    angular.module('app', ['ngRoute']).config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/spot/:spotId', {
                controller: 'SpotCtrl',
                templateUrl: 'partials/spot.html'
            })
            .when('/', {
                controller: 'IntroCtrl',
                templateUrl: 'partials/intro.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
})(angular);