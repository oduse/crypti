require('angular');

angular.module('webApp').controller("loadingController", ["$scope", "$http", "$interval", "$window", "peerFactory", function ($scope, $http, $interval, $window, peerFactory) {
    $scope.height = null;

    $scope.getHeight = function () {
        $http.get(peerFactory.getUrl() + "/api/loader/status")
            .then(function (resp) {
                if (resp.data.success) {
                    if (!resp.data.loaded) {
                        $scope.height = resp.data.now;
                        $scope.blocksCount = resp.data.blocksCount;
                    } else {
                        $window.location.href = '/';
                    }
                }
            });
    }

    $scope.getHeight();

    $scope.heightInterval = $interval(function () {
        $scope.getHeight();
    }, 2000);
}]);