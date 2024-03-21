export class OverlayCam{

  constructor(){
    this.x = 200;
    this.y = 520;
    this.radius = 150;
    this.videoRes = {width: 1280, height: 720};
    this.ctx = null;
  }

  setCoords(cordsObj){
    this.x = cordsObj.x;
    this.y = cordsObj.y;
  }

  drawCircle(videoSource){
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.clip()
    let videoWidth = this.radius * 4;
    let videoHeight = (videoWidth * this.videoRes.height) / this.videoRes.width;
    let startX = this.x - videoWidth / 2;
    let startY = this.y - videoHeight / 2;
    this.ctx.drawImage(videoSource, startX, startY, videoWidth, videoHeight);
    this.ctx.restore();
  }

}