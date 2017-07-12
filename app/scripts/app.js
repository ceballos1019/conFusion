'use strict';
angular.module('confusionApp', [])
.controller('MenuController', ['$scope', function($scope) {

  $scope.tab = 1;
  $scope.filtText = '';
  $scope.showDetails = false;
  $scope.dishes = [{
    name: 'Uthapizza',
    image: 'images/uthapizza.png',
    category: 'mains',
    label: 'Hot',
    price: '4.99',
    description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
    comment: ''
  },
  {
    name: 'Zucchipakoda',
    image: 'images/zucchipakoda.png',
    category: 'appetizer',
    label: '',
    price: '1.99',
    description: 'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
    comment: ''
  },
  {
    name: 'Vadonut',
    image: 'images/vadonut.png',
    category: 'appetizer',
    label: 'New',
    price: '1.99',
    description: 'A quintessential ConFusion experience, is it a vada or is it a donut?',
    comment: ''
  },
  {
    name: 'ElaiCheese Cake',
    image: 'images/elaicheesecake.png',
    category: 'dessert',
    label: '',
    price: '2.99',
    description: 'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
    comment: ''
  }
];



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
;
