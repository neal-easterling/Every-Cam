
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

  getPoint1(){
    return this.point1;
  }

  getPoint2(){
    return this.point2;
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

  determineStyle(ctx,str){
    if(str=='stroke'){
      ctx.stroke();
    }else{
      ctx.fill();
    }
  }

}

export class LineTool extends ShapeTool{

  constructor(){
    super();
  }

  draw(ctx, style){
    const [x1, y1, x2, y2] = this.getPoints();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    this.determineStyle(ctx, style);
  }

}

export class SquareTool extends ShapeTool{

  constructor(){
    super();
    this.borderRadius = 10;
  }

  draw(ctx, style){
    const [x1, y1] = this.point1;
    const [width, height] = this.getDimensions();
    ctx.beginPath();
    ctx.roundRect(x1, y1, width, height, this.borderRadius);
    ctx.closePath();
    this.determineStyle(ctx, style);
  }

}

export class EllipseTool extends ShapeTool{

  constructor(){
    super();
  }

  draw(ctx, style){
    const [centerX, centerY] = this.getCenterPoints();
    const [width, height] = this.getDimensions();
    const radiusX = width * 0.5;
    const radiusY = height * 0.5;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, Math.abs(radiusX), Math.abs(radiusY), 0, 0, Math.PI * 2); 
    ctx.closePath();
    this.determineStyle(ctx, style);
  }

}