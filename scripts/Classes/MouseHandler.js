
export class MouseHandler {

  constructor(){
    this.x = 0;
    this.y = 0;
    this.mouseDown = false;

    document.addEventListener('mousedown', (md)=>{
      this.mouseDown = true;
      //console.log(this.mouseDown);
    });

    document.addEventListener('touchstart', (ts)=>{
      this.mouseDown = true;
    });

    document.addEventListener('mousemove', (mm)=>{
      this.x = mm.clientX;
      this.y = mm.clientY;
      //console.log(this.mouseDown);
    });

    document.addEventListener('touchmove', (tm)=>{
      this.x = tm.touches[0].clientX;
      this.y = tm.touches[0].clientY;
    });

    document.addEventListener('mouseup', (mu)=>{
      this.mouseDown = false;
      //console.log(this.mouseDown);
    });

    document.addEventListener('touchend', (te)=>{
      te.stopImmediatePropagation();
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