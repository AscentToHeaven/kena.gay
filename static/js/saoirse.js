document.addEventListener('DOMContentLoaded', () => {
    sample();
    setTop();
    loadWeekly();
    loadMonthly();
    loadYearly();
});
import { formatTime, buildRows, sortedCount } from './saoirseUtils.js';
const chartOpts = {
    borderColor: 'rgb(143, 99, 231)',
    responsive: true,
    maintainAspectRatio: false,
    layout: {
        padding: 25
    },
    plugins: {
        legend: {
            display: false
        }
    }
};
const key = {
    headers: {
        "x-read-key": "taQxLOXXnwOZNMOi"
    }
};
function sample() {
    console.log("Sample works");
}
;
async function loadWeekly() {
    try {
        const weekly = await fetch('https://saoirse.kena.gay/weekly', key).then((data) => data.json());
        const artistCounts = sortedCount(weekly);
        formatTime(weekly, 'playtimeWeekly');
        new Chart(document.getElementById('weekly'), {
            type: "doughnut",
            data: {
                labels: Object.keys(artistCounts),
                datasets: [{
                        hoverOffset: 50,
                        backgroundColor: [
                            'rgba(245, 108, 60, 1)',
                            'rgba(235, 158, 80, 1)',
                            'rgba(250, 148, 70, 1)',
                            'rgba(235, 128, 60, 1)',
                            'rgba(245, 118, 60, 1)',
                        ],
                        data: Object.values(artistCounts)
                    }]
            },
            options: chartOpts,
        });
    }
    catch (err) {
        console.error(err);
    }
}
;
async function loadMonthly() {
    try {
        const monthly = await fetch('https://saoirse.kena.gay/monthly', key).then((data) => data.json());
        const artistCounts = sortedCount(monthly);
        formatTime(monthly, 'playtimeMonthly');
        const searcher = document.getElementById("tbody");
        if (!searcher)
            return;
        searcher.appendChild(buildRows(monthly.reverse()));
        const searchInput = document.getElementById('searchBar');
        // const rows = Array.from(document.querySelectorAll<HTMLTableRowElement>('#records tr'));
        const rows = Array.from(document.querySelectorAll("#records tr"));
        const normalize = (str) => str.toLowerCase().trim();
        const getSearchableText = (li) => {
            let txt = (li.textContent);
            const extra = li.dataset.keywords;
            if (extra)
                txt += ' ' + extra;
            return normalize(txt);
        };
        const filterToc = () => {
            if (!searchInput)
                return;
            const query = normalize(searchInput.value);
            for (const trEl of rows) {
                const tr = trEl;
                const matches = getSearchableText(tr).includes(query);
                tr.style.display = matches ? '' : 'none';
            }
        };
        searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener('input', filterToc);
        new Chart(document.getElementById('monthly'), {
            type: "doughnut",
            data: {
                labels: Object.keys(artistCounts),
                datasets: [{
                        hoverOffset: 50,
                        backgroundColor: [
                            'rgba(28, 225, 135, 1)',
                            'rgba(38, 255, 175, 1)',
                            'rgba(48, 185, 145, 1)',
                            'rgba(48, 225, 135, 1)',
                            'rgba(18, 185, 155, 1)',
                        ],
                        data: Object.values(artistCounts)
                    }]
            },
            options: chartOpts,
        });
    }
    catch (err) {
        console.error(err);
    }
}
;
async function loadYearly() {
    try {
        const yearly = await fetch('https://saoirse.kena.gay/yearly', key).then((data) => data.json());
        const artistCounts = sortedCount(yearly);
        formatTime(yearly, 'playtimeYearly');
        new Chart(document.getElementById('yearly'), {
            type: "doughnut",
            data: {
                labels: Object.keys(artistCounts),
                datasets: [{
                        backgroundColor: [
                            'rgb(105, 205, 255)',
                            'rgb(100, 215, 245)',
                            'rgb(125, 245, 205)',
                            'rgb(115, 225, 235)',
                            'rgb(125, 235, 225)'
                        ],
                        hoverOffset: 50,
                        data: Object.values(artistCounts)
                    }]
            },
            options: chartOpts,
        });
    }
    catch (err) {
        console.error(err);
    }
}
;
async function setTop() {
    try {
        const albumRes = await fetch('https://saoirse.kena.gay/top/album', key).then((data) => data.json());
        let al = document.getElementById('album');
        if (al)
            al.textContent = albumRes.album;
        let aa = document.getElementById('albumArtist');
        if (aa)
            aa.textContent = albumRes.artist;
        const artistRes = await fetch('https://saoirse.kena.gay/top/artist/', key).then((data) => data.json());
        let ar = document.getElementById('artist');
        if (ar)
            ar.textContent = albumRes.artist;
        const trackRes = await fetch('https://saoirse.kena.gay/top/track/', key).then((data) => data.json());
        let tr = document.getElementById('track');
        if (tr)
            tr.textContent = trackRes.track;
        let ta = document.getElementById('trackArtist');
        if (ta)
            ta.textContent = trackRes.artist;
    }
    catch (err) {
        console.error(err);
    }
}
;
