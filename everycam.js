import { mediaDictionary } from "./scripts/mediaDictionary.js";
import { MediaController } from "./scripts/MediaController.js";

function drawFrame(video, canvas){
  const ctx = canvas.getContext('2d', {alpha: false});
  ctx.drawImage(video, 0, 0, 640, 360);
}

window.onload = ()=>{

  const controller = new MediaController();

  const buttons = {
    webcamBtn: document.getElementById('get-webcam'),
    closeWebcamBtn: document.getElementById('end-webcam'),
    photoBtn: document.getElementById('take-photo'),
    captureContainer: document.getElementById('captures-container'),
    clearCapsBtn: document.getElementById('clear-captures-btn'),
    fullscreenBtn: document.getElementById('fullscreen-btn'),
    displayBtn: document.getElementById('get-display'),
    endDisplayBtn: document.getElementById('end-display'),
  };

  setInterval(()=>{
    controller.drawCanvas();
  }, 1000 / controller.frameRate);

  buttons.webcamBtn.addEventListener('click', async()=>{
    await controller.assignWebcamToVideo();    
    controller.permissions.webcam = true;
    buttons.webcamBtn.classList.add('active');
    buttons.webcamBtn.disabled = true;
    buttons.closeWebcamBtn.disabled = false;
    buttons.photoBtn.disabled = false;
  });

  buttons.closeWebcamBtn.addEventListener('click', ()=>{
    controller.permissions.webcam = false;
    buttons.webcamBtn.disabled = false;
    buttons.webcamBtn.classList.remove('active');
    buttons.closeWebcamBtn.disabled = true;
    buttons.photoBtn.disabled = true;

  });

  buttons.displayBtn.addEventListener('click', async()=>{
    await controller.assignDisplayToVideo();
    controller.permissions.display = true;
    buttons.displayBtn.classList.add('active');
    buttons. endDisplayBtn.disabled = false;

  });

  buttons.endDisplayBtn.addEventListener('click', ()=>{
    controller.permissions.display = false;
    buttons.displayBtn.classList.remove('active');
    buttons.endDisplayBtn.disabled = true;
  });

  buttons.photoBtn.addEventListener('click', ()=>{

    //mediaDictionary.addPhoto(buttons);
    buttons.clearCapsBtn.disabled = false;
  });

  buttons.clearCapsBtn.addEventListener('click', ()=>{
    buttons.photoContainer.innerHTML = '';
    buttons.clearCapsBtn.disabled = true;
  });

  buttons.fullscreenBtn.addEventListener('click', ()=>{
    let main = document.querySelector('main');
    mediaDictionary.enterFullscreen(main);
  });
  
}





 
