class Triangle
{
    constructor(){
        this.type='triangle';
        this.position = [0.0,0.0,0.0];
        this.color = [1.0,1.0,1.0,1.0];
        this.size = 5.0;
      }

      update()
      {
        
      }
    
      render(){
        // Pass the size of a point to u_Size variable
        gl.uniform1f(u_Size,this.size);
        // Pass the position of a point to a_Position variable
        // gl.vertexAttrib3f(a_Position, this.position[0], this.position[1], 0.0);
        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);
        // Draw
        let offset = this.size/200.0;
        drawTriangle([this.position[0],this.position[1],this.position[0]+offset,this.position[1],this.position[0],this.position[1]+offset]);
      }
}

function drawTriangle(vertices)
{
    /*
            var vertices = new Float32Array([
                0, 0.5,   -0.5, -0.5,   0.5, -0.5
            ]);
            */
            var n = 3; // The number of vertices
            
            // Create a buffer object
            var vertexBuffer = gl.createBuffer();
            if (!vertexBuffer) {
                console.log('Failed to create the buffer object');
                return -1;
            }
            
            // Bind the buffer object to target
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            // Write date into the buffer object
            //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
            
            /*
            var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
            if (a_Position < 0) {
                console.log('Failed to get the storage location of a_Position');
                return -1;
            }
            */

            // Assign the buffer object to a_Position variable
            gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
            
            // Enable the assignment to a_Position variable
            gl.enableVertexAttribArray(a_Position);

            // Draw the rectangle
            gl.drawArrays(gl.TRIANGLES, 0, n);
}