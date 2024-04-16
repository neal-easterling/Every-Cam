
export class WebcamController{

  constructor(){
    this.stream = null;
    this.available = false;
    this.constraints = {video: true, audio: true};
  }

  async init(){
    try{
      console.log('getting webcam stream ...');
      const stream = await navigator.mediaDevices.getUserMedia(this.constraints);
      this.stream = stream;
      this.available = true;
      this.stream.getVideoTracks()[0].addEventListener('ended',()=>{
        this.available = false;
      });
      return stream;
    }catch(err){
      console.log('webcam was not approved by user' + err);
      alert('webcam was not approved by user' + err);
    }
  }

  getVideoTrack(){
    if(this.available){
      return this.stream.getVideoTracks()[0];
    } else {
      console.log("webcam stream not available");
    }
  }

  getAudioTrack(){
    if(this.available){
      return this.stream.getAudioTracks()[0];
    } else {
      console.log("webcam stream not available");
    }
  }
  
  

}