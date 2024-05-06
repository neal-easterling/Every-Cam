
class ShapeTool {

  constructor(){
    this.point1 = [];
    this.point2 = [];
    this.active = false;
  }

  setPoint1(array){
    this.point1 = [...array];
  }

  setPoint2(array){
    this.point2 = [...array];
  }

  getDimensions(){
    const [x1, y1, x2, y2] = this.getPoints();
    const width = x2 - x1;
    const height = y2 - y1;
    return [width, height];
  }

  getCenterPoints(){
    const [x1, y1] = this.point1;
    const [width, height] = this.getDimensions();
    return [x1 + width/2, y1 + height/2];
  }

  getPoints(){
    const [x1, y1] = this.point1;
    const [x2, y2] = this.point2;
    return [x1, y1, x2, y2];
  }

}

export class LineTool extends ShapeTool{

  constructor(){
    super();
  }

  draw(ctx){
    const [x1, y1, x2, y2] = this.getPoints();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
  }

}

export class SquareTool extends ShapeTool{

  constructor(){
    super();
    this.borderRadius = 5;
  }

  draw(ctx){
    const [x1, y1] = this.point1;
    const [width, height] = this.getDimensions();
    ctx.beginPath();
    ctx.roundRect(x1, y1, width, height, this.borderRadius);
    ctx.closePath();
  }

}

export class EllipseTool extends ShapeTool{

  constructor(){
    super();
  }

  draw(ctx){
    const [centerX, centerY] = this.getCenterPoints();
    const [width, height] = this.getDimensions();
    const radiusX = width * 0.5;
    const radiusY = height * 0.5;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2); 
    ctx.closePath();
  }

}