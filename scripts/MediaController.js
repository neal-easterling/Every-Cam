
export class MediaController{

  constructor(type){
    this.type = type.toLowerCase();
    this.stream = null;
    this.available = false;
    this.constraints = {
      video: this.type == 'video' ? true:false, 
      audio: this.type == 'audio' ? true:false
    };
  }

  async init(){
    try{
      console.log(`getting ${this.type} stream ...`);
      const stream = await navigator.mediaDevices.getUserMedia(this.constraints);
      this.stream = stream;
      this.available = true;
      this.stream.getTracks()[0].addEventListener('ended',()=>{
        this.available = false;
      });
      return stream;
    }catch(err){
      console.log(`${this.type} was not approved by user ${err}`);
      alert(`${this.type} was not approved by user ${err}`);
    }
  }

  getVideoTracks(){
    if(this.available){
      return this.stream.getVideoTracks();
    } else {
      console.log("video tracks not available");
    }
  }

  getAudioTracks(){
    if(this.available){
      return this.stream.getAudioTracks();
    } else {
      console.log("audio tracks not available");
    }
  }
  
  

}