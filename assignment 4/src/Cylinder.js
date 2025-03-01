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

    renderFaster() {
        // Pass the texture number
        // gl.uniform1i(u_whichTexture,this.textureNum);
        if(this.textureNum == -2)
        {
            gl.uniform1i(u_whichTexture,1);
        }
        else
        {
            gl.uniform1i(u_whichTexture,this.textureNum);
        }
        // Pass the matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        drawPentagon3DBatch(this.x_cordinate,this.y_cordinate,this.sides,this.size,this.upCircleVertex,0,this.color);
        drawPentagon3DBatch(this.x_cordinate,this.y_cordinate,this.sides,this.size,this.upCircleVertex,this.height,this.color);

        // console.log(this.color);

        let array = this.upCircleVertex;
        let vertices = [];
        let colorArray = [];
        let len = array.length;
        for(let i = 0; i < len-1; i++){
            let percentage = 0.8 - 0.2 * i/len
            colorArray = colorArray.concat(this.color[0]*percentage,this.color[1]*percentage,this.color[2]*percentage,this.color[3],this.color[0]*percentage,this.color[1]*percentage,this.color[2]*percentage,this.color[3],this.color[0]*percentage,this.color[1]*percentage,this.color[2]*percentage,this.color[3],this.color[0]*percentage,this.color[1]*percentage,this.color[2]*percentage,this.color[3],this.color[0]*percentage,this.color[1]*percentage,this.color[2]*percentage,this.color[3],this.color[0]*percentage,this.color[1]*percentage,this.color[2]*percentage,this.color[3]);
            let vertexs = [array[i][0],array[i][1],0,array[i+1][0],array[i+1][1],0,array[i+1][0],array[i+1][1],this.height,array[i][0],array[i][1],this.height];
            vertices = vertices.concat([vertexs[0][0],vertexs[0][1],vertexs[0][2],vertexs[1][0],vertexs[1][1],vertexs[1][2],vertexs[2][0],vertexs[2][1],vertexs[2][2]],[vertexs[2][0],vertexs[2][1],vertexs[2][2],vertexs[3][0],vertexs[3][1],vertexs[3][2],vertexs[0][0],vertexs[0][1],vertexs[0][2]]);
        }
        let percentage = 0.8 - 0.2;
        let vertexs = [[array[len-1][0],array[len-1][1],0],[array[0][0],array[0][1],0],[array[0][0],array[0][1],this.height],[array[len-1][0],array[len-1][1],this.height]];
        colorArray = colorArray.concat(this.color[0]*percentage,this.color[1]*percentage,this.color[2]*percentage,this.color[3],this.color[0]*percentage,this.color[1]*percentage,this.color[2]*percentage,this.color[3],this.color[0]*percentage,this.color[1]*percentage,this.color[2]*percentage,this.color[3],this.color[0]*percentage,this.color[1]*percentage,this.color[2]*percentage,this.color[3],this.color[0]*percentage,this.color[1]*percentage,this.color[2]*percentage,this.color[3],this.color[0]*percentage,this.color[1]*percentage,this.color[2]*percentage,this.color[3]);
        vertices = vertices.concat([vertexs[0][0],vertexs[0][1],vertexs[0][2],vertexs[1][0],vertexs[1][1],vertexs[1][2],vertexs[2][0],vertexs[2][1],vertexs[2][2]],[vertexs[2][0],vertexs[2][1],vertexs[2][2],vertexs[3][0],vertexs[3][1],vertexs[3][2],vertexs[0][0],vertexs[0][1],vertexs[0][2]]);

        drawTriangle3DBatchColor(vertices,colorArray);
        // console.log("Hi");
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

function drawPentagon3DBatch(x,y,n,size,array,height,color)
{
    let vertices = [];
    let len = array.length;
    for(let i = 0; i < len-1; i++)
    {
        vertices = vertices.concat([array[i][0],array[i][1],height,  array[i+1][0],array[i+1][1],height,  x,y,height]);
    }
    vertices = vertices.concat([array[0][0],array[0][1],height,  array[len-1][0],array[len-1][1],height,  x,y,height]);
    let colorArray = [];
    for(let i = 0; i < len; i++)
    {
        colorArray = colorArray.concat(color,color,color);
    }
    // console.log(colorArray.length/4);
    // console.log(vertices.length/3);
    console.log(colorArray);
    console.log(vertices);
    drawTriangle3DBatchColor(vertices,colorArray);
}