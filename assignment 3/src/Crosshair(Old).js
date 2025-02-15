class Crosshair {
    constructor(u_SamplerX = null,textureID = null,gl_TEXTURE = null)
    {
        this.matrix = new Matrix4();
        this.crosshair = new Image()
        this.textureNum = -2;
        this.crosshair.src = "../Image/code/crosshair.png";
        this.u_SamplerX = u_SamplerX;
        this.textureID = textureID;
        this.texture;
        this.gl_TEXTURE = gl_TEXTURE;
    }

    render()
    {
        // this.matrix.scale(0.5,0.5,0.5)


        gl.uniform1i(u_whichTexture,this.textureNum);
        // Pass the matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, 1,1,1,1);

        //Front of cube
        drawTriangle3D( [0.0,0.0,0.0,  1.0,1.0,0.0, 1.0,0.0,0.0]);
        drawTriangle3D( [0.0,0.0,0.0,  0.0,1.0,0.0, 1.0,1.0,0.0]);

        var vertices = [
            0,0,0,   .3,.3,0,   .3,0,0,
            0,0,0,   0,.3,0,   .3,.3,0,
        ];

        var uv = [
            0,0, 1,1, 1,0,
            0,0, 0,1, 1,1,
        ];

        // console.log(vertices.length/3);
        // console.log(color.length/4);

        // drawTriangle3DBatchColor(vertices,color);
    }
}