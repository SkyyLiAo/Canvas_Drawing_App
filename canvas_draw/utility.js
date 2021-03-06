import Point from './point.model.js'

export function getMouseCoorOnCanvas(e, canvas){
    let rect = canvas.getBoundingClientRect(); //return the size relative to the position
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    return new Point(x,y);
}