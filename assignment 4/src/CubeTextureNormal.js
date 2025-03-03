class CubeTextureNormal extends CubeTexture {
    constructor(image_source = null,u_SamplerX = null,textureID = null,gl_TEXTURE = null)
    {
        super(image_source,u_SamplerX,textureID,gl_TEXTURE);
        this.textureNum = -3;
    }

    render(){
        // Draw
        // var offset = this.size/200.0;
        
        //Reference
        //https://www.math.brown.edu/tbanchof/Beyond3d/Images/chapter8/image04.jpg
  
        // Pass the texture number
        gl.uniform1i(u_whichTexture,this.textureNum);
        gl.uniform1i(u_TextureNum,this.textureID);
  
        // if(this.textureID == 0)
        //   {
        //     gl.activeTexture(gl.TEXTURE0);
        //   }
        //   else if(this.textureID == 1)
        //   {
        //     gl.activeTexture(gl.TEXTURE1);
        //   }
        gl.activeTexture(this.gl_TEXTURE);
        gl.bindTexture(gl.TEXTURE_2D,this.texture)
        
        // Pass the matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        // Pass the matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_NormalMatrix,false, new Matrix4().setInverseOf(this.matrix).transpose().elements);
  
        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);
  
        //Front of cube
        drawTriangle3DUVNormal( [0,0,0,  1,1,0,  1,0,0], [0,0, 1,1, 1,0], [0,0,-1, 0,0,-1, 0,0,-1]);
        drawTriangle3DUVNormal( [0.0,0.0,0.0,  0.0,1.0,0.0, 1.0,1.0,0.0],[0,0, 0,1, 1,1],[0,0,-1, 0,0,-1, 0,0,-1]);
  
        // Pass the color of a point to u_FragColor uniform variable
        gl.uniform4f(u_FragColor,this.color[0]*.95,this.color[1]*.95,this.color[2]*.95,this.color[3]);
        // gl.uniform4f(u_FragColor,1,1,1,1);
  
        drawTriangle3DUVNormal( [0,1,0,   0,1,1,   1,1,1],[0,0, 0,1, 1,1],[0,1,0, 0,1,0, 0,1,0]);
        drawTriangle3DUVNormal( [0,1,0,   1,1,1,   1,1,0],[0,0, 1,1, 1,0],[0,1,0, 0,1,0, 0,1,0]);
  
        // Pass the color of a point to u_FragColor uniform variable
        gl.uniform4f(u_FragColor,this.color[0]*.8,this.color[1]*.9,this.color[2]*.9,this.color[3]);
        // gl.uniform4f(u_FragColor,0.5,1,1,1);
  
        drawTriangle3DUVNormal( [1,0,1,   0,0,1,   0,0,0],[1,1, 0,1, 0,0],[0,-1,0, 0,-1,0, 0,-1,0]);
        drawTriangle3DUVNormal( [0,0,0,   1,0,0,   1,0,1],[0,0, 1,0, 1,1],[0,-1,0, 0,-1,0, 0,-1,0]);
  
        // Pass the color of a point to u_FragColor uniform variable
        gl.uniform4f(u_FragColor,this.color[0]*.8,this.color[1]*.8,this.color[2]*.8,this.color[3]);
        // gl.uniform4f(u_FragColor,0.5,0.5,1,1);
  
        drawTriangle3DUVNormal( [1,0,1,   1,1,1,   0,1,1],[1,0, 1,1, 0,1],[0,0,1, 0,0,1, 0,0,1]);
        drawTriangle3DUVNormal( [0,1,1,   0,0,1,   1,0,1],[0,1, 0,0, 1,0],[0,0,1, 0,0,1, 0,0,1]);
  
        // Pass the color of a point to u_FragColor uniform variable
        gl.uniform4f(u_FragColor,this.color[0]*.75,this.color[1]*.75,this.color[2]*.75,this.color[3]);
        // gl.uniform4f(u_FragColor,0.5,0.5,0.5,1);
  
        drawTriangle3DUVNormal( [1,1,1,   1,0,1,   1,0,0],[1,1, 0,1, 0,0],[1,0,0, 1,0,0, 1,0,0]);
        drawTriangle3DUVNormal( [1,0,0,   1,1,0,   1,1,1],[0,0, 1,0, 1,1],[1,0,0, 1,0,0, 1,0,0]);
  
        // Pass the color of a point to u_FragColor uniform variable
        gl.uniform4f(u_FragColor,this.color[0]*.75,this.color[1]*.75,this.color[2]*.75,this.color[3]*.75);
        // gl.uniform4f(u_FragColor,0,0,0,1);
        drawTriangle3DUVNormal( [0,0,1,   0,1,1,   0,1,0],[0,1, 1,1, 1,0],[-1,0,0, -1,0,0, -1,0,0]);
        drawTriangle3DUVNormal( [0,1,0,   0,0,0,   0,0,1],[1,0, 0,0, 0,1],[-1,0,0, -1,0,0, -1,0,0]);
      }
  
      renderFaster() {
        var rgba = this.color;
        // Pass the texture number
        gl.uniform1i(u_whichTexture,this.textureNum);
        gl.uniform1i(u_TextureNum,this.textureID);
  
        // Pass the matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
  
        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);
  
        var allverts = [
            0,0,0,   1,1,0,   1,0,0,
            0,0,0,   0,1,0,   1,1,0,
            0,1,0,   0,1,1,   1,1,1,
            0,1,0,   1,1,1,   1,1,0,
            1,0,1,   0,0,1,   0,0,0,
            0,0,0,   1,0,0,   1,0,1,
            1,0,1,   1,1,1,   0,1,1,
            0,1,1,   0,0,1,   1,0,1,
            1,1,1,   1,0,1,   1,0,0,
            1,0,0,   1,1,0,   1,1,1,
            0,0,1,   0,1,1,   0,1,0,
            0,1,0,   0,0,0,   0,0,1
        ];
        var allUV = [
            0,0, 1,1, 1,0,
            0,0, 0,1, 1,1,
            0,0, 0,1, 1,1,
            0,0, 1,1, 1,0,
            1,1, 0,1, 0,0,
            0,0, 1,0, 1,1,
            1,0, 1,1, 0,1,
            0,1, 0,0, 1,0,
            1,1, 0,1, 0,0,
            0,0, 1,0, 1,1,
            0,1, 1,1, 1,0,
            1,0, 0,0, 0,1
        ];
        var allNormal = [
            0,0,-1, 0,0,-1, 0,0,-1,
            0,0,-1, 0,0,-1, 0,0,-1,
            0,1,0, 0,1,0, 0,1,0,
            0,1,0, 0,1,0, 0,1,0,
            0,-1,0, 0,-1,0, 0,-1,0,
            0,-1,0, 0,-1,0, 0,-1,0,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            1,0,0, 1,0,0, 1,0,0,
            1,0,0, 1,0,0, 1,0,0,
            -1,0,0, -1,0,0, -1,0,0,
            -1,0,0, -1,0,0, -1,0,0,
        ];
        drawTriangle3DBatchUVNormal(allverts,allUV,allNormal);
    }
}