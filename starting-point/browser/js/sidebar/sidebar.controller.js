'use strict';

juke.controller('SidebarCtrl', function ($scope, PlaylistFactory) {

  // nothing to see here for now… state transitions happening with ui-sref!
	PlaylistFactory.fetchAll()
		.then(function (foundPlaylists) {
			$scope.playlists = foundPlaylists;
			console.log($scope.playlists);
		});
});
