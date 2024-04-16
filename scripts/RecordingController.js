
export class RecordingController {

  constructor(){
    this.active = null;
    this.mimeType = 'video/mp4';
  }

  createRecorder(mediaStream){
    //let options = {mimeType: this.mimeType};
    this.active = new MediaRecorder(mediaStream);
  }

  combineTracksToStream(videoTrack, audioTrack){
    const mediaStream = new MediaStream();
    mediaStream.addTrack(videoTrack);
    mediaStream.addTrack(audioTrack);
    return mediaStream;
  }

}