juke.factory('PlaylistFactory', function ($http) {

	var PlaylistFactory = {};
	var cachedPlaylists = [];
	// var currentId = null;

	PlaylistFactory.create = function (data) {
		return $http.post('/api/playlists', data)
			.then(function (response) {
				var playlist = response.data;
				currentId = playlist.id;
				cachedPlaylists.push(playlist);
				return playlist;
			});
	};

	PlaylistFactory.fetchAll = function(){
		return $http.get('/api/playlists')
			.then(function (res){
				// copies playlists in database upon refresh to cachedPlaylists, allows SidebarCtrl to display older playlists
				angular.copy(res.data, cachedPlaylists);
				return cachedPlaylists;
			})
	}

	PlaylistFactory.fetchById = function(id) {
		return $http.get('/api/playlists/' + id)
		.then(function(res){
			return res.data;
		})
	}

	// PlaylistFactory.getCurrentId = function() {
	// 	console.log(currentId);
	// 	return currentId;
	// }


	return PlaylistFactory;

});