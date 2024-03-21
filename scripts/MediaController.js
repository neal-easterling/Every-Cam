import { OverlayCam } from "./OverlayCam.js";

export class MediaController{

  constructor(){
    this.videoResolution = {
      width: 1280,
      height: 720
    };
    this.overlayCam = new OverlayCam();

    this.displayCanvas = {
      el: document.getElementById('display-canvas'),
      ctx: document.getElementById('display-canvas').getContext('2d', {alpha: false}),
    };
    this.setDisplayCanvasResolution();
    this.offscreenCanvas = null;
    this.webcamStream = null;
    this.displayStream = null;
    this.offscreenCanvasStream = null;

    //Offscreen video capture elements
    this.hiddenStorage = this.createHiddenStorageEl();
    this.webcamVideoEl = this.createHiddenVideoEl('webcam-video');
    this.displayVideoEl = this.createHiddenVideoEl('display-video');
  }

  setDisplayCanvasResolution(){
    console.log('set display res triggered');
    this.displayCanvas.el.width = this.videoResolution.width;
    this.displayCanvas.el.height = this.videoResolution.height;
  }

  createHiddenStorageEl(){
    let hidden = document.createElement('div');
    hidden.style.display = 'none';
    hidden.id = 'hidden-storage';
    document.body.appendChild(hidden);
    return hidden;
  }

  createHiddenVideoEl(id){
    const el = document.createElement('video');
    el.width = this.videoResolution.width;
    el.height = this.videoResolution.height;
    el.id = id;
    el.autoplay = true;
    el.setAttribute('playsinline', true);
    this.hiddenStorage.appendChild(el);
    return el; 
  }

  async initWebcamStream(){
      const constraints = {video:true, audio: false};
      try{
        console.log('getting webcam stream ...');
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        return stream;
      }catch(err){
        console.log('webcam was not approved by user' + err);
        alert('webcam was not approved by user' + err);
      }
  }

  async setVideoTrackSize(stream){
    const videoConstraints = {
      width: this.videoResolution.width,
      height: this.videoResolution.height
    };
    //Get Video Track from stream
    const vTrack = stream.getVideoTracks()[0];
    try{
      await vTrack.applyConstraints(videoConstraints);
    }catch(err){
      console.log('track size was rejected: ' + err);
    }
  }

  async assignWebcamToVideo(){
    const stream = await this.initWebcamStream();
    await this.setVideoTrackSize(stream);
    this.webcamStream = stream;
    this.webcamVideoEl.srcObject = this.webcamStream;
  }  

  drawFullFrame(videoSource){
    this.displayCanvas.ctx.drawImage(videoSource, 0, 0, this.videoResolution.width, this.videoResolution.height); 
  }
  drawBottomLeftCircle(videoSource){
    this.overlayCam.ctx = this.displayCanvas.ctx;
    this.overlayCam.drawCircle(videoSource);
  
  } 
}