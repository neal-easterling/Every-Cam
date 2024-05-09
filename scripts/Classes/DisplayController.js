
export class DisplayController{

  constructor(){
    this.stream = null;
    this.available = false;
  }

  async init(){
    try{
      const stream = await navigator.mediaDevices.getDisplayMedia();
      this.stream = stream;
      this.available = true;
      this.stream.getVideoTracks()[0].addEventListener('ended', ()=>{
        this.available = false;
      });
      return stream;
    } catch (err){
      console.log('user did not allow display share:' + err);
    }
  }
}