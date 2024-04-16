
export class StorageController{

  constructor(){
    //Offscreen video capture elements
    this.resolution = null;
    this.hiddenStorage = null;
    this.webcamVideoEl = null;
    this.displayVideoEl = null;
    this.capturesStorage = null;
  }

  setResolution(resolution){
    this.resolution = resolution;
  }

  initStorage(resolution){
    this.resolution = resolution;
    this.hiddenStorage = this.createHiddenStorageEl();
    this.webcamVideoEl = this.createHiddenVideoEl('webcam-video', this.resolution);
    this.displayVideoEl = this.createHiddenVideoEl('display-video', this.resolution);
    this.capturesStorage = document.getElementById('captures-container');
  }

  createHiddenStorageEl(){
    let hidden = document.createElement('div');
    hidden.style.display = 'none';
    hidden.id = 'hidden-storage';
    document.body.appendChild(hidden);
    return hidden;
  }

  createHiddenVideoEl(id, resolution){
    const el = document.createElement('video');
    el.width = resolution.width;
    el.height = resolution.height;
    el.id = id;
    el.autoplay = true;
    el.setAttribute('playsinline', true);
    this.hiddenStorage.appendChild(el);
    return el; 
  }
 
  assignWebcamToVideo(stream){
    this.webcamStream = stream;
    this.webcamVideoEl.srcObject = this.webcamStream;
  }

  assignDisplayToVideo(stream){
    this.displayStream = stream;
    this.displayVideoEl.srcObject = this.displayStream;
  }

  returnDownloadImgEl(data){
    const img = document.createElement('img');
    img.setAttribute('src', data);

    const downloadLink = document.createElement('a');
    downloadLink.href = data;
    downloadLink.download = `ecimage-${Date.now()}.png`;
    downloadLink.appendChild(img);

    this.capturesStorage.appendChild(downloadLink);
    return downloadLink;
  }

  returnDownloadVideoEl(data){
    console.log(data);
    const container = document.createElement('div');
    container.setAttribute('class', 'videoDownloadContainer');

    const video = document.createElement('video');
    video.src = data;
    video.controls = true;
    container.appendChild(video);
    console.log(video);

    const downloadLink = document.createElement('a');
    downloadLink.href = data;
    downloadLink.download = `ecvideo-${Date.now()}.mp4`;
    container.appendChild(downloadLink);
    console.log(downloadLink);

    this.capturesStorage.appendChild(container);
    return container;
  }



}