
export class WebcamController{

  constructor(){
    this.stream = null;
    this.constraints = {video: true, audio: false};
  }

  async init(){
    try{
      console.log('getting webcam stream ...');
      const stream = await navigator.mediaDevices.getUserMedia(this.constraints);
      this.stream = stream;
      return stream;
    }catch(err){
      console.log('webcam was not approved by user' + err);
      alert('webcam was not approved by user' + err);
    }
  }
  
  

}