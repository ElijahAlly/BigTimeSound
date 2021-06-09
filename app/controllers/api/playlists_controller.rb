class Api::PlaylistsController < ApplicationController
    before_action :require_login

    def create
        @playlist = Playlist.new(playlist_params)

        if @playlist.save
            render :show
        else
            render json: @playlist.errors.full_messages, status: 401
        end
    end


    def show
        @playlist = Playlist.find_by(id: params[:id])
        if @playlist
            render :show
        else 
            render json: ['Playlist Not Found'], status: 404
        end
    end

    def index
        @playlists = Playlist.all
        render :index
    end

    def update
        @playlist = Playlist.find_by(id: params[:id])

        if @playlist.update(playlist_params) 
            render :show
        else
            render json: @playlist.errors.full_messages, status: 401
        end
    end

    def destroy
        @playlist = Playlist.find_by(id: params[:id])
        @playlist.destroy
        render json: ['Playlist deleted'] 
    end

    private

    def playlist_params
        params.require(:playlist).permit(:user_id)
    end
end
