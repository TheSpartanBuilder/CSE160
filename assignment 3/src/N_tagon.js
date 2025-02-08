class N_tagon
{
    constructor(){
    this.type='tagon';
    this.position = [0.0,0.0,0.0];
    this.color = [1.0,1.0,1.0,1.0];
    this.size = 5.0;
    this.numSide = 5;
    this.textureNum = -2;
    this.array = new generatePentagonVertices(this.position[0],this.position[1],this.numSide,this.size);
    //console.log(generatePentagonVertices(this.position[0],this.position[1],this.numSide,this.size));
    }

    update(){
        this.array = new generatePentagonVertices(this.position[0],this.position[1],this.numSide,this.size);
        //console.log(generatePentagonVertices(this.position[0],this.position[1],this.numSide,this.size));
    }

    render(){

        // Pass the texture number
        gl.uniform1i(u_whichTexture,this.textureNum);

        gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);

        // console.log(this.array);

        drawPentagon(this.position[0],this.position[1],this.numSide,this.size,this.array);
    }
}


function generatePentagonVertices(x,y,n,size)
{
    let vertexs = [];
    let r = size/200;
    // https://stackoverflow.com/questions/3436453/calculate-coordinates-of-a-regular-polygons-vertices
    // The formular is from this website
    for(let i = 0; i < n; i++)
    {
        px = x + r * Math.cos(2 * Math.PI * i / n);
        py = y + r * Math.sin(2 * Math.PI * i / n);
        //[px,py] = (x + r * Math.cos(2 * Math.PI * i / n), y + r * Math.sin(2 * Math.PI * i / n));
        vertexs.push([px,py]);
    }
    return vertexs;
}

function drawPentagon(x,y,n,size,array)
{
    //let array = generatePentagonVertices(0,0,5,0.2);
    //let array = the270DegreeRotationArray(generatePentagonVertices(x,y,n,size));
    //let array = generatePentagonVertices(x,y,n,size);
    let len = array.length;
    // console.log(len);
    // console.log(array);
    for(let i = 0; i < len-1; i++)
    {
        drawTriangle([array[i][0],array[i][1],  array[i+1][0],array[i+1][1],  x,y]);
    }
    drawTriangle([array[0][0],array[0][1],  array[len-1][0],array[len-1][1],  x,y]);

}