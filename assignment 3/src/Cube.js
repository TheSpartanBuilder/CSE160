// Class Circle
class Cube{
    constructor(){
      this.type='cube';
      //this.position = [0.0,0.0,0.0];
      this.color = [1.0,1.0,1.0,1.0];
      //this.size = 5.0;
      //this.segments = 10;
      this.matrix = new Matrix4();
      this.textureNum = -2;
    }

    update(){
      
    }

    render(){
      drawCube(this.matrix,this.color);
    }
  
    renderOld(){
      // Draw
      // var offset = this.size/200.0;
      
      //Reference
      //https://www.math.brown.edu/tbanchof/Beyond3d/Images/chapter8/image04.jpg

      // Pass the texture number
      gl.uniform1i(u_whichTexture,this.textureNum);
      
      // Pass the matrix to u_ModelMatrix attribute
      gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

      // Pass the color of a point to u_FragColor variable
      gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);

      //Front of cube
      drawTriangle3D( [0.0,0.0,0.0,  1.0,1.0,0.0, 1.0,0.0,0.0]);
      drawTriangle3D( [0.0,0.0,0.0,  0.0,1.0,0.0, 1.0,1.0,0.0]);

      // Pass the color of a point to u_FragColor uniform variable
      gl.uniform4f(u_FragColor,this.color[0]*.95,this.color[1]*.95,this.color[2]*.95,this.color[3]);
      // gl.uniform4f(u_FragColor,1,1,1,1);

      drawTriangle3D( [0,1,0,   0,1,1,   1,1,1]);
      drawTriangle3D( [0,1,0,   1,1,1,   1,1,0]);

      // Pass the color of a point to u_FragColor uniform variable
      gl.uniform4f(u_FragColor,this.color[0]*.8,this.color[1]*.9,this.color[2]*.9,this.color[3]);
      // gl.uniform4f(u_FragColor,0.5,1,1,1);

      drawTriangle3D( [1,0,1,   0,0,1,   0,0,0]);
      drawTriangle3D( [0,0,0,   1,0,0,   1,0,1]);

      // Pass the color of a point to u_FragColor uniform variable
      gl.uniform4f(u_FragColor,this.color[0]*.8,this.color[1]*.8,this.color[2]*.8,this.color[3]);
      // gl.uniform4f(u_FragColor,0.5,0.5,1,1);

      drawTriangle3D( [1,0,1,   1,1,1,   0,1,1]);
      drawTriangle3D( [0,1,1,   0,0,1,   1,0,1]);

      // Pass the color of a point to u_FragColor uniform variable
      gl.uniform4f(u_FragColor,this.color[0]*.75,this.color[1]*.75,this.color[2]*.75,this.color[3]);
      // gl.uniform4f(u_FragColor,0.5,0.5,0.5,1);

      drawTriangle3D( [1,1,1,   1,0,1,   1,0,0]);
      drawTriangle3D( [1,0,0,   1,1,0,   1,1,1]);

      // Pass the color of a point to u_FragColor uniform variable
      gl.uniform4f(u_FragColor,this.color[0]*.75,this.color[1]*.75,this.color[2]*.75,this.color[3]*.75);
      // gl.uniform4f(u_FragColor,0,0,0,1);
      drawTriangle3D( [0,0,1,   0,1,1,   0,1,0]);
      drawTriangle3D( [0,1,0,   0,0,0,   0,0,1]);
    }
  }

  function drawCube(M,color){
    // Draw
    // var offset = this.size/200.0;
    
    //Reference
    //https://www.math.brown.edu/tbanchof/Beyond3d/Images/chapter8/image04.jpg
    
    // Pass the matrix to u_ModelMatrix attribute
    gl.uniformMatrix4fv(u_ModelMatrix, false, M.elements);

    // Pass the color of a point to u_FragColor variable
    let color0 = [color[0],color[1],color[2],color[3]];

    //Front of cube
    drawTriangle3DColor( [0.0,0.0,0.0,  1.0,1.0,0.0, 1.0,0.0,0.0],color);
    drawTriangle3DColor( [0.0,0.0,0.0,  0.0,1.0,0.0, 1.0,1.0,0.0],color);

    let color1 = [color[0]*0.95,color[1]*0.95,color[2]*0.95,color[3]];

    drawTriangle3DColor( [0,1,0,   0,1,1,   1,1,1],color1);
    drawTriangle3DColor( [0,1,0,   1,1,1,   1,1,0],color1);

    // Pass the color of a point to u_FragColor uniform variable
    let color2 = [color[0]*0.9,color[1]*0.9,color[2]*0.9,color[3]];
    // gl.uniform4f(u_FragColor,0.5,1,1,1);

    drawTriangle3DColor( [1,0,1,   0,0,1,   0,0,0],color2);
    drawTriangle3DColor( [0,0,0,   1,0,0,   1,0,1],color2);

    let color3 = [color[0]*0.85,color[1]*0.85,color[2]*0.85,color[3]];

    drawTriangle3DColor( [1,0,1,   1,1,1,   0,1,1],color3);
    drawTriangle3DColor( [0,1,1,   0,0,1,   1,0,1],color3);

    let color4 = [color[0]*0.8,color[1]*0.8,color[2]*0.8,color[3]];

    drawTriangle3DColor( [1,1,1,   1,0,1,   1,0,0],color4);
    drawTriangle3DColor( [1,0,0,   1,1,0,   1,1,1],color4);

    let color5 = [color[0]*0.75,color[1]*0.75,color[2]*0.75,color[3]];
    
    drawTriangle3DColor( [0,0,1,   0,1,1,   0,1,0],color5);
    drawTriangle3DColor( [0,1,0,   0,0,0,   0,0,1],color5);
  }