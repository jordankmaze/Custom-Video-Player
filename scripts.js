//get out elements to change
  const player = document.querySelector(".player");
  const video = document.querySelector(".viewer");
  const progress = document.querySelector(".progress");
  const progressBar = document.querySelector(".progress__filled");
  const toggle = document.querySelector(".toggle");

  const skipButtons = document.querySelectorAll("[data-skip]");
  const ranges = document.querySelectorAll(".player__slider");
//build functions

function togglePlay() {
  //ternary setup
    // const method = video.paused ? "play" : "paused";
    // video[method]();
  if (video.paused) {
    video.play();
  }
  else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
  //console.log("update button");
}

function skip() {
  //console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  //console.log(this.value);
  console.log(this.name);
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  //console.log(e);
}

// hook up listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);
toggle.addEventListener("click", togglePlay);
skipButtons.forEach(button => button.addEventListener("click", skip));
ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
//ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));
let mousedown = false;
progress.addEventListener("click", scrub);
//progress.addEventListener("mousemove", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);
