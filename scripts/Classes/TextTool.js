
export class TextTool{

  constructor(){
    this.point1 = [];
    this.text = '';
    this.font = "'Poppins', sans-serif";
    this.baseSize = '1em';
  }

  // Create text box with preview on MainCanvas in bottom left
  // Then click and drag to location on canvas to set.

  draw(ctx){
    const [x, y] = this.point1;
    ctx.fillText(this.text, x, y);
  }

}