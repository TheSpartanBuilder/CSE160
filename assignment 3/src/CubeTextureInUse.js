class CubeTextureInUse extends Cube {
    constructor(config) {
        super();
        this.textureNum = 0;
        this.u_SamplerX = config.u_SamplerX;
        this.textureID = config.textureID;
        this.texture = config.texture;
        this.gl_TEXTURE = config.gl_TEXTURE;
    }

    inputTexture(config)
    {
        this.u_SamplerX = config.u_SamplerX;
        this.textureID = config.textureID;
        this.texture = config.texture;
        this.gl_TEXTURE = config.gl_TEXTURE;
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
        // // Front of cube
        // allverts = allverts.concat([0,0,0,  1,1,0,  1,0,0]);
        // allverts = allverts.concat([0.0,0.0,0.0,  0.0,1.0,0.0, 1.0,1.0,0.0]);
        // allUV = allUV.concat([0,0, 1,1, 1,0]);
        // allUV = allUV.concat([0,0, 0,1, 1,1]);

        // // Top of cube
        // allverts = allverts.concat([0.0,0.0,0.0,  0.0,1.0,0.0, 1.0,1.0,0.0]);
        // allverts = allverts.concat([0,1,0,   1,1,1,   1,1,0]);
        // allUV = allUV.concat([0,0, 0,1, 1,1]);
        // allUV = allUV.concat([0,0, 0,1, 1,1]);


        // // Right of cube
        // allverts = allverts.concat([1,0,1,   0,0,1,   0,0,0]);
        // allverts = allverts.concat([0,0,0,   1,0,0,   1,0,1]);
        // allUV = allUV.concat([1,1, 0,1, 0,0]);
        // allUV = allUV.concat([0,0, 1,0, 1,1]);

        // // Left of cube
        // allverts = allverts.concat([1,0,1,   1,1,1,   0,1,1]);
        // allverts = allverts.concat([0,1,1,   0,0,1,   1,0,1]);
        // allUV = allUV.concat([1,0, 1,1, 0,1]);
        // allUV = allUV.concat([0,1, 0,0, 1,0]);

        // // Bottom of cube
        // allverts = allverts.concat([1,1,1,   1,0,1,   1,0,0]);
        // allverts = allverts.concat([1,0,0,   1,1,0,   1,1,1]);
        // allUV = allUV.concat([1,1, 0,1, 0,0]);
        // allUV = allUV.concat([0,0, 1,0, 1,1]);

        // // Back of cube
        // allverts = allverts.concat([0,0,1,   0,1,1,   0,1,0]);
        // allverts = allverts.concat([0,1,0,   0,0,0,   0,0,1]);
        // allUV = allUV.concat([0,1, 1,1, 1,0]);
        // allUV = allUV.concat([1,0, 0,0, 0,1]);

        // drawTriangle3DBatch(allverts);
        drawTriangle3DBatchUV(allverts,allUV);
    }

    OldrenderFaster() {
        var rgba = this.color;
        // Pass the texture number
        gl.uniform1i(u_whichTexture,this.textureNum);
        gl.uniform1i(u_TextureNum,this.textureID);

        // Pass the matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
  
        // Pass the color of a point to u_FragColor variable
        // gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);

        var allverts = [];
        // Front of cube
        allverts = allverts.concat([0,0,0, 1,1,0, 1,0,0]);
        allverts = allverts.concat([0,0,0, 0,1,0, 1,1,0]);

        // Top of cube
        allverts = allverts.concat([0,1,0, 0,1,1, 1,1,1]);
        allverts = allverts.concat([0,1,0, 1,1,1, 1,1,0]);

        // Right of cube
        allverts = allverts.concat([1,1,0, 1,1,1, 1,0,0]);
        allverts = allverts.concat([1,0,0, 1,1,1, 1,0,1]);

        // Left of cube
        allverts = allverts.concat([0,1,0, 0,1,1, 0,0,0]);
        allverts = allverts.concat([0,0,0, 0,1,1, 1,0,0]);

        // Bottom of cube
        allverts = allverts.concat([0,0,0, 0,0,1, 1,0,1]);
        allverts = allverts.concat([0,0,0, 1,0,1, 1,0,0]);

        // Back of cube
        allverts = allverts.concat([0,0,1, 1,1,1, 1,0,1]);
        allverts = allverts.concat([0,0,1, 0,1,1, 1,1,1]);

        drawTriangle3DBatch(allverts);
    }
}