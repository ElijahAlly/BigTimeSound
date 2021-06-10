class Api::SongsController < ApplicationController
    before_action :require_login

    def show
        @song = Song.find_by(id: params[:id])
        render :show
    end

    def index
        @songs = Song.all
        render :index
    end
end
