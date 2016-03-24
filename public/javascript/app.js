var list = angular.module('list', []);

//capitalize your controllers - by convention should be ListCtrl
//and frankly should probably be ListsCtrl because this is a collection of List models.. again model name should probably have been Item, then ItemsCtrl sould make more sense
list.controller('listCtrl', function($scope, $http) {

  $scope.list = [];

  var loadList = function() {
    $http.get('/api')
      .then(function(list) {
        $scope.list = list.data;//why not do sorting on the server? get it sorted from the beginning?
        $scope.list.sort(function(a, b) {
          if (a.priority > b.priority) {
            return 1;
          }
          if (a.priority < b.priority) {
            return -1;
          }
        });
      })
      .catch(function(err) {
        $scope.error = err;
      });
  };

  var swap = function(item1, item2, dir) {

    var p1 = item1.priority;
    var p2 = item2.priority;

    if (p1 <= p2 && dir === -1) {
      p1 = p2 - 1;
    }
    if (p1 > p2 && dir === 1) {
      p1 = p2 + 1;
    }
    // 22, 23, 24

    //these can be run simultaneously-- see solution which uses $q.all
    $http.put('/api/' + item1._id, { "priority": p2 })
      .then(function() {
        $http.put('/api/' + item2._id, { "priority": p1 });
      })
      .then(function() {
        loadList();
      });

  };

  $scope.saveData = function() {
    $http.post('/api', $scope.form)
      .then(function(saved) {
        $scope.list.push(saved.data);
      })
      .catch(function(err) {
        $scope.error = "Could not save data";
      });
  };

  $scope.removeItem = function(id) {
    $http.delete('/api/' + id)
      .then(function(item) {
        loadList();
      })
      .catch(function(err) {
        $scope.error = "Could not remove item";
      });
  };

  $scope.moveUp = function(item, idx) {
    var prev = $scope.list[idx - 1];
    swap(item, prev, -1);
  };

  $scope.moveDown = function(item, idx) {
    var next = $scope.list[idx + 1];
    swap(item, next, 1);
  };

  loadList();
});

//your not using this- and if you were ItemForm
list.controller('itemForm', function($scope, $http) {
  $scope.form = {};

});
