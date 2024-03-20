import { MediaController } from "./scripts/MediaController.js";




window.onload = ()=>{

  const elements = {
    videoWeb: document.getElementById("webcam-video"),
    videoDisplay: document.getElementById('display-video'),
    webcamButton: document.getElementById('get-webcam'),
    closeWebcamButton: document.getElementById('end-webcam'),
    photoButton: document.getElementById('take-photo-button'),
    photoContainer: document.getElementById('photo-container'),
    clearPhotosButton: document.getElementById('clear-photos-button'),
    fullscreenButton: document.getElementById('fullscreen-button'),
    canvas: document.getElementById('canvas'),
  };

  elements.webcamButton.addEventListener('click',()=>{
    MediaController.setVideoSourceToStream(elements.videoWeb);
    elements.webcamButton.classList.toggle('active');
    elements.webcamButton.disabled = true;
    elements.closeWebcamButton.disabled = false;
    elements.photoButton.disabled = false;
    elements.fullscreenButton.disabled = false;
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





 
