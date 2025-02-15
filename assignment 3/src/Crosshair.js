/**
 * This class is inspired by
 * https://stackoverflow.com/questions/44541915/javascript-canvas-crosshair-at-center
 * https://www.w3schools.com/jsref/canvas_lineto.asp
 * https://sites.google.com/site/webglbook/home/9-various-techniques
 */
class Crosshair{
    constructor()
    {
        this.hud = document.getElementById('HUD'); 
        this.ctx = this.hud.getContext('2d');
        this.x = this.hud.width / 2;
        this.y = this.hud.height / 2;
        this.size = 1;
        this.ctx.strokeWidth = 1;
    }

    render()
    {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y - 10);
        this.ctx.lineTo(this.x, this.y + 10);

        this.ctx.moveTo(this.x - 10,  this.y);
        this.ctx.lineTo(this.x + 10,  this.y);

        // Line color
        this.ctx.strokeStyle = 'white';

        this.ctx.stroke();
    }

    // render() 
    // {

    //     gl.uniform1i(u_whichTexture,this.textureNum);
    //     let allverts = [
    //         this.x, this.y - 10*this.size,0,        
    //         this.x, this.y + 10*this.size,0,
    //         this.x - 10*this.size,  this.y,0,       
    //         this.x + 10*this.size,  this.y,0
    //     ];

    //     let color = [
    //         1,1,1,1,
    //         1,1,1,1,
    //         1,1,1,1,
    //         1,1,1,1,
    //     ]

    //     // Create a buffer object
    //     var vertexBuffer = gl.createBuffer();
    //     if (!vertexBuffer) {
    //         console.log('Failed to create the buffer object');
    //         return -1;
    //     }

    //     // Create a buffer object for UV
    //     var colorBuffer = gl.createBuffer();
    //     if(!colorBuffer) {
    //         console.log('Failed to create the buffer object');
    //         return -1;
    //     }


    //     // Bind the buffer object to target
    //     gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    //     // Write date into the buffer object
    //     //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    //     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(allverts), gl.DYNAMIC_DRAW);

    //     // Assign the buffer object to a_Position variable
    //     gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
        
    //     // Enable the assignment to a_Position variable
    //     gl.enableVertexAttribArray(a_Position);

    //     // Bind the buffer object to target
    //     gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    //     // Write data into the buffer object
    //     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.DYNAMIC_DRAW);

    //     // Assign the buffer object to a_UV variable
    //     gl.vertexAttribPointer(a_Color, 4, gl.FLOAT, false, 0,0);

    //     // Enable the asignment ot a_Position variable
    //     gl.enableVertexAttribArray(a_Color);

    //     // Draw the rectangle
    //     gl.drawArrays(gl.LINES, 0, 4);

    //     gl.bindBuffer(gl.ARRAY_BUFFER,null);

    //     // gl.deleteBuffer(vertexBuffer);
    //     // gl.deleteBuffer(colorBuffer);
    //     }
}