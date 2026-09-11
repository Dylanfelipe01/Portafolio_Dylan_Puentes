// ==========================================
// 1. THREE.JS: FONDO INTERACTIVO DE RED
// ==========================================
const canvas = document.getElementById('webgl-canvas');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const particleCount = 180;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 85;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  size: 1.3,
  color: 0x00f2fe,
  transparent: true,
  opacity: 0.5
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
});

function animateThree() {
  requestAnimationFrame(animateThree);
  particles.rotation.y += 0.0008;
  particles.rotation.x += 0.0004;

  camera.position.x += (mouseX * 4 - camera.position.x) * 0.03;
  camera.position.y += (mouseY * 4 - camera.position.y) * 0.03;

  renderer.render(scene, camera);
}
animateThree();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ==========================================
// 2. GSAP SCROLLTRIGGERS
// ==========================================
gsap.registerPlugin(ScrollTrigger);

// Entrada hero
gsap.timeline()
  .from('.availability-badge', { opacity: 0, y: -20, duration: 0.7, ease: 'power3.out' })
  .from('.hero-title', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.3')
  .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out' }, '-=0.4')
  .from('.hero-cta-group', { opacity: 0, y: 15, duration: 0.6, ease: 'power3.out' }, '-=0.3')
  .from('.holo-card', { opacity: 0, scale: 0.88, duration: 1, ease: 'back.out(1.4)' }, '-=0.6');

// Animación de entrada por sección
gsap.utils.toArray('.section-reveal').forEach((sec) => {
  gsap.from(sec, {
    scrollTrigger: {
      trigger: sec,
      start: 'top 82%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power2.out'
  });
});

// ==========================================
// 3. CONTADORES DE IMPACTO CUANTITATIVO
// ==========================================
const statDigits = document.querySelectorAll('.stat-digit');

statDigits.forEach((digit) => {
  const target = parseFloat(digit.dataset.count) || 0;
  const prefix = digit.dataset.prefix || '';
  const suffix = digit.dataset.suffix || '';

  ScrollTrigger.create({
    trigger: digit,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      let counter = { val: 0 };
      gsap.to(counter, {
        val: target,
        duration: 1.8,
        ease: 'power3.out',
        onUpdate: () => {
          digit.textContent = prefix + Math.round(counter.val).toLocaleString('es-CO') + suffix;
        }
      });
    }
  });
});