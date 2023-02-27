
let anchors = document.querySelectorAll('div .btn');
let links = [...anchors];

for (let i=0; i<links.length; i++) {
links[i].onclick = handler;
}
function handler(e) {
e.preventDefault();
let videotarget = this.getAttribute("href");
let filename = videotarget.substr(0, videotarget.lastIndexOf('.'));
let video = document.getElementById("video");
video.removeAttribute("poster");
let source = document.querySelectorAll("#video_player video source");
source[0].src = filename + ".mp4";
source[1].src = filename + ".m4v";
video.load();
video.play();
}