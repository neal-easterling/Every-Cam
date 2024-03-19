import { MediaController } from "./scripts/MediaController.js";




window.onload = ()=>{

  const elements = {
    video: document.getElementById("video"),
    videoButton: document.getElementById('get-camera'),
    closeVideoButton: document.getElementById('end-camera'),
    photoButton: document.getElementById('take-photo-button'),
    photoContainer: document.getElementById('photo-container'),
    clearPhotosButton: document.getElementById('clear-photos-button'),
    fullscreenButton: document.getElementById('fullscreen-button'),
    canvas: document.getElementById('canvas'),
  };

  elements.videoButton.addEventListener('click',()=>{
    MediaController.setVideoSourceToStream(elements.video);
    elements.videoButton.classList.toggle('active');
    elements.videoButton.disabled = true;
    elements.closeVideoButton.disabled = false;
    elements.photoButton.disabled = false;
    elements.fullscreenButton.disabled = false;
  });

  elements.closeVideoButton.addEventListener('click', ()=>{
    elements.video.srcObject = null;
    if(elements.videoButton.disabled == true){
      elements.videoButton.disabled = false;
      elements.videoButton.classList.toggle('active');
    }
    if(elements.closeVideoButton.disabled == false){
      elements.closeVideoButton.disabled = true;
    }
    if(elements.photoButton.disabled == false){
      elements.photoButton.disabled = true;
    }
    if(elements.fullscreenButton.disabled == false){
      elements.fullscreenButton.disabled = true;
    }
  })

  elements.photoButton.addEventListener('click', ()=>{
    elements.canvas.setAttribute('width', elements.video.getBoundingClientRect().width);
    elements.canvas.setAttribute('height', elements.video.getBoundingClientRect().height);
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
    MediaController.enterFullscreen(elements.video);
  });
  
}





 
