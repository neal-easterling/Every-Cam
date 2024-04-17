import { AppHandler } from "./scripts/AppHandler.js";

window.onload = ()=>{

  const app = new AppHandler();
  setInterval(()=>{
    app.render();
  }, 1000 / app.framerate);

  const buttons = {
    webcamBtn: document.getElementById('get-webcam'),
    closeWebcamBtn: document.getElementById('end-webcam'),
    invertBtn:document.getElementById('invert-webcam'),
    photoBtn: document.getElementById('take-photo'),
    clearCapsBtn: document.getElementById('clear-captures-btn'),
    fullscreenBtn: document.getElementById('fullscreen-btn'),
    displayBtn: document.getElementById('get-display'),
    endDisplayBtn: document.getElementById('end-display'),
    recordBtn: document.getElementById('record-video'),
    micBtn: document.getElementById('get-mic')
  };

  const capsContainer = document.querySelector('#captures-container');

  buttons.webcamBtn.addEventListener('click', async()=>{
    await app.initWebcam();    
    buttons.webcamBtn.classList.add('active');
    buttons.webcamBtn.disabled = true;
    buttons.closeWebcamBtn.disabled = false;
    buttons.invertBtn.disabled = false;
  });

  buttons.closeWebcamBtn.addEventListener('click', ()=>{
    app.webcam.available = false;
    buttons.webcamBtn.disabled = false;
    buttons.webcamBtn.classList.remove('active');
    buttons.closeWebcamBtn.disabled = true;
    buttons.invertBtn.disabled = true;
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
    await app.initDisplay();
    buttons.displayBtn.classList.add('active');
    buttons. endDisplayBtn.disabled = false;

  });

  buttons.endDisplayBtn.addEventListener('click', ()=>{
    app.display.available = false;
    buttons.displayBtn.classList.remove('active');
    buttons.endDisplayBtn.disabled = true;
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
  
}





 
