class Star{
  constructor(){
    this.type='star';
    this.position = [0.0,0.0,0.0];
    this.color = [1.0,1.0,1.0,1.0];
    this.size = 5.0;
    this.numSide = 5;
    this.array = new generatestarVertices(this.position[0],this.position[1],this.numSide,this.size);
    //console.log(generatePentagonVertices(this.position[0],this.position[1],this.numSide,this.size));
    }

    update(){
        this.array = new generatestarVertices(this.position[0],this.position[1],this.numSide,this.size);
        //console.log(generatePentagonVertices(this.position[0],this.position[1],this.numSide,this.size));
    }

    render(){

        gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);

        // console.log(this.array);

        drawStar(this.position[0],this.position[1],this.numSide,this.size,this.array);
    }
  }

function drawStar(x,y,n,size,array)
{
  //let new_array = the270DegreeRotationArray(array,[x,y]);
  let new_array = array;
  for(let i = 0; i < n-1; i++)
  {
    let middle = [(new_array[i][0]+new_array[i+1][0])/2,(new_array[i][1]+new_array[i+1][1])/2];
    let last_point = the180DegreeRotation([x,y],middle);
    // console.log([new_array[i][0],new_array[i][1],  last_point[0],last_point[1],  new_array[i+1][0],new_array[i+1][1]]);
    drawTriangle([new_array[i][0],new_array[i][1],  last_point[0],last_point[1],  new_array[i+1][0],new_array[i+1][1]]);
  }
  let middle = [(new_array[new_array.length-1][0]+new_array[0][0])/2,(new_array[new_array.length-1][1]+new_array[0][1])/2];
  let last_point = the180DegreeRotation([x,y],middle);
  // console.log([new_array[new_array.length-1][0],new_array[0][1],  last_point[0],last_point[1],  new_array[new_array.length-1][0],new_array[new_array.length-1][1]]);
  drawTriangle([new_array[0][0],new_array[0][1],  last_point[0],last_point[1],  new_array[new_array.length-1][0],new_array[new_array.length-1][1]]);
  drawPentagon(x,y,n,size,new_array);
}

function the270DegreeRotationArray(array,point)
{
    let return_array = [];
    for(let i = 0; i < array.length; i++)
    {
        return_array.push(the270DegreeRotation(array[i],point));
    }
    return return_array;
}

function generatestarVertices(x,y,n,size)
{
  return the270DegreeRotationArray(generatePentagonVertices(x,y,n,size),[x,y]);
}

/*
function test()
{
  let x=0,y=0,n=5,size=60;
  drawStar(x,y,n,size,generatePentagonVertices(x,y,n,size))
}
  */