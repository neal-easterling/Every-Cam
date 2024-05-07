import { LineTool, SquareTool, EllipseTool } from "./ShapeTools.js";
import { TextTool } from "./TextTool.js";
export class Whiteboard {

  constructor(mouseHandler, id, mirrorEl, resolution){
    this.canvas = {
      el: document.getElementById(id),
      ctx: document.getElementById(id).getContext('2d')
    }
    this.mirrorEl = {
      el:mirrorEl,
      boundingRect: mirrorEl.getBoundingClientRect(),
      ctx: mirrorEl.getContext('2d')
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
    this.textTool = new TextTool(resolution);

    this.setCanvasElSize();
    this.setSizesOnChange();

    // on mousedown with mode set point1
    document.addEventListener('mousedown', ()=>{
      const newCoords = this.getScaledCoords();
      if(newCoords){
        switch(this.mode) {
          case 'none':
            break;
          case 'drawing':
            this.pencil.setPoint1(newCoords);
            break;
          case 'line':
            this.lineTool.setPoint1(newCoords);
            break;
          case 'square':
            this.squareTool.setPoint1(newCoords);
            break;
          case 'ellipse':
            this.ellipseTool.setPoint1(newCoords);
            break;
          default:
            break;
        }
      }   
    });

    // on mousemove with mode set point2 & draw on MainCanvas
    document.addEventListener('mousemove', ()=>{
      const newCoords = this.getScaledCoords();
      if(newCoords && this.mouse.mouseDown){
        switch(this.mode) {
          case 'none':
            break;
          case 'drawing':
            this.pencil.setPoint2(newCoords);
            break;
          case 'line':
            this.lineTool.setPoint2(newCoords);
            break;
          case 'square' :
            this.squareTool.setPoint2(newCoords);
            break;
          case 'ellipse' :
            this.ellipseTool.setPoint2(newCoords);
            break;
          case 'text' :
            this.setTextToolPosition(newCoords);
          default:
            break;
        }
      }
    });

    // on mouseup draw on whiteboard 
    document.addEventListener('mouseup',()=>{
      const newCoords = this.getScaledCoords();
      switch(this.mode) {
        case 'none':
          break;
        case 'drawing':
          this.pencil.setPoint1([]);
          this.pencil.setPoint2([]);
          break;
        case 'line':
          this.lineTool.draw(this.canvas.ctx, 'stroke');
          this.lineTool.setPoint1([]);
          this.lineTool.setPoint2([]);
          break;
        case 'square':
          this.squareTool.draw(this.canvas.ctx, this.shapeStyle);
          this.squareTool.setPoint1([]);
          this.squareTool.setPoint2([]);
          break;
        case 'ellipse':
          this.ellipseTool.draw(this.canvas.ctx, this.shapeStyle);
          this.ellipseTool.setPoint1([]);
          this.ellipseTool.setPoint2([]);
        default:
          break;
      }
    });

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

  getScaledCoords(){
    const [x,y] = this.mouse.getMouse();
    if(x > this.left && x < this.right && y > this.top && y < this.bottom){
      return this.mouse.scaleCoords(this.canvas.el, this.width, this.height);
    }else{ return false; }
  }

  setWhiteboardCoords([x,y]){
    this.x = x;
    this.y = y;
  }

  setTextToolPosition(coords){
    const[x, y, mouseDown] = this.mouse.getMouse();
    if(mouseDown){
      if(this.textTool.isMouseOn(coords)){
          this.textTool.setCoords(coords);
        } 
    }  
  }

  placeText(){
    const ctx = this.canvas.ctx;
    ctx.fillStyle = this.color;
    this.textTool.draw(this.canvas.ctx);
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

      this.setTextToolPosition();
      const mCtx = this.mirrorEl.ctx
      mCtx.strokeStyle = this.color;
      mCtx.fillStyle = this.color;
      mCtx.lineWidth = this.strokeSize;
      this.textTool.draw(mCtx, this.strokeSize);
      
      if(this.mode == 'text') {
        this.textTool.draw(mCtx, this.strokeSize);
        this.textTool.drawHandle(mCtx);
      }
      if(this.mouse.mouseDown){

        if(this.mode == 'drawing'){ 
          this.pencil.draw(ctx, 'stroke');
          this.pencil.setPoint1(this.pencil.getPoint2());
          //console.log('draw');
        } else {
          
          switch(this.mode){
            case 'line':
              this.lineTool.draw(mCtx, 'stroke');
              break;
            case 'square':
              this.squareTool.draw(mCtx, this.shapeStyle);
              break;
            case 'ellipse':
              this.ellipseTool.draw(mCtx, this.shapeStyle);
            case 'text':
              break;
            default:
              break;
          }
        }
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