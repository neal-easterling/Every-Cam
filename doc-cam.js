const constraints = {video: true, audio: true};

let camButton, camVideo;
let photoButton, canvas, photoContainer;
let viewSidebar, closeSidebar, sidebar;


function setWebCam(){
  console.log("cam triggered");
  camVideo.muted = true;
  navigator.mediaDevices.getUserMedia(constraints)
  .then((stream) => {

    // Changing the source of video to current stream.
    camVideo.srcObject = stream;
    camVideo.addEventListener("loadedmetadata", () => {
        camVideo.play();
    });
  }).catch(alert); 
}

const takeScreenshot= ()=>{
  const context = canvas.getContext('2d');
  context.drawImage(camVideo, 0, 0, videoBox.width, videoBox.height);
  const data = canvas.toDataURL('image/png');
  return data;
}

window.onload = (event)=>{

  camVideo = document.getElementById("cam");
  camButton = document.getElementById('cam-but');
  photoButton = document.getElementById('take-photo-button');
  canvas = document.getElementById('canvas');
  photoContainer = document.getElementById('screenshot-container');
  viewSidebar = document.getElementById('toggle-sidebar-button');
  closeSidebar = document.getElementById('close-sidebar-button');
  sidebar = document.getElementById('sidebar');
  let videoBox = camVideo.getBoundingClientRect();

  canvas.setAttribute('width', videoBox.width);
  canvas.setAttribute('height', videoBox.height);

  camButton.addEventListener('click',(e)=>{
    setWebCam();
    camButton.style.display='none';
  });

  viewSidebar.addEventListener('click', (e)=>{
    sidebar.classList.toggle('active');
  });
  
  closeSidebar.addEventListener('click', (e)=>{
    sidebar.classList.toggle('active');
  });

  function takeScreenshot(){
    const context = canvas.getContext('2d');
    context.drawImage(camVideo, 0, 0, videoBox.width, videoBox.height);
    const data = canvas.toDataURL('image/png');
    return data;
  }

  let img = document.getElementById('test-img');
  
  photoButton.addEventListener('click', (e)=>{
    let photo = takeScreenshot();
    img.setAttribute('src', photo);
  });
  
  




}





 
