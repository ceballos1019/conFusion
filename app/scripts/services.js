'use strict';

angular.module('confusionApp')

  .constant('baseURL', 'http://localhost:3000/')

  /*Using factory and $http*/
  .factory('menuFactory', ['$http', 'baseURL', function($http, baseURL) {

    var menufac = {};

    menufac.getDishes = function() {
      return $http.get(baseURL + "dishes");
    };

    menufac.getDish = function(index) {
      return $http.get(baseURL + "dishes/" + index);
    };

    menufac.getPromotion = function(index) {
      return $http.get(baseURL + "promotions/" + index);
    };

    return menufac;
  }])

  /*Using service and $resource module*/
  .service('menuService', ['$resource', 'baseURL', function($resource, baseURL) {

    /*Only need this method to get all dishes or a specific one*/
    this.getDishes = function() {
      return $resource(baseURL + "dishes/:id", null, {'update' : {method : 'PUT'}});
    };

    var promotions = [
    {
      "id": 0,
      "name": "Weekend Grand Buffet",
      "image": "images/buffet.png",
      "label": "New",
      "price": "19.99",
      "description": "Featuring mouthwatering combinations with a choice of five different salads, six enticing appetizers, six main entrees and five choicest desserts. Free flowing bubbly and soft drinks. All for just $19.99 per person "
    }
  ];

    this.getPromotion = function(index) {
      return promotions[index];
    };
  }])

  .factory('corporateFactory', ['$http', 'baseURL', function($http, baseURL) {

    var corpfac = {};

    // Implement two functions, one named getLeaders,
    // the other named getLeader(index)
    // Remember this is a factory not a service

    corpfac.getLeaders = function() {
      return $http.get(baseURL + "leadership");
    };
    corpfac.getLeader = function(index) {
      return $http.get(baseURL + "leadership/" + index);
    };

    return corpfac;

  }]);
