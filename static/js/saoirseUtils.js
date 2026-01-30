// function timeToSec(timeString) {
//   const [hh, mm, ss] = timeString.split(':').map(Number);
//   return hh * 3600 + mm * 60 + ss;
// };
function secToTime(sec) {
    const h = Math.floor(sec / 3600);
    const h_rem = sec % 3600;
    const m = Math.floor(h_rem / 60);
    const s = h_rem % 60;
    return [String(h), String(m).padStart(2, "0"), String(s).padStart(2, "0")];
}
;
export function formatTime(array, elId) {
    const element = document.getElementById(elId);
    const playtime = secToTime(array.reduce((acc, record) => {
        let runtime = record.playtime;
        if (runtime !== null) {
            acc += runtime;
        }
        return acc;
    }, 0));
    const form = `Playtime: ${playtime[0]}:${playtime[1]}:${playtime[2]}`;
    if (element)
        element.textContent = form;
}
;
export function buildRows(data) {
    const fragment = document.createDocumentFragment();
    data.forEach(item => {
        const tr = document.createElement("tr");
        const artist = document.createElement("td");
        artist.textContent = item.artist;
        const album = document.createElement("td");
        album.textContent = item.album;
        const track = document.createElement("td");
        track.textContent = item.track;
        const date = document.createElement("td");
        date.textContent = item.date;
        tr.append(artist, album, track, date);
        fragment.appendChild(tr);
    });
    return fragment;
}
;
export function sortedCount(array) {
    const artistCounts = array.reduce((acc, item) => {
        const artist = item.artist;
        acc[artist] = (acc[artist] || 0) + 1;
        return acc;
    }, {});
    const sorted = Object.entries(artistCounts)
        .filter(([_, count]) => count >= 3)
        .sort((a, b) => b[1] - a[1]);
    return Object.fromEntries(sorted);
}
