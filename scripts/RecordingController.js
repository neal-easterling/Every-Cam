
export class RecordingController {

  constructor(){
    this.active = null;
    this.mimeType = 'video/mp4';
    this.blog = null;
  }

  createRecorder(mediaStream){
    //let options = {mimeType: this.mimeType};
    this.active = new MediaRecorder(mediaStream);
    return this.active;
  }

  async combineTracksToStream({videoTracks, audioTracks}){
    const mediaStream = new MediaStream();
    videoTracks.forEach(track=> mediaStream.addTrack(track));
    if(audioTracks) audioTracks.forEach(track=> mediaStream.addTrack(track));
    return mediaStream;
  }

}