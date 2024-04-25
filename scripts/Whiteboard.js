import { MouseConverter } from "./MouseConverter";

export class Whiteboard {

  constructor(id, mirrorEl){
    this.canvas = {
      el: document.getElementById(id),
      ctx: document.getElementById(id).getContext('2d')
    }
    this.mouse = new MouseConverter(this.canvas.el);
    this.mirrorEl = {
      el:mirrorEl,
      boundingRect: mirrorEl.getBoundingClientRect()
    }
    this.left = this.mirrorEl.boundingRect.left;
    this.top = this.mirrorEl.boundingRect.top;
    this.width = 1280;
    this.height = 720;
    this.color = "#257FD2";
    this.strokeSize = 3;
    this.shapeStyle = "stroke";
    this.opacity = 1;
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

}