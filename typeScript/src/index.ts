const hiddenState = localStorage.getItem('fx') === 'true';
const glare = document.getElementById('glare');
if (glare) {
  toggleVisibility(glare, hiddenState);
} else {
  console.error("Cannot toggle visibility, glare does not exist");
}

function toggleVisibility(thingToToggle: HTMLElement, toggleState: boolean) {
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

if (tooltip && tooltipBox) {
document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  if (event != null) {
    if (tooltip.contains(target)) {
      toggle = toggleVisibility(tooltipBox, toggle);
    } else if (tooltipBox.contains(target)) {
      tooltipBox.style.display = 'block';
      toggle = true;
    } else {
      tooltipBox.style.display = 'none';
      toggle = false;
    }
  }
});
}


const warningButton = document.getElementById('warning-button');
const warning = document.getElementById('warning');

if (warning && warningButton) {
  warningButton.addEventListener('click', () => {
    toggleVisibility(warning, true);
    sessionStorage.setItem('warningDismiss', 'true');
  });

  const warningStatus = sessionStorage.getItem('warningDismiss');

  if (warningStatus) {
    toggleVisibility(warning, true);
  }
}


const myTime = document.getElementById('myTime');

function setTime() {
  let now = new Date();

  if (myTime) {
    myTime.textContent = new Intl.DateTimeFormat('en-GB', { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: 'Europe/Stockholm' }).format(now);
  }
};
setTime();
setInterval(setTime, 1000);

const imageClipCopy = document.getElementById('text-that-copes-to-clip');

if (imageClipCopy) {
  imageClipCopy.addEventListener('click', () => {
    navigator.clipboard.writeText('<a href="https://kena.gay/"><img src="https://kena.gay/assets/nene88x31.png" alt="kena.gay"></a>')
      .then(() => console.log("Copied"))
      .catch((error) => console.log(error));
  });
}

const eva = document.getElementById("evangelion-no") as HTMLImageElement;

if (eva) {
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
}

