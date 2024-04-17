
export class RecordingController {

  constructor(){
    this.active = null;
    this.mimeType = 'video/webm';
    this.blog = null;
  }

  createRecorder(mediaStream){
    this.active = new MediaRecorder(mediaStream, {mimeType: this.mimeType});
    return this.active;
  }

  async combineTracksToStream({videoTracks, audioTracks}){
    const mediaStream = new MediaStream();
    videoTracks.forEach(track=> mediaStream.addTrack(track));
    if(audioTracks) audioTracks.forEach(track=> mediaStream.addTrack(track));
    return mediaStream;
  }

}