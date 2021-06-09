class Api::AlbumsController < ApplicationController
    def show
        @album = Album.find_by(id: params[:id])
        @songs = @album.songs
        render '/api/albums/show.html.erb'
    end
end
