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
		// /$scope.currentId = PlaylistFactory.getCurrentId()
		
		

		$scope.playlistController = null;
		$scope.playlistForm.playlist.$setPristine();

	}
});

juke.controller('SinglePlaylistCtrl', function($scope, PlaylistFactory, thePlaylist){
	$scope.playlist = thePlaylist;

})
