
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
    this.y=0;
    this.color = "#257FD2";
    this.strokeSize = 3;
    this.shapeStyle = "stroke";
    this.opacity = 1;
    this.mode = 'none';
    this.isActive = false;
    this.isBackgroundActive = false;

    this.setCanvasSize();

    document.addEventListener('mousedown', ()=>{
      const [x,y] = this.mouse.getMouse();
      if(x > this.left && x < this.right && y > this.top && y < this.bottom){
        const newCoords = this.mouse.scaleCoords(this.canvas.el, this.width, this.height);
        this.setWhiteboardCoords(newCoords);
      }
    })
  }
  
  setCanvasSize(){
    this.canvas.el.width = this.width;
    this.canvas.el.height = this.height;
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

  setWhiteboardCoords([x,y]){
    this.x = x;
    this.y = y;
  }

  getConvertedCoords(){
    const[x,y,mouseDown] = this.mouse.getMouse();
    let newCoords = [this.x, this.y];
    if(x > this.left && x < this.right && y > this.top && y < this.bottom && mouseDown){
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
    if(this.isActive && this.mode == 'drawing'){
      const [x,y] = this.getConvertedCoords();
      const ctx = this.canvas.ctx;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalAlpha = this.opacity;
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.strokeSize;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(this.x, this.y);
      ctx.stroke();
      ctx.closePath();
      this.x = x;
      this.y = y;
    }
    
  }

  clearCanvas(){
    this.canvas.ctx.clearRect(0,0,this.width, this.height);
  }

}