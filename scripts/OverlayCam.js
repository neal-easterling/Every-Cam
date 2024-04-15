export class OverlayCam{

  constructor(){
    this.x = 200;
    this.y = 520;
    this.radius = 150;
    this.videoRes = {width: 1280, height: 720};
    this.ctx = null;
  }

  setCoords({x,y}){
    this.x = x;
    this.y = y;
  }

  getCoords(){
    return [this.x, this.y];
  }
}