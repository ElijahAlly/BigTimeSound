class Api::SessionsController < ApplicationController
    before_action :require_login, only: [:destroy]

    def create
        if params[:user][:username] === ''
            search_by = params[:user][:email]
        else
            search_by = params[:user][:username]
        end

        @user = User.find_by_credentials(search_by, params[:user][:password])
        
        if @user.nil?
            render json: ['Wrong Username or Password!'], status: 401
        else
            login(@user)
            render 'api/users/show'
        end
    end

    def destroy
        logout
        render json: ['logout successful']
    end
end
