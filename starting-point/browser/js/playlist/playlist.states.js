'use strict'
juke.config(function ($stateProvider) {
	$stateProvider.state('newPlaylist', {
		url: '/playlists/new',
		templateUrl: '/js/playlist/templates/addPlaylist.html',
		controller: 'PlaylistCtrl'
	});

	$stateProvider.state('playlist', {
		url: '/playlist/:playlistId',
		templateUrl: '/js/playlist/templates/playlist.html',
		controller: 'SinglePlaylistCtrl',
		resolve: {
	      thePlaylist: function (PlaylistFactory, $stateParams) {
	        return PlaylistFactory.fetchById($stateParams.playlistId);
	      },
	      theSongs: function(SongFactory) {
	      	// console.log("test!!!!")
	      	return SongFactory.fetchAll()
	      }
		}
	});
});