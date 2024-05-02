
export class OffscreenCanvasHandler {

  constructor(canvas, {width, height}){
    this.width = width;
    this.height = height;
    this.canvas = {
      el: canvas,
      ctx: canvas.getContext('2d')
    }
    this.setCanvas();
  }

  setCanvas(){
    this.canvas.el.width = this.width;
    this.canvas.el.height = this.height;
  }

  renderCanvas(streamArray){
    streamArray.forEach(stream=> this.canvas.ctx.drawImage(stream, 0, 0, this.width, this.height));
  }

  captureCanvasStream(frameRate){
    const stream = this.canvas.el.captureStream(frameRate);
    return stream;
  }

  takeCanvasPhoto(){
    const data = this.canvas.el.toDataURL('image/png');
    return data;
  }
}
