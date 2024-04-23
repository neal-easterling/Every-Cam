
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

  initStorage(){
    this.hiddenStorage = this.createHiddenStorageEl();
    this.webcamVideoEl = this.createHiddenVideoEl('webcam-video');
    this.displayVideoEl = this.createHiddenVideoEl('display-video');
    this.capturesStorage = document.getElementById('captures-container');
  }

  createHiddenStorageEl(){
    let hidden = document.createElement('div');
    hidden.style.display = 'none';
    hidden.id = 'hidden-storage';
    document.body.appendChild(hidden);
    return hidden;
  }

  createHiddenVideoEl(id){
    const el = document.createElement('video');
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

  returnDownloadVideoEl(urlObj){
    const container = document.createElement('div');
    container.setAttribute('class', 'video-container');

    const video = document.createElement('video');
    video.src = urlObj;
    video.controls = true;
    container.appendChild(video);
    
    const downloadLink = document.createElement('a');
    downloadLink.classList.add('text-btn');
    downloadLink.href = urlObj;
    downloadLink.download = `ecvideo-${Date.now()}.mp4`;
    downloadLink.innerHTML = 'download';
    container.appendChild(downloadLink);

    this.capturesStorage.appendChild(container);
    return container;
  }



}