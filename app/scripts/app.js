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
      { name: 'Blue', length: 163.38, audioUrl: '/music/placeholders/blue' },
      { name: 'Green', length: 105.66 , audioUrl: '/music/placeholders/green' },
      { name: 'Red', length: 270.14, audioUrl: '/music/placeholders/red' },
      { name: 'Pink', length: 154.81, audioUrl: '/music/placeholders/pink' },
      { name: 'Magenta', length: 375.92, audioUrl: '/music/placeholders/magenta' }
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

   $scope.volumeClass = function() {
     return {
       'fa-volume-off': SongPlayer.volume == 0,
       'fa-volume-down': SongPlayer.volume <= 70 && SongPlayer.volume > 0,
       'fa-volume-up': SongPlayer.volume > 70,
     }
   }

   $scope.toggleMute = function() {
      if (SongPlayer.mute) { // turn volume back on
        SongPlayer.mute = false;
        SongPlayer.setVolume(SongPlayer.prevVolume);
        
      } 
      else {
        SongPlayer.prevVolume = SongPlayer.volume;
        SongPlayer.mute = true;
        SongPlayer.setVolume (0);
      }
   }

   SongPlayer.onTimeUpdate(function(event, time){
     $scope.$apply(function(){
       $scope.playTime = time;
     });
   }); // onTimeUpdate
 }]); // PlayerBar controller

// ************** NG SERVICES **************

blocJams.service('SongPlayer', ['$rootScope', function($rootScope) {
   var currentSoundFile = null;
   var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
   };
 
  return {
    currentSong: null,
    currentAlbum: null,
    playing: false,
    volume: 90,
    prevVolume: 90,
    mute: false,

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
    seek: function(time) {
         // Checks to make sure that a sound file is playing before seeking.
         console.log('In SongPlayer.seek');
         if(currentSoundFile) {
           // Uses a Buzz method to set the time of song.
           currentSoundFile.setTime(time);
         }
    },
    onTimeUpdate: function(callback) {
        return $rootScope.$on('sound:timeupdate', callback);
    },
    setVolume: function(volume) {
      if(currentSoundFile){
        currentSoundFile.setVolume(volume);
      }
      this.volume = volume;
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

      currentSoundFile.setVolume(this.volume);
      
      currentSoundFile.bind('timeupdate', function(e) {
        $rootScope.$broadcast('sound:timeupdate', this.getTime());
      });

      this.play();
    } // setSong
  } // return
}]);

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

blocJams.directive('slider', ['$document', function($document) {
  // Returns a number between 0 and 1 to determine where the mouse event happened along the slider bar.
  var calculateSliderPercentFromMouseEvent = function($slider, event) {
     var offsetX =  event.pageX - $slider.offset().left; // Distance from left
     var sliderWidth = $slider.width(); // Width of slider
     var offsetXPercent = (offsetX  / sliderWidth);
     offsetXPercent = Math.max(0, offsetXPercent);
     offsetXPercent = Math.min(1, offsetXPercent);
     return offsetXPercent;
  } // calculateSliderPercentFromMouseEvent

  var numberFromValue = function(value, defaultValue) {
     if (typeof value === 'number') {
       return value;
     } 
     if(typeof value === 'undefined') {
       return defaultValue;
     }
     if(typeof value === 'string') {
       return Number(value);
     }
   } // numberFromValue
 
  return {
    templateUrl: '/templates/directives/slider.html', 
    replace: true,
    restrict: 'E',
    scope: {
      onChange: '&'
    },
    link: function(scope, element, attributes) {
      // These values represent the progress into the song/volume bar, and its max value.
      // For now, we're supplying arbitrary initial and max values.
      scope.value = 0;
      scope.max = 100;
      var $seekBar = $(element);

      attributes.$observe('value', function(newValue) {
        scope.value = numberFromValue(newValue, 0);
      });
 
      attributes.$observe('max', function(newValue) {
        scope.max = numberFromValue(newValue, 100) || 100;
      });

      var percentString = function () {
         var value = scope.value || 0;
         var max = scope.max || 100;
         percent = value / max * 100;
         return percent + "%";
      } // percentString

      scope.fillStyle = function() {
         return {width: percentString()};
      } // fillStyle

      scope.thumbStyle = function() {
         return {left: percentString()};
      } // thubmStyle

      scope.onClickSlider = function(event) {
         var percent = calculateSliderPercentFromMouseEvent($seekBar, event);
         scope.value = percent * scope.max;
         notifyCallback(scope.value);
      } // onClickSlider

      scope.trackThumb = function() {
         $document.bind('mousemove.thumb', function(event){
           var percent = calculateSliderPercentFromMouseEvent($seekBar, event);
           scope.$apply(function(){
             scope.value = percent * scope.max;
             notifyCallback(scope.value);
           });
          }); // document.bind mousemove
 
         //cleanup
         $document.bind('mouseup.thumb', function(){
           $document.unbind('mousemove.thumb');
           $document.unbind('mouseup.thumb');
         }); // document.bind mouseup
      } // scope.trackThumb

      var notifyCallback = function(newValue) {
         if(typeof scope.onChange === 'function') {
           scope.onChange({value: newValue});
         }
      } //notifyCallback

    } // link: function()
  } // return {
}]); // slider directive

// ************** NG FILTERS **************

blocJams.filter('timecode', function(){
   return function(seconds) {
     seconds = Number.parseFloat(seconds);
 
     // Returned when no time is provided.
     if (Number.isNaN(seconds)) {
       return '-:--';
     }
 
     // make it a whole number
     var wholeSeconds = Math.floor(seconds);
 
     var minutes = Math.floor(wholeSeconds / 60);
 
     remainingSeconds = wholeSeconds % 60;
 
     var output = minutes + ':';
 
     // zero pad seconds, so 9 seconds should be :09
     if (remainingSeconds < 10) {
       output += '0';
     }
 
     output += remainingSeconds;
 
     return output;
   }
 }) //timecode filter

