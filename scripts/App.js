import { Storage } from "./Storage.js";
import { CanvasController } from "./CanvasController.js";
import { MediaController } from "./MediaController.js";
import { DisplayController } from "./DisplayController.js";
import { Recorder } from "./Recorder.js";
import { MouseHandler } from "./MouseHandler.js";
import { Whiteboard } from "./Whiteboard.js";

export class App {

  constructor(){
    this.storage = new Storage();
    this.mouseHandler = new MouseHandler(); 
    this.mainCanvas = new CanvasController(this.mouseHandler);
    this.whiteboard = new Whiteboard(this.mouseHandler, 'whiteboard-canvas', this.mainCanvas.el);
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

    //Setup Objects
    this.storage.initStorage();
    this.mainCanvas.setMainCanvasResolution(this.resolution.width, this.resolution.height);
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
    const data = this.mainCanvas.takeCanvasPhoto();
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
    const videoTracks = await this.mainCanvas.captureCanvasStream(this.framerate).getVideoTracks();
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

  render(){
    this.whiteboard.addBackground();
    this.mainCanvas.ctx.clearRect(0, 0, this.mainCanvas.el.width, this.mainCanvas.el.height);

    if(!this.webcam.available && !this.display.available){
      this.mainCanvas.drawBlank();
    }
    if(this.webcam.available && !this.display.available){
      this.mainCanvas.drawCamFullFrame(this.storage.webcamVideoEl, this.camInverted);
    }
    if(!this.webcam.available && this.display.available){
      this.mainCanvas.drawFullFrame(this.storage.displayVideoEl);
    }
    if(this.webcam.available && this.display.available){
      this.mainCanvas.drawFullFrame(this.storage.displayVideoEl);
      this.mainCanvas.drawCircle(this.storage.webcamVideoEl, this.camInverted);
    } 
  }

}