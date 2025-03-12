import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';
// import MinMaxGUIHelper from './MinMaxGUIHelper.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import ColorGUIHelper from './ColorGUIHelper.js';

let cube;
let canvas;
let renderer;
let scene;
let camera;
let cubes;
let controls;
let lightList;

const loader = new THREE.TextureLoader();

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
     * making the background color to white
     */
    scene.background = new THREE.Color('white');

    /**
     * getting a ground
     */
    const planeSize = 40;
 
    // const loader = new THREE.TextureLoader();
    const texture = loader.load('./iamge/grey-dots-background_1053-180.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);
    
    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
    });
    planeMat.color.setRGB(1.5, 1.5, 1.5);
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -.5;
    scene.add(mesh);

    /**
     * Render the scene
     */
    renderer.render(scene, camera);

    /**
     * Start the animation
     */
    requestAnimationFrame(tick);
}


function tick(time) {
    time *= 0.001;

    // cube.rotation.x = time;
    // cube.rotation.y = time;

    // cubes.forEach((cube, ndx) => {
    //     const speed = 1 + ndx * .1;
    //     const rot = time * speed;
    //     cube.rotation.x = rot;
    //     cube.rotation.y = rot;
    //   });
    

    renderer.render(scene,camera);

    requestAnimationFrame(tick);
}


main();