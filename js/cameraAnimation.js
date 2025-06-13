let isUserInteracting = false;
let lastInteractionTime = 0;
const ROTATION_SPEED = 15; // Degrees per second - increased for faster rotation
const RESUME_DELAY = 2000; // 0.5 seconds before auto-rotation resumes
const CAMERA_RADIUS = 6;
const CAMERA_HEIGHT = 2.5;

function initCameraAnimation(camera, controls) {
  // Detect user interaction to pause auto-rotation
  controls.addEventListener("start", () => {
    isUserInteracting = true;
    lastInteractionTime = Date.now();
  });

  controls.addEventListener("end", () => {
    isUserInteracting = false;
    lastInteractionTime = Date.now();
  });

  // Animation function
  function animateCamera(time) {
    const currentTime = Date.now();
    const timeSinceLastInteraction = currentTime - lastInteractionTime;

    // Only resume auto-rotation after the delay
    if (!isUserInteracting && timeSinceLastInteraction > RESUME_DELAY) {
      // Calculate rotation angle based on time
      const angle = ((time / 1000) * ROTATION_SPEED * Math.PI) / 180;

      // Use polar coordinates for smooth circular motion
      camera.position.x = CAMERA_RADIUS * Math.sin(angle);
      camera.position.z = CAMERA_RADIUS * Math.cos(angle);
      camera.position.y = CAMERA_HEIGHT;

      // Always look at the center of the scene
      camera.lookAt(0, 0, 0);

      // Smoothly update controls target
      controls.target.set(0, 0, 0);
      controls.update();
    }
  }

  return animateCamera;
}
