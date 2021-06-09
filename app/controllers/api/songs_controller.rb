class Api::SongsController < ApplicationController
    def show
        @song = Song.find_by(id: params[:id])
        render '/api/songs/show.html.erb'
    end
end
