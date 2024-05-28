
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

    this.helpBtn = document.querySelector('#help-btn');
    this.helpModal = document.querySelector('#help-modal');

    //Whiteboard container and Toolbars
    this.wbToolbarContainer = document.querySelector('.whiteboard-tools-container');
    this.wbToolbar = {
      pencilBtn: document.getElementById('pencil-tool'),
      eraserBtn: document.getElementById('eraser-tool'),
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
    this.initHelpModal(app);
    this.initMainToolbar(app);
    this.initWBToolbar(app);
  }

  removeActiveClass = (btnsObj) =>{
    //helper for removing active class on Whiteboard tools
    for(const btn in btnsObj){
      btnsObj[btn].classList.remove('active');
    }
  }

  initHelpModal = (app) =>{
    const init = ()=>{
      this.helpModal.classList.toggle('active');
      this.helpBtn.classList.toggle('active');
    }

    this.helpBtn.addEventListener('click', init);
    this.helpBtn.addEventListener('touchstart', init);
  }

  initMainToolbar = (app) =>{

    const initWebcamBtn = async ()=>{
      if (app.webcam.available){
        app.webcam.available = false;
      } else {
        await app.initWebcam(); 
      }
      this.mainToolbar.webcamBtn.classList.toggle('active');
      this.mainToolbar.invertBtn.toggleAttribute('disabled');
    }
    this.mainToolbar.webcamBtn.addEventListener('click', initWebcamBtn);
    this.mainToolbar.webcamBtn.addEventListener('touchstart', initWebcamBtn);
  
    const initInvertBtn = ()=> {
      if (app.camInverted) {
        app.camInverted = false;
      } else {
        app.camInverted = true;
      }
      this.mainToolbar.invertBtn.classList.toggle('active');
    }
    this.mainToolbar.invertBtn.addEventListener('click', initInvertBtn);
    this.mainToolbar.invertBtn.addEventListener('touchstart', initInvertBtn);

    const initDisplayBtn = async()=>{
      if(app.display.available){
        app.display.available = false;
      } else {
        await app.initDisplay();
        app.display.stream.getVideoTracks()[0].onended = ()=>{
          this.mainToolbar.displayBtn.classList.remove('active');
        }
      }
      this.mainToolbar.displayBtn.classList.toggle('active');
    }
    this.mainToolbar.displayBtn.addEventListener('click', initDisplayBtn);
    this.mainToolbar.displayBtn.addEventListener('touchstart', initDisplayBtn);
  
    const initSetWBbtn = ()=>{
      if(app.mainCanvas.mode != 'whiteboard'){
        app.mainCanvas.mode = 'whiteboard';
      }else{
        app.mainCanvas.mode = 'default';
      }
      console.log(app.mainCanvas.mode);
      this.mainToolbar.setWBbtn.classList.toggle('active');
    }
    this.mainToolbar.setWBbtn.addEventListener('click', initSetWBbtn);
    this.mainToolbar.setWBbtn.addEventListener('touchstart', initSetWBbtn);
    
    const initPhotoBtn = ()=>{
      app.takeScreenshot();
      this.mainToolbar.clearCapsBtn.disabled = false;
    }
    this.mainToolbar.photoBtn.addEventListener('click', initPhotoBtn);
    this.mainToolbar.photoBtn.addEventListener('touchstart', initPhotoBtn);
  
    const initMicBtn = async()=>{
      if(app.microphone.available){
        app.microphone.available = false;
      } else {
        await app.initMicrophone();
        app.microphone.available = true;
      }
      this.mainToolbar.micBtn.classList.toggle('active');
    }
    this.mainToolbar.micBtn.addEventListener('click', initMicBtn);
    this.mainToolbar.micBtn.addEventListener('touchstart', initMicBtn);

    const initRecordBtn = ()=>{
      if(app.isRecording){
        app.stopRecording();
        app.isRecording = false;
        this.mainToolbar.clearCapsBtn.disabled = false;
      } else {
        app.startRecording();
        app.isRecording = true;
      }
      this.mainToolbar.recordBtn.classList.toggle('active');
    }
    this.mainToolbar.recordBtn.addEventListener('click', initRecordBtn);
    this.mainToolbar.recordBtn.addEventListener('touchstart', initRecordBtn);

    const initClearCapsBtn = ()=>{
      this.capsContainer.innerHTML = '';
      this.mainToolbar.clearCapsBtn.disabled = true;
    }
    this.mainToolbar.clearCapsBtn.addEventListener('click', initClearCapsBtn);
    this.mainToolbar.clearCapsBtn.addEventListener('touchstart', initClearCapsBtn);

    const initFullscreenBtn = ()=>{
      app.requestFullScreen();
    }
    this.mainToolbar.fullscreenBtn.addEventListener('click', initFullscreenBtn);
    this.mainToolbar.fullscreenBtn.addEventListener('touchstart', initFullscreenBtn);

    const initTogWBToolsBtn = ()=>{
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
    }
    this.mainToolbar.togWBToolsBtn.addEventListener('click', initTogWBToolsBtn);
    this.mainToolbar.togWBToolsBtn.addEventListener('touchstart', initTogWBToolsBtn);
  }

  initWBToolbar = (app)=>{

    const initPencilBtn = ()=>{
      this.removeActiveClass(this.wbToolbar);
      this.wbToolbar.pencilBtn.classList.add('active');
      if(app.whiteboard.mode != 'drawing') app.whiteboard.mode = 'drawing';
    }
    this.wbToolbar.pencilBtn.addEventListener('click', initPencilBtn);
    this.wbToolbar.pencilBtn.addEventListener('touchstart', initPencilBtn);

    const initEraserBtn = ()=>{
      this.removeActiveClass(this.wbToolbar);
      this.wbToolbar.eraserBtn.classList.add('active');
      if(app.whiteboard.mode != 'erase') app.whiteboard.mode = 'erase';
    }
    this.wbToolbar.eraserBtn.addEventListener('click', initEraserBtn);
    this.wbToolbar.eraserBtn.addEventListener('touchstart', initEraserBtn);
  
    const initTextBtn = ()=>{
      this.removeActiveClass(this.wbToolbar);
      this.wbToolbar.textBtn.classList.add('active');
      this.wbToolbar.textBar.classList.add('active');
      if(app.whiteboard.mode != 'text') app.whiteboard.mode = 'text';
    }
    this.wbToolbar.textBtn.addEventListener('click', initTextBtn);
    this.wbToolbar.textBtn.addEventListener('touchstart', initTextBtn);

    const initPlaceTextBtn = ()=>{
      app.whiteboard.placeText();
      this.textToolBar.textInp.value = '';
      app.whiteboard.textTool.reset();
    }
    this.textToolBar.placeTextBtn.addEventListener('click', initPlaceTextBtn);
    this.textToolBar.placeTextBtn.addEventListener('touchstart', initPlaceTextBtn);
  
    const initLineBtn = ()=>{
      this.removeActiveClass(this.wbToolbar);
      this.wbToolbar.lineBtn.classList.add('active');
      if(app.whiteboard.mode != 'line') app.whiteboard.mode = 'line'; 
    }
    this.wbToolbar.lineBtn.addEventListener('click', initLineBtn);
    this.wbToolbar.lineBtn.addEventListener('touchstart', initLineBtn);
  
    const initSquareBtn = ()=>{
      this.removeActiveClass(this.wbToolbar);
      this.wbToolbar.squareBtn.classList.add('active');
      if(app.whiteboard.mode != 'square') app.whiteboard.mode = 'square'; 
    }
    this.wbToolbar.squareBtn.addEventListener('click', initSquareBtn);
    this.wbToolbar.squareBtn.addEventListener('touchstart', initSquareBtn);
  
    const initEllipseBtn = ()=>{
      this.removeActiveClass(this.wbToolbar);
      this.wbToolbar.ellipseBtn.classList.add('active');
      if(app.whiteboard.mode != 'ellipse') app.whiteboard.mode = 'ellipse'; 
    }
    this.wbToolbar.ellipseBtn.addEventListener('click', initEllipseBtn);
    this.wbToolbar.ellipseBtn.addEventListener('touchstart', initEllipseBtn);

    const initClearWhiteboardBtn = ()=>{
      app.whiteboard.clearCanvas();
    }
    this.wbToolbar.clearWhiteboardBtn.addEventListener('click', initClearWhiteboardBtn);
    this.wbToolbar.clearWhiteboardBtn.addEventListener('touchstart', initClearWhiteboardBtn);
  
    const addFocus = (el)=>{
      el.focus();
    }


    this.textToolBar.textInp.addEventListener('input', e => {
      app.whiteboard.textTool.setText(e.target.value);
    });
    this.textToolBar.textInp.addEventListener('touchstart', ()=>{
      addFocus(this.textToolBar.textInp);
    })
  
    this.wbToolbar.colorSelect.addEventListener('input',(e)=>{
      app.whiteboard.color = e.target.value;
      //console.log(e.target.value);
    });
    this.wbToolbar.colorSelect.addEventListener('touchstart', (e)=>{
      console.log(e.target);
      e.target.focus();
    });
  
    this.wbToolbar.colorStyleSelect.addEventListener('change',(e)=>{
      app.whiteboard.shapeStyle = e.target.value;
      //console.log(e.target.value);
    });
    this.wbToolbar.colorStyleSelect.addEventListener('touchstart',(e)=>{
      console.log(e.target);
      e.target.focus();
    });
  
    this.wbToolbar.strokeSizeSelect.addEventListener('change', (e)=>{
      app.whiteboard.strokeSize = e.target.value;
      //console.log(e.target.value);
    });
    this.wbToolbar.strokeSizeSelect.addEventListener('touchstart', (e)=>{
      console.log(e.target);
      e.target.focus();
    });
  
    
  }

}