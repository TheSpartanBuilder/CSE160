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
        //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(200,200);
        ctx.lineTo(20*v.elements[0]+200,-20*v.elements[1]+200);
        ctx.stroke();
    }

    // Trying the draw the line using Vector 3
    // This is step 2 or part 2
    // var v1 = new Vector3([2.5,2.5,0]);
    // drawVector(v1,'red');


    // Trying to implement the button
    let v1_button = document.getElementById("v1_button");
    v1_button.addEventListener( "click" ,handleDrawEvent);
    //v1_button.onclick(doDraw);

    function handleDrawEvent() {
        // Clear the canvas
        ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a black color
        ctx.fillRect(0, 0, 400, 400); // Fill a rectangle with the color
        // console.log("run");
        const v1_x = document.getElementById("v1_x");
        const v1_y = document.getElementById("v1_y");
        // console.log(v1_x.value);
        // console.log(v1_y.value);
        let v1 = new Vector3([v1_x.value,v1_y.value,0]);
        drawVector(v1,'red');
        // https://stackoverflow.com/questions/71569705/why-eventlistener-reloads-the-page-and-onclick-does-not
        // event.preventDefault();
    }
} 