# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'open-uri'

# demo login
demo_user = User.create!(username: 'Demo User', email: 'demo@demouser.com', password: 'secretPasswordabcdefg0000')


# Artists
the_Weeknd = Artist.create!(name: 'The Weeknd')


# Albums
beauty_Behind_The_Madness = Album.create!(name: 'Beauty Behind The Madness', artist_id: the_Weeknd.id)

# Album Covers
beauty_Behind_The_Madness_COVER = open('https://active-storage-big-time-sound-dev.s3.amazonaws.com/The_Weeknd_Beauty_Behind_the_Madness.png')

# Attaching albums and album covers
beauty_Behind_The_Madness.cover.attach(io: beauty_Behind_The_Madness_COVER, filename: 'The_Weeknd_Beauty_Behind_the_Madness.png')


# Songs in the album...
# Beauty_Behind_The_Madness
the_Hills = Song.create!(title: 'The Hills', artist_id: the_Weeknd.id, album_id: beauty_Behind_The_Madness.id)
cant_Feel_My_Face = Song.create!(title: 'Can\'t Feel My Face', artist_id: the_Weeknd.id, album_id: beauty_Behind_The_Madness.id)
in_The_Night = Song.create!(title: 'In The Night', artist_id: the_Weeknd.id, album_id: beauty_Behind_The_Madness.id)


# Likes
the_Hills_Like = Like.create!(user_id: demo_user.id, song_id: the_Hills.id)
cant_Feel_My_Face_Like = Like.create!(user_id: demo_user.id, song_id: cant_Feel_My_Face.id)
in_The_Night_Like = Like.create!(user_id: demo_user.id, song_id: in_The_Night.id)

# Playlists
exPlaylist = Playlist.create!(name: 'exPlaylist', user_id: demo_user.id)

# Playlist Inclusions
pi_1 = PlaylistInclusion.create!(playlist_id: exPlaylist.id, song_id: party_Monster.id)
pi_3 = PlaylistInclusion.create!(playlist_id: exPlaylist.id, song_id: the_Hills.id)