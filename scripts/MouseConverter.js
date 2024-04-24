import { MouseHandler } from "./MouseHandler.js";

export class MouseConverter{

  constructor(el, width, height){
    this.mouse = new MouseHandler();
    this.canvas = {
      el: el,
      boundingRect: el.getBoundingClientRect(),
      width: width,
      height: height
    }
    this.x = 175;
    this.y = 550;

  }

  setX(){
    if(this.mouse.x >= this.canvas.boundingRect.left 
      && this.mouse.x <= this.canvas.boundingRect.right 
      && this.mouse.mouseDown){
      this.x = (this.canvas.width * (this.mouse.x - this.canvas.boundingRect.left))/this.canvas.boundingRect.width;
      return this.x;
    }
  }

  setY(){
    if(this.mouse.y >= this.canvas.boundingRect.top 
      && this.mouse.y <= this.canvas.boundingRect.bottom
      && this.mouse.mouseDown){
      this.y = (this.canvas.height * (this.mouse.y - this.canvas.boundingRect.top))/this.canvas.boundingRect.height;
      return this.y;
      }
  }

  setCoords(){
    this.setX();
    this.setY();
  }

  getCoords(){
    return [this.x, this.y]
  }

}