import { App } from "./scripts/App.js";
import { UIHandler } from "./scripts/Classes/UIHandler.js";

window.onload = ()=>{

  const app = new App();
  setInterval(()=>{
    app.render();
  }, 1000 / app.framerate);
  const ui = new UIHandler(app);

}





 
