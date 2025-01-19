// Class Point
class Point{
    constructor(){
      this.type='point';
      this.position = [0.0,0.0,0.0];
      this.color = [1.0,1.0,1.0,1.0];
      this.size = 5.0;
    }
  
    defult(){
      this.type='point';
      this.position = [0.0,0.0,0.0];
      this.color = [1.0,1.0,1.0,1.0];
      this.size = 5.0;
    }

    update(){
      
    }
  
    render(){

        // Quit using the buffer to send the attibute
        gl.disableVertexAttribArray(a_Position);

        // Pass the size of a point to u_Size variable
        gl.uniform1f(u_Size,this.size);
        // Pass the position of a point to a_Position variable
        gl.vertexAttrib3f(a_Position, this.position[0], this.position[1], 0.0);
        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);
        // Draw
        gl.drawArrays(gl.POINTS, 0, 1);
    }
  }