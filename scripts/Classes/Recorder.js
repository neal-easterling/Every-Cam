
export class Recorder {

  constructor(){
    this.active = null;
  }

  createRecorder(mediaStream){
    this.active = new MediaRecorder(mediaStream);
    return this.active;
  }

  async combineTracksToStream({videoTracks, audioTracks}){
    const mediaStream = new MediaStream();
    videoTracks.forEach(track=>{
      mediaStream.addTrack(track);
      //console.log("main track" + track);
    });
    
    if(audioTracks) audioTracks.forEach(track=> mediaStream.addTrack(track));
    return mediaStream;
  }

  convertBlobToMP4(buffer){
    const blob = new Blob(buffer, {type: 'video/mp4'});
    return blob;
  }

  handleRecording(e, storage){
    const buffer = [];
    buffer.push(e.data);
    const blob = this.convertBlobToMP4(buffer);
    const urlObj = window.URL.createObjectURL(blob);
    storage.returnDownloadMediaEl(urlObj, 'video');
  }

}