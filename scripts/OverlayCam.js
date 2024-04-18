export class OverlayCam{

  constructor(){
    this.x = 200;
    this.y = 520;
    this.radius = 150;
    this.videoWidth = 533;
    this.videoHeight = 300;
    this.vX = -67;
    this.vY = 370; 
  }

  setCoords({x,y}){
    this.x = x;
    this.y = y;
    this.vX = Math.round(x - this.videoWidth / 2);
    this.vY = y - this.radius;
  }

  setRadius(radius){
    this.radius = radius;
    this.videoHeight = radius * 2;
    this.videoWidth = Math.round((2 * radius) * 16/9);
  }

  getCoords(){
    return [this.x, this.y];
  }
}