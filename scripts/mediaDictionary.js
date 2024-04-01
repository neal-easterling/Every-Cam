export const mediaDictionary = {

  // getCameraStream : async()=>{
  //     const constraints = {video:true, audio: false};
  //     try{
  //       console.log('getting webcam stream ...');
  //       const stream = await navigator.mediaDevices.getUserMedia(constraints);
  //       return stream;
  //     }catch(err){
  //       console.log('webcam was not approved by user' + err);
  //       alert('webcam was not approved by user' + err);
  //     }
  // },
  // setVideoTrackSize : async (stream) => {
  //   const videoConstraints = {
  //     width: 640,
  //     height: 360
  //   };
  //   //Get Video Track from stream
  //   const vTrack = stream.getVideoTracks()[0];
  //   try{
  //     const setVideo = await vTrack.applyConstraints(videoConstraints);
  //   }catch(err){
  //     console.log('track size was rejected: ' + err);
  //   }
  //},
  // setVideoSourceToStream : async(videoEl)=>{
  //   const stream = await MediaController.getCameraStream();
  //   const videoSet = await MediaController.setVideoTrackSize(stream);
  //   videoEl.srcObject = stream;
  //   videoEl.addEventListener('loadedmetadata', ()=> videoEl.play());
  // },
  // takeScreenshot : (canvas, video)=>{
  //   const context = canvas.getContext('2d');
  //   const videoBox = video.getBoundingClientRect();
  //   context.drawImage(video, 0, 0, videoBox.width, videoBox.height);
  //   const data = canvas.toDataURL('image/png');
  //   return data;
  // },
  // addPhoto : (elements)=>{
  //   const img = document.createElement('img');
  //   const data = MediaController.takeScreenshot(elements.canvas, elements.videoWeb);
  //   img.setAttribute('src', data);
  //   const downloadLink = document.createElement('a');
  //   downloadLink.href = data;
  //   downloadLink.download = `screenshot-${Date.now()}.png`;
  //   downloadLink.appendChild(img);
  //   elements.photoContainer.appendChild(downloadLink);
  // },
//   enterFullscreen : async(element)=>{
//     try{
//       element.requestFullscreen();
//     }catch(err){
//       console.log(err);
//     }
//   }
// }