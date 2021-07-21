class Api::AlbumsController < ApplicationController
    def index
        albums = Album.all
        @albums = albums.shuffle
        render :index
    end
end
