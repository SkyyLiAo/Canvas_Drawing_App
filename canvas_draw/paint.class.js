import Point from './point.model.js'
import {TOOL_PENCIL, TOOL_ERASER} from './tool.class.js';
import {getMouseCoorOnCanvas} from './utility.js';

export default class Paint{
    
    constructor(canvasID){
        this.canvas = document.getElementById(canvasID);
        this.context = canvas.getContext("2d");
        this.undoStack = [];
        this.undoLimit = 3;
    }

    //set activeTool
    set activeTool(tool){
        this.tool = tool;
    }

    set lineWidth(linewidth){
        this._lineWidth = linewidth;
        this.context.lineWidth = this._lineWidth;
    }

    set activeColor(color){
        this._color = color;
        this.context.strokeStyle = this._color;
    }

    //EventListener
    init(){
        this.canvas.onmousedown = e => this.onMouseDown(e);
    }

    onMouseDown(e){
        this.canvas.onmousemove = e => this.onMouseMove(e);
        document.onmouseup = e => this.onMouseUp(e);//use document since may up mouse outside the canvas

        this.savedData = this.context.getImageData(0,0,canvas.clientWidth, canvas.clientHeight);
        
        //remove the oldest image and push the newest image into the stack
        if(this.undoStack.length>=this.undoLimit) this.undoStack.shift();
        this.undoStack.push(this.savedData);

        this.startPos = getMouseCoorOnCanvas(e, this.canvas);
        
        if(this.tool == TOOL_PENCIL){
            this.context.beginPath();
            this.context.moveTo(this.startPos.x, this.startPos.y);
        }else if(this.tool == TOOL_ERASER){
            this.context.clearRect(this.startPos.x, this.startPos.y, 5, 5);
        }
    }

    onMouseMove(e){
        
        this.currentPos = getMouseCoorOnCanvas(e, this.canvas);
        
        switch(this.tool){
            case TOOL_PENCIL:
                this.drawFreeline(this._lineWidth, this._color);
                break;
            case TOOL_ERASER:
                this.context.clearRect(this.currentPos.x, this.currentPos.y, 5, 5);
                break;
            default:
                break;
        }
    }
    
    onMouseUp(e){
        this.canvas.onmousemove = null;
        document.onmouseup = null;
    }

    drawFreeline(lineWidth, color){
        this.context.lineWidth = lineWidth;
        this.context.color = color;
        this.context.lineTo(this.currentPos.x, this.currentPos.y);
        this.context.stroke();
    }
    
    undoPaint(){
        if(this.undoStack.length>0){
            this.context.putImageData(this.undoStack[this.undoStack.length-1],0,0);
            this.undoStack.pop();
        }else{
            alert("No Undo Available");
        }
    }

}


