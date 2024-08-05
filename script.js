const timeStamp = document.getElementById("timeStamp");
const start = document.getElementById("start");
const lap = document.getElementById("lap");
const reset = document.getElementById("reset");
const pause = document.getElementById("pause");
const lapContent = document.getElementById("lapContent");

let mins = 0,
  sec = 0,
  ms = 0,
  hrs = 0,
  timeInterval;

startbtn = () => {
  timeInterval = setInterval(() => {
    ms++;
    if (ms == 100) {
      sec++;
      ms = 0;
    }
    if (sec == 60) {
      mins++;
      sec = 0;
    }
    if (mins == 60) {
      hrs++;
      mins = 0;
    }

    timeStamp.innerHTML = formatTime(hrs, mins, sec, ms);
  }, 10);

  start.setAttribute("style", "display:none");
  pause.setAttribute("style", "display:block");
  reset.setAttribute("style", "display:block");
  lap.removeAttribute("disabled");
};

let formatTime = (hrs, mins, sec, ms) => {
  return `${zeroPad(hrs)}:${zeroPad(mins)}:${zeroPad(sec)}.<sub>${zeroPad(
    ms
  )}</sub>
  `;
};

const zeroPad = (num) => {
  return String(num).padStart(2, "0"); // "0" is append
};

// function to stop
let pausebtn = () => {
  clearInterval(timeInterval);

  start.setAttribute("style", "display:block");
  start.innerHTML = "Resume";
  pause.setAttribute("style", "display:none");
  lap.setAttribute("disabled", "true");
};

let resetbtn = () => {
  clearInterval(timeInterval);
  ms = 0;
  sec = 0;
  mins = 0;
  hrs = 0;
  timeStamp.innerHTML = "00:00:00.<sub>00</sub>";
  start.innerHTML = "Start";
  start.setAttribute("style", "display:block");
  pause.setAttribute("style", "display:none");
  lap.setAttribute("disabled", "true");
  reset.setAttribute("style", "display:none");

  lapContent.innerHTML = "";
  count = 0;
};

let count = 0;
let lapbtn = () => {
  count++;
  const lapp = document.createElement("div");
  lapp.className = "lapContent";
  lapp.innerHTML = `<p class="laps">Lap ${count}</p><p class="timelap">${formatLapTime(
    hrs,
    mins,
    sec
  )}</p>`;
  lapContent.appendChild(lapp);
};

let formatLapTime = (hrs, mins, sec) => {
  return `${zeroPad(hrs)}:${zeroPad(mins)}:${zeroPad(sec)}`;
};
