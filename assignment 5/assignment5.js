import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';
// import { GUI } from 'dat.gui.js';
import MinMaxGUIHelper from './MinMaxGUIHelper.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import ColorGUIHelper from './ColorGUIHelper.js';
// import GUI from 'lil-gui';



let cube;
let canvas;
let renderer;
let scene;
let camera;
let cubes;
let loader;
let controls;
let lightList;

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
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    /**
     * Setting up the camera
     * Reference :
     * https://www.youtube.com/watch?v=Q7AOvWpIVHU&ab_channel=Fireship
     */
    const fov = 45;
    const aspect = 2;
    const near = 0.1;
    const far = 100;
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
     * Getting obit controls
     * https://www.youtube.com/watch?v=4ZgkMS5rH3E&ab_channel=SyntaxByte
     */
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    /**
     * Adding a plane
     */
    const planeSize = 40;

    const planeLoader = new THREE.TextureLoader();
    const planeTexture = planeLoader.load("./image/grey-dots-background_1053-180.jpg");
    planeTexture.warpS = THREE.RepeatWrapping;
    planeTexture.warpT = THREE.RepeatWrapping;
    planeTexture.magFilter = THREE.NearestFilter;
    planeTexture.colorSpace = THREE.SRGBColorSpace;
    const repeats = planeSize / 2;
    planeTexture.repeat.set(repeats,repeats)

    const planeGeo = new THREE.PlaneGeometry(planeSize,planeSize);
    // const planeMat = new THREE.MeshPhongMaterial(
    //   {
    //     map: planeTexture,
    //     side: THREE.DoubleSide,
    //   }
    // );
    const planeMat = new THREE.MeshPhongMaterial({color: 0xaaaaaa, side: THREE.DoubleSide});
    // making plane have shadow 
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    mesh.rotation.x = Math.PI * -.5;
    mesh.position.y -= 1.1;

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
      new THREE.MeshBasicMaterial({map: loadColorTexture('./image/9k-ezgif.com-resize.png')}),
      new THREE.MeshBasicMaterial({map: loadColorTexture('./image/bf8f1b26cb46d0657330039dab47a7d7-ezgif.com-resize.jpg')}),
      new THREE.MeshBasicMaterial({map: loadColorTexture('./image/bricks.png')}),
      new THREE.MeshBasicMaterial({map: loadColorTexture('./image/diamond_block.png')}),
      new THREE.MeshBasicMaterial({map: loadColorTexture('./image/santa_bailey-256x256.png')}),
      new THREE.MeshBasicMaterial({map: loadColorTexture('./image/why-sky-blue-2db86ae-ezgif.com-resize.jpg')}),
    ];

    loadManager.onLoad = () => {
      loadingElem.style.display = 'none';
      const cube = new THREE.Mesh(geometry, materials);
      cube.castShadow = true;
      cube.receiveShadow = true;
      scene.add(cube);
      // cubes.push(cube);
    }


    /**
     * Adding skybox
     * https://www.youtube.com/watch?v=cp-H_6VODko&ab_channel=RedStapler
     * https://opengameart.org/content/stormy-days-skybox
     * https://opengameart.org/content/skiingpenguins-skybox-pack?page=3
     */
    const skyBoxLoader = new THREE.CubeTextureLoader();
    const skyBoxTexture = skyBoxLoader.load([
      './image/penguins-skybox-pack/penguins (7)/cocoa_ft.jpg',
      './image/penguins-skybox-pack/penguins (7)/cocoa_bk.jpg',
      './image/penguins-skybox-pack/penguins (7)/cocoa_up.jpg',
      './image/penguins-skybox-pack/penguins (7)/cocoa_dn.jpg',
      './image/penguins-skybox-pack/penguins (7)/cocoa_rt.jpg',
      './image/penguins-skybox-pack/penguins (7)/cocoa_lf.jpg',
    ]);
    scene.background = skyBoxTexture;

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
    mtlLoader.setResourcePath('./models/IronMan/');
    mtlLoader.setPath('./models/IronMan/');
    mtlLoader.load('IronMan.mtl', function(materials) {
      materials.preload();
      for(const material of Object.values(materials.materials)) {
        material.side = THREE.DoubleSide;
      }

      objLoader.setMaterials(materials);
      objLoader.setPath('./models/IronMan/');
      objLoader.load('IronMan.obj', function(object) {
        object.position.y -= 1;
        object.position.x -= 2;
        object.scale.set(0.01,0.01,0.01);
        object.castShadow = true;
        object.receiveShadow = true;
        scene.add(object);
      });
    });
    
    /**
     * Adding light from the video so I can see the model
     */
    // var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'),1.0);
    // keyLight.position.set(-100,0,100);

    // var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
    // fillLight.position.set(100,0,100);

    // var backLight = new THREE.DirectionalLight(0xFFFFFF,1.0);
    // backLight.position.set(100,0,-100).normalize();

    // scene.add(keyLight);
    // scene.add(fillLight);
    // scene.add(backLight);

    /**
     * Adding light from the three js document 
     */
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.AmbientLight(color, intensity);
    scene.add(light)

    /**
     * Adding directional light
     */
    const directionalColor = 0xFFFFFF;
    const directionalIntensity = 1;
    const directionalLight = new THREE.DirectionalLight(directionalColor,directionalIntensity);
    directionalLight.position.set(0,10,0);
    directionalLight.target.position.set(-5,0,0);
    scene.add(directionalLight);
    scene.add(directionalLight.target);
    // Making directional Light cast shadow
    directionalLight.castShadow = true;

    /**
     * Adding point light
     */
    const pointColor = 0xFFFFFF;
    const pointIntensity = 150;
    const pointLight = new THREE.PointLight(pointColor, pointIntensity);
    pointLight.position.set(0,10,0);
    scene.add(pointLight);
    // Making point Light cast shadow
    pointLight.castShadow = true;

    /**
     * Adding GUI control to ambient light color
     */
    gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('ambient color');
    gui.add(light, "intensity", 0, 5, 0.01).name('ambient intensity');
    
    /**
     * Adding GUI control to directional light color
     */
    gui.addColor(new ColorGUIHelper(directionalLight,'color'), 'value').name('directional color');
    gui.add(directionalLight, 'intensity',0,5,0.1).name('directional intensity');
    gui.add(directionalLight.target.position, 'x', -10, 10).name('directional target x');
    gui.add(directionalLight.target.position, 'z', -10, 10).name('directional target y');
    gui.add(directionalLight.target.position, 'y', 0, 10).name('directional target z');

    /**
     * Adding GUI control to point light color
     */
    gui.addColor(new ColorGUIHelper(pointLight, 'color'), 'value').name('point color');
    gui.add(pointLight, 'intensity', 0, 250, 1).name('point intensity');
    gui.add(pointLight, "distance", 0, 40).name('point distance');

    /**
     * Adding GUI control to point light color
     */
    gui.add
  
    /**
     * Adding the plane to the scene
     */
    scene.add(mesh);

    /**
     * Adding some objects to test the light
     */
    {
      const cubeSize = 4;
      const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      const cubeMat = new THREE.MeshPhongMaterial({color: '#8AC'});
      const mesh = new THREE.Mesh(cubeGeo, cubeMat);
      mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
    }
    {
      const sphereRadius = 3;
      const sphereWidthDivisions = 32;
      const sphereHeightDivisions = 16;
      const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
      const sphereMat = new THREE.MeshPhongMaterial({color: '#CA8'});
      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
      scene.add(mesh);
    }



    /**
     * Creating the cube
     */
    // cube = new THREE.Mesh(geometry, material);
    cube = new THREE.Mesh(geometry, materials);
    cube.castShadow = true;
    cube.receiveShadow = true;

    /**
     * Adding the cube to the scene
     */
    // scene.add(cube);

    /**
     * Debug shadow
     */
    const helper = new THREE.CameraHelper(directionalLight.shadow.camera);
    scene.add(helper);

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
     * Putting light into an array
     */
    lightList = [light,pointLight,directionalLight];


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
    

    // updateLight();
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
 * IDK why is this not working
 */
function updateLight()
{
  for(let i = 0; i < lightList.length; i++)
  {
    lightList[i].target.updatematrixworld();
  }
}

function updateCamera() {
  camera.updateProjectionMatrix();
}

/**
 * Program start
 */

main();