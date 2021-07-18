'use strict';

const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 50;
ctx.globalCompositeOperation = 'multiply';

button.addEventListener('click', function() {
    ctx.globalCompositeOperation = 'normal';
    button.style.display = 'none';
});

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

let colorChanged = false;
let widthChanged = false;

function draw(event) {
    if (!isDrawing) return;
    // console.log(event);
    if (!colorChanged) {
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    }
    ctx.beginPath();
    ctx.moveTo(lastX, lastY); // start from
    ctx.lineTo(event.offsetX, event.offsetY); // go to
    ctx.stroke();

    lastX = event.offsetX;
    lastY = event.offsetY;

    if (!colorChanged) {
        hue++;
        if (hue >= 360) {
            hue = 0;
        }
    
    }

    if (!widthChanged) {
        if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
            direction = !direction;
        } 
        if (direction) {
            ctx.lineWidth++;
        } else {
            ctx.lineWidth--;
        }
    }
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', function(event) {
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
});
canvas.addEventListener('mouseout', () => isDrawing = false ); // если  
// пользователь нажмет и выведет мышь за пределы экрана, то по возвращании 
//даже с ненажатой кнопкой мыши isDrawing останется true
canvas.addEventListener('mouseup', () => isDrawing = false );

document.onmousedown = function(event) {
    if (event.target.tagName !== 'INPUT') event.preventDefault();
}

change.addEventListener('click', function() {
    colorChanged = true;
    ctx.strokeStyle = `${input.value}`;
    if (input.value === 'colorful') colorChanged = false;
    input.value = '';
});

change2.addEventListener('click', function() {
    widthChanged = true;
    if (input2.value <= 1000) {
        ctx.lineWidth = +input2.value;
    }
    input2.value = '';
});