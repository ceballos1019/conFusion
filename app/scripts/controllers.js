'use strict';

angular.module('confusionApp')
.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

  $scope.tab = 1;
  $scope.filtText = '';
  $scope.showDetails = false;

  $scope.dishes = menuFactory.getDishes();

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
    mychannel : "",
    firstName : "",
    lastName : "",
    agree : false,
    email: ""
  };

  var channels = [
    {value : "tel", label : "Tel."},
    {value : "Email", label: "Email"}
  ];
  $scope.channels = channels;
  $scope.invalidChannelSelection = false;

}])

.controller('FeedbackController', ['$scope', function($scope) {
  $scope.sendFeedback = function() {
    if($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
      $scope.invalidChannelSelection = true;
      console.log('incorrect');
    } else {
      $scope.invalidChannelSelection = false;
      $scope.feedback = {
        mychannel : "",
        firstName : "",
        lastName : "",
        agree : false,
        email: ""
      };
      $scope.feedback.mychannel = "";
      $scope.feedbackForm.$setPristine();
      console.log($scope.feedback);
    }
  };
}])

.controller('DishDetailController', ['$scope', '$routeParams', 'menuService', function($scope, $routeParams, menuService) {

  var dish = menuService.getDish(parseInt($routeParams.id, 10));
  $scope.dish = dish;
  $scope.sortType = "";

}])

.controller('DishCommentController', ['$scope', function($scope) {

  $scope.comment = {
    rating: 5,
    comment : "",
    author : "",
    date : ""
  };

  $scope.submitComment = function () {

    //Step 2: This is how you record the date
    $scope.comment.date = new Date().toISOString();

    // Step 3: Push your comment into the dish's comment array
    $scope.dish.comments.push($scope.comment);

    //Step 4: reset your form to pristine
    $scope.commentForm.$setPristine();
    //Step 5: reset your JavaScript object that holds your comment
    $scope.comment = {
      rating: 5,
      comment : "",
      author : "",
      date : ""
    };
  };
}])
;