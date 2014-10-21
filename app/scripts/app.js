//require("./landing");
//require("./collection");
//require("./album");
//require("./profile");

 angular.module('BlocJams', []).controller('Landing.controller', ['$scope', function($scope) {

  $scope.subText = "Turn the music up!";

  // add an '!' when the subtext is clicked
  $scope.subTextClicked = function() {
    $scope.subText += '!';
  };

  function shuffle(o){ 
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };
  
  $scope.hdrText = "Bloc Jams";
  
  // shuffle the images when the header is clicked
  $scope.hdrTextClicked = function() {
    console.log('hdrText clicked');
    shuffle($scope.albumURLs);
  };

   $scope.albumURLs = [
     '/images/album-placeholders/album-1.jpg',
     '/images/album-placeholders/album-2.jpg',
     '/images/album-placeholders/album-3.jpg',
     '/images/album-placeholders/album-4.jpg',
     '/images/album-placeholders/album-5.jpg',
     '/images/album-placeholders/album-6.jpg',
     '/images/album-placeholders/album-7.jpg',
     '/images/album-placeholders/album-8.jpg',
     '/images/album-placeholders/album-9.jpg',
   ];

 }]);