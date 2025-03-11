import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';
// import { GUI } from 'dat.gui.js';
import MinMaxGUIHelper from './MinMaxGUIHelper.js';
// import GUI from 'lil-gui';



let cube;
let canvas;
let renderer;
let scene;
let camera;
let cubes;
let loader;

const loadingElem = document.querySelector('#loading');
const progressBarElem = loadingElem.querySelector('.progressbar');
const objLoader = new OBJLoader();
const mtlLoader = new MTLLoader();

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
    const far = 500;
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
    camera.position.z = 5;

    /**
     * Setting up a GUi for controling the camera
     * https://threejs.org/manual/#en/cameras
     * https://lil-gui.georgealways.com/
     */
    const GUI = lil.GUI;
    const gui = new GUI();
    gui.add(camera, 'fov', 1, 180).onChange(updateCamera);
    const minMaxGUIHelper = new MinMaxGUIHelper(camera, 'near', 'far', 0.1);
    gui.add(minMaxGUIHelper, 'min', 0.1, 50, 0.1).name('near').onChange(updateCamera);
    gui.add(minMaxGUIHelper, 'max', 0.1, 50, 0.1).name('far').onChange(updateCamera);

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
    // const texture = loader.load('./image/santa_bailey-256x256.png');
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
      // cubes.push(cube);
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
     * Creating a model using a obj file
     * https://www.youtube.com/watch?v=wHuSQ7I1aKs&ab_channel=LearnThreejs
     */
    // mtlLoader.load('/models/IronMan/IronMan.mtl', (mtl) => {
    //   mtl.preload();
    //   objLoader.setMaterials(mtl);
    //   objLoader.load('/models/IronMan/IronMan.obj', (root) => {
    //     scene.add(root);
    //   });
    // });
    mtlLoader.setResourcePath('../models/IronMan/');
    mtlLoader.setPath('../models/IronMan/');
    mtlLoader.load('IronMan.mtl', function(materials) {
      materials.preload();
      for(const material of Object.values(materials.materials)) {
        material.side = THREE.DoubleSide;
      }

      objLoader.setMaterials(materials);
      objLoader.setPath('../models/IronMan/');
      objLoader.load('IronMan.obj', function(object) {
        object.position.y -= 1;
        object.position.x -= 2;
        object.scale.set(0.01,0.01,0.01);
        scene.add(object);
      });
    });
    
    /**
     * Adding light from the video so I can see the model
     */
    var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'),1.0);
    keyLight.position.set(-100,0,100);

    var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
    fillLight.position.set(100,0,100);

    var backLight = new THREE.DirectionalLight(0xFFFFFF,1.0);
    backLight.position.set(100,0,-100).normalize();

    scene.add(keyLight);
    scene.add(fillLight);
    scene.add(backLight);
  





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

function updateCamera() {
  camera.updateProjectionMatrix();
}

/**
 * Program start
 */

main();