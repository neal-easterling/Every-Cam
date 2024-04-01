
export class DisplayController{

  constructor(){
    this.stream = null;
  }

  async init(){
    try{
      const stream = await navigator.mediaDevices.getDisplayMedia();
      this.stream = stream;
      return stream;
    } catch (err){
      console.log('user did not allow display share:' + err);
    }
  }

}