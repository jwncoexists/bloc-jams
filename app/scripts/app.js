//require("./landing");
//require("./collection");
//require("./album");
//require("./profile");

var albumPicasso = {
   name: 'The Colors',
   artist: 'Pablo Picasso',
   label: 'Cubism',
   year: '1881',
   albumArtUrl: '/images/album-placeholder.png',
   songs: [
       { name: 'Blue', length: '4:26', audioUrl: '/music/placeholders/blue' },
       { name: 'Green', length: '3:14', audioUrl: '/music/placeholders/green' },
       { name: 'Red', length: '5:01', audioUrl: '/music/placeholders/red' },
       { name: 'Pink', length: '3:21', audioUrl: '/music/placeholders/pink' },
       { name: 'Magenta', length: '2:15', audioUrl: '/music/placeholders/magenta' }
     ]
 };

// import the ui-router
blocJams = angular.module('BlocJams', ['ui.router']);

// configure ui-router with providers
blocJams.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
   
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
   $stateProvider.state('collection', {
     url: '/collection',
     views: {
        "main@": {
           controller: 'Collection.controller',
           templateUrl: '/templates/collection.html'
        },
        "playerBar@collection": { templateUrl: "templates/player_bar.html",
                        controller: 'PlayerBar.controller' }
      }
   });
   $stateProvider.state('album', {
     url: '/album',
     views: {
        "main@": { templateUrl: '/templates/album.html',
                   controller: 'Album.controller' },
        "playerBar@album": { templateUrl: "templates/player_bar.html",
                        controller: 'PlayerBar.controller' }
      }
   });
 }]);
 
// ************** NG CONTROLLERS **************

 blocJams.controller('Landing.controller', ['$scope', 'ConsoleLogger', function($scope, ConsoleLogger) {
  $scope.consoleLogger = ConsoleLogger;
  ConsoleLogger.log();
  $scope.subText = "Turn the music up!";

  // add an '!' when the subtext is clicked
  $scope.subTextClicked = function() {
    $scope.subText += '!';
  };

  // shuffle an array of objects
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

blocJams.controller('Collection.controller', ['$scope', 'SongPlayer', function($scope, SongPlayer) {

   $scope.albums = [];
   for (var i = 0; i < 33; i++) {
     $scope.albums.push(angular.copy(albumPicasso));
   }
 
   $scope.playAlbum = function(album){
     SongPlayer.setSong(album, album.songs[0]); // Targets first song in the array.
   }

 }]);

blocJams.controller('Album.controller', ['$scope', 'SongPlayer', 'ConsoleLogger', function($scope, SongPlayer, ConsoleLogger) {
   $scope.album = angular.copy(albumPicasso);

   var hoveredSong = null;
   

   $scope.onHoverSong = function(song) {
     hoveredSong = song;
   };
 
   $scope.offHoverSong = function(song) {
     hoveredSong = null;
   };

   $scope.getSongState = function(song) {
    if (song === SongPlayer.currentSong && SongPlayer.playing) {
       return 'playing';
     }
     else if (song === hoveredSong) {
       return 'hovered';
     }
     return 'default';
   };
 
   $scope.playSong = function(song) {
     SongPlayer.setSong($scope.album, song);
   };
 
   $scope.pauseSong = function(song) {
      SongPlayer.pause();
   };
 }]);

blocJams.controller('PlayerBar.controller', ['$scope', 'SongPlayer', 'ConsoleLogger', function($scope, SongPlayer, ConsoleLogger) {
   $scope.songPlayer = SongPlayer;
   $scope.consoleLogger = ConsoleLogger;
   ConsoleLogger.log();

 }]);

// ************** NG SERVICES **************

blocJams.service('SongPlayer', function() {
   var currentSoundFile = null;
   var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
   };
 
  return {
   currentSong: null,
   currentAlbum: null,
   playing: false,

   play: function() {
     this.playing = true;
     currentSoundFile.play();
   },
   pause: function() {
     this.playing = false;
     currentSoundFile.pause();
   },
   next: function() {
     var currentTrackIndex = trackIndex(this.currentAlbum, this.currentSong);
     currentTrackIndex++;
     if (currentTrackIndex >= this.currentAlbum.songs.length) {
       currentTrackIndex = 0;
     }
     var song = this.currentAlbum.songs[currentTrackIndex];
     this.setSong(this.currentAlbum, song);
   },
   previous: function() {
     var currentTrackIndex = trackIndex(this.currentAlbum, this.currentSong);
     currentTrackIndex--;
     if (currentTrackIndex < 0) {
       currentTrackIndex = this.currentAlbum.songs.length - 1;
     }

     var song = this.currentAlbum.songs[currentTrackIndex];
     this.setSong(this.currentAlbum, song);
   },
   setSong: function(album, song) {
      if (currentSoundFile) {
        currentSoundFile.stop();
      }
      this.currentAlbum = album;
      this.currentSong = song;
      currentSoundFile = new buzz.sound(song.audioUrl, {
      formats: [ "mp3" ],
      preload: true
    });
 
    this.play();
   }
  };
});


blocJams.service('ConsoleLogger', function() {
  return {
   logString:  "Hello World!",
   log: function(str) {
      if (str) { 
        this.logString = str; 
      }
      console.log(this.logString);
   }
  };
});

// ************** NG DIRECTIVES **************

blocJams.directive('slider', function(){

  var updateSeekPercentage = function($seekBar, event) {
   var barWidth = $seekBar.width();
   var offsetX =  event.pageX - $seekBar.offset().left;

   var offsetXPercent = (offsetX  / $seekBar.width()) * 100;
   offsetXPercent = Math.max(0, offsetXPercent);
   offsetXPercent = Math.min(100, offsetXPercent);

   var percentageString = offsetXPercent + '%';
   $seekBar.find('.fill').width(percentageString);
   $seekBar.find('.thumb').css({left: percentageString});
  }

  return {
    templateUrl: '/templates/directives/slider.html', 
    replace: true,
    restrict: 'E',
    link: function(scope, element, attributes) {
      
      var $seekBar = $(element);
 
      $seekBar.click(function(event) {
        updateSeekPercentage($seekBar, event);
      });
 
      $seekBar.find('.thumb').mousedown(function(event){
        $seekBar.addClass('no-animate');
 
        $(document).bind('mousemove.thumb', function(event){
          updateSeekPercentage($seekBar, event);
        });
 
        //cleanup
        $(document).bind('mouseup.thumb', function(){
          $seekBar.removeClass('no-animate');
          $(document).unbind('mousemove.thumb');
          $(document).unbind('mouseup.thumb');
        });
 
      });
    }
   };
 });

blocJams.directive('clickMe', function(){
  return {
    restrict: 'E',
    link: function(scope, element) {
      $(element).click(function() {
        alert( element + ' has been clicked.');
      });
    }
  };
});

blocJams.directive('countHoverTime', function(){
  return {
    restrict: 'A',
    link: function(scope, element) {
      var hoverTime = 0;
      var interval;
      $(element).mouseenter(function() {
          console.log('Hover in');
          interval = window.setInterval(function() {
          ++hoverTime;
        }, 1000);
      }); // mouseenter
      $(element).mouseleave(function() {
           window.clearInterval(interval);
           console.log('Hover time: ' + hoverTime);
      }); //mouseleave
    } // link
  }; // return
});

blocJams.directive('classify', function(){
  return {
    restrict: 'EAC',
    link: function(scope, element, attributes) {
        var text = $(element).text();
        $(element).addClass(text);
    }
  };
});
