import { App } from "./scripts/App.js";
import { UIHandler } from "./scripts/Classes/UIHandler.js";
let app;

window.onload = ()=>{

  app = new App();
  setInterval(()=>{
    app.render();
  }, 1000 / app.framerate);
  const ui = new UIHandler(app);

}

window.onresize = ()=>{
  app.whiteboard.handleResize();
}





 
