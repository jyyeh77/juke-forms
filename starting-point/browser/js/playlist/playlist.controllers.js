'use strict';
/* PLAYLIST CONTROLLER */

juke.controller('PlaylistCtrl', function ($scope, PlaylistFactory, $state) {
	$scope.assignPlaylist = function(){
		$scope.newPlaylist = {
			name: $scope.playlistController
		};
		PlaylistFactory.create($scope.newPlaylist)
		.then(function(playlist){
			$scope.currentId = playlist.id;
			console.log('$scope: ',$scope.currentId)
			$state.go('playlist', {playlistId: $scope.currentId})
		});
		
		

		$scope.playlistController = null;
		$scope.playlistForm.playlist.$setPristine();

	}
});

juke.controller('SinglePlaylistCtrl', function($scope, PlaylistFactory, thePlaylist, theSongs, SongFactory, PlayerFactory){
	$scope.playlist = thePlaylist;
	$scope.songs = theSongs;

	$scope.add = function(song){
		PlaylistFactory.addSong($scope.playlist.id, song)
			.then(function(addedSong){
				$scope.songController = null;
				$scope.addSongsForm.song.$setPristine();
			})
	}

	$scope.toggle = function (song) {
		if (song !== PlayerFactory.getCurrentSong()) {
			PlayerFactory.start(song, $scope.playlist.songs);
		} else if ( PlayerFactory.isPlaying() ) {
			PlayerFactory.pause();
		} else {
			PlayerFactory.resume();
		}
	};

	$scope.getCurrentSong = function () {
		return PlayerFactory.getCurrentSong();
	};

	$scope.isPlaying = function (song) {
		return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
	};

})
