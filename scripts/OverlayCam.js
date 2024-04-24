export class OverlayCam{

  constructor(){
    this.x = 200;
    this.y = 520;
    this.radius = 150;
    this.vX = this.x - this.radius * 16/9;
    this.vY = this.y - this.radius; 
    this.videoHeight= this.radius * 2;
    this.videoWidth =(2 * this.radius) * 16/9;
    this.isDraggable = true;
  }

  isMouseOn([mouseX, mouseY]){
    let distance = Math.pow(mouseX - this.x, 2) / Math.pow(this.radius, 2) + Math.pow(mouseY - this.y,2) / Math.pow(this.radius,2);
    console.log(distance);
    if (distance<2) return true;
    else return false;
}

  setCoords([x,y]){
    this.x = x;
    this.y = y;
    this.vX =  x - this.radius * 16/9;
    this.vY = y - this.radius;
    //console.log('x: ' + this.x +' vX: ' + this.vX + ' y: ' + this.y + ' vY: ' + this.vY);
  }

  setRadius(radius){
    this.radius = radius;
    this.videoHeight = radius * 2;
    this.videoWidth = (2 * radius) * 16/9;
  }

  getCoords(){
    return [this.x, this.y];
  }
}