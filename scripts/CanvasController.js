import { OverlayCam } from "./OverlayCam.js";

export class CanvasController{

  constructor(width=1280, height=720){
      this.width = width;
      this.height = height;
      this.el = document.getElementById('main-canvas');
      this.ctx = document.getElementById('main-canvas').getContext('2d', {alpha: false});
      this.overlayCam = new OverlayCam();
      this.logo = new Image(250, 250);
      this.logo.src = "../images/apps4logo.svg";
  }

  setMainCanvasResolution(width, height){
    this.width = width;
    this.el.width = width;
    this.height = height;
    this.el.height = height;
  
  }

  takeCanvasPhoto(){
    const data = this.el.toDataURL('image/png');
    return data;
  }

  drawBlank(){
    this.ctx.fillStyle = "#c9c9c9";
    this.ctx.fillRect(0, 0, this.width, this.height);
    const centerx = Math.floor(this.width/2);
    const centery = Math.floor(this.height/2);
    this.ctx.drawImage(this.logo, centerx - 125, centery - 125);
  }
  drawCamFullFrame(videoSource, inverted = true){
    this.ctx.save();
    let posX = 0;
    if(inverted) {
      this.ctx.scale(-1, 1);
      posX = this.width * -1;
    }
    this.ctx.drawImage(videoSource, posX, 0, this.width, this.height);
    this.ctx.restore();
  }
  
  drawFullFrame(videoSource){
    this.ctx.drawImage(videoSource, 0, 0, this.width, this.height); 
  }

  drawCircle(videoSource, inverted=true, camObj = this.overlayCam){
    let {x, y, radius, videoWidth, videoHeight, vX, vY} = camObj;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.clip()
    let posX = vX;
    if(inverted) {
      this.ctx.scale(-1, 1);
      posX = (videoWidth - radius/2) * -1;
    }
    this.ctx.drawImage(videoSource, posX, vY, videoWidth, videoHeight);
    this.ctx.restore();
  }

  captureCanvasStream(){
    const stream = this.mainCanvas.el.captureStream(this.frameRate);
    return stream;
  }

}