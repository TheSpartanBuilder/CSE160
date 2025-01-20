class Ractangle
{
    constructor(){
        this.type='ractangle';
        this.position = [0.0,0.0,0.0];
        this.color = [1.0,1.0,1.0,1.0];
        this.size = 5.0;
        this.width = 0.5;
        this.height = 0.2;
        this.array = generateRactangleVertex(this.position,this.width/100,this.height/100);
      }
  
      update(){
        this.array = generateRactangleVertex(this.position,this.width/100,this.height/100);
      }
    
      render(){
  
          // Pass the size of a point to u_Size variable
          gl.uniform1f(u_Size,this.size);
          // Pass the position of a point to a_Position variable
          gl.vertexAttrib3f(a_Position, this.position[0], this.position[1], 0.0);
          // Pass the color of a point to u_FragColor variable
          gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);
          // Draw
          for(let i = 0; i < this.array.length; i++)
          {
            drawTriangle(this.array[i]);
          }
      }
}

function generateRactangleVertex(point,width,height)
{
    let returnArray = [];
    let halfHeight = height/2;
    let halfWidth = width/2;
    returnArray.push([point[0]+halfWidth,point[1]+halfHeight,  point[0]+halfWidth,point[1]-halfHeight,  point[0]-halfWidth,point[1]-halfHeight]);
    returnArray.push([point[0]+halfWidth,point[1]+halfHeight,  point[0]-halfWidth,point[1]+halfHeight,  point[0]-halfWidth,point[1]-halfHeight]);

    return returnArray;
}