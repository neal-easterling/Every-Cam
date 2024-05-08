
export class MouseHandler {

  constructor(){
    this.x = 0;
    this.y = 0;
    this.mouseDown = false;

    document.addEventListener('mousedown', (md)=>{
      this.mouseDown = true;
    });

    document.addEventListener('touchstart', (ts)=>{
      this.mouseDown = true;
    });

    document.addEventListener('mousemove', (mm)=>{
      this.x = mm.clientX;
      this.y = mm.clientY;
    });

    document.addEventListener('touchmove', (tm)=>{
      tm.preventDefault();
      this.x = tm.touches[0].clientX;
      this.y = tm.touches[0].clientY;
    });

    document.addEventListener('mouseup', (mu)=>{
      this.mouseDown = false;
    });

    document.addEventListener('touchend', (te)=>{
      te.preventDefault();
      this.mouseDown = false;
    });

   
  }


  getMouse(){
    return [this.x, this.y, this.mouseDown];
  }
  
  scaleCoords(el,width, height){
    const boundingRect = el.getBoundingClientRect();
    const smWidth = boundingRect.width;
    const smHeight = boundingRect.height;
    const left = boundingRect.left;
    const top = boundingRect.top;
    const newX = (width * (this.x - left))/smWidth;
    const newY = (height * (this.y - top))/smHeight;
    return[newX, newY];
  }
}