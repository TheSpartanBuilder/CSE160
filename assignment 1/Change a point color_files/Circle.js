// Class Circle
class Circle{
    constructor(){
      this.type='circle';
      this.position = [0.0,0.0,0.0];
      this.color = [1.0,1.0,1.0,1.0];
      this.size = 5.0;
      this.segments = 10;
    }
  
    defult(){
      this.type='circle';
      this.position = [0.0,0.0,0.0];
      this.color = [1.0,1.0,1.0,1.0];
      this.size = 5.0;
      this.segments = 10;
    }

    update(){
      
    }
  
    render(){

        /*
        // Pass the size of a point to u_Size variable
        gl.uniform1f(u_Size,this.size);
        // Pass the position of a point to a_Position variable
        gl.vertexAttrib3f(a_Position, this.position[0], this.position[1], 0.0);
        */
        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);
        // Draw
        var offset = this.size/200.0;

        let angleStep=360/this.segments;
        for(let angle = 0; angle < 360; angle=angle+angleStep)
        {
            let centerPt = [this.position[0],this.position[1]];
            let angle1=angle;
            let angle2=angle+angleStep;
            let vec1=[Math.cos(angle1*Math.PI/180)*offset, Math.sin(angle1*Math.PI/180)*offset];
            let vec2=[Math.cos(angle2*Math.PI/180)*offset, Math.sin(angle2*Math.PI/180)*offset];
            let pt1 = [centerPt[0]+vec1[0], centerPt[1]+vec1[1]];
            let pt2 = [centerPt[0]+vec2[0], centerPt[1]+vec2[1]];

            drawTriangle( [this.position[0],this.position[1],pt1[0],pt1[1],pt2[0],pt2[1]]);
        }
    }
  }
  