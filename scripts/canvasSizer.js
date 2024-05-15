

//if there is not 150px between main-container & canvas, reduce width by 5%: recursive call
export const canvasSizer = ({containerId, canvasId}) =>{

  const container = document.getElementById(containerId);
  const containerRect = container.getBoundingClientRect();
  const canvas = document.getElementById(canvasId);
  const canvasRect = canvas.getBoundingClientRect();
  
  const isEnoughSpace = ()=>{
    const containerRect = container.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    if(containerRect.bottom > canvasRect.bottom + 80){
      console.log(true);
      return true;
    } else {
      console.log(false);
      return false;
    }
  }

  async function reduceWidth(width){
    let condition = isEnoughSpace();
    if(condition){
      console.log('just returned');
      return;
    }else{
      canvas.style.width = `${width}%`;
      console.log(width);
      reduceWidth(width - 5)
    }
  }

  reduceWidth(80);

}