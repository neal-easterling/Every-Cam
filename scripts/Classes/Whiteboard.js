import { LineTool, SquareTool, EllipseTool } from "./ShapeTools.js";
export class Whiteboard {

  constructor(mouseHandler, id, mirrorEl, resolution){
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
    this.right = this.mirrorEl.boundingRect.right;
    this.bottom = this.mirrorEl.boundingRect.bottom;
    this.width = resolution.width;
    this.height = resolution.height;
    this.mouse = mouseHandler;
    this.x = 0;
    this.y = 0;
    this.color = "#257FD2";
    this.strokeSize = 3;
    this.shapeStyle = "stroke";
    this.opacity = 1;
    this.mode = 'none';
    this.isActive = false;
    this.isBackgroundActive = false;
    this.pencil = new LineTool();
    this.lineTool = new LineTool();
    this.squareTool = new SquareTool();
    this.ellipseTool = new EllipseTool();

    this.setCanvasElSize();
    this.setSizesOnChange();

    // on mousedown with mode set point1
    // on mousemove with mode set point2 & draw on MainCanvas
    // on mouseup draw on whiteboard 

    document.addEventListener('mousedown', ()=>{
      const [x,y] = this.mouse.getMouse();
      if(x > this.left && x < this.right && y > this.top && y < this.bottom){
        const newCoords = this.mouse.scaleCoords(this.canvas.el, this.width, this.height);
        if(this.mode == 'drawing') this.setWhiteboardCoords(newCoords);
      }
    })
  }
  
  setCanvasElSize(){
    this.canvas.el.width = this.width;
    this.canvas.el.height = this.height;
  }

  setSizesOnChange(){
    const newBoundingRect = this.mirrorEl.el.getBoundingClientRect();
    this.mirrorEl.boundingRect = newBoundingRect;
    this.left = this.mirrorEl.boundingRect.left;
    this.top = this.mirrorEl.boundingRect.top;
    this.right = this.mirrorEl.boundingRect.right;
    this.bottom = this.mirrorEl.boundingRect.bottom;
  }

  setWhiteboardCoords([x,y]){
    this.x = x;
    this.y = y;
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

  getConvertedCoords(){
    const[x,y,mouseDown] = this.mouse.getMouse();
    let newCoords = [this.x, this.y];
    if(x > this.left && x < this.right && y > this.top && y < this.bottom && mouseDown ){ 
      newCoords = this.mouse.scaleCoords(this.canvas.el, this.width, this.height);
    }
    return newCoords;
  }

  addBackground(){
    if(this.isActive && this.isBackgroundActive){
      this.canvas.el.style = "background-color: #d9d9ff; opacity: 0.5;"
    }
  }

  draw(){
    if(this.isActive){
      const ctx = this.canvas.ctx;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalAlpha = this.opacity;
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.strokeSize;
      ctx.fillStyle = this.color;
      
      if(this.mode == 'drawing' && this.mouse.mouseDown ){ 
        ctx.beginPath();
        const [x,y] = this.getConvertedCoords();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
        
        this.x = x;
        this.y = y;
        console.log('draw');
      }
    }
  }

  clearCanvas(){
    this.canvas.ctx.clearRect(0,0,this.width, this.height);
  }

  captureCanvasStream(frameRate){
    const stream = this.canvas.el.captureStream(frameRate);
    return stream;
  }

}