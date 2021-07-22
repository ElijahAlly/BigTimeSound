class Api::LikesController < ApplicationController
    before_action :require_login

    def index
        @likes = Like.all
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
        @like = Like.new(like_params)

        if @like.save
            render :index
        else
            render json: @like.errors.full_messages, status: 401
        end
    end

    def destroy
        @like = Like.find_by(id: params[:id])
        @like.destroy
        @likes = Like.all
        render :index
    end

    private

    def like_params 
        params.require(:playlist).permit(:user_id, :song_id)
    end
end
