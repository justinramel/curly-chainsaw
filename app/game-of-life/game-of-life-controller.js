angular.module('MyApp')
  .config(['$stateProvider', function ($stateProvider) {
    'use strict';
    $stateProvider
      .state('gameOfLife', {
        url: '/game-of-life',
        template: '<game-of-life></game-of-life>',
      });
  }])
  .service('gameOfLifeService', function () {
    'use strict';
    var self = this,
  		isAlive = {},
  		cellKey = function (row, column) {
  			return row + '_' + column;
  		};
  	this.isAlive = isAlive;
  	this.isCellAlive = function (row, column) {
  		return isAlive[cellKey(row, column)] || false;
  	};
  	this.toggleCellState = function (row, column) {
  		var key = cellKey(row, column);
  		if (isAlive[key]) {
  			delete isAlive[key];
  		} else {
  			isAlive[key] = {
  				row: row,
  				column: column,
  				isAlive: true
  			};
  		}
  		return this;
  	};
  	this.tick = function () {
  		var key, parts, row, column, numberOfNeighbours = {}, neighbourKey;
  		for (key in isAlive) {
  			parts = key.split('_');
  			row = parseInt(parts[0], 10);
  			column = parseInt(parts[1], 10);
  			numberOfNeighbours[key] = numberOfNeighbours[key] || 0;
  			[[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]].forEach(function (offset) {
  				neighbourKey = cellKey(row + offset[0], column + offset[1]);
  				numberOfNeighbours[neighbourKey] = (numberOfNeighbours[neighbourKey] || 0) + 1;
  			});
  		}
  		for (key in numberOfNeighbours) {
  			if (isAlive[key] && (numberOfNeighbours[key] < 2 || numberOfNeighbours[key] > 3) || !isAlive[key] && numberOfNeighbours[key] === 3) {
  				parts = key.split('_');
  				row = parseInt(parts[0], 10);
  				column = parseInt(parts[1], 10);
  				self.toggleCellState(row, column);
  			}
  		}
  	};
  })
  .directive('gameOfLife', function() {
    'use strict';
    return {
      templateUrl: 'game-of-life/game-of-life.html',
      controller: function ($scope, gameOfLifeService) {
        $scope.gol = gameOfLifeService;
        $scope.toggle = function(event) {
          var row = Math.floor(event.offsetY / 20);
          var col = Math.floor(event.offsetX / 20);
          $scope.gol.toggleCellState(row, col);
        };
      }
    };
  });
