class Api::ArtistsController < ApplicationController
    def index
        artists = Artist.all
        @artists = artists.shuffle
        render :index
    end 
end
