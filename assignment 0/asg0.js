// DrawRectangle.js
function main() {
    // Retrieve <canvas> element
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    // Get the rendering context for 2DCG
    var ctx = canvas.getContext('2d');

    // Draw a blue rectangle
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a black color
    ctx.fillRect(0, 0, 400, 400); // Fill a rectangle with the color

    function drawVector(v,color)
    {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(200,200);
        ctx.lineTo(20*v.elements[0]+200,-20*v.elements[1]+200);
        ctx.stroke();
    }

    // Trying the draw the line using Vector 3
    var v1 = new Vector3([2.5,2.5,0]);
    drawVector(v1,'red');
} 