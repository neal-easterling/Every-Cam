import { App } from "./scripts/App.js";

window.onload = ()=>{

  const app = new App();
  setInterval(()=>{
    app.render();
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
    setWBbtn: document.getElementById('make-whiteboard')
  };

  const capsContainer = document.querySelector('#captures-container');
  const whiteboardToolbar = document.querySelector('.whiteboard-tools-container');
  const whiteboardCanvas = document.querySelector("#whiteboard-canvas");

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

  buttons.setWBbtn.addEventListener('click', ()=>{
    if(app.mainCanvas.mode != 'whiteboard'){
      app.mainCanvas.mode = 'whiteboard';
    }else{
      app.mainCanvas.mode = 'default';
    }
    console.log(app.mainCanvas.mode);
    buttons.setWBbtn.classList.toggle('active');
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


// ========== Whiteboard Toolbar =================== //

const whiteboardBtn = document.getElementById('whiteboard-tools-toggle');
const onscreenText = document.getElementById('onscreen-text');
const textPlaceBtn = document.getElementById('text-place'); 
const wbtoolbtns = {
    pencilBtn: document.getElementById('pencil-tool'),
    lineBtn: document.getElementById('line-tool'),
    textBtn: document.getElementById('text-tool'),
    squareBtn: document.getElementById('square-tool'),
    ellipseBtn: document.getElementById('ellipse-tool'),
    colorSelect: document.getElementById('color-select'),
    colorStyleSelect: document.getElementById('color-style-select'),
    strokeSizeSelect:document.getElementById('stroke-size-select'),
    clearWhiteboardBtn: document.getElementById('clear-whiteboard'),
    textBar: document.getElementById('textbox-container')
  }

const removeActiveClass = (btnsObj)=>{
  for(const btn in btnsObj){
    btnsObj[btn].classList.remove('active');
  }
};


  whiteboardBtn.addEventListener('click', ()=>{
    whiteboardToolbar.classList.toggle('active');
    whiteboardBtn.classList.toggle('active');
    if(app.whiteboard.isActive){
      removeActiveClass(wbtoolbtns);
      app.whiteboard.isActive = false;
      app.mainCanvas.overlayCam.isDraggable = true;
    }else{
      app.whiteboard.isActive = true;
      app.mainCanvas.overlayCam.isDraggable = false;
    }
  });

  wbtoolbtns.pencilBtn.addEventListener('click', ()=>{
    removeActiveClass(wbtoolbtns);
    wbtoolbtns.pencilBtn.classList.add('active');
    if(app.whiteboard.mode != 'drawing') app.whiteboard.mode = 'drawing';
  });

  wbtoolbtns.textBtn.addEventListener('click', ()=>{
    removeActiveClass(wbtoolbtns);
    wbtoolbtns.textBtn.classList.add('active');
    wbtoolbtns.textBar.classList.add('active');
    if(app.whiteboard.mode != 'text') app.whiteboard.mode = 'text';
  });

  onscreenText.addEventListener('input', e => {
    app.whiteboard.textTool.setText(e.target.value);
  });

  textPlaceBtn.addEventListener('click', ()=>{
    app.whiteboard.placeText();
    onscreenText.value = '';
    app.whiteboard.textTool.reset();
  });

  wbtoolbtns.lineBtn.addEventListener('click', ()=>{
    removeActiveClass(wbtoolbtns);
    wbtoolbtns.lineBtn.classList.add('active');
    if(app.whiteboard.mode != 'line') app.whiteboard.mode = 'line'; 
  });

  wbtoolbtns.squareBtn.addEventListener('click', ()=>{
    removeActiveClass(wbtoolbtns);
    wbtoolbtns.squareBtn.classList.add('active');
    if(app.whiteboard.mode != 'square') app.whiteboard.mode = 'square'; 
  });

  wbtoolbtns.ellipseBtn.addEventListener('click', ()=>{
    removeActiveClass(wbtoolbtns);
    wbtoolbtns.ellipseBtn.classList.add('active');
    if(app.whiteboard.mode != 'ellipse') app.whiteboard.mode = 'ellipse'; 
  });


  wbtoolbtns.colorSelect.addEventListener('input',(e)=>{
    app.whiteboard.color = e.target.value;
  });

  wbtoolbtns.colorStyleSelect.addEventListener('change',(e)=>{
    app.whiteboard.shapeStyle = e.target.value;
  });

  wbtoolbtns.strokeSizeSelect.addEventListener('change', (e)=>{
    app.whiteboard.strokeSize = e.target.value;
  });

  wbtoolbtns.clearWhiteboardBtn.addEventListener('click', ()=>{
    app.whiteboard.clearCanvas();
  });
  
}





 
