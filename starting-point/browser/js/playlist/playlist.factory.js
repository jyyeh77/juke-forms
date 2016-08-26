juke.factory('PlaylistFactory', function ($http, SongFactory) {

	var PlaylistFactory = {};
	var cachedPlaylists = [];
	var cachedSongs = [];
	// var currentId = null;

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

	PlaylistFactory.fetchById = function(id) {
		return $http.get('/api/playlists/' + id)
		.then(function(res){
			res.data.songs.forEach(function(song){
				song = SongFactory.convert(song)
			});
			angular.copy(res.data.songs, cachedSongs)
			return cachedSongs;
		})
	}


	PlaylistFactory.addSong = function(playlistId, song) {
		return $http.post('/api/playlists/'+ playlistId +'/songs', song)
		.then(function(res){
			var newSong = res.data;
			cachedSongs.push(newSong)
			return newSong;
		})

	}



	// PlaylistFactory.getCurrentId = function() {
	// 	console.log(currentId);
	// 	return currentId;
	// }


	return PlaylistFactory;

});