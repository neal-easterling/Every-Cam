import { StorageController } from "./StorageController.js";
import { CanvasController } from "./CanvasController.js";
import { WebcamController } from "./WebcamController.js";
import { DisplayController } from "./DisplayController.js";
import { OverlayCam } from "./OverlayCam.js";


export class AppHandler {

  constructor(){
    this.storage = new StorageController();
    this.mainCanvas = new CanvasController();
    this.webcam = new WebcamController();
    this.display = new DisplayController();
    this.mainContainer = document.querySelector('main');

    this.resolution = {
      width: 1280,
      height: 720
    };

    this.framerate = 30;

    this.permissions = {
      webcam: false,
      display: false
    };

    //Setup Objects
    this.storage.initStorage(this.resolution);
    this.mainCanvas.setMainCanvasResolution(this.resolution.width, this.resolution.height);
  }

  async initWebcam(){
    const stream = await this.webcam.init();
    await this.setVideoTrackSize(stream);
    this.storage.assignWebcamToVideo(stream);
    this.permissions.webcam = true;
  }

  async initDisplay(){
    const stream = await this.display.init();
    await this.setVideoTrackSize(stream);
    this.storage.assignDisplayToVideo(stream);
    this.permissions.display = true;
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
    return this.storage.returnDownloadImgEl(data);
  }

  async requestFullScreen(){
    try{
      this.mainContainer.requestFullscreen();
    }catch(err){
      console.log(err);
    }
}

  render(){
    this.mainCanvas.ctx.clearRect(0, 0, this.mainCanvas.el.width, this.mainCanvas.el.height);

    if(!this.permissions.webcam && !this.permissions.display){
      this.mainCanvas.drawBlank();
    }
    if(this.permissions.webcam && !this.permissions.display){
      this.mainCanvas.drawFullFrame(this.storage.webcamVideoEl);
    }
    if(!this.permissions.webcam && this.permissions.display){
      this.mainCanvas.drawFullFrame(this.storage.displayVideoEl);
    }
    if(this.permissions.webcam && this.permissions.display){
      this.mainCanvas.drawFullFrame(this.storage.displayVideoEl);
      this.mainCanvas.drawBottomLeftCircle(this.storage.webcamVideoEl);
    } 
  }

}