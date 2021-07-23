class Api::LikesController < ApplicationController
    before_action :require_login

    def index
        @likes = Like.order(created_at: :desc)
        @songs = [];
        @likes.each do |like|
            if like.user_id.to_s == params[:user_id]
                song = Song.find_by(id: like.song_id)
                @songs << song
            end
        end

        render :index
    end

    def create
        @like = Like.new(user_id: params[:user_id], song_id: params[:song_id])

        if @like.save
            @likes = Like.order(created_at: :desc)
            @songs = [];
            @likes.each do |like|
                if like.user_id.to_s == params[:user_id]
                    song = Song.find_by(id: like.song_id)
                    @songs << song
                end
            end
            render :index
        else
            render json: @like.errors.full_messages, status: 401
        end
    end

    def destroy
        @like = Like.find_by(id: params[:id])
        @like.destroy

        @likes = Like.order(created_at: :desc)
        @songs = [];
        @likes.each do |like|
            if like.user_id.to_s == params[:user_id]
                song = Song.find_by(id: like.song_id)
                @songs << song
            end
        end

        render :index
    end
end
