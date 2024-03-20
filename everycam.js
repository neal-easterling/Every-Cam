import { MediaController } from "./scripts/MediaController.js";

let webcamVideoEl;

async function createVideo(controller, hiddenStorage){
  webcamVideoEl = document.createElement('video');
  webcamVideoEl.id = 'webcam-video';
  webcamVideoEl.width = 640;
  webcamVideoEl.height = 360;
  webcamVideoEl.autoplay = true;
  webcamVideoEl.setAttribute('playsinline', true);
  let stream = await controller.getCameraStream();
  await controller.setVideoTrackSize(stream);
  webcamVideoEl.srcObject = stream;
  hiddenStorage.appendChild(webcamVideoEl);
  console.log(stream.getVideoTracks());
  return webcamVideoEl;
}

function drawFrame(video, canvas){
  const ctx = canvas.getContext('2d', {alpha: false});
  ctx.drawImage(video, 0, 0, 640, 360);
}


window.onload = ()=>{

  const elements = {
    hiddenStorage: document.getElementById('hidden-storage'),
    webcamButton: document.getElementById('get-webcam'),
    closeWebcamButton: document.getElementById('end-webcam'),
    photoButton: document.getElementById('take-photo-button'),
    photoContainer: document.getElementById('photo-container'),
    clearPhotosButton: document.getElementById('clear-photos-button'),
    fullscreenButton: document.getElementById('fullscreen-button'),
    canvas: document.getElementById('main-canvas'),
  };

  elements.webcamButton.addEventListener('click',async()=>{
    const video = await createVideo(MediaController, elements.hiddenStorage);
    console.log(video);
    setInterval(()=>{
      drawFrame(video, elements.canvas);
    }, 1000/24);
    // MediaController.setVideoSourceToStream(elements.videoWeb);
    // elements.webcamButton.classList.toggle('active');
    // elements.webcamButton.disabled = true;
    // elements.closeWebcamButton.disabled = false;
    // elements.photoButton.disabled = false;
    // elements.fullscreenButton.disabled = false;
  });

  elements.closeWebcamButton.addEventListener('click', ()=>{
    elements.videoWeb.srcObject = null;
    if(elements.webcamButton.disabled == true){
      elements.webcamButton.disabled = false;
      elements.webcamButton.classList.toggle('active');
    }
    if(elements.closeWebcamButton.disabled == false){
      elements.closeWebcamButton.disabled = true;
    }
    if(elements.photoButton.disabled == false){
      elements.photoButton.disabled = true;
    }
    if(elements.fullscreenButton.disabled == false){
      elements.fullscreenButton.disabled = true;
    }
  })

  elements.photoButton.addEventListener('click', ()=>{
    elements.canvas.setAttribute('width', elements.videoWeb.getBoundingClientRect().width);
    elements.canvas.setAttribute('height', elements.videoWeb.getBoundingClientRect().height);
    MediaController.addPhoto(elements);
    if(elements.clearPhotosButton.disabled == true){
      elements.clearPhotosButton.disabled = false;
    }
  });

  elements.clearPhotosButton.addEventListener('click', ()=>{
    elements.photoContainer.innerHTML = '';
    if(elements.clearPhotosButton.disabled == false){
      elements.clearPhotosButton.disabled = true;
    }
  });

  elements.fullscreenButton.addEventListener('click', ()=>{
    MediaController.enterFullscreen(elements.videoWeb);
  });
  
}





 
