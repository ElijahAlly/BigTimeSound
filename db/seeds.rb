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
PlaylistInclusion.destroy_all

##### Demo User Login
demo_user = User.create!(username: 'Demo User', email: 'demo@demouser.com', password: 'secretPasswordabcdefg0000')

##### Artists
the_Weeknd = Artist.create!(name: 'The Weeknd')
drake = Artist.create!(name: 'Drake')
tyler_The_Creator = Artist.create!(name: 'Tyler, The Creator')
musa_Byte = Artist.create!(name: 'Musa Byte')
cormac = Artist.create!(name: 'Cormac')
kool_And_The_Gang = Artist.create!(name: 'Kool & The Gang')
caroline_Rose = Artist.create!(name: 'Caroline Rose')
post_Malone = Artist.create!(name: 'Post Malone')
khalid_Swae_Lee = Artist.create!(name: 'Khalid, Swae Lee')
lil_Tecca = Artist.create!(name: 'Lil Tecca')
snoh_Aalegra = Artist.create!(name: 'Snoh Aalegra')

##### Albums
beauty_Behind_The_Madness = Album.create!(name: 'Beauty Behind The Madness', artist_id: the_Weeknd.id)
dark_Lane_Demo_Tapes = Album.create!(name: 'Dark Lane Demo Tapes', artist_id: drake.id)
flower_Boy = Album.create!(name: 'Flower Boy', artist_id: tyler_The_Creator.id)
timbre = Album.create!(name: 'Timbre', artist_id: musa_Byte.id)
nobscot = Album.create!(name: 'Nobscot.', artist_id: cormac.id)
light_Of_Worlds = Album.create!(name: 'Light Of Worlds', artist_id: kool_And_The_Gang.id)
superstar = Album.create!(name: 'Superstar', artist_id: caroline_Rose.id)
spiderman = Album.create!(name: 'Spider-Man: Into The Spider-Verse (Soundtrack)', artist_id: post_Malone.id)
black_Panther = Album.create!(name: 'Black Panther The Album', artist_id: khalid_Swae_Lee.id)
never_Left_Album = Album.create!(name: 'Never Left', artist_id: lil_Tecca.id)
feels = Album.create!(name: 'Feels', artist_id: snoh_Aalegra.id)

##### Album Covers
beauty_Behind_The_Madness_COVER = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/The_Weeknd_Beauty_Behind_the_Madness.png")
dark_Lane_Demo_Tapes_COVER = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/Drake_Dark_Lane_Demo_Tapes.png")
flower_Boy_COVER = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/Tyler%2C_the_Creator_Flower_Boy.png")
timbre_COVER = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/musa_Byte_timbre.jpg")
nobscot_COVER = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/youre+gonna+carry+that+weight+cover.jpg")
light_Of_Worlds_COVER = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/summer+madness+cover.jpeg.jpg")
superstar_COVER = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/caroline+rose+cover.jpg")
spiderman_COVER = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/sunflower+cover.jpg")
black_Panther_COVER = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/black+panther+cover.jpg")
never_Left_Album_COVER = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/nver+left+cover.jpg")
feels_COVER = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/snoh+aalegra+cover.jpg")

##### Attaching albums and album covers
beauty_Behind_The_Madness.cover.attach(io: beauty_Behind_The_Madness_COVER, filename: "The_Weeknd_Beauty_Behind_the_Madness.png")
dark_Lane_Demo_Tapes.cover.attach(io: dark_Lane_Demo_Tapes_COVER, filename: "Drake_Dark_Lane_Demo_Tapes.png")
flower_Boy.cover.attach(io: flower_Boy_COVER, filename: "Tyler%2C_the_Creator_Flower_Boy.png")
timbre.cover.attach(io: timbre_COVER, filename: "musa_Byte_timbre.jpg")
nobscot.cover.attach(io: nobscot_COVER, filename: "youre+gonna+carry+that+weight+cover.jpg")
light_Of_Worlds.cover.attach(io: light_Of_Worlds_COVER, filename: "summer+madness+cover.jpeg.jpg")
superstar.cover.attach(io: superstar_COVER, filename: "caroline+rose+cover.jpg")
spiderman.cover.attach(io: spiderman_COVER, filename: "sunflower+cover.jpg")
black_Panther.cover.attach(io: black_Panther_COVER, filename: "black+panther+cover.jpg")
never_Left_Album.cover.attach(io: never_Left_Album_COVER, filename: "nver+left+cover.jpg")
feels.cover.attach(io: feels_COVER, filename: "snoh+aalegra+cover.jpg")

##### Songs in the album...
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

# The Rest
youre_Gonna_Carry_That_Weight = Song.create!(title: 'You\'re Gonna Carry That Weight', artist_id: cormac.id, album_id: nobscot.id)
summer_Madness = Song.create!(title: 'Summer Madness', artist_id: kool_And_The_Gang.id, album_id: light_Of_Worlds.id)
nothings_Impossible = Song.create!(title: 'Nothing\'s Impossible', artist_id: caroline_Rose.id, album_id: superstar.id)
do_You_Think_Well_Last_Forever = Song.create!(title: 'Do You Think We\'ll Last Forever?', artist_id: caroline_Rose.id, album_id: superstar.id)
sunflower = Song.create!(title: 'Sunflower (feat. Swae Lee)', artist_id: post_Malone.id, album_id: spiderman.id)
the_Ways = Song.create!(title: 'The Ways', artist_id: khalid_Swae_Lee.id, album_id: black_Panther.id)
never_Left = Song.create!(title: 'Never Left', artist_id: lil_Tecca.id, album_id: never_Left_Album.id)
worse = Song.create!(title: 'Worse', artist_id: snoh_Aalegra.id, album_id: feels.id)

##### Mp3s...
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

# The Rest
youre_Gonna_Carry_That_Weight_MP3 = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/youre+gonna+carry+that+weight.mp3")
summer_Madness_MP3 = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/Kool+%26+The+Gang+-+Summer+Madness+(1).mp3")
nothings_Impossible_MP3 = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/Caroline+Rose+-+Nothing's+Impossible+%5BAudio+Only%5D.mp3")
do_You_Think_Well_Last_Forever_MP3 = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/Caroline+Rose+-+Do+You+Think+We'll+Last+Forever+%5BAudio+Only%5D.mp3")
sunflower_MP3 = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/Post+Malone%2C+Swae+Lee+-+Sunflower+(Spider-Man+Into+the+Spider-Verse).mp3")
the_Ways_MP3 = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/The+Ways.mp3")
never_Left_MP3 = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/Lil+Tecca+-+Never+Left+(Official+Audio).mp3")
worse_MP3 = open("https://active-storage-big-time-sound-seeds.s3.amazonaws.com/Worse.mp3")

##### Attaching songs and mp3s...
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

# The Rest
youre_Gonna_Carry_That_Weight.mp3.attach(io: youre_Gonna_Carry_That_Weight_MP3, filename: "youre+gonna+carry+that+weight.mp3")
summer_Madness.mp3.attach(io: summer_Madness_MP3, filename: "Kool+%26+The+Gang+-+Summer+Madness+(1).mp3")
nothings_Impossible.mp3.attach(io: nothings_Impossible_MP3, filename: "Caroline+Rose+-+Nothing's+Impossible+%5BAudio+Only%5D.mp3")
do_You_Think_Well_Last_Forever.mp3.attach(io: do_You_Think_Well_Last_Forever_MP3, filename: "Caroline+Rose+-+Do+You+Think+We'll+Last+Forever+%5BAudio+Only%5D.mp3")
sunflower.mp3.attach(io: sunflower_MP3, filename: "Post+Malone%2C+Swae+Lee+-+Sunflower+(Spider-Man+Into+the+Spider-Verse).mp3")
the_Ways.mp3.attach(io: the_Ways_MP3, filename: "The+Ways.mp3")
never_Left.mp3.attach(io: never_Left_MP3, filename: "Lil+Tecca+-+Never+Left+(Official+Audio).mp3")
worse.mp3.attach(io: worse_MP3, filename: "Worse.mp3")

##### Likes
the_Hills_Like = Like.create!(user_id: demo_user.id, song_id: the_Hills.id)
in_The_Night_Like = Like.create!(user_id: demo_user.id, song_id: in_The_Night.id)
time_Flies_Like = Like.create!(user_id: demo_user.id, song_id: time_Flies.id)
november_Like = Like.create!(user_id: demo_user.id, song_id: november.id)
the_Fall_Like = Like.create!(user_id: demo_user.id, song_id: the_Fall.id)
youre_Gonna_Carry_That_Weight_Like = Like.create!(user_id: demo_user.id, song_id: youre_Gonna_Carry_That_Weight.id)

##### Playlists
myHits = Playlist.create!(name: 'My Hits', user_id: demo_user.id)

##### Playlist Inclusions
pi_1 = PlaylistInclusion.create!(playlist_id: myHits.id, song_id: cant_Feel_My_Face.id)
pi_2 = PlaylistInclusion.create!(playlist_id: myHits.id, song_id: the_Hills.id)
pi_3 = PlaylistInclusion.create!(playlist_id: myHits.id, song_id: war.id)
pi_4 = PlaylistInclusion.create!(playlist_id: myHits.id, song_id: november.id)
pi_5 = PlaylistInclusion.create!(playlist_id: myHits.id, song_id: where_This_Flower_Blooms.id)
pi_6 = PlaylistInclusion.create!(playlist_id: myHits.id, song_id: timbre_song.id)