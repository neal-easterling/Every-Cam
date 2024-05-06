import { OverlayCam } from "./OverlayCam.js";

export class CanvasController{

  constructor(mouseHandler, width=1280, height=720){
      this.width = width;
      this.height = height;
      this.el = document.getElementById('main-canvas');
      this.ctx = document.getElementById('main-canvas').getContext('2d', {alpha: false});
      this.boundingRect = this.el.getBoundingClientRect();
      this.mouse = mouseHandler;
      this.overlayCam = new OverlayCam();
      this.logo = new Image(250, 250);
      // Link for production = "https://apps4everyone.tech/everycam/images/appslogo.svg"
      this.logo.src = "../images/appslogo.svg";
  }

  setOverlayCamPostion(){
    const[x, y, mouseDown] = this.mouse.getMouse();
    if(mouseDown){
      const newCoords = this.mouse.scaleCoords(this.el, this.width, this.height);
      if(this.overlayCam.isMouseOn(newCoords) 
        && this.overlayCam.isDraggable){
          this.overlayCam.setCoords(newCoords);
        } 
    } 
    
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
    // , this.width, this.height
    this.ctx.drawImage(videoSource, 0, 0); 
  }

  drawCircle(videoSource, inverted, camObj = this.overlayCam){
    this.setOverlayCamPostion();
    let {x, y, radius, vX, vY, videoWidth, videoHeight} = camObj;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    //this.ctx.fillStyle = 'red';
    //this.ctx.fill();
    this.ctx.clip()
    let posX = vX;
    if(inverted == true){
      this.ctx.scale(-1, 1);
      posX = (videoWidth + vX ) * -1;
    }
    this.ctx.drawImage(videoSource, posX, vY, videoWidth, videoHeight);
    this.ctx.restore();
    //console.log(x,y);
  }

  captureCanvasStream(frameRate){
    const stream = this.el.captureStream(frameRate);
    return stream;
  }

}