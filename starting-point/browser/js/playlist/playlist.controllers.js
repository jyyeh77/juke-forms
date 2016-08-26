'use strict';
/* PLAYLIST CONTROLLER */

juke.controller('PlaylistCtrl', function ($scope, PlaylistFactory) {
	$scope.assignPlaylist = function(){
		$scope.newPlaylist = {
			name: $scope.playlistController
		};
		PlaylistFactory.create($scope.newPlaylist);
		$scope.playlistController = null;
		$scope.playlistForm.playlist.$setPristine();
	}
});
