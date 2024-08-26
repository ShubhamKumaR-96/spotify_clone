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

async function main() {
  // get the lists of all song
  let songs = await getSongs();
  console.log(songs);

  let songsUl=document.querySelector(".songsList").getElementsByTagName("ul")[0];
  for (const song of songs) {
     songsUl.innerHTML=songsUl.innerHTML+`<li>${song}</li>`
  }

  // play the first song
  var audio = new Audio(songs[0]);
  audio.play();
}
main();
