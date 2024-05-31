// music.js

document.addEventListener("DOMContentLoaded", function () {
  const audioEl = document.querySelector("#audio");
  const backward = document.querySelector("#backward");
  const author = document.querySelector("#name");
  const musicName = document.querySelector("#music__name");
  const play = document.querySelector("#play");
  const forward = document.querySelector("#forward");
  const state = document.querySelector(".buttons");
  const waveform = document.getElementById("waveform");
  const progress = document.getElementById("progress");
  const currentTimeEl = document.getElementById("current-time");
  const durationEl = document.getElementById("duration");
  const volumeSlider = document.getElementById("volume-slider");
  const volumeIcon = document.getElementById("volume-icon");

  const traks = [
    "Azizjon Ro’zmatov - Madinada uyim bo'lsaydi",
    "Azizjon Roʻzmatov - Senga mazza Madinam",
    "Azizjon Roʻzmatov - Sogʻindimda Rosululloh",
  ];
  let current = 0;

  const changeMusic = (trak) => {
    audioEl.src = `./musics/${trak}.mp3`;
    let title = trak.split("-");
    author.textContent = title[0];
    musicName.textContent = title[1];
  };

  const playMusic = () => {
    state.classList.add("play");
    play.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    audioEl.play();
  };

  const pauseMusic = () => {
    state.classList.remove("play");
    play.innerHTML = `<i class="fa-solid fa-play"></i>`;
    audioEl.pause();
  };

  const playAudio = () => {
    let check = state.classList.contains("play");
    if (check) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  const nextAudio = () => {
    if (current > traks.length - 2) {
      current = 0;
    } else {
      current++;
    }
    changeMusic(traks[current]);
    playMusic();
  };

  const prev = () => {
    if (current == 0) {
      current = traks.length - 1;
    } else {
      current--;
    }
    changeMusic(traks[current]);
    playMusic();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Update time and progress bar
  audioEl.addEventListener("timeupdate", function () {
    const percent = (audioEl.currentTime / audioEl.duration) * 100;
    progress.style.width = percent + "%";
    currentTimeEl.textContent = formatTime(audioEl.currentTime);
    durationEl.textContent = formatTime(audioEl.duration);
  });

  // Allow clicking on the waveform to change audio position
  waveform.addEventListener("click", function (e) {
    const rect = waveform.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const totalWidth = rect.width;
    const newTime = (offsetX / totalWidth) * audioEl.duration;
    audioEl.currentTime = newTime;
  });

  // Reset play/pause button when audio ends
  audioEl.addEventListener("ended", function () {
    state.classList.remove("play");
    play.innerHTML = `<i class="fa-solid fa-play"></i>`;
    progress.style.width = "0%";
    currentTimeEl.textContent = "0:00";
  });

  // Volume control
  volumeSlider.addEventListener("input", function () {
    audioEl.volume = volumeSlider.value;
    if (audioEl.volume === 0) {
      volumeIcon.classList.replace("fa-volume-high", "fa-volume-mute");
    } else if (audioEl.volume <= 0.5) {
      volumeIcon.classList.replace("fa-volume-high", "fa-volume-low");
    } else {
      volumeIcon.classList.replace("fa-volume-mute", "fa-volume-high");
      volumeIcon.classList.replace("fa-volume-low", "fa-volume-high");
    }
  });

  play.addEventListener("click", playAudio);
  forward.addEventListener("click", nextAudio);
  backward.addEventListener("click", prev);
});
