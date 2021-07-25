class Api::PlaylistInclusionsController < ApplicationController
    before_action :require_login

    def create
        @playlist_inclusion = PlaylistInclusion.new(song_id: params[:songId].to_i, playlist_id: params[:playlistId].to_i)
        if @playlist_inclusion.save
          @playlist_inclusions_list = PlaylistInclusion.all
        @playlist_inclusions_list.to_a
        @playlistIds = {};
        @playlist_inclusions_list.each do |inclusion|
            if @playlistIds[inclusion.playlist_id] # playlist is already in playlistIds
                @playlistIds[inclusion.playlist_id] << inclusion.song_id
            else
                @playlistIds[inclusion.playlist_id] = [inclusion.song_id]
            end
        end
        @playlist_inclusions = {}
        @playlist_inclusions_list.each do |inclusion| 
            if @playlist_inclusions[inclusion.playlist_id]
                @playlist_inclusions[inclusion.playlist_id][inclusion.song_id] = inclusion
            else 
                @playlist_inclusions[inclusion.playlist_id] = {}
                @playlist_inclusions[inclusion.playlist_id][inclusion.song_id] = inclusion
            end
        end
        render json: {playlistIds: @playlistIds, playlist_inclusions: @playlist_inclusions}
        else
            render json: ['could not add song to playlist']
        end
    end
    
    def index
        @playlist_inclusions_list = PlaylistInclusion.all
        @playlist_inclusions_list.to_a
        @playlistIds = {};
        @playlist_inclusions_list.each do |inclusion|
            if @playlistIds[inclusion.playlist_id] # playlist is already in playlistIds
                @playlistIds[inclusion.playlist_id] << inclusion.song_id
            else
                @playlistIds[inclusion.playlist_id] = [inclusion.song_id]
            end
        end
        @playlist_inclusions = {}
        @playlist_inclusions_list.each do |inclusion| 
            if @playlist_inclusions[inclusion.playlist_id]
                @playlist_inclusions[inclusion.playlist_id][inclusion.song_id] = inclusion
            else 
                @playlist_inclusions[inclusion.playlist_id] = {}
                @playlist_inclusions[inclusion.playlist_id][inclusion.song_id] = inclusion
            end
        end
        render json: {playlistIds: @playlistIds, playlist_inclusions: @playlist_inclusions}
    end

    def destroy
        @playlist_inclusion = PlaylistInclusion.find_by(id: params[:id])
        @playlist_inclusion.destroy
        
        @playlist_inclusions_list = PlaylistInclusion.all
        @playlist_inclusions_list.to_a
        @playlistIds = {};
        @playlist_inclusions_list.each do |inclusion|
            if @playlistIds[inclusion.playlist_id] # playlist is already in playlistIds
                @playlistIds[inclusion.playlist_id] << inclusion.song_id
            else
                @playlistIds[inclusion.playlist_id] = [inclusion.song_id]
            end
        end
        @playlist_inclusions = {}
        @playlist_inclusions_list.each do |inclusion| 
            if @playlist_inclusions[inclusion.playlist_id]
                @playlist_inclusions[inclusion.playlist_id][inclusion.song_id] = inclusion
            else 
                @playlist_inclusions[inclusion.playlist_id] = {}
                @playlist_inclusions[inclusion.playlist_id][inclusion.song_id] = inclusion
            end
        end
        render json: {playlistIds: @playlistIds, playlist_inclusions: @playlist_inclusions}
    end
end
