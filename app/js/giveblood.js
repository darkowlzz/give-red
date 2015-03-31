var giveBlood = angular.module('giveBlood', [
                               'ngRoute', 'ngMaterial', 'ngMdIcons'
                               ]);

giveBlood.controller('MainCtrl', [
  '$scope', '$route', '$routeParams', '$location', '$mdMedia',
  function ($scope, $route, $routeParams, $location, $mdMedia) {
    $scope.go = function (path) {
      $location.url(path);
    };
  }
]);


giveBlood.controller('GiveBloodCtrl', [
  '$scope', '$routeParams', '$timeout', '$http',
  function ($scope, $routeParams, $timeout, $http) {
    $scope.description = 'This is the description part of the page. ' +
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat interdum felis sed interdum. Pellentesque ultrices est eget placerat tempor. Curabitur iaculis porttitor mauris. Sed dictum mattis est, sit amet tempor leo placerat id.';

    $scope.user = {};

    $scope.loading = false;
    $scope.submitted = false;
    $scope.error = false;

    /*
    $scope.isMobile = false;
    $scope.isDesktop = false;

    if ($mdMedia('gt-md')) {
      $scope.isDesktop = true;
    } else {
      $scope.isMobile = true;
    }
    */

    $scope.submit = function () {
      var result = validate($scope.user);

      if (result) {
        $scope.error = false;
        $scope.loading = true;

        $http.post('/submit', { data: $scope.user })
          .success(function (o) {
            $scope.submitted = true;
          })
          .error(function (data, status, headers, config) {
            console.log('Error in posting');
          });
      } else {
        $scope.error = true;
      }
    }

    function validate(data) {
      console.log('validating', data);
      var result = true;

      // FIXME: Perform better validation
      if (_.isEmpty(data.name) && _.isEmpty(data.phone) &&
          _.isEmpty(data.address) && _.isEmpty(data.group) &&
          _.isEmpty(data.quantity) && _.isEmpty(data.date)) {
        result = false;
      }

      return result;
    }
  }
]);


giveBlood.controller('EligibilityCtrl', [
  '$scope', '$routeParams', '$timeout',
  function ($scope, $routeParams, $timeout) {
    $scope.eligibilityNote = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat interdum felis sed interdum. Pellentesque ultrices est eget placerat tempor. Curabitur iaculis porttitor mauris. Sed dictum mattis est, sit amet tempor leo placerat id.';

    $scope.data = {};

    $scope.groups = [
      { question: 'Are you a diabetic or an asthmatic patient?',
        model: 'group1'
      },
      { question: 'Are you a heart patient?',
        model: 'group2'
      },
      { question: 'Are you under medication now?',
        model: 'group3'
      },
      { question: 'Have you ever had tuberculosis?',
        model: 'group4'
      }
    ];

    $scope.loading = false;
    $scope.submitted = false;
    $scope.error = false;
    $scope.result = false;

    $scope.submit = function () {
      var result = isEligible($scope.data);

      if (result == 'error') {
        $scope.error = true;
      } else {
        $scope.error = false;
        $scope.loading = true;

        $timeout(function () {
          console.log('timeout over!');
          $scope.submitted = true;
          $scope.result = result;
        }, 4000);
      }
    };

    function isEligible(data) {
      console.log('validating', data);
      var result = true;

      if (_.isEmpty(data.group1) && _.isEmpty(data.group2) &&
          _.isEmpty(data.group3) && _.isEmpty(data.group4)) {
        console.log('a group empty');
        result = 'error';
      }

      if (data.group2 == 'true') {
        result = false;
      }

      return result;
    }
  }
]);


giveBlood.controller('AboutCtrl', [
  '$scope', '$routeParams',
  function ($scope, $routeParams) {
    $scope.aboutContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat interdum felis sed interdum. Pellentesque ultrices est eget placerat tempor. Curabitur iaculis porttitor mauris. Sed dictum mattis est, sit amet tempor leo placerat id.';
  }
]);


giveBlood.config(['$mdThemingProvider', '$routeProvider',
  function($mdThemingProvider, $routeProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('red');

    $routeProvider
      .when('/', {
        templateUrl: 'form.html',
        controller: 'GiveBloodCtrl'
      })
      .when('/eligibility', {
        templateUrl: 'eligibility.html',
        controller: 'EligibilityCtrl'
      })
      .when('/about', {
        templateUrl: 'about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
}]);
