import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';



let cube;
let canvas;
let renderer;
let scene;
let camera;
let cubes;
let loader;

const loadingElem = document.querySelector('#loading');
const progressBarElem = loadingElem.querySelector('.progressbar');

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
     * Setting up the texture
     */
    // const loader = new THREE.TextureLoader();
    // const texture = loader.load('../image/santa_bailey-256x256.png');
    // texture.colorSpace = THREE.SRGBColorSpace;

    /**
     * Setting texture with six different texture on each side
     */
    const loadManager = new THREE.LoadingManager();
    loader = new THREE.TextureLoader(loadManager);

    const materials = [
      new THREE.MeshBasicMaterial({map: loadColorTexture('../image/9k-ezgif.com-resize.png')}),
      new THREE.MeshBasicMaterial({map: loadColorTexture('../image/bf8f1b26cb46d0657330039dab47a7d7-ezgif.com-resize.jpg')}),
      new THREE.MeshBasicMaterial({map: loadColorTexture('../image/bricks.png')}),
      new THREE.MeshBasicMaterial({map: loadColorTexture('../image/diamond_block.png')}),
      new THREE.MeshBasicMaterial({map: loadColorTexture('../image/santa_bailey-256x256.png')}),
      new THREE.MeshBasicMaterial({map: loadColorTexture('../image/why-sky-blue-2db86ae-ezgif.com-resize.jpg')}),
    ];

    loadManager.onLoad = () => {
      loadingElem.style.display = 'none';
      const cube = new THREE.Mesh(geometry, materials);
      scene.add(cube);
      cubes.push(cube);
    }

    // loadManager.onProgress = (url0fLastItemLoaded, itemsLoaded, itemsTotal) => {
    //   const progress = itemLoaded / itemsTotal;
    //   prograssBarElem.style.transform = `scaleX(${progress})`;
    // }

    /**
     * Creating basic material and color for the cube
     * This is used to create an object with no light effects
     */
    // const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
    // const material = new THREE.MeshBasicMaterial({map: texture});

    /**
     * Creating basic material and color for the cube
     * This is used to create an object with light effects
     */
    // const material = new THREE.MeshPhongMaterial({color: 0x44aa88});


    /**
     * Creating the cube
     */
    // cube = new THREE.Mesh(geometry, material);
    cube = new THREE.Mesh(geometry, materials);

    /**
     * Adding the cube to the scene
     */
    // scene.add(cube);

    /**
     * Render the scene
     */
    renderer.render(scene, camera);

    /**
     * Adding light to the scene
     */
    // const color = 0xFFFFF;
    // const intensity = 3;
    // const light = new THREE.DirectionalLight(color, intensity);
    // light.position.set(-1,2,4);
    // scene.add(light);

    /**
     * Adding three cube at the same time to the scene
     */
    // cubes = [
    //     makeInstance(geometry, 0x44aa88,  0),
    //     makeInstance(geometry, 0x8844aa, -2),
    //     makeInstance(geometry, 0xaa8844,  2),
    // ];



    /**
     * Start the animation
     */
    requestAnimationFrame(tick);
}


function tick(time) {
    time *= 0.001;

    cube.rotation.x = time;
    cube.rotation.y = time;

    // cubes.forEach((cube, ndx) => {
    //     const speed = 1 + ndx * .1;
    //     const rot = time * speed;
    //     cube.rotation.x = rot;
    //     cube.rotation.y = rot;
    //   });
    

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

function loadColorTexture(path)
{
  const texture = loader.load(path);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}


/**
 * Program start
 */

main();