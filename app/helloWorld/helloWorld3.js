angular.module('MyApp')
  .config(['$stateProvider', function ($stateProvider) {
    'use strict';
    $stateProvider
      .state('helloWorld3', {
        url: '/helloWorld3',
        templateUrl: 'helloWorld/helloWorld3.html',
        controller: 'HelloWorld3Controller'
      });
  }])
  .factory('leaderboard', function ($resource) {
    'use strict';
    return $resource('/assets/data/leaderboard.json');
  })
  .factory('players', function ($resource) {
    'use strict';
    return $resource('/assets/data/players/:id.json');
  })
  .controller('HelloWorld3Controller', ['$scope', 'leaderboard', 'players', '$q', function ($scope, leaderboard, players, $q) {
    'use strict';

    var fetchLeaderboard = function() {
      return leaderboard.query().$promise;
    };
    var fetchPlayer = function(id) {
      return players.get({id: id}).$promise.then(function(player) {
        return {id: id, name: player.name};
      });
    };

    fetchLeaderboard().then(function(leaderboard) {
      $scope.leaderboard = leaderboard;
      return leaderboard.map(function(l) {
        return fetchPlayer(l.id);
      });
    }).then(function(players) {
      return $q.all(players);
    }).then(function(players) {
      $scope.players = players;
    });
  }]);
