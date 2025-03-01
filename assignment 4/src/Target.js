class Target extends Cube
{
    constructor()
    {
        super();
    }

    renderFaster() {
        // Draw
        // var offset = this.size/200.0;
        
        //Reference
        //https://www.math.brown.edu/tbanchof/Beyond3d/Images/chapter8/image04.jpg
  
        // Pass the texture number
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
  
        var vertices = [
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
          0,1,0,   0,0,0,   0,0,1,
        ];
  
        var color = [
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
          this.color[0], this.color[1], this.color[2], this.color[3],
        ];
  
        drawTriangle3DBatchColor(vertices,color);
      }
}