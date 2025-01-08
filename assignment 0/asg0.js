// DrawRectangle.js
// Question for this assignment
/*
1. For the dot and cross function does other1 and other2 mean vector1 and vector2?
2. How do you do cos-1 in js?
3. Do we just assume that all the vector that we will see is 1x3?
*/
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

    let operation_button = document.getElementById("operation_button");
    operation_button.addEventListener( "click" ,handleDrawOperationEvent);

    function handleDrawEvent() {
        // Clear the canvas
        ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a black color
        ctx.fillRect(0, 0, 400, 400); // Fill a rectangle with the color
        // console.log("run");
        const v1_x = document.getElementById("v1_x");
        const v1_y = document.getElementById("v1_y");
        const v2_x = document.getElementById("v2_x");
        const v2_y = document.getElementById("v2_y");
        // console.log(v1_x.value);
        // console.log(v1_y.value);
        let v1 = new Vector3([v1_x.value,v1_y.value,0]);
        let v2 = new Vector3([v2_x.value,v2_y.value,0]);
        drawVector(v1,'red');
        drawVector(v2,'blue');
        // https://stackoverflow.com/questions/71569705/why-eventlistener-reloads-the-page-and-onclick-does-not
        // event.preventDefault();
    }

    function handleDrawOperationEvent() {
        handleDrawEvent();
        const operation = document.getElementById("operations");
        const scalar = document.getElementById("scalar");
        let v3 = new Vector3([v1_x.value,v1_y.value,0]);
        let v4 = new Vector3([v2_x.value,v2_y.value,0]);
        switch(operation.value){
            case "add":
                v3.add(v4);
                drawVector(v3,'green');
                break;
            case "sub":
                v3.sub(v4);
                drawVector(v3,'green');
                break;
            case "mul":
                v3.mul(scalar.value);
                v4.mul(scalar.value);
                drawVector(v3,'green');
                drawVector(v4,'green');
                break;
            case "div":
                v3.div(scalar.value);
                v4.div(scalar.value);
                drawVector(v3,'green');
                drawVector(v4,'green');
                break;
            case "mag":
                console.log("Magnitude v1: " + v3.magnitude());
                console.log("Magnitude v2: " + v4.magnitude());
                break;
            case "nor":
                drawVector(v3.normalize(),'green');
                drawVector(v4.normalize(),'green');
                break;
        }
    }
} 