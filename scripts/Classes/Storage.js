
export class Storage{

  constructor(){
    //Offscreen video capture elements
    this.resolution = null;
    this.hiddenStorage = null;
    this.webcamVideoEl = null;
    this.displayVideoEl = null;
    this.hiddenCanvas = null;
    this.capturesStorage = null;
  }

  setResolution(resolution){
    this.resolution = resolution;
  }

  initStorage(){
    this.hiddenStorage = this.createHiddenStorageEl();
    this.webcamVideoEl = this.createHiddenVideoEl('webcam-video');
    this.displayVideoEl = this.createHiddenVideoEl('display-video');
    this.hiddenCanvas = this.createHiddenCanvas('hidden-canvas');
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

  createHiddenCanvas(id){
    const canvas = document.createElement('canvas');
    canvas.id = id;
    this.hiddenStorage.appendChild(canvas);
    return canvas;
  }
 
  assignWebcamToVideo(stream){
    this.webcamStream = stream;
    this.webcamVideoEl.srcObject = this.webcamStream;
  }

  assignDisplayToVideo(stream){
    this.displayStream = stream;
    this.displayVideoEl.srcObject = this.displayStream;
  }

  returnDownloadMediaEl(urlObj, type='video'){
    console.log(urlObj, type);
    const container = document.createElement('div');
    container.setAttribute('class', 'media-container');

    const media = document.createElement(type);
    media.src = urlObj;
    if(type == 'video') media.controls = true;
    container.appendChild(media);
    
    const downloadLink = document.createElement('a');
    downloadLink.classList.add('text-btn');
    downloadLink.href = urlObj;
    let fileExtension = '.mp4';
    if(type=='img') fileExtension = '.png';
    downloadLink.download = `ec${type}-${Date.now()}${fileExtension}`;
    downloadLink.innerHTML = 'download';
    container.appendChild(downloadLink);

    this.capturesStorage.appendChild(container);
    return container;
  }

}