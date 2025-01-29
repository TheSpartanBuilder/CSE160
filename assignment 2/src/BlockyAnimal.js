// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform float u_Size;\n' +
  'uniform mat4 u_ModelMatrix;\n'+
  'uniform mat4 u_GlobalRotateMatrix;\n'+
  'void main() {\n' +
  '  gl_Position = u_GlobalRotateMatrix * u_ModelMatrix * a_Position;\n' +
  '  //gl_Position = a_Position;\n' +
  '  //gl_PointSize = 10.0;\n' +
  '  //gl_PointSize = u_Size;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'precision mediump float;\n' +
  'uniform vec4 u_FragColor;\n' +  // uniform変数
  'void main() {\n' +
  '  gl_FragColor = u_FragColor;\n' +
  '}\n'; 

// Visit when free
// https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line

// Constants
const explosion_sound = new Audio("../Audio/explosion-42132.mp3");
const target_neutralized_sound = new Audio("../Audio/target-neutralized-sound-effect-for-editing-made-with-Voicemod.mp3");
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
let u_FragColor;
let u_Size;
let u_ModelMatrix;
let u_GlobalRotateMatrix;

// let g_selectedColor=[1.0,1.0,1.0,1.0];
// let g_selectedSize= 5.0;
// let g_selectedType=POINT;
// let g_segments = 10;
// let g_numSide = 5;
// let g_point = 5;
// let g_width = 30.0;
// let g_height = 18.0;
let g_yellowAngle = 0;
let g_yellowSlide = 0;
let g_magentaAngle = 0;
let g_yellowAnimation = false;
let g_magenteAnimation = false;

function g_yellowAnimationState(input)
{
  // console.log(input);
  g_yellowAnimation = input;
}

function g_magenteAnimationState(input)
{
  // console.log(input);
  g_magenteAnimation = input;
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
  document.getElementById('angleSlide').addEventListener("mousemove", function() { g_yellowAngle = this.value;  });
  document.getElementById('yellowSlide').addEventListener("mousemove", function() { g_yellowSlide = this.value;  });
  document.getElementById('magentaSlide').addEventListener("mousemove", function() { g_magentaAngle = this.value;  });

  // document.getElementById('angleSlide').addEventListener("mouseup", function() { g_globalAngle = this.value; renderAllShapes(); });

  // Size Slider Events
  // document.getElementById('sizeSlide').addEventListener('mouseup', function() { g_selectedSize = this.value; });
  // document.getElementById('widthSlide').addEventListener('mouseup', function() { g_width = this.value; });
  // document.getElementById('heightSlide').addEventListener('mouseup', function() { g_height = this.value; });

  //Options
  // document.getElementById("numSideSelect").addEventListener( "change" ,function() { g_numSide = this.value; });
  // document.getElementById("numPointSelect").addEventListener( "change" ,function() { g_point = this.value; });
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

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
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

  // Get the storage location of u_GlobalRotateMatrix
  u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, "u_GlobalRotateMatrix");
  if(!u_GlobalRotateMatrix) {
    console.log('Failed to get the storage location of u_GlobalRotateMatrix');
    return;
  }

  // Set an initial value for this matrix to indentity
  var identityM = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, identityM.elements);
}

function main() {

  // Set up canvas and gl variables
  setupWebGL();

  // Set up GLSL shader programs and connect GLSL variables
  connectVariablesToGLSL();

  // Set up actions for the HTML UI elements
  addActionsForHtmlUI();

  // Register function (event handler) to be called on a mouse press
  // canvas.onmousedown = function(ev){ click(ev) };
  // canvas.onmousemove = function(ev){ if(ev.buttons == 1) { click(ev); }};

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  //gl.clear(gl.COLOR_BUFFER_BIT);
  //renderAllShapes();

  requestAnimationFrame(tick);

  // test();
  // drawPentagon();
  // let test = new Ractangle();
  // test.render();

  // console.log(myGeneratePentagonVertices(0,0,5,2));
}

/*
var g_points = [];  // The array for the position of a mouse press
var g_colors = [];  // The array to store the color of a point
var g_size = [];    // The array to store the size of a point
*/

var g_shapeList = []; // The array to store the object of a point

function click(ev) {

  //Extract the event click and return it in WebGL coordinates
  [x,y] = convertCoordinatesEventToGL(ev);

  
  // Store the coordinates to g_points array
  // g_points.push([x, y]);

  // Store the size to the g_size array
  // g_size.push(g_selectedSize);
  /*
  // Store the coordinates to g_points array
  if (x >= 0.0 && y >= 0.0) {      // First quadrant
    g_colors.push([1.0, 0.0, 0.0, 1.0]);  // Red
  } else if (x < 0.0 && y < 0.0) { // Third quadrant
    g_colors.push([0.0, 1.0, 0.0, 1.0]);  // Green
  } else {                         // Others
    g_colors.push([1.0, 1.0, 1.0, 1.0]);  // White
  }
    */
  // g_colors.push(g_selectedColor.slice());

  let newShape;

  switch(g_selectedType)
  {
    case POINT:
      newShape = new Point();
      break;
    case TRIANGLE:
      newShape = new Triangle();
      break;
    case CIRCLE:
      newShape = new Circle();
      newShape.segments = g_segments;
      break;
    case TAGON:
      newShape = new N_tagon();
      newShape.numSide = g_numSide;
      break;
    case STAR:
      newShape = new Star();
      newShape.numSide = g_point;
      break;
    case RACTANGLE:
      newShape = new Ractangle();
      newShape.width = g_width;
      newShape.height = g_height;
  }

  newShape.position=[x,y];
  newShape.color=g_selectedColor.slice();
  newShape.size=g_selectedSize;
  newShape.update();
  g_shapeList.push(newShape);

  //Draw every shape that is supposed to be in the canvas
  renderAllShapes();
}

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

  // Save the current time
  g_seconds=performance.now()/1000.0-g_startTime;
  // console.log(g_seconds)

  // Update Animation Angles
  updateAnimationAngles();

  // Draw Everything
  renderAllShapes();

  // Tell the browser to update anain when it has time
  requestAnimationFrame(tick);
}

function updateAnimationAngles() {
  // console.log(g_yellowAnimation);
  if(g_yellowAnimation) {
    g_yellowSlide = (45*Math.sin(g_seconds));
  }

  if(g_magenteAnimation) {
    g_magentaAngle = (45*Math.sin(3*g_seconds));
  }
}

// Draw every shape that is supposed to be in the canvas
function renderAllShapes(){

  // Check the time at the start of this function
  var startTime = performance.now();

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  //var len = g_points.length;
  // var len = g_shapeList.length;
  // for(var i = 0; i < len; i++) {
  //   /*
  //   var xy = g_shapeList[i].position;
  //   var rgba = g_shapeList[i].color;
  //   var size = g_shapeList[i].size;

  //   //console.log(g_shapeList);

  //   // Pass the size of a point to u_Size variable
  //   gl.uniform1f(u_Size,size);
  //   // Pass the position of a point to a_Position variable
  //   gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
  //   // Pass the color of a point to u_FragColor variable
  //   gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
  //   // Draw
  //   gl.drawArrays(gl.POINTS, 0, 1);
  //   */

  //   // Execute the class's reder method
  //   g_shapeList[i].render();
  // }

  // Pass the matrix to u_ModelMatrix attribute
  var globalRotMat = new Matrix4().rotate(g_yellowAngle,0,1,0);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

  // Draw a test triangle
  // drawTriangle3D( [-1.0,0.0,0.0,  -0.5,-1.0,0.0,  0.0,0.0,0.0]);

  // Draw a cube
  var body = new Cube();
  body.color = [1.0,0.0,0.0,1.0];
  body.matrix.translate(-.25,-.75,0.0);
  body.matrix.rotate(-5,1,0,0);
  body.matrix.scale(0.5,.3,.5);
  body.render();

  // Draw left arm
  var leftArm = new Cube();
  leftArm.color = [1,1,0,1];
  leftArm.matrix.translate(0,-.5,0.0);
  leftArm.matrix.rotate(-5,1,0,0);

  // if(g_yellowAnimation)
  // {
  //   //leftArm.matrix.rotate(-g_yellowSlide,0,0,1);
  //   leftArm.matrix.rotate(45*Math.sin(g_seconds),0,0,1);
  // }
  // else
  // {
  //   leftArm.matrix.rotate(-g_yellowSlide,0,0,1);
  //   //leftArm.matrix.rotate(45*Math.sin(g_seconds),0,0,1);
  // }

  leftArm.matrix.rotate(-g_yellowSlide,0,0,1);
  //leftArm.matrix.rotate(45*Math.sin(g_seconds),0,0,1);
  var yelloCoordinateMatrix = new Matrix4(leftArm.matrix);
  leftArm.matrix.scale(0.25,.7,.5);
  leftArm.matrix.translate(-.5,0,0);
  leftArm.render()

  // var yelloCoordinateMatrixInverse = new Matrix4().invert(yelloCoordinateMatrix);

  // Test box
  var box = new Cube();
  box.color = [1,0,1,1];
  box.matrix = yelloCoordinateMatrix
  box.matrix.translate(0, 0.65, 0);
  //box.matrix.rotate(0,1,0,0);
  box.matrix.rotate(g_magentaAngle,0,0,1);
  box.matrix.scale(.3,.3,.3);
  box.matrix.translate(-.5,0,-0.001);
  box.render();


  // box.matrix.translate(-.1,.1,0,0);
  // box.matrix.rotate(-30,1,0,0);
  // box.matrix.scale(.2,.4,.2);
  // // box.matrix.multiply(yelloCoordinateMatrixInverse);
  // // box.matrix.rotate(g_yellowSlide,1,0,0);
  // // box.matrix.multiply(yelloCoordinateMatrix);
  // box.matrix.multiply(basisAngle(yelloCoordinateMatrix,[g_yellowSlide,1,0,0]));
  // box.render()

  // var time = performance.now() - startTime;
  // sendTextToHTML("numdot: " + len + " ms: " + Math.floor(time) + " fps: " + Math.floor(10000/time),"textBox");
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

// Change of basis angle matrix
function basisAngle(matrix,angle)
{
  let i1 = new Vector4([1,0,0,1]);
  let i2 = new Vector4([0,1,0,1]);
  let i3 = new Vector4([0,0,1,1]);
  let v1 = matrix.multiplyVector4(i1);
  let v2 = matrix.multiplyVector4(i2);
  let v3 = matrix.multiplyVector4(i3);

  //console.log(v1,v2,v3)

  let v1e = v1.elements;
  let v2e = v2.elements;
  let v3e = v3.elements;

  let basisMatrix = new Matrix4();
  let e = basisMatrix.elements;
  e[0] = v1e[0];   e[4] = v2e[0];   e[8]  = v3e[0];   e[12] = 0;
  e[1] = v1e[1];   e[5] = v2e[1];   e[9]  = v3e[1];   e[13] = 0;
  e[2] = v1e[2];   e[6] = v2e[2];   e[10] = v3e[2];   e[14] = 0;
  e[3] = 0;   e[7] = 0;   e[11] = 0;   e[15] = 1;

  //console.log(basisMatrix)

  let basisMatrixInverse = new Matrix4().invert(basisMatrix);

  //console.log("inverse");
  //console.log(basisMatrixInverse)

  let BasisMatrixRotate = new Matrix4(basisMatrix).rotate(angle[0],angle[1],angle[2],angle[3]);
  return new Matrix4(BasisMatrixRotate).multiply(basisMatrixInverse);
}