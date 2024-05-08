
export class UIHandler{

  constructor(app){
    this.app = app;

    //Main UI + Fullscreen & Clear Caputures
    this.mainToolbar =  {
      webcamBtn: document.getElementById('get-webcam'),
      invertBtn:document.getElementById('invert-webcam'),
      photoBtn: document.getElementById('take-photo'),
      displayBtn: document.getElementById('get-display'),
      recordBtn: document.getElementById('record-video'),
      micBtn: document.getElementById('get-mic'),
      setWBbtn: document.getElementById('make-whiteboard'),
      togWBToolsBtn: document.getElementById('whiteboard-tools-toggle'),
      fullscreenBtn: document.getElementById('fullscreen-btn'),
      clearCapsBtn: document.getElementById('clear-captures-btn')
    };
    this.capsContainer = document.querySelector('#captures-container');

    //Whiteboard container and Toolbars
    this.wbToolbarContainer = document.querySelector('.whiteboard-tools-container');
    this.wbToolbar = {
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
    };
    this.textToolBar = {
      textInp: document.getElementById('onscreen-text'),
      placeTextBtn: document.getElementById('text-place')
    }

    // init Eventlisteners
    this.initMainToolbar(app);
    this.initWBToolbar(app);
  }

  removeActiveClass = (btnsObj) =>{
    //helper for removing active class on Whiteboard tools
    for(const btn in btnsObj){
      btnsObj[btn].classList.remove('active');
    }
  }

  initMainToolbar = (app) =>{
    this.mainToolbar.webcamBtn.addEventListener('click', async()=>{
      if (app.webcam.available){
        app.webcam.available = false;
      } else {
        await app.initWebcam(); 
      }
      this.mainToolbar.webcamBtn.classList.toggle('active');
      this.mainToolbar.invertBtn.toggleAttribute('disabled');
    });
  
    this.mainToolbar.invertBtn.addEventListener('click', ()=>{
      if (app.camInverted) {
        app.camInverted = false;
      } else {
        app.camInverted = true;
      }
      this.mainToolbar.invertBtn.classList.toggle('active');
    });
  
    this.mainToolbar.displayBtn.addEventListener('click', async()=>{
      if(app.display.available){
        app.display.available = false;
      } else {
        await app.initDisplay();
        app.display.stream.getVideoTracks()[0].onended = ()=>{
          this.mainToolbar.displayBtn.classList.remove('active');
        }
      }
      this.mainToolbar.displayBtn.classList.toggle('active');
    });
  
    this.mainToolbar.setWBbtn.addEventListener('click', ()=>{
      if(app.mainCanvas.mode != 'whiteboard'){
        app.mainCanvas.mode = 'whiteboard';
      }else{
        app.mainCanvas.mode = 'default';
      }
      console.log(app.mainCanvas.mode);
      this.mainToolbar.setWBbtn.classList.toggle('active');
    });
  
    this.mainToolbar.photoBtn.addEventListener('click', ()=>{
      app.takeScreenshot();
      this.mainToolbar.clearCapsBtn.disabled = false;
    });
  
    this.mainToolbar.micBtn.addEventListener('click', async()=>{
      if(app.microphone.available){
        app.microphone.available = false;
      } else {
        await app.initMicrophone();
        app.microphone.available = true;
      }
      this.mainToolbar.micBtn.classList.toggle('active');
    });
  
    this.mainToolbar.recordBtn.addEventListener('click', ()=>{
      if(app.isRecording){
        app.stopRecording();
        app.isRecording = false;
        this.mainToolbar.clearCapsBtn.disabled = false;
      } else {
        app.startRecording();
        app.isRecording = true;
      }
      this.mainToolbar.recordBtn.classList.toggle('active');
    });
  
    this.mainToolbar.clearCapsBtn.addEventListener('click', ()=>{
      this.capsContainer.innerHTML = '';
      this.mainToolbar.clearCapsBtn.disabled = true;
    });
  
    this.mainToolbar.fullscreenBtn.addEventListener('click', ()=>{
      app.requestFullScreen();
    });

    this.mainToolbar.togWBToolsBtn.addEventListener('click', ()=>{
      this.wbToolbarContainer.classList.toggle('active');
      this.mainToolbar.togWBToolsBtn.classList.toggle('active');
      if(app.whiteboard.isActive){
        this.removeActiveClass(this.wbToolbar);
        app.whiteboard.isActive = false;
        app.mainCanvas.overlayCam.isDraggable = true;
      }else{
        app.whiteboard.isActive = true;
        app.mainCanvas.overlayCam.isDraggable = false;
      }
      console.log(app.whiteboard.isActive);
    });
  }

  initWBToolbar = (app)=>{
    this.wbToolbar.pencilBtn.addEventListener('click', ()=>{
      this.removeActiveClass(this.wbToolbar);
      this.wbToolbar.pencilBtn.classList.add('active');
      if(app.whiteboard.mode != 'drawing') app.whiteboard.mode = 'drawing';
    });
  
    this.wbToolbar.textBtn.addEventListener('click', ()=>{
      this.removeActiveClass(this.wbToolbar);
      this.wbToolbar.textBtn.classList.add('active');
      this.wbToolbar.textBar.classList.add('active');
      if(app.whiteboard.mode != 'text') app.whiteboard.mode = 'text';
    });
  
    this.textToolBar.textInp.addEventListener('input', e => {
      app.whiteboard.textTool.setText(e.target.value);
    });
  
    this.textToolBar.placeTextBtn.addEventListener('click', ()=>{
      app.whiteboard.placeText();
      this.textToolBar.textInp.value = '';
      app.whiteboard.textTool.reset();
    });
  
    this.wbToolbar.lineBtn.addEventListener('click', ()=>{
      this.removeActiveClass(this.wbToolbar);
      this.wbToolbar.lineBtn.classList.add('active');
      if(app.whiteboard.mode != 'line') app.whiteboard.mode = 'line'; 
    });
  
    this.wbToolbar.squareBtn.addEventListener('click', ()=>{
      this.removeActiveClass(this.wbToolbar);
      this.wbToolbar.squareBtn.classList.add('active');
      if(app.whiteboard.mode != 'square') app.whiteboard.mode = 'square'; 
    });
  
    this.wbToolbar.ellipseBtn.addEventListener('click', ()=>{
      this.removeActiveClass(this.wbToolbar);
      this.wbToolbar.ellipseBtn.classList.add('active');
      if(app.whiteboard.mode != 'ellipse') app.whiteboard.mode = 'ellipse'; 
    });
  
  
    this.wbToolbar.colorSelect.addEventListener('input',(e)=>{
      app.whiteboard.color = e.target.value;
      console.log(e.target.value);
    });
  
    this.wbToolbar.colorStyleSelect.addEventListener('change',(e)=>{
      app.whiteboard.shapeStyle = e.target.value;
      console.log(e.target.value);
    });
  
    this.wbToolbar.strokeSizeSelect.addEventListener('change', (e)=>{
      app.whiteboard.strokeSize = e.target.value;
      console.log(e.target.value);
    });
  
    this.wbToolbar.clearWhiteboardBtn.addEventListener('click', ()=>{
      app.whiteboard.clearCanvas();
    });
  }

}