class Pyramid {
    constructor() {
        this.type = "pyramid";
        this.color = [1.0,1.0,1.0,1.0];
        this.squareCoordinate = [[0,0,0],[0,1,0],[1,1,0],[1,0,0]];
        this.tipCoordinate = [1/2,1/2,1/2];
        this.matrix = new Matrix4();
        this.textureNum = -2;
    }

    render() {
        // Pass the texture number
        gl.uniform1i(u_whichTexture,this.textureNum);
        // Setting the color of the pyramid
        gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);

        // Pass the matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        let array = this.squareCoordinate;

        // Bottom
        drawTriangle3D([array[0][0],array[0][1],array[0][2],   array[1][0],array[1][1],array[1][2],   array[2][0],array[2][1],array[2][2]]);
        drawTriangle3D([array[2][0],array[2][1],array[2][2],   array[3][0],array[3][1],array[3][2],   array[0][0],array[0][1],array[0][2]]);

        // Side
        gl.uniform4f(u_FragColor, this.color[0]*0.95, this.color[1]*0.95, this.color[2]*0.95, this.color[3]);
        drawTriangle3D([array[0][0],array[0][1],array[0][2],   array[1][0],array[1][1],array[1][2],   this.tipCoordinate[0],this.tipCoordinate[1],this.tipCoordinate[2]]);
        gl.uniform4f(u_FragColor, this.color[0]*0.9, this.color[1]*0.9, this.color[2]*0.9, this.color[3]);
        drawTriangle3D([array[1][0],array[1][1],array[1][2],   array[2][0],array[2][1],array[2][2],   this.tipCoordinate[0],this.tipCoordinate[1],this.tipCoordinate[2]]);
        gl.uniform4f(u_FragColor, this.color[0]*0.85, this.color[1]*0.85, this.color[2]*0.85, this.color[3]);
        drawTriangle3D([array[2][0],array[2][1],array[2][2],   array[3][0],array[3][1],array[3][2],   this.tipCoordinate[0],this.tipCoordinate[1],this.tipCoordinate[2]]);
        gl.uniform4f(u_FragColor, this.color[0]*0.8, this.color[1]*0.8, this.color[2]*0.8, this.color[3]);
        drawTriangle3D([array[3][0],array[3][1],array[3][2],   array[0][0],array[0][1],array[0][2],   this.tipCoordinate[0],this.tipCoordinate[1],this.tipCoordinate[2]]);
    }
}