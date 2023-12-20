const image = document.getElementById("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.getElementById("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// music

const songs = [
    {
        name: "jacinto-1",
        displayName: "Electric Chill Machine",
        artist: "Jacinto Design",
    },

    {
        name: "jacinto-2",
        displayName: "Seven Nation Army (Remix)",
        artist: "Jacinto Design",
    },

    {
        name: "jacinto-3",
        displayName: "Goodnight, Disco Queen",
        artist: "Jacinto Design",
    },

    {
        name: "jacinto-4",
        displayName: "Front Row (Remix)",
        artist: "Metrix / Jacinto Design",
    },
];

// Check if playing

let isPlaying = false;

// Play

function playSong() {
    isPlaying = true;
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
    music.play();
}

// Pause

function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace("fa-pause","fa-play");
    playBtn.setAttribute("title", "Play");
    music.pause();
}

// Play or pause event listener

playBtn.addEventListener("click" , () => (isPlaying ? pauseSong() : playSong()));

// Update the DOM

function loadSong(song) {
    console.log("song: ", song)
    title.textContent = song.displayName;
    artist.innerText = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current Song

let songIndex = 0;

// Previous Song

function prevSong(){
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.lenght - 1;
    }
    console.log(`Current song playing: ${songIndex}`);
    loadSong(songs[songIndex]);
    playSong();
}

//Next Song

function nextSong(){
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    console.log(`Current song playing: ${songIndex}`);
    loadSong(songs[songIndex]);
    playSong();
}

//On load - select first song

loadSong(songs[songIndex]);

// update progress bar & time

function updateProgressBar(event) {
    if (isPlaying) {
        const { duration, currentTime } = event.srcElement;
        console.log(duration, currentTime);

        // İlerleme çubuğunu güncelle
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Süre için görüntüyü hesaplamak
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

        // Şu anki zaman için görüntüyü hesaplamak
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}


// Set Progress Bar

function setProgressBar(event){
    console.log(event)
    const width = this.clientWidth;
    console.log("width", width);

    const clickX = event.offsetX;
    console.log("clickX", clickX);

    const { duration } = music;
    console.log(clickX / width);
    console.log((clickX/width) * duration); // value to be used
    music.currentTime = (clickX / width) * duration;
}






//Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
