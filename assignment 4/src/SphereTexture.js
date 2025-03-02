class SphereTexture extends Sphere {
    constructor(image_source = null,u_SamplerX = null,textureID = null,gl_TEXTURE = null){
        super();
        this.textureNum = 0;
        this.image = new Image();
        if (!this.image) {
          console.log('Failed to create the image object');
          return false;
        }
        this.image.src = image_source;
        this.u_SamplerX = u_SamplerX;
        this.textureID = textureID;
        // if(image_source != null && u_SamplerX != null)
        // {
        //   this.initTextures();
        // }
        this.texture;
        this.gl_TEXTURE = gl_TEXTURE;
    }

    changeImage(source){
      this.image.src = source;
    }

    cahngeSampler(newSampler)
    {
      this.u_SamplerX = newSampler;
    }

    changeTextureID(newID)
    {
      this.textureID = newID;
    }

    changeGL_TEXTURE(new_texture)
    {
      this.gl_TEXTURE = new_texture;
    }

    initTextures() {
      let returnValue;
      // Register the event handler to be called on loading an image
      let self = this;
      this.image.onload = function(){ returnValue = self.sendTextureToGLSL(); };
      return returnValue;
    }

    sendTextureToGLSL() {
      var texture = gl.createTexture();   // Create a texture object
      if (!texture) {
        console.log('Failed to create the texture object');
        return false;
      }
    
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
      // Enable texture unit0
      // gl.activeTexture(gl.TEXTURE0);
      gl.activeTexture(this.gl_TEXTURE);

      gl.uniform1i(u_TextureNum,this.textureID);
      
      // Bind the texture object to the target
      gl.bindTexture(gl.TEXTURE_2D, texture);
    
      // Set the texture parameters
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      // Set the texture image
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this.image);
      
      // Set the texture unit 0 to the sampler
      gl.uniform1i(this.u_SamplerX, this.textureID);
      
      // console.log(this.image.src);
      // console.log(this.u_SamplerX);

      this.texture = texture;

      return true
    }

    renderFast() {
        // Pass the texture number
        gl.uniform1i(u_whichTexture,this.textureNum);
        gl.uniform1i(u_TextureNum,this.textureID);
        gl.activeTexture(this.gl_TEXTURE);
        gl.bindTexture(gl.TEXTURE_2D,this.texture)

        // Pass the texture number
        gl.uniform1i(u_whichTexture,this.textureNum);

        // Pass the matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        // drawTriangle3DBatchColorNormal(this.v,this.color,this.v);
        drawTriangle3DBatchUVNormal(this.v,this.uv,this.v);
        // drawTriangle3DBatchUVNormal(this.v,this.uv,this.v);
    }
}