'use strict';

angular.module('confusionApp')

  .controller('MenuController', ['$scope', 'menuService', function($scope, menuService) {

    /*Variables*/
    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showMenu = false;
    $scope.message = "Loading...";

    //query() returns the entire array from that particular api
    menuService.getDishes().query(
      function(response) {
        $scope.dishes = response;
        $scope.showMenu = true;
      },
      function(response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
      }
    );

    /*Select a specific tab*/
    $scope.select = function(setTab) {
      $scope.tab = setTab;

      switch (this.tab) {
        case 1:
          $scope.filtText = "";
          break;
        case 2:
          $scope.filtText = "appetizer";
          break;
        case 3:
          $scope.filtText = "mains";
          break;
        case 4:
          $scope.filtText = "dessert";
      }
    };

    /* Check if a specific tab is the selected*/
    $scope.isSelected = function(checkTab) {
      return ($scope.tab === checkTab);
    };

    /* Toggle between show or not the details*/
    $scope.toggleDetails = function() {
      $scope.showDetails = !$scope.showDetails;
    };

  }])

  .controller('ContactController', ['$scope', function($scope) {
    $scope.feedback = {
      mychannel: "",
      firstName: "",
      lastName: "",
      agree: false,
      email: ""
    };

    var channels = [{
        value: "tel",
        label: "Tel."
      },
      {
        value: "Email",
        label: "Email"
      }
    ];
    $scope.channels = channels;
    $scope.invalidChannelSelection = false;

  }])

  .controller('FeedbackController', ['$scope', function($scope) {
    $scope.sendFeedback = function() {
      if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
        $scope.invalidChannelSelection = true;
        console.log('incorrect');
      } else {
        $scope.invalidChannelSelection = false;
        $scope.feedback = {
          mychannel: "",
          firstName: "",
          lastName: "",
          agree: false,
          email: ""
        };
        $scope.feedback.mychannel = "";
        $scope.feedbackForm.$setPristine();
        console.log($scope.feedback);
      }
    };
  }])

  /* Using ng-route module
  .controller('DishDetailController', ['$scope', '$routeParams', 'menuService', function($scope, $routeParams, menuService) {*/

  /*Using ui-router module*/
  .controller('DishDetailController', ['$scope', '$stateParams', 'menuService', function($scope, $stateParams, menuService) {

    $scope.showDish = false;
    $scope.message = "Loading...";
    menuService.getDishes().get({id : parseInt($stateParams.code, 10)}).$promise.then(
      function(response) {
        $scope.dish = response;
        $scope.showDish = true;
      },
      function(response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
      }
    );
    $scope.sortType = "";

  }])

  .controller('DishCommentController', ['$scope', 'menuService', function($scope, menuService) {

    $scope.comment = {
      rating: 5,
      comment: "",
      author: "",
      date: ""
    };

    $scope.submitComment = function() {

      //Step 2: This is how you record the date
      $scope.comment.date = new Date().toISOString();
      // Step 3: Push your comment into the dish's comment array
      $scope.dish.comments.push($scope.comment);
      menuService.getDishes().update({id:$scope.dish.id}, $scope.dish);

      //Step 4: reset your form to pristine
      $scope.commentForm.$setPristine();
      //Step 5: reset your JavaScript object that holds your comment
      $scope.comment = {
        rating: 5,
        comment: "",
        author: "",
        date: ""
      };
    };
  }])

  .controller('IndexController', ['$scope', 'menuService', 'corporateFactory',
    function($scope, menuService, corporateFactory) {
      /*Initialize local variables*/

      $scope.promotion = menuService.getPromotion(0);
      $scope.chef = {};
      $scope.showDish = false;
      $scope.message = "Loading...";

      menuService.getDishes().get({id : 0}).$promise.then(
        function(response) {
          $scope.dish = response;
          $scope.showDish = true;
        },
        function(response) {
          $scope.message = "Error: " + response.status + " " + response.statusText;
        }
      );

      corporateFactory.getLeader(3).then(
        function(response) {
          $scope.chef = response.data;
        }
      );
    }
  ])

  .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
    $scope.leaders = corporateFactory.getLeaders();
  }]);
