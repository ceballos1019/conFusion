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

    this.getPromotions = function() {
      return $resource(baseURL + "promotions/:id", null, {'update' : {method : 'PUT'}});
    };
  }])

  .factory('corporateFactory', ['$http', '$resource', 'baseURL', function($http, $resource, baseURL) {

    var corpfac = {};

    // Implement two functions, one named getLeaders,
    // the other named getLeader(index)
    // Remember this is a factory not a service

    corpfac.getLeaders = function() {
      return $resource(baseURL + "leadership/:id", null, {'update' : {method : 'PUT'}});
    };

    corpfac.getLeader = function(index) {
      return $http.get(baseURL + "leadership/" + index);
    };

    return corpfac;

  }])

  .service('feedbackService', ['$resource', 'baseURL', function($resource, baseURL) {
    this.createFeedback = function() {
      return $resource(baseURL + 'feedback', null);
    };
  }]);
