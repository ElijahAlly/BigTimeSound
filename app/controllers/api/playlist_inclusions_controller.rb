class Api::PlaylistInclusionsController < ApplicationController
    before_action :require_login
    
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
end
