
export class TextTool{

  constructor({height}){
    this.canvasHeight = height;
    this.point1 = [40, this.canvasHeight - 40];
    this.handle = [this.point1[0] - 25, this.point1[1] - 25];
    this.text = '';
    this.font = "'Poppins', sans-serif";
    this.baseSize = '1';
  }

  // Create text box with preview on MainCanvas in bottom left
  // Then click and drag to location on canvas to set.

  setText(str){
    this.text = str;
    //console.log(`text of tool set to ${this.text}`);
  }

  setCoords([x,y]){
    this.point1 = [x, y];
    this.handle = [x-25, y-25];
  }
  reset(){
    this.point1 = [40, this.canvasHeight - 40];
    this.handle = [this.point1[0] - 25, this.point1[1] - 25];
    this.text = '';
  }

  isMouseOn(coords){
    if(coords){
      const [mX,mY] = coords;
      const [hX, hY] = this.handle;
      if(mX > hX - 30 && mX < hX + 100 && mY > hY - 30 && mY < hY + 60) return true;
      return false;
    }
  }

  draw(ctx, size){
    const [x, y] = this.point1;
    ctx.font = `${this.baseSize * size}em ${this.font}`;
    ctx.fillText(this.text, x, y);
  }

  drawHandle(ctx){
    const [hx, hy] = this.handle;
    ctx.fillRect(hx,hy,20, 20);
  }

}