juke.factory('PlaylistFactory', function ($http) {

	var PlaylistFactory = {};
	var cachedPlaylists = [];

	PlaylistFactory.create = function (data) {
		return $http.post('/api/playlists', data)
			.then(function (response) {
				var playlist = response.data;
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
	return PlaylistFactory;

});