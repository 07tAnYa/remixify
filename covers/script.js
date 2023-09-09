console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio(); // Initialize a single Audio element
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Maana Ke Hum Yaar Nahi", filePath: "/4.mp3", coverPath: "/covers/1.jpg"},
    {songName: "Shaunk Nal", filePath: "/5.mp3", coverPath: "/covers/2.jpg"},
    {songName: "Kaise Banu", filePath: "/3.mp3", coverPath: "/covers/3.jpg"},
    {songName: "Apni To Jaise Taise", filePath: "/1.mp3", coverPath: "/covers/4.jpg"},
    {songName: "Aajkal Tere Mere Pyaar Ke Charche", filePath: "/2.mp3", coverPath: "/covers/5.jpg"},
    {songName: "Kehdoon Tumhe", filePath: "/6.mp3", coverPath: "/covers/6.jpg"},
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Function to play the selected song
function playSong() {
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = `0:00 / 0:00`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    updatePlayIcons(true); // Update play icons for song items
}

// Handle play/pause click in song item container
function toggleSongPlay(index) {
    if (songIndex === index) {
        if (audioElement.paused) {
            audioElement.play();
            gif.style.opacity = 1;
        } else {
            audioElement.pause();
            gif.style.opacity = 0;
        }
    } else {
        songIndex = index;
        playSong();
    }
    updatePlayIcons(!audioElement.paused, index); // Update play icons based on playback state
}

// Handle play/pause click in bottom section
masterPlay.addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
        gif.style.opacity = 1;
        updatePlayIcons(true, songIndex); // Update play icons for song items
    } else {
        audioElement.pause();
        gif.style.opacity = 0;
        updatePlayIcons(false, songIndex); // Update play icons for song items
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Add event listeners for song play
songItems.forEach((element, i) => {
    let playButton = element.querySelector('.songItemPlay');
    playButton.addEventListener('click', () => {
        toggleSongPlay(i);
    });
});

// Add event listener for previous button
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong();
});

// Add event listener for next button
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong();
});

// Function to update play/pause icons for all songs
function updatePlayIcons(isPlay, activeIndex) {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
        if (i === activeIndex) {
            if (isPlay) {
                element.classList.remove('fa-play-circle');
                element.classList.add('fa-pause-circle');
            } else {
                element.classList.remove('fa-pause-circle');
                element.classList.add('fa-play-circle');
            }
        } else {
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        }
    });
}

// Initialize the Plyr player
const player = new Plyr(audioElement, {
    controls: ['play', 'progress', 'current-time', 'mute', 'volume'],
});