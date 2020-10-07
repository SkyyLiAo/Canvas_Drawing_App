import {TOOL_PENCIL, TOOL_ERASER} from './tool.class.js';
import Paint from './paint.class.js';

//paint class
var paint = new Paint("canvas"); 
paint.activeTool = TOOL_PENCIL; //set default
paint.lineWidth = 1;
paint.activeColor = "#000000"; 
paint.init();

document.querySelectorAll("[data-command").forEach(
    item => {
        item.addEventListener("click", e =>{
            let command = item.getAttribute("data-command");

            if(command == "undo"){
                paint.undoPaint();
            }else if(command = "download"){
                var canvas = document.getElementById("canvas");
                var image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
                var link = document.createElement("a");
                link.download = "my.image.png";
                link.href = image;
                link.click();
            }
        });
    }
)

//change active status
document.querySelectorAll("[data-tool").forEach(
    item => {
        item.addEventListener("click", e => {
            //remove the current active one
            document.querySelector("[data-tool].active").classList.toggle("active");
            //add new active tool if there is no active
            item.classList.toggle("active");

            let selectedTool = item.getAttribute("data-tool");
            paint.activeTool = selectedTool;
        
            switch(selectedTool){
                case TOOL_PENCIL:
                    //activate linewidths group
                    document.querySelector(".group.linewidth").style.display="block";
                    break; 
                case TOOL_ERASER:
                    //hide linewidths group
                    document.querySelector(".group.linewidth").style.display="none";
                    break;
            }
        });
    }
)
document.querySelectorAll("[data-line-width").forEach(
    item => {
        item.addEventListener("click", e =>{
            document.querySelector("[data-line-width].active").classList.toggle("active");
            item.classList.toggle("active");

            let linewidth = item.getAttribute("data-line-width");
            paint.lineWidth = linewidth;
        });
    }
)
document.querySelectorAll("[data-color").forEach(
    item => {
        item.addEventListener("click", e =>{
            document.querySelector("[data-color].active").classList.toggle("active");
            item.classList.toggle("active");

            let Color = item.getAttribute("data-color");
            paint.activeColor = Color;
        });
    }
)