let currentSong = new Audio();

async function getSongs() {
  let a = await fetch("http://127.0.0.1:5500/songs/");
  let res = await a.text();
  let div = document.createElement("div");
  div.innerHTML = res;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs;
}

const playMusic = (track) => {
  currentSong.src = "/songs/" + track;
  currentSong.play();
  play.src = "./img/pause.svg";
};

async function main() {
  // get the lists of all song
  let songs = await getSongs();
  console.log(songs);

  // Show all the songs in the playlist
  let songsUl = document
    .querySelector(".songsList")
    .getElementsByTagName("ul")[0];
  for (const song of songs) {
    songsUl.innerHTML =
      songsUl.innerHTML +
      ` <li>
                <img class="invert" src="./img/music.svg" alt="music_svg" />
                <div class="info">
                  <div>${song.replaceAll("%20copy", "")}</div>
                  <div> Shubh</div>
                </div>
                <div class="playNow">
                  <span>Play Now</span>
                  <img class="invert" src="./img/play.svg" alt="plays" />
                </div></li>`;
  }

  // Attach an event lister to each song
  Array.from(
    document.querySelector(".songsList").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      console.log(e.querySelector(".info").firstElementChild.innerHTML);
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    });
  });

  // Attach an event listener to play and previous

  play.addEventListener("click", () => {
    if (currentSong.pause) {
      currentSong.play();
      play.src = "./img/pause.svg";
    } else {
      currentSong.pause();
      play.src = "./img/play.svg";
    }
  });
}
main();
