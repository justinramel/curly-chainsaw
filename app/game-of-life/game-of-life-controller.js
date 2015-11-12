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
  .controller('GameOfLifeController', ['$scope', '$interval', function ($scope, $interval) {
    'use strict';
    $scope.gol = new SAMURAIPRINCIPLE.GameOfLife();

    $scope.toggle = function(event) {
      var row = Math.floor(event.offsetY / 20);
      var col = Math.floor(event.offsetX / 20);
      $scope.gol.toggleCellState(row, col);
      console.log(event.offsetY, event.offsetX);
      console.log(row, col);
      console.log(event);
    };

    $scope.autoTick = function() {
      $interval(function() {
        $scope.gol.tick();
        console.log('tick');
      }, 300);
    }
  }]);
