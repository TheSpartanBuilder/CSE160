import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.min.js';

let cube;
let canvas;
let renderer;
let scene;
let camera;
let cubes;

function main() {
    /**
     * Setting up the canvas 
     */
    canvas = document.querySelector('#A5canvas');
    renderer = new THREE.WebGLRenderer({antialias: true, canvas});

    /**
     * Setting up the camera
     * Reference :
     * https://www.youtube.com/watch?v=Q7AOvWpIVHU&ab_channel=Fireship
     */
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 5;
    camera = new THREE.PerspectiveCamera(fov, window.innerWidth/ window.innerHeight,near, far);

    /**
     * Setting up the renderer
     * Reference :
     * https://www.youtube.com/watch?v=Q7AOvWpIVHU&ab_channel=Fireship
     */
    // Not using it because it will make the canvas use up the whole webpage
    // renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(window.innerWidth, window.innerHeight);

    /**
     * Setting the location of the camera
     */
    camera.position.z = 2;

    /**
     * Setting up the scene
     */
    scene = new THREE.Scene();

    /**
     * Setting up a box
     */
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth,boxHeight,boxDepth);

    /**
     * Creating basic material and color for the cube
     * This is used to create an object with no light effects
     */
    // const material = new THREE.MeshBasicMaterial({color: 0x44aa88});

    /**
     * Creating basic material and color for the cube
     * This is used to create an object with light effects
     */
    const material = new THREE.MeshPhongMaterial({color: 0x44aa88});


    /**
     * Creating the cube
     */
    // cube = new THREE.Mesh(geometry, material);

    /**
     * Adding the cube to the scene
     */
    scene.add(cube);

    /**
     * Render the scene
     */
    renderer.render(scene, camera);

    /**
     * Adding light to the scene
     */
    const color = 0xFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1,2,4);
    scene.add(light);

    /**
     * Adding three cube at the same time to the scene
     */
    cubes = [
        makeInstance(geometry, 0x44aa88,  0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844,  2),
    ];



    /**
     * Start the animation
     */
    requestAnimationFrame(tick);
}


function tick(time) {
    time *= 0.001;

    // cube.rotation.x = time;
    // cube.rotation.y = time;

    cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * .1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
      });
    

    renderer.render(scene,camera);

    requestAnimationFrame(tick);
}

function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color});
   
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
   
    cube.position.x = x;
   
    return cube;
  }


/**
 * Program start
 */

main();