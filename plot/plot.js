/* global THREE, COUNTRY_TO */

const canvas = /** @type {HTMLCanvasElement} */ (
  document.getElementById("plot")
);

console.log(COUNTRY_TO);

const N = 300;
const gData = [...Array(N).keys()].map(() => ({
  lat: (Math.random() - 0.5) * 180,
  lng: (Math.random() - 0.5) * 360,
  size: Math.random() / 3,
  color: ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
}));

const globe = new ThreeGlobe()
  .globeImageUrl(
    "//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg"
  )
  .bumpImageUrl(
    "//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
  )
  .pointsData(gData)
  .pointAltitude("size")
  .pointColor("color");

setTimeout(() => {
  gData.forEach((d) => (d.size = Math.random()));
  globe.pointsData(gData);
}, 4000);

// Setup renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById("plot").appendChild(renderer.domElement);

// Setup scene
const scene = new THREE.Scene();
scene.add(globe);
scene.add(new THREE.AmbientLight(0xcccccc, Math.PI));
scene.add(new THREE.DirectionalLight(0xffffff, 0.6 * Math.PI));

// Setup camera
const camera = new THREE.PerspectiveCamera();
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
camera.position.z = 500;
