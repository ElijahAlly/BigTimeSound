class Api::SearchController < ApplicationController

  def index 
    @playlists = [];
    @artists = [];
    @albums = [];
    @songs = [];

    if params[:input].length > 0
      @playlists = Playlist.select("playlists.*").where("LOWER(playlists.name) LIKE ? ", "%#{params[:input].downcase}%").limit(5)

      @artists = Artist.select("artists.*").where("LOWER(artists.name) LIKE ? ", "%#{params[:input].downcase}%").limit(5)

      @albums = Album.select("albums.*").where("LOWER(albums.name) LIKE ? ", "%#{params[:input].downcase}%").limit(5)

      @songs = Song.select("songs.*").order(:title).where("LOWER(songs.title) LIKE ? ", "%#{params[:input].downcase}%").limit(4)
    end
  
    render :index
  end
end
