class CubeTexture extends Cube {
    constructor(){
        super();
    }

    render(){
      // Draw
      // var offset = this.size/200.0;
      
      //Reference
      //https://www.math.brown.edu/tbanchof/Beyond3d/Images/chapter8/image04.jpg
      
      // Pass the matrix to u_ModelMatrix attribute
      gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

      // Pass the color of a point to u_FragColor variable
      gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);

      //Front of cube
      drawTriangle3DUV( [0,0,0,  1,1,0,  1,0,0], [0,0, 1,1, 1,0]);
      drawTriangle3DUV( [0.0,0.0,0.0,  0.0,1.0,0.0, 1.0,1.0,0.0],[0,0, 0,1, 1,1]);

      // Pass the color of a point to u_FragColor uniform variable
      gl.uniform4f(u_FragColor,this.color[0]*.95,this.color[1]*.95,this.color[2]*.95,this.color[3]);
      // gl.uniform4f(u_FragColor,1,1,1,1);

      drawTriangle3DUV( [0,1,0,   0,1,1,   1,1,1],[0,0, 0,1, 1,1]);
      drawTriangle3DUV( [0,1,0,   1,1,1,   1,1,0],[0,0, 1,1, 1,0]);

      // Pass the color of a point to u_FragColor uniform variable
      gl.uniform4f(u_FragColor,this.color[0]*.8,this.color[1]*.9,this.color[2]*.9,this.color[3]);
      // gl.uniform4f(u_FragColor,0.5,1,1,1);

      drawTriangle3DUV( [1,0,1,   0,0,1,   0,0,0],[1,1, 0,1, 0,0]);
      drawTriangle3DUV( [0,0,0,   1,0,0,   1,0,1],[0,0, 1,0, 1,1]);

      // Pass the color of a point to u_FragColor uniform variable
      gl.uniform4f(u_FragColor,this.color[0]*.8,this.color[1]*.8,this.color[2]*.8,this.color[3]);
      // gl.uniform4f(u_FragColor,0.5,0.5,1,1);

      drawTriangle3DUV( [1,0,1,   1,1,1,   0,1,1],[1,0, 1,1, 0,1]);
      drawTriangle3DUV( [0,1,1,   0,0,1,   1,0,1],[0,1, 0,0, 1,0]);

      // Pass the color of a point to u_FragColor uniform variable
      gl.uniform4f(u_FragColor,this.color[0]*.75,this.color[1]*.75,this.color[2]*.75,this.color[3]);
      // gl.uniform4f(u_FragColor,0.5,0.5,0.5,1);

      drawTriangle3DUV( [1,1,1,   1,0,1,   1,0,0],[1,1, 0,1, 0,0]);
      drawTriangle3DUV( [1,0,0,   1,1,0,   1,1,1],[0,0, 1,0, 1,1]);

      // Pass the color of a point to u_FragColor uniform variable
      gl.uniform4f(u_FragColor,this.color[0]*.75,this.color[1]*.75,this.color[2]*.75,this.color[3]*.75);
      // gl.uniform4f(u_FragColor,0,0,0,1);
      drawTriangle3DUV( [0,0,1,   0,1,1,   0,1,0],[0,1, 1,1, 1,0]);
      drawTriangle3DUV( [0,1,0,   0,0,0,   0,0,1],[1,0, 0,0, 0,1]);
    }
}