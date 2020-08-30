const socket = io();

const canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

const colors = ["red", "blue", "green", "lightblue", "black", "orange", "grey"]
const LINEWIDTH = 5;
const STROKECOLOR = colors[Math.floor(Math.random() * colors.length)];

let painting = false;
let x, y, prevX, prevY;

const startPainting = (e) => {
    prevX = e.offsetX;
    prevY = e.offsetY;
    painting = true;
    ctx.beginPath();
}

const endPainting = (e) => {
    painting = false;
}

const draw = (x1, y1, x2, y2, color) => {
    ctx.lineWidth = LINEWIDTH;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    
    ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.beginPath();
}

canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', endPainting);
canvas.addEventListener('mousemove', (e) => {
    if (!painting) return;
    x = e.offsetX;
    y = e.offsetY;
    draw(prevX, prevY, x, y, STROKECOLOR);
    socket.emit('draw', {
        'x1': prevX,
        'y1': prevY,
        'x2': x,
        'y2': y,
        'color': STROKECOLOR
    });
    prevX = x;
    prevY = y;
});

socket.on('draw', (data) => {
    draw(data.x1, data.y1, data.x2, data.y2, data.color);
});