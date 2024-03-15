
function setWebCam(videoElement){
  const constraints = {video: true, audio: true};
  console.log("cam triggered");
  videoElement.muted = true;
  navigator.mediaDevices.getUserMedia(constraints)
  .then((stream) => {

    // Changing the source of video to current stream.
    videoElement.srcObject = stream;
    videoElement.addEventListener("loadedmetadata", () => {
        videoElement.play();
    });
  }).catch(alert); 
}

const takeScreenshot= (canvas, video)=>{
  const context = canvas.getContext('2d');
  const videoBox = video.getBoundingClientRect();
  context.drawImage(video, 0, 0, videoBox.width, videoBox.height);
  const data = canvas.toDataURL('image/png');
  return data;
}

const addPhoto = (elements)=>{
  const img = document.createElement('img');
  const data = takeScreenshot(elements.canvas, elements.video);
  img.setAttribute('src', data);
  const downloadLink = document.createElement('a');
  downloadLink.href = data;
  downloadLink.download = `screenshot-${Date.now()}.png`;
  downloadLink.appendChild(img);
  elements.photoContainer.appendChild(downloadLink);
}

window.onload = ()=>{

  const elements = {
    video: document.getElementById("video"),
    videoButton: document.getElementById('video-button'),
    photoButton: document.getElementById('take-photo-button'),
    photoContainer: document.getElementById('photo-container'),
    clearPhotosButton: document.getElementById('clear-photos-button'),
    canvas: document.getElementById('canvas'),
    sidebar: document.getElementById('sidebar'),
    viewSidebarButton: document.getElementById('toggle-sidebar-button'),
    closeSidebarButton: document.getElementById('close-sidebar-button')
  };

  

  elements.videoButton.addEventListener('click',()=>{
    setWebCam(elements.video);
    elements.videoButton.style.display='none';
  });

  elements.viewSidebarButton.addEventListener('click', ()=>{
    elements.sidebar.classList.toggle('active');
  });
  
  elements.closeSidebarButton.addEventListener('click', ()=>{
    elements.sidebar.classList.toggle('active');
  });

  
  elements.photoButton.addEventListener('click', ()=>{
    elements.canvas.setAttribute('width', elements.video.getBoundingClientRect().width);
    elements.canvas.setAttribute('height', elements.video.getBoundingClientRect().height);
    addPhoto(elements);
  });

  elements.clearPhotosButton.addEventListener('click', ()=>{
    elements.photoContainer.innerHTML = '';
  });
  
}





 
