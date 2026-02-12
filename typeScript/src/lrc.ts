document.addEventListener('DOMContentLoaded', () => {
  main();
});

async function main() {
  let data = await fetchLastt();
  setPlaying(data.track, data.artist);

  let lyrics = await getLyric(data);
  setLyric(lyrics.plainLyrics);
}

async function setLyric(lyric: string) {
  const div = document.querySelector('div[id="lrc"]');

  if (div) {
    div.replaceChildren(); //empty the div
    
    for (const line of lyric.split(/\n/g).filter(Boolean)) {
      let p = document.createElement('p');
      div.appendChild(p);
      await typewriter(p, line, 15);
    }
  } else {
    console.error("Cannot set lyrics, querySelector found null");
  }
}

async function setPlaying(track: string, artist: string) {
  let playing = document.getElementById('playing');

  if (playing) {
    let line = `${track} - ${artist}`;
    await typewriter(playing, line, 15);
  }
}

async function getLyric(data: any) {
  let artist = data.artist;
  let album = data.album;
  let track = data.track;
  
  let obj = await fetch(
    `https://lrclib.net/api/get?artist_name=${artist}&track_name=${track}&album_name=${album}`
  )

  let lrcData = await obj.json();

  return lrcData;
}

async function fetchLastt() {
  try {
    const response = await fetch('https://saoirse.kena.gay/last', {
      headers: {
        "x-read-key": "taQxLOXXnwOZNMOi"
      }
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
    // playing.textContent = `${data.track} - ${data.artist}`;
    // console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }

}

async function typewriter(
  container: HTMLElement,
  text: string,
  speed = 30
) {
  container.textContent = "";

  const cursor = document.createElement("span");
  cursor.className = "typewriter-cursor";
  cursor.textContent = "▍"; // cursor symbol

  container.appendChild(cursor);

  for (const char of text) {
    cursor.insertAdjacentText("beforebegin", char);
    await new Promise(r => setTimeout(r, speed));
  }

  cursor.remove();
}


