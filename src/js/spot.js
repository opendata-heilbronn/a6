(function (angular, app) {
    'use strict';

    angular.module('app').controller('AnimalListCtrl', function ($scope) {
        $scope.animals = filterAnimals(app.animals);
    });
})(angular, app);