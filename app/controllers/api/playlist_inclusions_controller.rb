class Api::PlaylistInclusionsController < ApplicationController
    before_action :require_login

    def create
        @playlist_inclusion = PlaylistInclusion.new(song_id: params[:songId].to_i, playlist_id: params[:playlistId].to_i)
        if @playlist_inclusion.save
           @playlist = Playlist.all
           render 'api/playlists/index'
        else
            render json: ['could not add song to playlist']
        end
    end
    
    def index
        @playlist_inclusions = PlaylistInclusion.all
        @playlist_inclusions.to_a
        @playlistIds = {};
        @playlist_inclusions.each do |inclusion|
            if @playlistIds[inclusion.playlist_id] # playlist is already in playlistIds
                @playlistIds[inclusion.playlist_id] << inclusion.song_id
            else
                @playlistIds[inclusion.playlist_id] = [inclusion.song_id]
            end
        end
        render json: @playlistIds
    end

    def destroy
        @playlist_inclusion = PlaylistInclusion.find_by(song_id: params[:song_id], playlist_id: params[:playlist_id])
        @playlist_inclusion.destroy
        @playlists = Playlist.all
        render 'api/playlists/index'
    end
end
