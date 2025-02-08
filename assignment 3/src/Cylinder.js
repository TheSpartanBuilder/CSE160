class Cylinder {
    constructor() {
        this.type = "cylinder";
        this.color = [1.0,1.0,1.0,1.0];
        this.matrix = new Matrix4();
        this.x_cordinate = 0;
        this.y_cordinate = 0;
        // this.y_distance = 0;
        this.sides = 20;
        this.size = 40;
        this.upCircleVertex = generatePentagonVertices(this.x_cordinate,this.y_cordinate,this.sides,this.size);
        this.height = 0.5;
        this.textureNum = -2;
        // this.downCircleVertex = generatePentagonVertices(this.x_cordinate,this.y_cordinate - this.y_distance,this.sides,this.size);
    }



    render() {
        // Pass the texture number
        gl.uniform1i(u_whichTexture,this.textureNum);
        // Pass the matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        gl.uniform4f(u_FragColor,this.color[0],this.color[1],this.color[2],this.color[3]);
        drawPentagon3D(this.x_cordinate,this.y_cordinate,this.sides,this.size,this.upCircleVertex,0);
        drawPentagon3D(this.x_cordinate,this.y_cordinate,this.sides,this.size,this.upCircleVertex,this.height);

        let array = this.upCircleVertex;
        let len = array.length;
        for(let i = 0; i < len-1; i++){
            let percentage = 0.8 - 0.2 * i/len
            gl.uniform4f(u_FragColor,this.color[0]*percentage,this.color[1]*percentage,this.color[2]*percentage,this.color[3]);
            drawRactangle3D([[array[i][0],array[i][1],0],[array[i+1][0],array[i+1][1],0],[array[i+1][0],array[i+1][1],this.height],[array[i][0],array[i][1],this.height]]);
        }
        let percentage = 0.8 - 0.2;
        gl.uniform4f(u_FragColor,this.color[0]*percentage,this.color[1]*percentage,this.color[2]*percentage,this.color[3]);
        drawRactangle3D([[array[len-1][0],array[len-1][1],0],[array[0][0],array[0][1],0],[array[0][0],array[0][1],this.height],[array[len-1][0],array[len-1][1],this.height]]);
    }
}

function drawPentagon3D(x,y,n,size,array,height,color)
{
    //let array = generatePentagonVertices(0,0,5,0.2);
    //let array = the270DegreeRotationArray(generatePentagonVertices(x,y,n,size));
    //let array = generatePentagonVertices(x,y,n,size);
    let len = array.length;
    // console.log(len);
    // console.log(array);
    for(let i = 0; i < len-1; i++)
    {
        drawTriangle3D([array[i][0],array[i][1],height,  array[i+1][0],array[i+1][1],height,  x,y,height]);
    }
    drawTriangle3D([array[0][0],array[0][1],height,  array[len-1][0],array[len-1][1],height,  x,y,height]);

}

