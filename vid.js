
var vid = document.getElementById("video");
var seek = document.getElementById('seek');

var playBtn = document.getElementById("play");
var pauseBtn = document.getElementById("pause");
var spinner = document.getElementById("loading");
var reverseBtn = document.getElementById("reverse");
var fowardBtn = document.getElementById("foward");

var detailDiv = document.getElementById("details");
var optionDiv = document.getElementById("options-div");
var bottomDiv = document.getElementById("bottom-div");

var totalTime = document.getElementById("total-time");
var PipOnBtn = document.getElementById("epip");
var PipOffBtn = document.getElementById("dpip");


var timeout; 

vid.removeAttribute("controls");

function initializeVideo() {
  const videoDuration = Math.round(vid.duration);
  const time = formatTime(videoDuration);
  seek.setAttribute('max', videoDuration);
  duration.innerText = `${time.minutes}:${time.seconds}`;
  duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
}

function updateProgress() {
  var ctime = formatTime(vid.currentTime);
  seek.value = Math.floor(vid.currentTime);
  document.getElementById("time-elapsed").innerHTML = `${ctime.minutes}:${ctime.seconds}`;

  vid.onwaiting = function(){
    document.getElementById("center").style.display = "block";
    pauseBtn.style.display = "none";
    fowardBtn.style.display = "inline";
    reverseBtn.style.display = "inline";
    spinner.style.display = "inline";
    
};
vid.oncanplay = function(){
  if(vid.paused) {
  pauseBtn.style.display = "none";
  document.getElementById("pauseBottom").style.display = "none";
  document.getElementById("playBottom").style.display = "inline";
  playBtn.style.display="inline";
  fowardBtn.style.display = "inline";
  reverseBtn.style.display = "inline";
  } else {
    document.getElementById("pauseBottom").style.display = "inline";
  document.getElementById("playBottom").style.display = "none";
    pauseBtn.style.display = "inline";
  playBtn.style.display="none";
  fowardBtn.style.display = "inline";
  reverseBtn.style.display = "inline";
  }
  
};

vid.onplaying = function(){
    spinner.style.display = "none";
};
}

vid.addEventListener('loadedmetadata', initializeVideo);
vid.addEventListener('timeupdate', updateProgress);
seek.addEventListener('mousemove', updateSeekTooltip);
seek.addEventListener('input', skipAhead);
vid.addEventListener('error', function(event) {
  document.getElementById("error").style.display = "block";

}, true);
document.addEventListener("keydown", function(event){
  var x = event.keyCode;
  clearTimeout();
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


//FUNCTIONS

function show() {
  clearTimeout(timeout);
  if ((vid.paused) && (spinner.style.display!="block")) {
      playBtn.style.display="inline";
      pauseBtn.style.display="none";
      fowardBtn.style.display="inline";
      reverseBtn.style.display="inline";
      bottomDiv.style.display="block";
      detailDiv.style.display="block";

  } else if (spinner.style.display != "block") {
      playBtn.style.display="none";
      detailDiv.style.display="none";
      pauseBtn.style.display="inline";
      fowardBtn.style.display="inline";
        reverseBtn.style.display="inline";
      bottomDiv.style.display="block";
      
  var timeout = setTimeout(hide,10000);
  }

  fowardBtn.style.display="inline";
  reverseBtn.style.display="inline"; 
  bottomDiv.style.display ="block"
  detailDiv.style.display ="block";
  optionDiv.style.display ="block";
 
  }
  
  function hide() {
    console.log('Hidden');
  if ((document.getElementById("video").paused) && (spinner.style.display!="block")) {
      playBtn.style.display="inline";
      pauseBtn.style.display="none";
      fowardBtn.style.display="inline";
      detailDiv.style.display="block";
      reverseBtn.style.display="inline";
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
  

  function play() {
      if (vid.paused) {
          vid.play();
          playBtn.style.display="none";
          pauseBtn.style.display="inline";
          document.getElementById("pauseBottom").style.display = "inline";
  document.getElementById("playBottom").style.display = "none";
          fowardBtn.style.display="inline";
          reverseBtn.style.display="inline";
detailDiv.style.display ="none";
optionDiv.style.display ="none";
bottomDiv.style.display ="none"
      } else {
          vid.pause();
          document.getElementById("pauseBottom").style.display = "none";
  document.getElementById("playBottom").style.display = "inline";
          playBtn.style.display="inline";
          pauseBtn.style.display="none";
          detailDiv.style.display ="inline";
          fowardBtn.style.display="inline";
          reverseBtn.style.display="inline";
    bottomDiv.style.display ="inline";
    optionDiv.style.display ="inline";
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
function updateSeekTooltip(event) {
  const skipTo = Math.round((event.offsetX / event.target.clientWidth) * parseInt(event.target.getAttribute('max'), 10));
  seek.setAttribute('data-seek', skipTo)
}
function skipAhead(event) {
  const skipTo = event.target.dataset.seek ? event.target.dataset.seek : event.target.value;
  vid.currentTime = skipTo;
  seek.value = skipTo;
}
function foward() {
    vid.currentTime = vid.currentTime + 10;
}
function rewind() {
    vid.currentTime = vid.currentTime - 10;
}
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

