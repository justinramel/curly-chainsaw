angular.module('MyApp')
  .config(['$stateProvider', function ($stateProvider) {
    'use strict';
    $stateProvider
      .state('gameOfLife', {
        url: '/game-of-life',
        templateUrl: 'game-of-life/game-of-life.html',
        controller: 'GameOfLifeController'
      });
  }])
  .controller('GameOfLifeController', ['$scope', function ($scope) {
    'use strict';
    $scope.gol = new SAMURAIPRINCIPLE.GameOfLife();

    $scope.tick = function() {
      $scope.gol.tick();
    };

    $scope.toggle = function(row, col) {
      $scope.gol.toggleCellState(row, col);
    };
  }]);
