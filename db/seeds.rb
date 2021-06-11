# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'open-uri'
User.destroy_all
Song.destroy_all
Album.destroy_all
Artist.destroy_all
Like.destroy_all
Playlist.destroy_all

# demo login
demo_user = User.create!(username: 'Demo User', email: 'demo@demouser.com', password: 'secretPasswordabcdefg0000')

# Artists
the_Weeknd = Artist.create!(name: 'The Weeknd')
drake = Artist.create!(name: 'Drake')
tyler_The_Creator = Artist.create!(name: 'Tyler, The Creator')
musa_Byte = Artist.create!(name: 'Musa Byte')

# Albums
beauty_Behind_The_Madness = Album.create!(name: 'Beauty Behind The Madness', artist_id: the_Weeknd.id)
dark_Lane_Demo_Tapes = Album.create!(name: 'Dark Lane Demo Tapes', artist_id: drake.id)
flower_Boy = Album.create!(name: 'Flower Boy', artist_id: tyler_The_Creator.id)
timbre = Album.create!(name: 'Timbre', artist_id: musa_Byte.id)

# Album Covers
beauty_Behind_The_Madness_COVER = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/The_Weeknd_Beauty_Behind_the_Madness.png")
dark_Lane_Demo_Tapes_COVER = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/Drake_Dark_Lane_Demo_Tapes.png")
flower_Boy_COVER = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/Tyler%2C_the_Creator_Flower_Boy.png")
timbre_COVER = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/musa_Byte_timbre.jpg")

# Attaching albums and album covers
beauty_Behind_The_Madness.cover.attach(io: beauty_Behind_The_Madness_COVER, filename: "The_Weeknd_Beauty_Behind_the_Madness.png")
dark_Lane_Demo_Tapes.cover.attach(io: dark_Lane_Demo_Tapes_COVER, filename: "Drake_Dark_Lane_Demo_Tapes.png")
flower_Boy.cover.attach(io: flower_Boy_COVER, filename: "Tyler%2C_the_Creator_Flower_Boy.png")
timbre.cover.attach(io: timbre_COVER, filename: "musa_Byte_timbre.jpg")

# Songs in the album...

# Beauty_Behind_The_Madness
the_Hills = Song.create!(title: 'The Hills', artist_id: the_Weeknd.id, album_id: beauty_Behind_The_Madness.id)
cant_Feel_My_Face = Song.create!(title: 'Can\'t Feel My Face', artist_id: the_Weeknd.id, album_id: beauty_Behind_The_Madness.id)
in_The_Night = Song.create!(title: 'In The Night', artist_id: the_Weeknd.id, album_id: beauty_Behind_The_Madness.id)

# Dark Lane Demo Tapes
war = Song.create!(title: 'War', artist_id: drake.id, album_id: dark_Lane_Demo_Tapes.id)
demons = Song.create!(title: 'Demons', artist_id: drake.id, album_id: dark_Lane_Demo_Tapes.id)
time_Flies = Song.create!(title: 'Time Flies', artist_id: drake.id, album_id: dark_Lane_Demo_Tapes.id)

# Flower Boy
november = Song.create!(title: 'November', artist_id: tyler_The_Creator.id, album_id: flower_Boy.id)
where_This_Flower_Blooms = Song.create!(title: 'Where This Flower Blooms', artist_id: tyler_The_Creator.id, album_id: flower_Boy.id)
see_You_Again = Song.create!(title: 'See You Again', artist_id: tyler_The_Creator.id, album_id: flower_Boy.id)

# Timbre
the_Fall = Song.create!(title: 'The Fall', artist_id: musa_Byte.id, album_id: timbre.id)
timbre_song = Song.create!(title: 'Timbre', artist_id: musa_Byte.id, album_id: timbre.id)

# Mp3s...
# Beauty_Behind_The_Madness
the_Hills_MP3 = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/The+Weeknd+-+The+Hills+(Official+Video).mp3")
cant_Feel_My_Face_MP3 = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/The+Weeknd+-+Can't+Feel+My+Face+(Official+Video).mp3")
in_The_Night_MP3 = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/The+Weeknd+-+In+The+Night+(Official+Audio).mp3")

# Timbre
timbre_song_MP3 = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/Timbre_wav.wav")
the_Fall_MP3 = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/The_Fall_wav.wav")

# Dark Lane Demo Tapes
war_MP3 = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/Drake+-+War+(Audio).mp3")
demons_MP3 = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/Drake+-+Demons+(Audio)+ft.+Fivio+Foreign%2C+Sosa+Geek.mp3")
time_Flies_MP3 = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/Drake+-+Time+Flies+(Audio).mp3")

# Flower Boy
november_MP3 = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/November.mp3")
where_This_Flower_Blooms_MP3 = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/Where+This+Flower+Blooms.mp3")
see_You_Again_MP3 = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/See+You+Again.mp3")

# Attaching songs and mp3s...
# Beauty_Behind_The_Madness
the_Hills.mp3.attach(io: the_Hills_MP3, filename: "The+Weeknd+-+The+Hills+(Official+Video).mp3")
cant_Feel_My_Face.mp3.attach(io: cant_Feel_My_Face_MP3, filename: "The+Weeknd+-+Can't+Feel+My+Face+(Official+Video).mp3")
in_The_Night.mp3.attach(io: in_The_Night_MP3, filename: "The+Weeknd+-+In+The+Night+(Official+Audio).mp3")

# Timbre
timbre_song.mp3.attach(io: timbre_song_MP3, filename: "Timbre_wav.wav")
the_Fall.mp3.attach(io: the_Fall_MP3, filename: "The_Fall_wav.wav")

# Dark Lane Demo Tapes
war.mp3.attach(io: war_MP3, filename: "Drake+-+War+(Audio).mp3")
demons.mp3.attach(io: demons_MP3, filename: "Drake+-+Demons+(Audio)+ft.+Fivio+Foreign%2C+Sosa+Geek.mp3")
time_Flies.mp3.attach(io: time_Flies_MP3, filename: "Drake+-+Time+Flies+(Audio).mp3")

# Flower Boy
november.mp3.attach(io: november_MP3, filename: "November.mp3")
where_This_Flower_Blooms.mp3.attach(io: where_This_Flower_Blooms_MP3, filename: "Where+This+Flower+Blooms.mp3")
see_You_Again.mp3.attach(io: see_You_Again_MP3, filename: "See+You+Again.mp3")

# Likes
the_Hills_Like = Like.create!(user_id: demo_user.id, song_id: the_Hills.id)
in_The_Night_Like = Like.create!(user_id: demo_user.id, song_id: in_The_Night.id)
time_Flies_Like = Like.create!(user_id: demo_user.id, song_id: time_Flies.id)
november_Like = Like.create!(user_id: demo_user.id, song_id: november.id)
the_Fall_Like = Like.create!(user_id: demo_user.id, song_id: the_Fall.id)

# Playlists
myHits = Playlist.create!(name: 'MyHits', user_id: demo_user.id)

# # Playlist Inclusions
pi_1 = PlaylistInclusion.create!(playlist_id: myHits.id, song_id: cant_Feel_My_Face.id)
pi_2 = PlaylistInclusion.create!(playlist_id: myHits.id, song_id: the_Hills.id)
pi_3 = PlaylistInclusion.create!(playlist_id: myHits.id, song_id: war.id)
pi_4 = PlaylistInclusion.create!(playlist_id: myHits.id, song_id: november.id)
pi_5 = PlaylistInclusion.create!(playlist_id: myHits.id, song_id: where_This_Flower_Blooms.id)
pi_6 = PlaylistInclusion.create!(playlist_id: myHits.id, song_id: timbre_song.id)