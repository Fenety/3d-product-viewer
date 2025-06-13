let lamp, animateCameraFunc;

function init() {
  // Initialize scene
  initScene();

  // Create product
  lamp = createProduct(scene);

  // Add lighting
  addLighting(scene);

  // Initialize interaction
  initInteraction(scene, camera);

  // Initialize camera animation
  animateCameraFunc = initCameraAnimation(camera, controls);

  // Start animation loop
  animate();
}

function animate(time) {
  requestAnimationFrame(animate);

  // Update camera animation
  animateCameraFunc(time);

  // Lamp animations
  const bulb = lamp.getObjectByName("Bulb");
  const bulbLight = lamp.children.find(child => child instanceof THREE.PointLight);
  
  if (bulb && bulbLight) {
    // Subtle pulsing effect for bulb and light
    const intensity = 0.5 + 0.1 * Math.sin(time * 0.002);
    bulb.material.emissiveIntensity = intensity;
    bulbLight.intensity = intensity;
  }

  // Render scene
  renderer.render(scene, camera);
}

// Start the app
init();
