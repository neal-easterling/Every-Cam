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
    if(this.isActive && this.isBackgroundActive){
      this.canvas.el.style = "background-color: #d9d9ff; opacity: 0.5;"
    }
  }

  draw(){

  }

}