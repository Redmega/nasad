const SITES = [
  "https://greatmystic.github.io/rerooted/",
  "https://cosninety.github.io/Teaching-Interactive-Alphabet-Student-Work/",
  "https://gabriel022110.github.io/Miami-Gum-Archive/index.html",
  "https://day666666.github.io/deathswarehouse/",
  "http://gablab.me/caps/",
  "https://sagekelly23.github.io/sagek/",
  "https://luluschneider.github.io/lulus/",
  "https://belindabarrientos.github.io/belasworld/",
  "https://serenacurbelo.github.io/serenassite/",
  "https://bunnyfrills.github.io/DemonGirlandLittleBuddy/index.html",
];

const DURATION = 1000 * 60 * 5; // 5 minutes
let timeout;
let nextWebsiteTimestamp;
let pausedRemainingDuration;

const frame = document.getElementById("frame");
const leftButton = document.getElementById("left");
const playButton = document.getElementById("play");
const rightButton = document.getElementById("right");

function cycleWebsite(index = SITES.indexOf(frame.src)) {
  const site = SITES[index];

  console.log("loading... ", site);
  frame.src = site;
  pausedRemainingDuration = 0;
  nextWebsiteTimestamp = Date.now() + DURATION;
  playButton.innerText = "pause";
  timeout = setTimeout(cycleWebsite, DURATION);
}

function drawTimer() {
  if (pausedRemainingDuration > 0) return;
  const el = document.getElementById("time");

  const seconds = Math.floor((nextWebsiteTimestamp - Date.now()) / 1000);
  const minutes = Math.floor(seconds / 60);

  el.innerText = `${minutes}:${seconds % 60 < 10 ? 0 : ""}${seconds % 60}`;
}

setInterval(drawTimer, 500);

document.addEventListener("DOMContentLoaded", () => {
  cycleWebsite(0);
});

playButton.addEventListener("click", (e) => {
  if (timeout) {
    pausedRemainingDuration = nextWebsiteTimestamp - Date.now();
    timeout = clearTimeout(timeout);
    console.log("paused it, remaining duration ", pausedRemainingDuration);
    e.currentTarget.innerText = "play";
  } else {
    const nextDuration = Math.max(5000, pausedRemainingDuration);
    nextWebsiteTimestamp = Date.now() + nextDuration;
    pausedRemainingDuration = 0;
    timeout = setTimeout(() => {
      cycleWebsite();
    }, nextDuration);
    console.log("restarting timer, starting in ", nextDuration);
    e.currentTarget.innerText = "pause";
  }
});

rightButton.addEventListener("click", () => {
  let index = SITES.indexOf(frame.src) + 1;
  if (index > SITES.length - 1) index = 0;
  cycleWebsite(index);
});

leftButton.addEventListener("click", () => {
  let index = Math.max(SITES.indexOf(frame.src), 0) - 1;
  if (index < 0) index = SITES.length - 1;
  cycleWebsite(index);
});
