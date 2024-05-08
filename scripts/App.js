import { Storage } from "./Classes/Storage.js";
import { CanvasController } from "./Classes/CanvasController.js";
import { MediaController } from "./Classes/MediaController.js";
import { DisplayController } from "./Classes/DisplayController.js";
import { Recorder } from "./Classes/Recorder.js";
import { MouseHandler } from "./Classes/MouseHandler.js";
import { Whiteboard } from "./Classes/Whiteboard.js";
import { OffscreenCanvasHandler } from "./Classes/OffscreenCanvasHandler.js";

export class App {

  constructor(){
    this.storage = new Storage();
    this.mouseHandler = new MouseHandler(); 
    this.mainCanvas = new CanvasController(this.mouseHandler);
    this.webcam = new MediaController('video');
    this.microphone = new MediaController('audio');
    this.display = new DisplayController();
    this.recorder = new Recorder();
    this.mainContainer = document.querySelector('main');
     

    this.resolution = {
      width: 1280,
      height: 720
    };
    this.framerate = 30;
    this.camInverted = true;
    this.isRecording = false;

    this.whiteboard = new Whiteboard(this.mouseHandler, 'whiteboard-canvas', this.mainCanvas.el, this.resolution);

    //Setup Objects
    this.storage.initStorage();
    this.mainCanvas.setMainCanvasResolution(this.resolution.width, this.resolution.height);
    this.mainContainer.addEventListener('fullscreenchange', ()=>{
      this.whiteboard.setSizesOnChange();
    });

    this.offscreen = new OffscreenCanvasHandler(this.storage.hiddenCanvas,this.resolution);
  }

  async initWebcam(){
    const stream = await this.webcam.init();
    await this.setVideoTrackSize(stream);
    this.storage.assignWebcamToVideo(stream);
    console.log("initWebcam triggered");
  }

  async initMicrophone(){
    const stream = await this.microphone.init();
    console.log("initMicrophone triggered");
  }

  async initDisplay(){
    const stream = await this.display.init();
    //await this.setVideoTrackSize(stream);
    this.storage.assignDisplayToVideo(stream);
  }

  async setVideoTrackSize(stream){
    const videoConstraints = {
      width: this.resolution.width,
      height: this.resolution.height
    };
    //Get Video Track from stream
    const vTrack = stream.getVideoTracks()[0];
    try{
      await vTrack.applyConstraints(videoConstraints);
    }catch(err){
      console.log('track size was rejected: ' + err);
    }
  }

  async takeScreenshot(){
    const data = this.offscreen.takeCanvasPhoto();
    return this.storage.returnDownloadMediaEl(data, 'img');
  }

  async requestFullScreen(){
    try{
      this.mainContainer.requestFullscreen();
    }catch(err){
      console.log(err);
    }
  }

  async getCombinedStream(){
    const videoTracks = await this.offscreen.captureCanvasStream(this.framerate).getVideoTracks();
    let audioTracks = null;
    if(this.microphone.available){
      audioTracks = await this.microphone.stream.getAudioTracks();
    }
    const newStream = await this.recorder.combineTracksToStream({videoTracks, audioTracks});
    return newStream;
  }

  async startRecording(){
    const stream = await this.getCombinedStream();
    const record = this.recorder.createRecorder(stream);
    record.ondataavailable = (e) => this.recorder.handleRecording(e, this.storage);
    this.recorder.active.start();
    console.log('recording started');
  }

  stopRecording(){
    this.recorder.active.stop();
    console.log('recording stopped');
  }

  testConditionsForRender(){
    //blank screen = 0
    if(!this.webcam.available && !this.display.available && this.mainCanvas.mode != 'whiteboard') return 0;
    
    //webcam only = 1
    if(this.webcam.available && !this.display.available && this.mainCanvas.mode != 'whiteboard') return 1;
    
    //webcam and display only = 2
    if(this.webcam.available && this.display.available && this.mainCanvas.mode != 'whiteboard') return 2;
    
    //webcam and whiteboard = 3
    if(this.webcam.available && !this.display.available && this.mainCanvas.mode == 'whiteboard' ||
      this.webcam.available && this.display.available && this.mainCanvas.mode == 'whiteboard'
      ){ return 3;}
    
    //only whiteboard = 4
    if(!this.webcam.available && this.display.available && this.mainCanvas.mode == 'whiteboard' ||
      !this.webcam.available && !this.display.available && this.mainCanvas.mode == 'whiteboard'
      ){ return 4;}
  }

  renderMain(){
    //this.whiteboard.addBackground();
    this.mainCanvas.ctx.clearRect(0, 0, this.mainCanvas.el.width, this.mainCanvas.el.height);

    const results = this.testConditionsForRender();
    //console.log(results);
    switch(results){
      case 0:
        this.mainCanvas.drawBlank();
        break;
      case 1:
        this.mainCanvas.drawCamFullFrame(this.storage.webcamVideoEl, this.camInverted);
        break;
      case 2:
        this.mainCanvas.drawFullFrame(this.storage.displayVideoEl);
        this.mainCanvas.drawCircle(this.storage.webcamVideoEl, this.camInverted);
        break;
      case 3:
        this.mainCanvas.drawWhiteboardBackground();
        this.mainCanvas.drawCircle(this.storage.webcamVideoEl, this.camInverted);
        break;
      case 4:
        this.mainCanvas.drawWhiteboardBackground();
        break;
      default:
        this.mainCanvas.drawBlank();
        break;
    }
  }

  renderWhiteboard(){
    this.whiteboard.draw();
  }

  async renderOffscreen(){
    const mainCanvas = this.mainCanvas.el;
    const whiteboardCanvas = this.whiteboard.canvas.el;
    this.offscreen.renderCanvas([mainCanvas, whiteboardCanvas]);
  }

  render(){
    this.renderMain();
    this.renderWhiteboard();
    this.renderOffscreen();
  }

}