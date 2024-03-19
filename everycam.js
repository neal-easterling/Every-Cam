import { MediaController } from "./scripts/MediaController.js";

window.onload = ()=>{

  const elements = {
    video: document.getElementById("video"),
    videoButton: document.getElementById('toggle-camera'),
    closeVideoButton: document.getElementById('close-video-button'),
    photoButton: document.getElementById('take-photo-button'),
    photoContainer: document.getElementById('photo-container'),
    clearPhotosButton: document.getElementById('clear-photos-button'),
    canvas: document.getElementById('canvas'),
    sidebar: document.getElementById('sidebar'),
    viewSidebarButton: document.getElementById('toggle-sidebar-button'),
    closeSidebarButton: document.getElementById('close-sidebar-button')
  };

  

  elements.videoButton.addEventListener('click',()=>{
    MediaController.setVideoSourceToStream(elements.video);
    elements.videoButton.classList.toggle('active');
  });

 
  elements.photoButton.addEventListener('click', ()=>{
    elements.canvas.setAttribute('width', elements.video.getBoundingClientRect().width);
    elements.canvas.setAttribute('height', elements.video.getBoundingClientRect().height);
    MediaController.addPhoto(elements);
  });
  
}





 
