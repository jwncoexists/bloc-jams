//require("./landing");
//require("./vendors");
//require("./venues");
//require("./style");
//require("./color");
//require("./planning");
//require("./nuptials");
//require("./events");
//require("./profile");


// import the ui-router
sdWedding = angular.module('SanDiegoWedding', ['ui.router']);

// configure ui-router with providers
sdWedding.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
   
   // specify paths without hashbang
   $locationProvider.html5Mode(true);

   $stateProvider.state('landing', {
     url: '/',
     views: {
        "main@": {
           controller: 'Landing.controller',
           templateUrl: '/templates/landing.html'
        }
      }
   });
   $stateProvider.state('vendors', {
     url: '/vendors',
     views: {
        "main@": {
           controller: 'Vendors.controller',
           templateUrl: '/templates/vendors.html'
        }
      }
   });
   $stateProvider.state('venues', {
     url: '/venues',
     views: {
        "main@": { templateUrl: '/templates/venues.html',
                   controller: 'Venues.controller' }
      }
   });
   $stateProvider.state('beauty', {
     url: '/beauty',
     views: {
        "main@": { templateUrl: '/templates/beauty.html',
                   controller: 'Beauty.controller' }
      }
   });
   $stateProvider.state('florists', {
     url: '/florists',
     views: {
        "main@": { templateUrl: '/templates/florists.html',
                   controller: 'Florists.controller' }
      }
   });
   $stateProvider.state('photographers', {
     url: '/photographers',
     views: {
        "main@": { templateUrl: '/templates/photographers.html',
                   controller: 'Photographers.controller' }
      }
   });
   $stateProvider.state('video-artists', {
     url: '/video-artists',
     views: {
        "main@": { templateUrl: '/templates/video-artists.html',
                   controller: 'VideoArtists.controller' }
      }
   });

 }]);
 
// ************** NG CONTROLLERS **************

 sdWedding.controller('Landing.controller', ['$scope', function($scope) {

  // shuffle an array of objects
  function shuffle(o){ 
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };

  console.log('In Landing Controller');
  $scope.landingPhotos = [
    '/images/vendors.png',
    '/images/pinoftheday.png',
    '/images/fashionforecast.png',
    '/images/featuredwedding.png',
    '/images/votetopics.png',
    '/images/blog.png',
    '/images/nuptials.png',
    '/images/tips.png',
    '/images/colors.png',
    '/images/venues.png',
    '/images/dresses.png',
    '/images/honeymoon.png'
  ];
  
}]);

sdWedding.controller('Vendors.controller', ['$scope', function($scope) {

 }]);

sdWedding.controller('Venues.controller', ['$scope', function($scope) {
   

 }]);

sdWedding.controller('Beauty.controller', ['$scope', function($scope) {

 }]);

sdWedding.controller('Florists.controller', ['$scope', function($scope) {

 }]);

sdWedding.controller('Photographers.controller', ['$scope', function($scope) {

 }]);

sdWedding.controller('VideoArtists.controller', ['$scope', function($scope) {

 }]);

sdWedding.controller('DropMenu.controller', ['$scope', function($scope) {

  $scope.showDropMenu = false;

  $scope.toggleDropMenu = function () {
    $scope.showDropMenu = !($scope.showDropMenu);
  }
 
}]);




// ************** NG SERVICES **************




