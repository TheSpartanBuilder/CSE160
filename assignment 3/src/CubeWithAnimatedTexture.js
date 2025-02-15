/**
 * This whole class is heavyly inspired by :
 * https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Animating_textures_in_WebGL
 * The goal of this class is to be able to make a 
 * animated texture
 */
class CubeWithAnimatedTexture extends Cube 
{
    constructor()
    {
        super();
        this.video = document.createElement("video");
        this.playing = false
        this.timeupdate = false;

        this.video.playsInline = true;
        this.video.muted = true;
        this.video.loop = true;
        this.texture;

        // Waiting for these 2 events ensures
        // there is data in the video

        this.video.addEventListener(
            "playing",
            () => {
            playing = true;
            checkReady();
            },
            true,
        );

        this.video.addEventListener(
            "timeupdate",
            () => {
            timeupdate = true;
            checkReady();
            },
            true,
        );

        this.video.src = url;
        this.video.play();

        function checkReady() {
            if (playing && timeupdate) {
            this.copyVideo = true;
            }
        }
    }


    initTexture(gl) {
        this.texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
      
        gl.texImage2D(
          gl.TEXTURE_2D,
          level,
          internalFormat,
          width,
          height,
          border,
          srcFormat,
          srcType,
          pixel,
        );
      
        // Turn off mips and set wrapping to clamp to edge so it
        // will work regardless of the dimensions of the video.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }

      updateTexture() {
        const level = 0;
        const internalFormat = gl.RGBA;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texImage2D(
          gl.TEXTURE_2D,
          level,
          internalFormat,
          srcFormat,
          srcType,
          video,
        );
      }

      render(now)
      {
        now *= 0.001; // convert to seconds
        deltaTime = now - then;
        then = now;

        if (copyVideo) {
            updateTexture(gl, texture, video);
        }

        drawScene(gl, programInfo, buffers, texture, cubeRotation);
        cubeRotation += deltaTime;
      }
}