import { MouseConverter } from "./MouseConverter.js";

export class Whiteboard {

  constructor(mouseHandler, id, mirrorEl){
    this.canvas = {
      el: document.getElementById(id),
      ctx: document.getElementById(id).getContext('2d')
    }
    this.mirrorEl = {
      el:mirrorEl,
      boundingRect: mirrorEl.getBoundingClientRect()
    }
    
    this.left = this.mirrorEl.boundingRect.left;
    this.top = this.mirrorEl.boundingRect.top;
    this.width = this.mirrorEl.boundingRect.width;
    this.height = this.mirrorEl.boundingRect.height;
    this.mouse = new MouseConverter(mouseHandler, this.canvas.el, this.width, this.height);
    this.color = "#257FD2";
    this.strokeSize = 3;
    this.shapeStyle = "stroke";
    this.opacity = 0.5;
    this.mode = 'drawing';
    this.isActive = true;
    this.isBackgroundActive = true;
  }

  setColor(str){
    this.color = str;
  }
  setStrokeSize(int){
    this.strokeSize = Number(int);
  }
  setShapeStyle(str){
    const temp = str === 'fill'?str:'stroke';
    this.shapeStyle = temp;
  }
  setOpacity(float){
    const opacity = float <= 1 && float >= 0 ? float : 1;
    this.opacity = opacity;
  }

  addBackground(){
    let ctx = this.canvas.ctx;
    if(this.isActive && this.isBackgroundActive){
      ctx.clearRect(0,0,this.width, this.height);
      ctx.globalAlpha = this.opacity;
      ctx. fillStyle = "#ffcccc";
      ctx.fillRect(0, 0, this.width, this.height);
    }
  }

  draw(){

  }

}