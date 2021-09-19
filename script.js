const video = document.getElementById("vcont");
const startCamera = document.getElementById("start");
const pauseCamera = document.getElementById("pause");

const Recorder = document.querySelector(".Recorder");
const videoRec = document.getElementById("rec");
const startRecord = document.getElementById("startRec");
const stopRecord = document.getElementById("stopRec");

let checkBox = document
  .getElementById("showRec")
  .addEventListener("click", (e) => {
    if (e.target.checked == true) {
      Recorder.style.display = "block";
    } else {
      Recorder.style.display = "none";
    }
  });

let constraint = { audio: true, video: true };
let cameraStream = null;
let mediaRecorder = null;
let recordedDataChunk = [];

if (navigator.mediaDevices !== undefined) {
  startCamera.addEventListener("click", async () => {
    try {
      if (navigator.mediaDevices) {
        cameraStream = await navigator.mediaDevices.getUserMedia(constraint);
        if ("srcObject" in video) video.srcObject = cameraStream;
        else video.src = URL.createObjectURL(cameraStream);
        video.onloadedmetadata = (e) => {
          video.play();
        };
      }
    } catch (error) {
      console.log("Occured:", error);
    }
  });

  pauseCamera.addEventListener("click", () => {
    video.pause();
  });

  startRecord.addEventListener("click", () => {
    if (cameraStream !== null) {
      mediaRecorder = new MediaRecorder(cameraStream);
      mediaRecorder.start();
      mediaRecorder.ondataavailable = (e) => {
        recordedDataChunk.push(e.data);
      };
    }
  });

  stopRecord.addEventListener("click", () => {
    mediaRecorder.stop();
    mediaRecorder.onstop = (e) => {
      let blob = new Blob(recordedDataChunk, { type: "video/mp4" });
      let dataUrl = window.URL.createObjectURL(blob);
      videoRec.src = dataUrl;
      recordedDataChunk = [];
    };
  });
}
