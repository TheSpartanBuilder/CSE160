class Triangle
{
    constructor(){
        this.type='triangle';
        this.position = [0.0,0.0,0.0];
        this.color = [1.0,1.0,1.0,1.0];
        this.size = 5.0;
        this.textureNum = -2;
      }

      update()
      {
        
      }
    
      render(){
        // Pass the texture number
        gl.uniform1i(u_whichTexture,this.textureNum);
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

    gl.bindBuffer(gl.ARRAY_BUFFER,null);
}


function drawTriangle3D(vertices)
{
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

    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    
    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    // Draw the rectangle
    gl.drawArrays(gl.TRIANGLES, 0, n);

    gl.bindBuffer(gl.ARRAY_BUFFER,null);
}

function drawTriangle3DColor(vertices,color)
{
    var n = 3; // The number of vertices
    
    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }
    
    // Setting the color
    gl.uniform4f(u_FragColor, color[0], color[1], color[2], color[3]);

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    
    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    // Draw the rectangle
    gl.drawArrays(gl.TRIANGLES, 0, n);

    gl.bindBuffer(gl.ARRAY_BUFFER,null);
}

function drawTriangle3DUV(vertices,uv)
{
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

    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    
    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    // Create a buffer object for UV
    var uvBuffer = gl.createBuffer();
    if(!uvBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);

    // Write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.DYNAMIC_DRAW);

    // Assign the buffer object to a_UV variable
    gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0,0);

    // Enable the asignment ot a_Position variable
    gl.enableVertexAttribArray(a_UV);

    // Draw the rectangle
    gl.drawArrays(gl.TRIANGLES, 0, n);

    gl.bindBuffer(gl.ARRAY_BUFFER,null);
}


function drawTriangle3DBatch(vertices)
{
    var n = (vertices.length)/3; // The number of vertices
    // console.log(vertices.length)
    // console.log(n);
    
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

    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    
    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    // Draw the rectangle
    gl.drawArrays(gl.TRIANGLES, 0, n);

    // gl.bindBuffer(gl.ARRAY_BUFFER,null);
}


function drawTriangle3DBatchUV(vertices,uv)
{
    var n = (vertices.length)/3; // The number of vertices
    
    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    // Create a buffer object for UV
    var uvBuffer = gl.createBuffer();
    if(!uvBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }
    
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    
    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);

    // Write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.DYNAMIC_DRAW);

    // Assign the buffer object to a_UV variable
    gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0,0);

    // Enable the asignment ot a_Position variable
    gl.enableVertexAttribArray(a_UV);

    // Draw the rectangle
    gl.drawArrays(gl.TRIANGLES, 0, n);

    gl.bindBuffer(gl.ARRAY_BUFFER,null);
}


function drawTriangle3DBatchColor(vertices,color)
{
    var n = (vertices.length)/3; // The number of vertices
    
    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    // Create a buffer object for UV
    var colorBuffer = gl.createBuffer();
    if(!colorBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }
    
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    
    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    // Write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.DYNAMIC_DRAW);

    // Assign the buffer object to a_UV variable
    gl.vertexAttribPointer(a_Color, 4, gl.FLOAT, false, 0,0);

    // Enable the asignment ot a_Position variable
    gl.enableVertexAttribArray(a_Color);

    // Draw the rectangle
    gl.drawArrays(gl.TRIANGLES, 0, n);

    gl.bindBuffer(gl.ARRAY_BUFFER,null);
}


// var g_vertexBuffer = null;
// function initTriangle3D() {
//     // Create a buffer object
//     g_vertexBuffer = gl.createBuffer();
//     if(!g_vertexBuffer) {
//         console.log('Failed to create the buffer onject');
//         return -1;
//     }

//     // Bind the buffer object to target
//     gl.bindBuffer(gl.ARRAY_BUFFER, g_vertexBuffer);

//     // Assign the buffer object to a_Position variable
//     gl.vertexAttribPointer(a_Position);
// }


// function drawTriangle3DLessBuffer(vertices) {
//     var n = vertices.length/3;

//     if (g_vertexBuffer==null)
//     {
//         initTriangle3D();
//     }
// }