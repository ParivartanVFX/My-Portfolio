// 1. Scene Setup
const canvas = document.querySelector('#webgl');
const scene = new THREE.Scene();

// 2. Objects

// Object 1 (For Hero Section)
const geometry1 = new THREE.IcosahedronGeometry(1.2, 1);
const material1 = new THREE.MeshBasicMaterial({ color: 0x4f46e5, wireframe: true });
const mesh1 = new THREE.Mesh(geometry1, material1);
mesh1.position.x = 1.5; // Positioned to the right side of hero text
scene.add(mesh1);

// Object 2 (For About Section)
const geometry2 = new THREE.TorusGeometry(0.8, 0.25, 16, 100);
const material2 = new THREE.MeshBasicMaterial({ color: 0x818cf8, wireframe: true });
const mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.position.x = -1.5; // Positioned to the left initially
mesh2.position.y = -5;   // Positioned lower down the page
scene.add(mesh2);

const sectionMeshes = [mesh1, mesh2];

// 3. Sizes & Camera
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

// 4. Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 5. Input Tracking (Mouse & Scroll)
let mouseX = 0, mouseY = 0;
window.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / sizes.width) - 0.5;
    mouseY = (event.clientY / sizes.height) - 0.5;
});

let scrollY = window.scrollY;
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
});

// Window Resize
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
});

// 6. Animation Loop
const clock = new THREE.Clock();

const animate = () => {
    const elapsedTime = clock.getElapsedTime();

    // Rotate all shapes continuously
    sectionMeshes.forEach((mesh) => {
        mesh.rotation.x = elapsedTime * 0.15;
        mesh.rotation.y = elapsedTime * 0.2;
    });

    // Scroll Camera Interaction: Moves the camera down as you scroll the HTML page
    // Note: The '2.7' value is matched to the layout height spacing
    camera.position.y = (-scrollY / sizes.height) * 2.7;

    // Smooth Mouse parallax effect on top of scrolling
    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;

    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
};

animate();