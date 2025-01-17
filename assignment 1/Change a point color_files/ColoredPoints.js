// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform float u_Size;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  //gl_PointSize = 10.0;\n' +
  '  gl_PointSize = u_Size;\n' +
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

  
// Global Variables
// https://dev.to/shantanu_jana/how-to-play-sound-on-button-click-in-javascript-3m48
const explosion_sound = new Audio("../Audio/explosion-42132.mp3");
const target_neutralized_sound = new Audio("../Audio/target-neutralized-sound-effect-for-editing-made-with-Voicemod.mp3");
let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_Size;

let g_selectedColor=[1.0,1.0,1.0,1.0];
let g_selectedSize= 5.0;

// Set up actions for the HTML UI elements
function addActionsForHtmlUI()
{
  // Button Events (Shape Type)
  document.getElementById('green').onclick = function() { g_selectedColor = [0.0,1.0,0.0,1.0];};
  document.getElementById('red').onclick = function() { g_selectedColor = [1.0,0.0,0.0,1.0];};
  document.getElementById('clearButton').onclick = function() { g_shapeList = []; renderAllShapes(); explosion_sound.play(); setTimeout( () => target_neutralized_sound.play(),1200);};

  // Slider Events
  document.getElementById('redSlide').addEventListener("mouseup", function() { g_selectedColor[0] = this.value/100; });
  document.getElementById('greenSlide').addEventListener("mouseup", function() { g_selectedColor[1] = this.value/100; });
  document.getElementById('blueSlide').addEventListener("mouseup", function() { g_selectedColor[2] = this.value/100; });

  // Size Slider Events
  document.getElementById('sizeSlide').addEventListener('mouseup', function() { g_selectedSize = this.value; });
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
  u_Size = gl.getUniformLocation(gl.program, 'u_Size');
  if (!u_Size) {
    console.log('Failed to get the storage location of u_Size');
    return;
  }
}

function main() {

  // Set up canvas and gl variables
  setupWebGL();

  // Set up GLSL shader programs and connect GLSL variables
  connectVariablesToGLSL();

  // Set up actions for the HTML UI elements
  addActionsForHtmlUI();

  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = function(ev){ click(ev) };
  canvas.onmousemove = function(ev){ if(ev.buttons == 1) { click(ev); }};

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
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

  let newPoint = new Point();
  newPoint.position=[x,y];
  newPoint.color=g_selectedColor.slice();
  newPoint.size=g_selectedSize;
  g_shapeList.push(newPoint);

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

// Draw every shape that is supposed to be in the canvas
function renderAllShapes(){

  // Check the time at the start of this function
  var startTime = performance.now();

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  //var len = g_points.length;
  var len = g_shapeList.length;
  for(var i = 0; i < len; i++) {
    /*
    var xy = g_shapeList[i].position;
    var rgba = g_shapeList[i].color;
    var size = g_shapeList[i].size;

    //console.log(g_shapeList);

    // Pass the size of a point to u_Size variable
    gl.uniform1f(u_Size,size);
    // Pass the position of a point to a_Position variable
    gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    // Draw
    gl.drawArrays(gl.POINTS, 0, 1);
    */

    // Execute the class's reder method
    g_shapeList[i].render();
  }

  var time = performance.now() - startTime;
  sendTextToHTML("numdot: " + len + " ms: " + Math.floor(time) + " fps: " + Math.floor(10000/time),"textBox");
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