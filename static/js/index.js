// const playing = document.getElementById('playing');
// const lrc = document.getElementById('lrc');
// async function fetchLast() {
//   try {
//     const response = await fetch('https://saoirse.kena.gay/last', {
//       headers: {
//         "Authorization": "taQxLOXXnwOZNMOi"
//       }
//     });
//     if (!response.ok) throw new Error('Network response was not ok');
//     const data = await response.json();
//     playing.textContent = `${data.track} - ${data.artist}`;
//     console.log(data);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }
// fetchLast();

const hiddenState = localStorage.getItem('fx') === 'true';
const glare = document.getElementById('glare');
toggleVisibility(glare, hiddenState)

function toggleVisibility(thingToToggle, toggleState) {
  if (!toggleState) {
    thingToToggle.style.display = 'block';
  } else {
    thingToToggle.style.display = 'none';
  }
  return !toggleState;
};

const tooltip = document.getElementById('kenaImageDisplay');
const tooltipBox = document.getElementById('kenaImageDisplayTooltipbox');
let toggle = false;

document.addEventListener('click', (event) => {
  if (tooltip.contains(event.target)) {
    toggle = toggleVisibility(tooltipBox, toggle);
  } else if (tooltipBox.contains(event.target)) {
    tooltipBox.style.display = 'block';
    toggle = true;
  } else {
    tooltipBox.style.display = 'none';
    toggle = false;
  }
});

const warningButton = document.getElementById('warning-button');
const warning = document.getElementById('warning');

warningButton.addEventListener('click', () => {
  toggleVisibility(warning, true);
  sessionStorage.setItem('warningDismiss', true);
});

const warningStatus = sessionStorage.getItem('warningDismiss');

if (warningStatus) {
  toggleVisibility(warning, true);
}

const myTime = document.getElementById('myTime');

function setTime() {
  let now = new Date();

  const opts = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Europe/Stockholm',
  };
  myTime.textContent = new Intl.DateTimeFormat('en-GB', opts).format(now);
};
setTime();
setInterval(setTime, 1000);

const imageClipCopy = document.getElementById('text-that-copes-to-clip');
imageClipCopy.addEventListener('click', () => {
  navigator.clipboard.writeText('<a href="https://kena.gay/"><img src="https://kena.gay/assets/nene88x31.png" alt="kena.gay"></a>')
    .then(() => console.log("Copied"))
    .catch((error) => console.log(error));
});

const eva = document.getElementById("evangelion-no");

const random_eva = Math.floor(Math.random() * 3)
switch (random_eva) {
  case 0:
    eva.src = "/assets/eva00.png";
    console.log("set eva00");
    break;
  case 1:
    eva.src = "/assets/eva01.png";
    console.log("set eva01");
    break;
  case 2:
    eva.src = "/assets/eva02.png";
    console.log("set eva02");
    break;
  default:
    eva.src = "/assets/eva02.png";
    console.log("Error")
}

