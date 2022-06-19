
var vid = document.getElementById("video");

var playBtn = document.getElementById("play");
var pauseBtn = document.getElementById("pause");
var reverseBtn = document.getElementById("reverse");
var fowardBtn = document.getElementById("foward");

var detailDiv = document.getElementById("details");
var optionDiv = document.getElementById("options-div");
var bottomDiv = document.getElementById("bottom-div");

var totalTime = document.getElementById("total-time");
var PipOnBtn = document.getElementById("epip");
var PipOffBtn = document.getElementById("dpip");


vid.removeAttribute("controls");
  function play() {
      if (vid.paused) {
          vid.play();
          playBtn.style.display="none";
          pauseBtn.style.display="block";
          fowardBtn.style.display="block";
          reverseBtn.style.display="block";
detailDiv.style.display ="none";
optionDiv.style.display ="none";
bottomDiv.style.display ="none"
      } else {
          vid.pause();
          playBtn.style.display="block";
          pauseBtn.style.display="none";
          detailDiv.style.display ="block";
    bottomDiv.style.display ="block";
    optionDiv.style.display ="block";
      }
  }
  //time
  const timeElapsed = document.getElementById("time-elapsed");
const duration = document.getElementById("total-time");
function formatTime(timeInSeconds) {
  const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

  return {
    minutes: result.substr(3, 2),
    seconds: result.substr(6, 2),
  };
};

function initializeVideo() {
  const videoDuration = Math.round(vid.duration);
  const time = formatTime(videoDuration);
  duration.innerText = `${time.minutes}:${time.seconds}`;
  duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
}

vid.addEventListener('loadedmetadata', initializeVideo);

// updateProgress indicates how far through the video
// the current playback is by updating the progress bar
function updateProgress() {
  var ctime = formatTime(vid.currentTime);
  document.getElementById("time-elapsed").innerHTML = `${ctime.minutes}:${ctime.seconds}`;
}

vid.addEventListener('timeupdate', updateProgress);

// skipAhead jumps to a different point in the video when
// the progress bar is clicked
function foward() {
    vid.currentTime = vid.currentTime + 10;
}

function rewind() {
    vid.currentTime = vid.currentTime - 10;
}

vid.addEventListener('error', function(event) {
    document.getElementById("error").style.display = "block";

}, true);

document.addEventListener("keydown", function(event){
      var x = event.keyCode;
if (x == 32) {
    play();
    hide();
}
if (x == 37) {
    rewind();
}
 if (x == 39) {
       foward();
}
  });

function enablePip() {
    PipOnBtn.style.display = "none";
    PipOffBtn.style.display = "inline";
    vid.requestPictureInPicture();
}
function disablePip() {
  PipOnBtn.style.display = "inline";
  PipOffBtn.style.display = "none";
  document.exitPictureInPicture();
}

function openFullscreen() {
    var elem = document.getElementById("video-div");
 document.getElementById("nfscreenopt").style.display = "inline";
document.getElementById("fscreenopt").style.display = "none";
detailDiv.style.display ="none";
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
document.getElementById("fscreenopt").style.display = "inline";
document.getElementById("nfscreenopt").style.display = "none";
detailDiv.style.display ="block";
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}

function show() {
if (vid.paused) {
    playBtn.style.display="block";
    pauseBtn.style.display="none";
    bottomDiv.style.display="block";
    detailDiv.style.display="block";
} else {
    playBtn.style.display="none";
    detailDiv.style.display="none";
    pauseBtn.style.display="block";
    bottomDiv.style.display="block";
clearTimeout();
var timeout = setTimeout(hide,5000);
}
detailDiv.style.display ="block";
optionDiv.style.display ="block";
bottomDiv.style.display ="block"
fowardBtn.style.display="block";
reverseBtn.style.display="block";
}

function hide() {
if (document.getElementById("video").paused) {
    playBtn.style.display="block";
    pauseBtn.style.display="none";
    fowardBtn.style.display="block";
    detailDiv.style.display="block";
    reverseBtn.style.display="block";
optionDiv.style.display="block";
} else {
   playBtn.style.display="none";
 pauseBtn.style.display="none";
 fowardBtn.style.display="none";
 reverseBtn.style.display="none";
 detailDiv.style.display="none";
bottomDiv.style.display="none";
 optionDiv.style.display="none";
                    }

}
