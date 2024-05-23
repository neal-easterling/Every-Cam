
export class EraserTool{

  constructor(){
    this.center = [];
    this.radius = 5;
  }

  setCenter(array){
    this.center = [...array];
  }

  draw(ctx, size){
    const [x, y] = this.center;
    const radius = this.radius * size;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.ellipse(x, y, Math.abs(radius), Math.abs(radius), 0, 0, Math.PI * 2); 
    ctx.closePath();
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  }

}