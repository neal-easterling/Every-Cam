import { OverlayCam } from "./OverlayCam.js";

export class CanvasController{

  constructor(){
      this.width = 1280;
      this.height = 720;
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
  
  drawFullFrame(videoSource){
    this.ctx.drawImage(videoSource, 0, 0, this.width, this.height); 
  }

  drawBottomLeftCircle(videoSource){
    this.overlayCam.ctx = this.ctx;
    this.overlayCam.drawCircle(videoSource);
  }

  captureCanvasStream(){
    const stream = this.mainCanvas.el.captureStream(this.frameRate);
  }

}