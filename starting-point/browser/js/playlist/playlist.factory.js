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
			.then(mutateData)
		.then(function(playlist){
			playlist.songs.forEach(function(song){
				song = SongFactory.convert(song)
			});
			// cachedSongs = playlist.songs;
			angular.copy(playlist.songs, cachedSongs)
			playlist.songs = cachedSongs;
			console.log("Cached songs: ", playlist.songs);
			//playlist.songs !== cachedsongs
			return playlist;
		})

	}

	function mutateData(response){
		return response.data;
	}

	PlaylistFactory.addSong = function(playlistId, song) {
		return $http.post('/api/playlists/'+ playlistId +'/songs', song)
		.then(function(res){
			var newSong = res.data;
			newSong = SongFactory.convert(newSong);
			cachedSongs.push(newSong)
			return newSong;
		})
	}
	return PlaylistFactory;

});