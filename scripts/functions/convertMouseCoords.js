
export function convertMouseCoords(x,y,el,width, height){
  const boundingRect = el.getBoundingClientRect();
  const smWidth = boundingRect.width;
  const smHeight = boundingRect.height;
  const left = boundingRect.left;
  const top = boundingRect.top;
  const newX = (width * (x - left))/smWidth;
  const newY = (height * (y - top))/smHeight;
  return[newX, newY];
}