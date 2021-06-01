# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    attr_reader :password

    validates :password_digest, presence: true
    validates :username, :email, presence: true, uniqueness: true
    validates :password, length: {minimum: 6}, allow_nil: true
    
    after_initialize :ensure_session_token


    def self.find_by_credentials(user_info, password) 
        user = User.find_by(username: user_info)
        user = User.find_by(email: user_info) unless user
        
        if user && user.is_password?(password)
            user
        else
            nil
        end
    end

    def password=(password)
        self.password_digest = BCrypt::Password.create(password)
        @password = password
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token
        self.session_token = SecureRandom::urlsafe_base64
        self.save!
        self.session_token
    end

    def ensure_session_token 
        self.session_token ||= SecureRandom::urlsafe_base64
    end
end
