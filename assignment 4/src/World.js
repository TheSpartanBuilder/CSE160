// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = `
  precision mediump float;
  attribute vec4 a_Position;
  attribute vec2 a_UV;
  attribute vec4 a_Color;
  attribute vec3 a_Normal;
  varying vec2 v_UV;
  varying vec4 v_Color;
  varying vec3 v_Normal;
  varying vec4 v_VertPos;
  uniform float u_Size;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;
  void main() {
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
    //gl_Position = a_Position;
    //gl_PointSize = 10.0;
    //gl_PointSize = u_Size;
    v_UV = a_UV;
    v_Color = a_Color;
    v_Normal = a_Normal;
    v_VertPos = u_ModelMatrix * a_Position;
  }`;

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  varying vec2 v_UV;
  varying vec4 v_Color;
  varying vec3 v_Normal;
  varying vec4 v_VertPos;
  uniform vec4 u_FragColor;
  uniform sampler2D u_Sampler0;
  uniform sampler2D u_Sampler1;
  uniform sampler2D u_Sampler2;
  uniform sampler2D u_Sampler3;
  uniform sampler2D u_Sampler4;
  uniform sampler2D u_Sampler5;
  uniform sampler2D u_Sampler6;
  uniform sampler2D u_Sampler7;
  uniform sampler2D u_Sampler8;
  uniform sampler2D u_Sampler9;
  uniform sampler2D u_Sampler10;
  uniform int u_whichTexture;
  uniform int u_TextureNum;
  uniform vec3 u_lightPos;
  uniform vec3 u_cameraPos;
  uniform bool u_lightOn;
  uniform bool u_spotLightOn;
  uniform vec3 u_at;
  uniform float u_spotLightLimit;
  uniform float u_spotCosineCutOff;
  uniform vec3 u_spotDirection;
  void main() {
  //gl_FragColor = u_FragColor;
  //gl_FragColor = vec4(v_UV,1.0,1.0);
  //gl_FragColor = texture2D(u_Sampler0, v_UV);

    if (u_whichTexture == -2) {
      // Use color
      gl_FragColor = u_FragColor;
    }
    else if (u_whichTexture == -1) {
      // Use UV debug color
      gl_FragColor = vec4(v_UV,1.0,1.0);
    }
    else if (u_whichTexture == 0)
    {
      // Use tecture0
      // gl_FragColor = texture2D(u_Sampler0, v_UV);
      if (u_TextureNum == 0)
      {
        gl_FragColor = texture2D(u_Sampler0, v_UV);
      }
      else if(u_TextureNum == 1)
      {
        gl_FragColor = texture2D(u_Sampler1, v_UV);
      }
      else if(u_TextureNum == 2)
      {
        gl_FragColor = texture2D(u_Sampler2, v_UV);
      }
      else if(u_TextureNum == 3)
      {
        gl_FragColor = texture2D(u_Sampler3, v_UV);
      }
      else if(u_TextureNum == 4)
      {
        gl_FragColor = texture2D(u_Sampler4, v_UV);
      }
      else if(u_TextureNum == 5)
      {
        gl_FragColor = texture2D(u_Sampler5, v_UV);
      }
      else if(u_TextureNum == 6)
      {
        gl_FragColor = texture2D(u_Sampler6, v_UV);
      }
      else if(u_TextureNum == 7)
      {
        gl_FragColor = texture2D(u_Sampler7, v_UV);
      }
      else if(u_TextureNum == 8)
      {
        gl_FragColor = texture2D(u_Sampler8, v_UV);
      }
      else if(u_TextureNum == 9)
      {
        gl_FragColor = texture2D(u_Sampler9, v_UV);
      }
        else if(u_TextureNum == 10)
      {
        gl_FragColor = texture2D(u_Sampler10, v_UV);
      }
    }
    else if (u_whichTexture == 1)
    {
      gl_FragColor = v_Color;
    }
    else if (u_whichTexture == -3)
    {
      gl_FragColor = vec4((v_Normal+1.0)/2.0,1.0); 
    }
    else
    {
      // Error, put Redish
      gl_FragColor = vec4(1,.2,.2,1);
    }

    // vec3 lightVector = vec3(v_VertPos)-u_lightPos;
    // float r=length(lightVector);
    // if(r<1.0) {
    //   gl_FragColor = vec4(1,0,0,1);
    // } else if (r < 2.0) {
    //   gl_FragColor=vec4(0,1,0,1); 
    // }

    if(u_lightOn)
    {
      vec3 lightVector = u_lightPos - vec3(v_VertPos);
      // float r = length(lightVector);

      // N dot L
      vec3 L = normalize(lightVector);
      vec3 N = normalize(v_Normal);
      float nDotL = max(dot(N,L),0.0);

      // Relection
      vec3 R = reflect(-L,N);

      // eye
      vec3 E = normalize(u_cameraPos-vec3(v_VertPos));

      // gl_FragColor = gl_FragColor * nDotL;
      // gl_FragColor.a = 1.0;

      // Specular
      float specular = pow(max(dot(E,R),0.0),64.0)*0.8;

      vec3 diffuse = vec3(1.0,1.0,0.9) * vec3(gl_FragColor) * nDotL * 0.7;
      vec3 ambient = vec3(gl_FragColor) * 0.3;
      if(u_whichTexture == 0)
      {
        gl_FragColor = vec4(specular+diffuse+ambient,1.0);
      }
      else
      {
        gl_FragColor = vec4(diffuse + ambient,1.0);
      }   



      if(u_spotLightOn){
        // Dealing with spot light
        // Reference
        // https://webglfundamentals.org/webgl/lessons/webgl-3d-lighting-spot.html
        // https://math.hws.edu/graphicsbook/c7/s2.html#webgl3d.2.6
        // https://math.hws.edu/graphicsbook/source/webgl/spotlights.html
        // vec3 L_at = normalize(u_at-u_cameraPos);
        vec3 L_spot = normalize(u_cameraPos - vec3(v_VertPos));
        float spotFactor = 0.0;
        float spotExponent = 3.0;
        vec3 D = -normalize(u_spotDirection);
        float spotCosine = dot(D,L_spot);
        float nDotL = max(dot(N,L_spot),0.0);
        if (spotCosine >= u_spotCosineCutOff) {
          spotFactor = pow(spotCosine, spotExponent);
          // gl_FragColor = gl_FragColor + (gl_FragColor*spotFactor);
        }
        else
        {
          // gl_FragColor = vec4(vec3(0.0),1.0);
          spotFactor = 0.0;
        }
        gl_FragColor = gl_FragColor + vec4(vec3(gl_FragColor)*spotFactor,1.0);
        // gl_FragColor = gl_FragColor + (gl_FragColor*spotFactor);
      }
    }

  }`;

// Visit when free
// https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line

// Constants
// const explosion_sound = new Audio("../Audio/explosion-42132.mp3");
// const target_neutralized_sound = new Audio("../Audio/target-neutralized-sound-effect-for-editing-made-with-Voicemod.mp3");
const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;
const TAGON = 3;
const STAR = 4;
const RACTANGLE = 5;
  
// Global Variables
// https://dev.to/shantanu_jana/how-to-play-sound-on-button-click-in-javascript-3m48
let canvas;
let gl;
let a_Position;
let a_UV;
let a_Color;
let a_Normal;
let u_FragColor;
let u_Size;
let u_ModelMatrix;
let u_ProjectionMatrix;
let u_ViewMatrix;
let u_Sampler0;
let u_Sampler1;
let u_Sampler2;
let u_Sampler3;
let u_Sampler4;
let u_Sampler5;
let u_Sampler6;
let u_Sampler7;
let u_Sampler8;
let u_Sampler9;
let u_Sampler10;
let u_GlobalRotateMatrix;
let u_whichTexture;
let u_TextureNum;
let u_lightPos;
let u_cameraPos;
let u_lightOn;
let u_spotLightOn;
let u_at;
let u_spotLightLimit;
let u_spotCosineCutOff;
let u_spotDirection;

// let g_selectedColor=[1.0,1.0,1.0,1.0];
// let g_selectedSize= 5.0;
// let g_selectedType=POINT;
// let g_segments = 10;
// let g_numSide = 5;
// let g_point = 5;
// let g_width = 30.0;
// let g_height = 18.0;
let g_leftUpperLegAngle = 0;
let g_leftLowerLegSlideAngle = 0;
let g_leftFeetSlideAngle = 0;
let g_rightUpperLegAngle = 0;
let g_rightLowerLegSlideAngle = 0;
let g_rightFeetSlideAngle = 0;
let g_leftUpperArmSlideAngle = 0;
let g_leftLowerArmSlideAngle = 0;
let g_leftHandSlideAngle = 0;
let g_rightUpperArmSlideAngle = 0;
let g_rightLowerArmSlideAngle = 0;
let g_rightHandSlideAngle = 0;
// let g_yellowAnimation = false;
// let g_magenteAnimation = false;
let g_headXSlideAngle = 0;
let g_headYSlideAngle = 0;
let originalCoordinate = [0,0];
let g_animationOn = false;
let g_animationSpeed = 1;
let g_specialAnimation = false;

let g_leftUpperLegAngleY = 0;
let g_leftLowerLegSlideAngleY = 0;
let g_leftFeetSlideAngleY = 0;
let g_rightUpperLegAngleY = 0;
let g_rightLowerLegSlideAngleY = 0;
let g_rightFeetSlideAngleY = 0;
let g_leftUpperArmSlideAngleY = 0;
let g_leftLowerArmSlideAngleY = 0;
let g_leftHandSlideAngleY = 0;
let g_rightUpperArmSlideAngleY = 0;
let g_rightLowerArmSlideAngleY = 0;
let g_rightHandSlideAngleY = 0;

let g_leftUpperLegAngleZ = 0;
let g_leftLowerLegSlideAngleZ = 0;
let g_leftFeetSlideAngleZ = 0;
let g_rightUpperLegAngleZ = 0;
let g_rightLowerLegSlideAngleZ = 0;
let g_rightFeetSlideAngleZ = 0;
let g_leftUpperArmSlideAngleZ = 0;
let g_leftLowerArmSlideAngleZ = 0;
let g_leftHandSlideAngleZ = 0;
let g_rightUpperArmSlideAngleZ = 0;
let g_rightLowerArmSlideAngleZ = 0;
let g_rightHandSlideAngleZ = 0;

let g_normal = false;
let g_lightSliderX = 0;
let g_lightPos=[0,0,0];
let g_lightOn = false;
let g_spotLightOn = false;
let g_spotCosineCutoff = 10;
let g_funnyOn = false;

// let g_animation = false;


// From lab 2 
var stats = new Stats();
stats.dom.style.left = "auto";
stats.dom.style.right = "0";
stats.showPanel(0);
document.body.appendChild(stats.dom);


function zeroAllAngle()
{
  g_leftUpperLegAngle = 0;
  g_leftLowerLegSlideAngle = 0;
  g_leftFeetSlideAngle = 0;
  g_rightUpperLegAngle = 0;
  g_rightLowerLegSlideAngle = 0;
  g_rightFeetSlideAngle = 0;
  g_leftUpperArmSlideAngle = 0;
  g_leftLowerArmSlideAngle = 0;
  g_leftHandSlideAngle = 0;
  g_rightUpperArmSlideAngle = 0;
  g_rightLowerArmSlideAngle = 0;
  g_rightHandSlideAngle = 0;
  g_headXSlideAngle = 0;
  g_headYSlideAngle = 0;

  g_leftUpperLegAngleY = 0;
  g_leftLowerLegSlideAngleY = 0;
  g_leftFeetSlideAngleY = 0;
  g_rightUpperLegAngleY = 0;
  g_rightLowerLegSlideAngleY = 0;
  g_rightFeetSlideAngleY = 0;
  g_leftUpperArmSlideAngleY = 0;
  g_leftLowerArmSlideAngleY = 0;
  g_leftHandSlideAngleY = 0;
  g_rightUpperArmSlideAngleY = 0;
  g_rightLowerArmSlideAngleY = 0;
  g_rightHandSlideAngleY = 0;

  g_leftUpperLegAngleZ = 0;
  g_leftLowerLegSlideAngleZ = 0;
  g_leftFeetSlideAngleZ = 0;
  g_rightUpperLegAngleZ = 0;
  g_rightFeetSlideAngleZ = 0;
  g_leftUpperArmSlideAngleZ = 0;
  g_leftLowerArmSlideAngleZ = 0;
  g_leftHandSlideAngleZ = 0;
  g_rightUpperArmSlideAngleZ = 0;
  g_rightLowerArmSlideAngleZ = 0;
  g_rightHandSlideAngleZ = 0;

  document.getElementById('leftUpperLegSlide').value = 0;
  document.getElementById('leftLowerLegSlide').value = 0;
  document.getElementById('leftFeetSlide').value = 0;
  document.getElementById('rightUpperLegSlide').value = 0;
  document.getElementById('rightLowerLegSlide').value = 0;
  document.getElementById('rightFeetSlide').value = 0;
  document.getElementById('leftUpperArmSlide').value = 0;
  document.getElementById('leftLowerArmSlide').value = 0;
  document.getElementById('leftHandSlide').value = 0;
  document.getElementById('rightUpperArmSlide').value = 0;
  document.getElementById('rightLowerArmSlide').value = 0;
  document.getElementById('rightHandSlide').value = 0;
  document.getElementById('headXSlide').value = 0;
  document.getElementById('headYSlide').value = 0;

  document.getElementById('leftUpperLegSlideY').value = 0;
  document.getElementById('leftLowerLegSlideY').value = 0;
  document.getElementById('leftFeetSlideY').value = 0;
  document.getElementById('rightUpperLegSlideY').value = 0;
  document.getElementById('rightLowerLegSlideY').value = 0;
  document.getElementById('rightFeetSlideY').value = 0;
  document.getElementById('leftUpperArmSlideY').value = 0;
  document.getElementById('leftLowerArmSlideY').value = 0;
  document.getElementById('leftHandSlideY').value = 0;
  document.getElementById('rightUpperArmSlideY').value = 0;
  document.getElementById('rightLowerArmSlideY').value = 0;
  document.getElementById('rightHandSlideY').value = 0;

  document.getElementById('leftUpperLegSlideZ').value = 0;
  document.getElementById('leftLowerLegSlideZ').value = 0;
  document.getElementById('leftFeetSlideZ').value = 0;
  document.getElementById('rightUpperLegSlideZ').value = 0;
  document.getElementById('rightLowerLegSlideZ').value = 0;
  document.getElementById('rightFeetSlideZ').value = 0;
  document.getElementById('leftUpperArmSlideZ').value = 0;
  document.getElementById('leftLowerArmSlideZ').value = 0;
  document.getElementById('leftHandSlideZ').value = 0;
  document.getElementById('rightUpperArmSlideZ').value = 0;
  document.getElementById('rightLowerArmSlideZ').value = 0;
  document.getElementById('rightHandSlideZ').value = 0;

  document.getElementById('lightSliderX').value = 0;
  document.getElementById('lightSliderY').value = 0;
  document.getElementById('lightSliderZ').value = 0;
}

function g_animationState(input)
{
  g_animationOn = input;
  if(input == false)
  {
    zeroAllAngle();
  }
  else if(g_specialAnimation)
  {
    zeroAllAngle();
    g_specialAnimation = false;
  }
}

function g_specialAnimationState(input)
{
  g_specialAnimation = input;
  if(input == false)
  {
    zeroAllAngle();
  }
  else if(g_animationOn)
  {
    zeroAllAngle();
    g_animationOn = false;
  }
}

// Set up actions for the HTML UI elements
function addActionsForHtmlUI()
{
  // Button Events (Shape Type)
  // document.getElementById('green').onclick = function() { g_selectedColor = [0.0,1.0,0.0,1.0];};
  // document.getElementById('red').onclick = function() { g_selectedColor = [1.0,0.0,0.0,1.0];};
  // document.getElementById('blue').onclick = function() { g_selectedColor = [0.0,0.0,1.0,1.0];};
  // document.getElementById('clearButton').onclick = function() { g_shapeList = []; renderAllShapes(); };
  // document.getElementById('extreamButton').onclick = function() { g_shapeList = []; renderAllShapes(); explosion_sound.play(); setTimeout( () => target_neutralized_sound.play(),1200);};

  // document.getElementById('pointButton').onclick = function() { g_selectedType=POINT; };
  // document.getElementById('triangleButton').onclick = function() { g_selectedType=TRIANGLE; };
  // document.getElementById('circleButton').onclick = function() { g_selectedType=CIRCLE; };
  // document.getElementById('tagonButton').onclick = function() { g_selectedType=TAGON; };
  // document.getElementById('starButton').onclick = function() { g_selectedType=STAR; };
  // document.getElementById('ractangleButton').onclick = function() { g_selectedType=RACTANGLE; };

  // Slider Events
  // document.getElementById('redSlide').addEventListener("mouseup", function() { g_selectedColor[0] = this.value/100; });
  // document.getElementById('greenSlide').addEventListener("mouseup", function() { g_selectedColor[1] = this.value/100; });
  // document.getElementById('blueSlide').addEventListener("mouseup", function() { g_selectedColor[2] = this.value/100; });
  // document.getElementById('segmentSlide').addEventListener("mouseup", function() { g_segments = this.value; });
  document.getElementById('leftUpperLegSlide').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_leftUpperLegAngle = this.value;  });
  document.getElementById('leftLowerLegSlide').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_leftLowerLegSlideAngle = this.value;  });
  document.getElementById('leftFeetSlide').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_leftFeetSlideAngle = this.value;  });
  document.getElementById('rightUpperLegSlide').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_rightUpperLegAngle = this.value;  });
  document.getElementById('rightLowerLegSlide').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_rightLowerLegSlideAngle = this.value;  });
  document.getElementById('rightFeetSlide').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_rightFeetSlideAngle = this.value;  });
  document.getElementById('leftUpperArmSlide').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_leftUpperArmSlideAngle = this.value;  });
  document.getElementById('leftLowerArmSlide').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_leftLowerArmSlideAngle = this.value;  });
  document.getElementById('leftHandSlide').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_leftHandSlideAngle = this.value;  });
  document.getElementById('rightUpperArmSlide').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_rightUpperArmSlideAngle = this.value;  });
  document.getElementById('rightLowerArmSlide').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_rightLowerArmSlideAngle = this.value;  });
  document.getElementById('rightHandSlide').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_rightHandSlideAngle = this.value;  });
  document.getElementById('headXSlide').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_headXSlideAngle = this.value;  });
  document.getElementById('headYSlide').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_headYSlideAngle = this.value;  });
  document.getElementById('animationSpeedSlide').addEventListener("mousemove", function() { g_animationSpeed = this.value;  });

  document.getElementById('leftUpperLegSlideY').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_leftUpperLegAngleY = this.value;  });
  document.getElementById('leftLowerLegSlideY').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_leftLowerLegSlideAngleY = this.value;  });
  document.getElementById('leftFeetSlideY').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_leftFeetSlideAngleY = this.value;  });
  document.getElementById('rightUpperLegSlideY').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_rightUpperLegAngleY = this.value;  });
  document.getElementById('rightLowerLegSlideY').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_rightLowerLegSlideAngleY = this.value;  });
  document.getElementById('rightFeetSlideY').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_rightFeetSlideAngleY = this.value;  });
  document.getElementById('leftUpperArmSlideY').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_leftUpperArmSlideAngleY = this.value;  });
  document.getElementById('leftLowerArmSlideY').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_leftLowerArmSlideAngleY = this.value;  });
  document.getElementById('leftHandSlideY').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_leftHandSlideAngleY = this.value;  });
  document.getElementById('rightUpperArmSlideY').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_rightUpperArmSlideAngleY = this.value;  });
  document.getElementById('rightLowerArmSlideY').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_rightLowerArmSlideAngleY = this.value;  });
  document.getElementById('rightHandSlideY').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_rightHandSlideAngleY = this.value;  });

  document.getElementById('leftUpperLegSlideZ').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_leftUpperLegAngleZ = this.value;  });
  document.getElementById('leftLowerLegSlideZ').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_leftLowerLegSlideAngleZ = this.value;  });
  document.getElementById('leftFeetSlideZ').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_leftFeetSlideAngleZ = this.value;  });
  document.getElementById('rightUpperLegSlideZ').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_rightUpperLegAngleZ = this.value;  });
  document.getElementById('rightLowerLegSlideZ').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_rightLowerLegSlideAngleZ = this.value;  });
  document.getElementById('rightFeetSlideZ').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_rightFeetSlideAngleZ = this.value;  });
  document.getElementById('leftUpperArmSlideZ').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_leftUpperArmSlideAngleZ = this.value;  });
  document.getElementById('leftLowerArmSlideZ').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_leftLowerArmSlideAngleZ = this.value;  });
  document.getElementById('leftHandSlideZ').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_leftHandSlideAngleZ = this.value;  });
  document.getElementById('rightUpperArmSlideZ').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_rightUpperArmSlideAngleZ = this.value;  });
  document.getElementById('rightLowerArmSlideZ').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_rightLowerArmSlideAngleZ = this.value;  });
  document.getElementById('rightHandSlideZ').addEventListener("mousemove", function() { if(!g_animationOn || !g_specialAnimation) g_rightHandSlideAngleZ = this.value;  });

  // document.getElementById('angleSlide').addEventListener("mouseup", function() { g_yellowAngle = this.value;  });
  // document.getElementById('yellowSlide').addEventListener("mouseup", function() { g_yellowSlide = this.value;  });
  // document.getElementById('magentaSlide').addEventListener("mouseup", function() { g_magentaAngle = this.value;  });

  // document.getElementById('angleSlide').addEventListener("mouseup", function() { g_globalAngle = this.value; renderAllShapes(); });

  // Size Slider Events
  // document.getElementById('sizeSlide').addEventListener('mouseup', function() { g_selectedSize = this.value; });
  // document.getElementById('widthSlide').addEventListener('mouseup', function() { g_width = this.value; });
  // document.getElementById('heightSlide').addEventListener('mouseup', function() { g_height = this.value; });

  //Options
  // document.getElementById("numSideSelect").addEventListener( "change" ,function() { g_numSide = this.value; });
  // document.getElementById("numPointSelect").addEventListener( "change" ,function() { g_point = this.value; });
  document.addEventListener("click", (event) => {placeBlock();theAimLab.shoot();});
  document.addEventListener("contextmenu", (event) => {deleteBlock();});

  document.getElementById('lightSliderX').addEventListener("mousemove", function() {  if(g_animationOn || g_specialAnimation) return; g_lightPos[0] = this.value/100;  updateLightPos(); });
  document.getElementById('lightSliderY').addEventListener("mousemove", function() {  if(g_animationOn || g_specialAnimation) return; g_lightPos[1] = this.value/100;  updateLightPos(); });
  document.getElementById('lightSliderZ').addEventListener("mousemove", function() {  if(g_animationOn || g_specialAnimation) return; g_lightPos[2] = this.value/100;  updateLightPos(); });
  document.getElementById('spotLightSizeSlider').addEventListener("mousemove", function() { g_spotCosineCutoff = this.value;});
}


function setupWebGL(){
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  gl = getWebGLContext(canvas);

  gl = canvas.getContext('webgl', { preserveDrawingBuffer: true});

  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  gl.enable(gl.DEPTH_TEST);

}

function connectVariablesToGLSL()
{
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of a_UV
  a_UV = gl.getAttribLocation(gl.program, 'a_UV');
  if(a_UV < 0) {
    console.log('Failed to get the storage location of a_UV');
    return;
  }

  // Get the storage location of a_Color
  a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if(a_Color < 0) {
    console.log('Failed to get the storage location of a_Color');
    return;
  }

  // Get the storage location of a_Normal
  a_Normal = gl.getAttribLocation(gl.program, 'a_Normal');
  if(a_Normal < 0) {
    console.log('Failed to get the storage location of a_Normal');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  // Get the storage location of u_lightPos
  u_lightPos = gl.getUniformLocation(gl.program, 'u_lightPos');
  if (!u_lightPos) {
    console.log('Failed to get the storage location of u_lightPos');
    return;
  }

  // Get the storage location of u_Size
  // u_Size = gl.getUniformLocation(gl.program, 'u_Size');
  // if (!u_Size) {
  //   console.log('Failed to get the storage location of u_Size');
  //   return;
  // }

  //Get the storage location of u_ModeMatrix
  u_ModelMatrix = gl.getUniformLocation(gl.program, "u_ModelMatrix");
  if(!u_ModelMatrix) {
    console.log('Failed to get the storage location of u_ModelMatrix');
    return;
  }

  u_whichTexture = gl.getUniformLocation(gl.program, "u_whichTexture");
  if(!u_whichTexture) {
    console.log('Failed to get the storage location of u_whichTexture');
    return;
  }

  u_TextureNum = gl.getUniformLocation(gl.program, "u_TextureNum");
  if(!u_TextureNum) {
    console.log('Failed to get the storage location of u_TextureNum');
    return;
  }

  // Get the storage location of u_ViewMatrix
  // u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  // if(!u_ViewMatrix) {
  //   console.log('Failed to get the storage location of u_ViewMatrix');
  //   return;
  // }

  // Get the storage location of u_GlobalRotateMatrix
  u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, "u_GlobalRotateMatrix");
  if(!u_GlobalRotateMatrix) {
    console.log('Failed to get the storage location of u_GlobalRotateMatrix');
    return;
  }

  // Get the storage location of u_ViewMatrix
  u_ViewMatrix = gl.getUniformLocation(gl.program, "u_ViewMatrix");
  if(!u_ViewMatrix) {
    console.log('Failed to get the storage location of u_ViewMatrix');
    return;
  }

  // Get the storage location of u_ProjectionMatrix
  u_ProjectionMatrix = gl.getUniformLocation(gl.program, "u_ProjectionMatrix");
  if(!u_ProjectionMatrix) {
    console.log('Failed to get the storage location of u_ProjectionMatrix');
    return;
  }

  u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
  if (!u_Sampler0) {
    console.log('Failed to get the storage location of u_Sampler0');
    return false;
  }

  u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
  if (!u_Sampler1) {
    console.log('Failed to get the storage location of u_Sampler1');
    return false;
  }

  u_Sampler2 = gl.getUniformLocation(gl.program, 'u_Sampler2');
  if (!u_Sampler1) {
    console.log('Failed to get the storage location of u_Sampler2');
    return false;
  }

  u_Sampler3 = gl.getUniformLocation(gl.program, 'u_Sampler3');
  if (!u_Sampler3) {
    console.log('Failed to get the storage location of u_Sampler3');
    return false;
  }

  u_Sampler4 = gl.getUniformLocation(gl.program, 'u_Sampler4');
  if (!u_Sampler4) {
    console.log('Failed to get the storage location of u_Sampler4');
    return false;
  }

  u_Sampler5 = gl.getUniformLocation(gl.program, 'u_Sampler5');
  if (!u_Sampler5) {
    console.log('Failed to get the storage location of u_Sampler5');
    return false;
  }

  u_Sampler6 = gl.getUniformLocation(gl.program, 'u_Sampler6');
  if (!u_Sampler6) {
    console.log('Failed to get the storage location of u_Sampler6');
    return false;
  }

  u_Sampler7 = gl.getUniformLocation(gl.program, 'u_Sampler7');
  if (!u_Sampler7) {
    console.log('Failed to get the storage location of u_Sampler7');
    return false;
  }

  u_Sampler8 = gl.getUniformLocation(gl.program, 'u_Sampler8');
  if (!u_Sampler8) {
    console.log('Failed to get the storage location of u_Sampler8');
    return false;
  }

  u_Sampler9 = gl.getUniformLocation(gl.program, 'u_Sampler9');
  if (!u_Sampler9) {
    console.log('Failed to get the storage location of u_Sampler9');
    return false;
  }

  u_Sampler10 = gl.getUniformLocation(gl.program, 'u_Sampler10');
  if (!u_Sampler10) {
    console.log('Failed to get the storage location of u_Sampler10');
    return false;
  }

  u_cameraPos = gl.getUniformLocation(gl.program, 'u_cameraPos');
  if (!u_cameraPos) {
    console.log('Failed to get the storage location of u_cameraPos');
    return false;
  }

  u_lightOn = gl.getUniformLocation(gl.program, 'u_lightOn');
  if (!u_lightOn) {
    console.log('Failed to get the storage location of u_lightOn');
    return false;
  }

  u_spotLightOn = gl.getUniformLocation(gl.program, 'u_spotLightOn');
  if (!u_spotLightOn) {
    console.log('Failed to get the storage location of u_spotLightOn');
    return false;
  }

  // u_at = gl.getUniformLocation(gl.program, 'u_at');
  // if (!u_at) {
  //   console.log('Failed to get the storage location of u_at');
  //   return false;
  // }

  u_spotCosineCutOff = gl.getUniformLocation(gl.program, 'u_spotCosineCutOff');
  if (!u_spotCosineCutOff) {
    console.log('Failed to get the storage location of u_spotCosineCutOff');
    return false;
  }

  u_spotDirection = gl.getUniformLocation(gl.program, 'u_spotDirection');
  if (!u_spotDirection) {
    console.log('Failed to get the storage location of u_spotDirection');
    return false;
  }

  // Set an initial value for this matrix to indentity
  var identityM = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, identityM.elements);
  gl.uniformMatrix4fv(u_ViewMatrix, false, identityM.elements);
  gl.uniformMatrix4fv(u_ProjectionMatrix, false, identityM.elements);
}

// Objects in the world
var crosshair;
var tom;
var cube;
var floor;
var sky;
var brick;
var wallArray = [];
var tomVisibility = false;
var floorMapBlock;
var firstFloorMapBlock;
var secondFloorMapBlock;
var thirdFloorMapBlock;
var forthFloorMapBlock
var stoneBrick;
var dirt;
var whiteCube;
var movementLock;
var aimLabRender;
var theAimLab;
var theHUDStats;
var theMountain;
var diamondBlock;
var showMountain;
var testNormalCube;
var testSphere;
var lightCube;
let textureSphere;
let textureSphere2;
let textureSphere3;
let textureSphere4;

function main() {

  // Set up canvas and gl variables
  setupWebGL();

  // Set up GLSL shader programs and connect GLSL variables
  connectVariablesToGLSL();

  // Set up actions for the HTML UI elements
  addActionsForHtmlUI();

  // initTextures(gl,0);

  document.onkeydown = keydown;

  // Register function (event handler) to be called on a mouse press
  // canvas.onmousedown = function(ev){ click(ev) };
  // canvas.onmousemove = function(ev){ if(ev.buttons == 1) { click(ev); }};
  // canvas.onmouseup = function(ev){ endClick(ev)};

  setUpMouseLock();


  // Location matrix
  let locationMatrix = new Matrix4().translate(-0.5,0.15,0);
  tom = new Tom();
  tom.setLocationMatrix(locationMatrix);



  renderArray = {};

  theAimLab = new AimLab();


  cube = new CubeTextureNormal("../Image/code/santa_bailey-256x256.png",u_Sampler0,0,gl.TEXTURE0);
  cube.matrix.scale(0.5,0.5,0.5);
  cube.initTextures();

  textureSphere = new SphereTexture("../Image/code/santa_bailey-256x256.png",u_Sampler7,7,gl.TEXTURE7);
  textureSphere.update();
  textureSphere.matrix.scale(1,-1,1,);
  textureSphere.matrix.translate(3,0,0);
  textureSphere.initTextures();

  textureSphere2 = new SphereTexture("../Image/code/9k-ezgif.com-resize.png",u_Sampler8,8,gl.TEXTURE8);
  textureSphere2.update();
  textureSphere2.matrix.scale(1,-1,-1,);
  textureSphere2.matrix.translate(-3,0,0);
  textureSphere2.initTextures();

  textureSphere3 = new SphereTexture("../Image/code/diamond_block.png",u_Sampler9,9,gl.TEXTURE9);
  textureSphere3.update();
  textureSphere3.matrix.scale(1,-1,-1,);
  textureSphere3.matrix.translate(0,0,3);
  textureSphere3.initTextures();

  textureSphere4 = new SphereTexture("../Image/code/bricks.png",u_Sampler10,10,gl.TEXTURE10);
  textureSphere4.update();
  textureSphere4.matrix.scale(1,-1,-1,);
  textureSphere4.matrix.translate(0,0,-3);
  textureSphere4.initTextures();

  testNormalCube = new CubeNormal();

  testSphere = new Sphere();
  testSphere.update();

  lightCube = new CubeNormal();
  lightCube.color = [2,2,0,1];
  lightCube.matrix.translate(g_lightPos[0],g_lightPos[1],g_lightPos[2],);
  lightCube.matrix.scale(.1,.1,.1);
  lightCube.matrix.translate(-.5,-.5,-.5);

  floor = new CubeTextureNormal('../Image/code/grey-dots-background_1053-180.jpg',u_Sampler6,6,gl.TEXTURE6);
  floor.color = [1,1,1,1];
  floor.matrix.translate(0,-6.85,0);
  floor.matrix.scale(32,0,32);
  floor.matrix.translate(-.5,0,-.5);
  // floor.matrix.scale(0.6,0.6,0.6);
  floor.initTextures();

  stoneBrick = new CubeTextureNormal("../Image/code/stone_bricks.png",u_Sampler1,1,gl.TEXTURE1);
  stoneBrick.initTextures();

  sky = new CubeTextureNormal('../Image/code/why-sky-blue-2db86ae-ezgif.com-resize.jpg',u_Sampler2,2,gl.TEXTURE2);
  sky.color = [1.0,0.0,0.0,1.0];
  sky.matrix.scale(50,50,50);
  sky.matrix.translate(-.5,-.5,-.5);
  sky.initTextures();

  brick = new CubeTextureNormal('../Image/code/bricks.png',u_Sampler3,3,gl.TEXTURE3);
  brick.initTextures();

  dirt = new CubeTextureNormal('../Image/code/dirt.png',u_Sampler4,4,gl.TEXTURE4);
  dirt.initTextures();

  diamondBlock = new CubeTextureNormal('../Image/code/diamond_block.png',u_Sampler5,5,gl.TEXTURE5);
  diamondBlock.initTextures();

  whiteCube = new Target();
  whiteCube.color = [1,1,1,1];

  theMountain = new Mountain();

  crosshair = new Crosshair();

  theHUDStats = new HUDStates(theAimLab);

  movementLock = false;

  aimLabRender = false;
  
  showMountain = false;

  // wallArray;

  // for (let x = 0; x<32; x++)
  //   {
  //     for(let y = 0; y<32; y++)
  //     {
  //       if(x < 1 || x==31 || y== 0 || y==31)
  //       {
  //         let body = new CubeTextureInUse(brick);
  //         body.matrix.translate(0,-.75,0);
  //         body.matrix.scale(.4,.4,.4);
  //         body.matrix.translate(x-16,0,y-16);
  //         wallArray.push(body);
  //       }
  //     }
  //   }

  // for (let x = 0; x<32; x++)
  //   {
  //     for(let y = 0; y<32; y++)
  //     {
  //       if(x < 1 || x==31 || y== 0 || y==31)
  //       {
  //         let body = new CubeTextureInUse(brick);
  //         body.matrix.translate(0,-.75,0);
  //         body.matrix.scale(.4,.4,.4);
  //         body.matrix.translate(x-16,0,y-16);
  //         wallArray.push(body);
  //       }
  //     }
  //   }

  
  floorMapBlock = new DrawMap(floorMap,-1.25,brick);
  floorMapBlock.mapUpdate();

  firstFloorMapBlock = new DrawMap(firstFloorMap,-0.85,brick);
  firstFloorMapBlock.mapUpdate();

  secondFloorMapBlock = new DrawMap(firstFloorMap,-0.45,brick);
  secondFloorMapBlock.mapUpdate();

  thirdFloorMapBlock = new DrawMap(firstFloorMap,-0.05,brick);
  thirdFloorMapBlock.mapUpdate();

  forthFloorMapBlock = new DrawMap(firstFloorMap,0.35,brick);
  forthFloorMapBlock.mapUpdate();

  aimLabThing = new DrawMap(aimLabMap,-0.85,brick);
  aimLabThing.mapUpdate();

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);


  requestAnimationFrame(tick);
}

var g_shapeList = []; // The array to store the object of a point

// function endClick(ev) {
//   // [x,y] = convertCoordinatesEventToGL(ev);
//   // originalCoordinate = [x,y];
//   let backToNormal = new Matrix4();
//   gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, backToNormal.elements);
// }

// function click(ev) {

//   if(ev.shiftKey)
//   {
//     g_specialAnimationState(true);
//     return;
//   }

//   //Extract the event click and return it in WebGL coordinates
//   [x,y] = convertCoordinatesEventToGL(ev);
//   // console.log(x,y);


//   // let offsetX = originalCoordinate[0];
//   // let offsetY = originalCoordinate[1];
//   var globalRotMat = new Matrix4().rotate((x) *200,0,1,0);
//   var globalRotMat2 = new Matrix4().rotate((y) *200,1,0,0);
//   var totalMatrix = new Matrix4(globalRotMat).multiply(globalRotMat2);
//   gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, totalMatrix.elements);
//   // gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);
// }

// Extract the event clock and return it in WebGL coordinates
function convertCoordinatesEventToGL(ev){
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return([x,y]);
}

var g_startTime=performance.now()/1000.0;
var g_seconds=performance.now()/1000.0-g_startTime;
// Called by browser repeatedly whenever its time
function tick() {
  // Print some debug information so we know we are running
  // console.log(performance.now());

  // From lab 2
  stats.begin();

  // Save the current time
  g_seconds=performance.now()/1000.0-g_startTime;
  // console.log(g_seconds)

  // Update Animation Angles
  if(g_animationOn) updateAnimationAngles();

  if(g_specialAnimation) specialAction();

  // Draw Everything
  renderAllShapes();

  // Tell the browser to update anain when it has time
  stats.end();
  requestAnimationFrame(tick);
}

function updateAnimationAngles() {
  // console.log(g_yellowAnimation);
  // if(g_yellowAnimation) {
  //   g_yellowSlide = (45*Math.sin(g_seconds));
  // }

  // if(g_magenteAnimation) {
  //   g_magentaAngle = (45*Math.sin(3*g_seconds));
  // }

  let cos = Math.cos(g_animationSpeed * g_seconds);
  let sin = Math.sin(g_animationSpeed * g_seconds);

  // Arm control
  g_leftUpperArmSlideAngle = (30*cos);
  g_rightUpperArmSlideAngle = (-30*cos);
  g_leftLowerArmSlideAngle = Math.max(40*cos,0);
  g_rightLowerArmSlideAngle = -Math.min(40*cos,0);
  g_leftHandSlideAngle = (20*cos);
  g_rightHandSlideAngle = (-20*cos);

  // Leg control
  g_leftUpperLegAngle = (45*sin);
  g_rightUpperLegAngle = (-45*sin);
  g_leftLowerLegSlideAngle = -Math.min(45*sin,0);
  g_rightLowerLegSlideAngle = Math.max(45*sin,0);
  g_leftFeetSlideAngle = (30*sin);
  g_rightFeetSlideAngle = (-30*sin);

  // Head control
  g_headYSlideAngle = (15*sin);

  // Light control
  g_lightPos[0] = cos;
  g_lightPos[2] = sin;
  g_lightPos[1] = 1;
  updateLightPos();
}

// var g_eye=[0,0,-1];
// var g_at=[0,0,100];
// var g_up=[0,1,0];

var cam = new Camera();

function drawMap()
{
  // var body = new CubeTextureInUse(brick);
  var returnArray = [];
  for (let x = 0; x<32; x++)
  {
    for(let y = 0; y<32; y++)
    {
      // if(g_map[x][y]==1)
      // {
      //   var body = new CubeTextureInUse(brick);
      //   body.matrix.translate(x-4,-.75,y-4);
      //   body.render();
      // }
      if(x < 1 || x==31 || y== 0 || y==31)
      {
        var body = new CubeTextureInUse(brick);
        body.matrix.translate(0,-.75,0);
        body.matrix.scale(.4,.4,.4);
        body.matrix.translate(x-16,0,y-16);
        body.render();
      }
    }
  }
}

// var tom;
// var cube;
// var floor;
// Draw every shape that is supposed to be in the canvas
var projMat = new Matrix4();
var viewMat = new Matrix4();
var renderArray = [];
var currentPointedColor = [];
var g_normalChange = false;
function renderAllShapes(){

  // Check the time at the start of this function
  var startTime = performance.now();

  // Pass the projection matrix
  // var projMat = new Matrix4();
  projMat.setPerspective(90,canvas.width/canvas.height,.1,100);
  gl.uniformMatrix4fv(u_ProjectionMatrix,false,projMat.elements);

  // Pass the view matrix 
  // var viewMat = new Matrix4();
  viewMat.setLookAt(cam.g_eye[0],cam.g_eye[1],cam.g_eye[2], cam.g_at[0],cam.g_at[1],cam.g_at[2], cam.g_up[0],cam.g_up[1],cam.g_up[2]); // (eye, at, up)
  // viewMat.setLookAt(0,0,-1, 0,0,0, 0,1,0); // (eye, at, up)
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMat.elements);

  // Draw the flor

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Normal Control
  if(g_normal)
  {
    let theGoal = -3;
    lightCube.textureNum = theGoal;
    testNormalCube.textureNum = theGoal;
    floor.textureNum = theGoal;
    sky.textureNum = theGoal;
    floorMapBlock.textureNum = theGoal;
    firstFloorMapBlock.textureNum = theGoal;
    secondFloorMapBlock.textureNum = theGoal;
    thirdFloorMapBlock.textureNum = theGoal;
    forthFloorMapBlock.textureNum = theGoal;
    theMountain.textureNum = theGoal;
    whiteCube.textureNum = theGoal;
    cube.textureNum = theGoal;
    testSphere.textureNum = theGoal;
    floorMapBlock.updateNormal();
    firstFloorMapBlock.updateNormal();
    secondFloorMapBlock.updateNormal();
    thirdFloorMapBlock.updateNormal();
    forthFloorMapBlock.updateNormal();
    // theMountain.updateNormal();
  }
  else
  {
    let theGoal = 0;
    lightCube.textureNum = -2;
    testNormalCube.textureNum = -2;
    floor.textureNum = theGoal;
    sky.textureNum = theGoal;
    floorMapBlock.textureNum = theGoal;
    firstFloorMapBlock.textureNum = theGoal;
    secondFloorMapBlock.textureNum = theGoal;
    thirdFloorMapBlock.textureNum = theGoal;
    forthFloorMapBlock.textureNum = theGoal;
    theMountain.textureNum = theGoal;
    whiteCube.textureNum = -2;
    cube.textureNum = theGoal;
    testSphere.textureNum = -2;
    floorMapBlock.updateNormal();
    firstFloorMapBlock.updateNormal();
    secondFloorMapBlock.updateNormal();
    thirdFloorMapBlock.updateNormal();
    forthFloorMapBlock.updateNormal();
    // theMountain.updateNormal();
  }

  lightUpdate();
  spotLightUpdate();
  updateSpotCosineCutOff();
  updateSpotDirection();

  
  // floor.render();
  // cube.render();
  // sky.render();
  floor.renderFaster();
  // cube.renderFaster();
  sky.renderFaster();
  if(tomVisibility) tom.renderFast();
  crosshair.render();

  // for(let i = 0; i < wallArray.length; i++)
  // {
  //   wallArray[i].inputTexture(brick);
  //   wallArray[i].renderFaster();
  //   // wallArray[i].render();
  // }

  floorMapBlock.renderTexture(stoneBrick);
  firstFloorMapBlock.renderTexture(brick);
  secondFloorMapBlock.renderTexture(brick);
  thirdFloorMapBlock.renderTexture(brick);
  forthFloorMapBlock.renderTexture(brick);
  // whiteCube.renderFaster()

  // Test normal
  // testNormalCube.renderOld();
  // testSphere.renderFast();
  lightCube.matrix.setTranslate(g_lightPos[0],g_lightPos[1],g_lightPos[2],);
  lightCube.matrix.scale(.1,.1,.1);
  lightCube.matrix.translate(-.5,-.5,-.5);
  lightCube.renderOld();

  if(showMountain)
  {
    theMountain.render(diamondBlock);
  }

  if(aimLabRender)
  {
    theHUDStats.render();
    aimLabThing.renderTexture(brick);
  }

  // floorMapBlock.render();

  // let test = new CubeTextureInUse(cube);
  // test.render();


  for(let key in renderArray)
  {
    renderArray[key].renderFaster();
  }

  if(!aimLabRender)
  {
    theHUDStats.clear();
    cube.renderFaster();
    testSphere.renderFast();
    textureSphere3.renderFast();
    textureSphere4.renderFast();
    if(g_funnyOn){
      textureSphere.renderFast();
      textureSphere2.renderFast();
    }
  }

  // test();
  // currentPointedColor = Array.from(getCrosshairColor());
  // console.log(currentPointedColor);
  if(aimLabRender)
  {
    let location = theAimLab.currentTargetLocation;
    whiteCube.matrix.setTranslate(location[0],location[1],location[2]);
    // console.log(location);
    whiteCube.renderFaster();
    currentPointedColor = Array.from(getCrosshairColor());
  }

  var duration = performance.now() - startTime;
  sendTextToHTML(" ms: " + Math.floor(duration) + " fps: " + Math.floor(10000/duration),"textBox");
}



// Set the test of a HTML element
function sendTextToHTML(text, htmlID) {
  var htmlElm = document.getElementById(htmlID);
  if(!htmlElm){
    console.log("Failed to get " + htmlID + " form HTML");
    return;
  }
  htmlElm.innerHTML = text;
}


// Special action
function specialAction(){
  let cos = Math.cos(g_animationSpeed * g_seconds);
  let sin = Math.sin(g_animationSpeed * g_seconds);

  // Arm control
  g_leftUpperArmSlideAngleZ = Math.min(-140*sin,0)-Math.max(-140*sin,0);
  g_rightUpperArmSlideAngleZ = Math.max(140*sin,0)-Math.min(140*sin,0);
  g_leftLowerArmSlideAngleZ = Math.min(-60*sin,0)-Math.max(-60*sin,0);
  g_rightLowerArmSlideAngleZ = Math.max(60*sin,0)-Math.min(60*sin,0);
  g_leftHandSlideAngleZ = Math.min(-15*sin,0)-Math.max(-15*sin,0);
  g_rightHandSlideAngleZ = Math.max(15*sin,0)-Math.min(15*sin,0);

  // Leg control
  g_leftUpperLegAngleZ = Math.min(-45*sin,0)-Math.max(-45*sin,0);
  g_rightUpperLegAngleZ= Math.max(45*sin,0)-Math.min(45*sin,0);
  // g_leftLowerLegSlideAngle = -Math.min(45*sin,0);
  // g_rightLowerLegSlideAngle = Math.max(45*sin,0);
  // g_leftFeetSlideAngle = (30*sin);
  // g_rightFeetSlideAngle = (-30*sin);

  // Head control
  // g_headYSlideAngle = (15*sin);
}


function initTextures() {
  var image = new Image();  // Create the image object
  if (!image) {
    console.log('Failed to create the image object');
    return false;
  }
  // Register the event handler to be called on loading an image
  image.onload = function(){ sendTextureToGLSL(image); };
  // Tell the browser to load an image
  image.src = '../Image/code/santa_bailey-256x256.png';

  return true;
}



function sendTextureToGLSL(image) {
  var texture = gl.createTexture();   // Create a texture object
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  // Enable texture unit0
  gl.activeTexture(gl.TEXTURE0);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Set the texture image
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  
  // Set the texture unit 0 to the sampler
  gl.uniform1i(u_Sampler0, 0);
  
  // gl.clear(gl.COLOR_BUFFER_BIT);   // Clear <canvas>

  // gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw the rectangle

  // console.log('finished loadTexture');
}


// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
// window.addEventListener("keydown",
//   (event) => {
//     switch (event.key) {
//       case "w":
//         cam.moveForward();
//         break;
//       case "s":
//         cam.moveBackword();
//         break;
//       case "a":
//         cam.moveLeft();
//         break;
//       case "d":
//         cam.moveRight();
//         break;
//       case "q":
//         cam.panLeft();
//         break;
//       case "e":
//         cam.panRight();
//         break;
      
//     }
//   }
// );

function keydown(event){
  updateLightPos();
  if(movementLock) return;
  switch (event.key) {
    case "w":
      cam.moveForward();
      break;
    case "s":
      cam.moveBackword();
      break;
    case "a":
      cam.moveLeft();
      break;
    case "d":
      cam.moveRight();
      break;
    case "q":
      cam.panLeft();
      break;
    case "e":
      cam.panRight();
      break;
    case "1":
      cam.panUp();
      break;
    case "2":
      cam.panDown();
      break;
    case "r":
      deleteBlock();
      break;
    
  }
  // renderAllShapes();
}


/**
 * This set of function is used to set the state of the camera to
 * flying or not flying or to reset the camera to it's defult position. 
 */
function flyingOn()
{
  cam.fly = true;
}

function flyingOff()
{
  cam.fly = false;
}

function flyingReset()
{
  cam.cameraReset();
}

/**
 * Setting up the system to lock the mouse in place
 * Source of the code
 * https://stackoverflow.com/questions/30699743/javascript-disable-the-cursor
 */
var hud = document.getElementById('HUD'); 
var ctx = hud.getContext('2d');
function setUpMouseLock()
{
  
  hud.onclick = function() {
    hud.requestPointerLock();
  }
  document.addEventListener('pointerlockchange', lockChangeAlert, false);
}

function lockChangeAlert() {
  if(document.pointerLockElement === hud) {
    document.addEventListener("mousemove",getMovement , false);
    mouseLock = true;
  } else { 
    document.removeEventListener("mousemove", getMovement, false);
    mouseLock = false;
  }
}

function getMovement(e)
{
  let x = e.movementX;
  let y = e.movementY;

  cam.panLeftRight(x);
  cam.panUpDown(y);
}

function showTom()
{
  tomVisibility = true;
}

function hideTom()
{
  tomVisibility = false;
}


// function handleFrontPoint()
// {
//   let temp_g_at = [cam.g_at[0]/0.4,cam.g_at[1]/0.4,cam.g_at[2]/0.4];
//   let temp_g_eye = [cam.g_eye[0]/0.4,cam.g_eye[1]/0.4,cam.g_eye[2]/0.4]
//   let looking = new Vector3(temp_g_at).sub(new Vector3(temp_g_eye));
//   // let lookingUnit = looking.normalize();
//   let expectedPoint = new Vector3(cam.g_eye).add(looking)
//   let expectedLocation = [];
//   for(let i = 0; i < 3; i++)
//   {
//     expectedLocation[i] = Math.round(expectedPoint.elements[i]) * 0.4;
//   }
//   return expectedLocation
// }

// body.matrix.translate(i-this.width/2,0,j-this.length/2);


var placeBlockState = false;
var mouseLock = false;
function handleFrontPoint()
{
  let expectedLocation = [];
  expectedLocation[0] = Math.round(cam.g_at[0]*2.5)
  expectedLocation[2] = Math.round(cam.g_at[2]*2.5)
  // console.log(expectedLocation);
  return expectedLocation
}

function placeBlock()
{
  if(!placeBlockState || !mouseLock) return;
  let placementPoint = handleFrontPoint();
  let body;
  if(!(placementPoint in renderArray))
  {
    body = new CubeTextureInUse(dirt);
    body.matrix.translate(0,-0.85,0);
    body.matrix.scale(0.4,0.4,0.4);
    body.matrix.translate(placementPoint[0],0,placementPoint[2]);
  }
  else
  {
    return;
  }
  renderArray[placementPoint] = body;
}

function deleteBlock()
{
  if(!placeBlockState || !mouseLock) return;
  // console.log("GG");
  let placementPoint = handleFrontPoint();
  if((placementPoint in renderArray))
  {
    // console.log("Working");
    delete renderArray[placementPoint];
  }
}

function placeBlockOn(){
  placeBlockState = true;
}

function placeBlockOff(){
  placeBlockState = false;
}

function placeBlockReset(){
  renderArray = {};
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/readPixels
 * https://github.com/davidwparker/programmingtil-webgl/blob/master/0033-reading-pixels/index.js
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext#preservedrawingbuffer
 * https://www.youtube.com/watch?v=9uG0W7659lA
 */
function getCrosshairColor()
{
  let canvas = document.getElementById("webgl");
  let gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
  let pixels = new Uint8Array(4);
  // gl.finish();
  gl.readPixels(
    canvas.width / 2,
    canvas.height / 2,
    1,
    1,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    pixels,
  );

  return pixels;
}


function handleShoot()
{
  // console.log(currentPointedColor);
  for(let i = 0; i < 4; i++)
  {
    if(currentPointedColor[i] != 255)
    {
      return false;
    }
  }
return true;
}

function aimLabSetUP()
{
  movementLock = true;
  aimLabRender = true;
  placeBlockOff();
  placeBlockReset();
  flyingOff();

  cam.g_eye = [0,0,-14*0.4];
  cam.g_at = [0,0,0];

  theAimLab.reset();
}

function aimLabReset()
{
  theAimLab.reset();
}

function aimLabOff()
{
  movementLock = false;
  aimLabRender = false;
  placeBlockOff();
  placeBlockReset();
  flyingOff();

  theAimLab.reset();
}

function mountainOn()
{
  showMountain = true;
  cam.g_eye = [0,0,-14*0.4];
  cam.g_at = [0,0,0];
}

function mountainOff()
{
  showMountain = false;
}

function tpOriginal()
{
  cam.tpOriginal();
}

function tpFlatFloor()
{
  cam.tpFlatFloor();
}

function normalOn()
{
  g_normal = true;
  g_normalChange = true;
}

function normalOff()
{
  g_normal = false;
  g_normalChange = true;
}

function updateLightPos()
{
  gl.uniform3f(u_lightPos,g_lightPos[0],g_lightPos[1],g_lightPos[2]);
  gl.uniform3f(u_cameraPos,cam.g_eye[0],cam.g_eye[1],cam.g_eye[2]);
  gl.uniform3f(u_at,cam.g_at[0],cam.g_at[1],cam.g_at[2],);
}

function lightUpdate()
{
  gl.uniform1i(u_lightOn,g_lightOn);
}

function lightOn()
{
  g_lightOn = true;
}

function lightOff()
{
  g_lightOn = false;
}

function spotLightUpdate()
{
  gl.uniform1i(u_spotLightOn,g_spotLightOn);
}

function spotLightOn()
{
  g_spotLightOn = true;
}

function spotLightOff()
{
  g_spotLightOn = false;
}

function updateSpotCosineCutOff()
{
  gl.uniform1f(u_spotCosineCutOff,Math.cos(g_spotCosineCutoff/180 * Math.PI));
  // gl.uniform1f(u_spotCosineCutOff,g_spotCosineCutoff);
}

function updateSpotDirection(lightDirection,normalMatrix)
{
  // let transformedDirection = normalMatrix.multiplyVector3(lightDirection);
  let direction = [cam.g_at[0]-cam.g_eye[0],cam.g_at[1]-cam.g_eye[1],cam.g_at[2]-cam.g_eye[2],];
  gl.uniform3f(u_spotDirection,direction[0],direction[1],direction[2]);
}

function funnyOn()
{
  g_funnyOn = true;
}

function funnyOff()
{
  g_funnyOn = false;
}