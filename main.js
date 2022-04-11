import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry(8,0.1,8);
const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

cube.position.y = 10;
cube.position.x += 2.5;
cube.position.z += 2.5;
cube.rotation.z = 3.14/4;
console.log(cube.rotation)

camera.position.y = 10.25;
camera.position.x = 5;
camera.position.z = 15;

function SursaLumina(scalar,x,z) {
  const dir = new THREE.Vector3( 0.1+scalar, 5, 10+scalar );
  //dir.normalize();
  //dir.applyScalar(2)

  const origin = new THREE.Vector3( 0+x, 0, 0+z );
  console.log("dir:" + dir[1])
  const length = dir.y;
  const galben = 0xffff00;
  const alb = 0xffffff;

  const razaLumina = new THREE.ArrowHelper( dir, origin, length, galben );
  scene.add( razaLumina );
}

// for (let i=1; i<=4; i++){
//   for (let n=1; n<=4; n++){
//     SursaLumina(i,i,n)
//   }
// }

const dir = new THREE.Vector3( 2.5, 5, 2.5 );
const origin = new THREE.Vector3( 2.5, 0, 2.5 );
const length = dir.y;
const galben = 0xffff00;
const alb = 0xffffff;

const razaLumina = new THREE.ArrowHelper( dir, origin, length, galben );
scene.add( razaLumina );
console.log(razaLumina.rotation)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

//Axes Helpers
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  //cube.rotation.z += 0.01;
  //console.log(cube.rotation)
  //console.log(camera.position)
};

animate();