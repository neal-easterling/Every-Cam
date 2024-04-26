import { App } from "./scripts/App.js";

window.onload = ()=>{

  const app = new App();
  setInterval(()=>{
    app.renderMain();
    app.renderWhiteboard();
  }, 1000 / app.framerate);


  const buttons = {
    webcamBtn: document.getElementById('get-webcam'),
    invertBtn:document.getElementById('invert-webcam'),
    photoBtn: document.getElementById('take-photo'),
    clearCapsBtn: document.getElementById('clear-captures-btn'),
    fullscreenBtn: document.getElementById('fullscreen-btn'),
    displayBtn: document.getElementById('get-display'),
    recordBtn: document.getElementById('record-video'),
    micBtn: document.getElementById('get-mic'),
    whiteboardBtn: document.getElementById('whiteboard-tools-toggle')
  };

  const capsContainer = document.querySelector('#captures-container');
  const whiteboardToolbar = document.querySelector('.whiteboard-tools-container');

  buttons.webcamBtn.addEventListener('click', async()=>{
    if (app.webcam.available){
      app.webcam.available = false;
    } else {
      await app.initWebcam(); 
    }
    buttons.webcamBtn.classList.toggle('active');
    buttons.invertBtn.toggleAttribute('disabled');
  });

  buttons.invertBtn.addEventListener('click', ()=>{
    if (app.camInverted) {
      app.camInverted = false;
    } else {
      app.camInverted = true;
    }
    buttons.invertBtn.classList.toggle('active');
  });

  buttons.displayBtn.addEventListener('click', async()=>{
    if(app.display.available){
      app.display.available = false;
    } else {
      await app.initDisplay();
      app.display.stream.getVideoTracks()[0].onended = ()=>{
        buttons.displayBtn.classList.remove('active');
      }
    }
    buttons.displayBtn.classList.toggle('active');
  });

  buttons.photoBtn.addEventListener('click', ()=>{
    app.takeScreenshot();
    buttons.clearCapsBtn.disabled = false;
  });

  buttons.micBtn.addEventListener('click', async()=>{
    if(app.microphone.available){
      app.microphone.available = false;
    } else {
      await app.initMicrophone();
      app.microphone.available = true;
    }
    buttons.micBtn.classList.toggle('active');
  });

  buttons.recordBtn.addEventListener('click', ()=>{
    if(app.isRecording){
      app.stopRecording();
      app.isRecording = false;
      buttons.clearCapsBtn.disabled = false;
    } else {
      app.startRecording();
      app.isRecording = true;
    }
    buttons.recordBtn.classList.toggle('active');
  });

  buttons.clearCapsBtn.addEventListener('click', ()=>{
    capsContainer.innerHTML = '';
    buttons.clearCapsBtn.disabled = true;
  });

  buttons.fullscreenBtn.addEventListener('click', ()=>{
    app.requestFullScreen();
  });

  buttons.whiteboardBtn.addEventListener('click', ()=>{
    whiteboardToolbar.classList.toggle('active');
    buttons.whiteboardBtn.classList.toggle('active');
  });
  
}





 
