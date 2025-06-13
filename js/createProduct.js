function createProduct(scene) {
  // Group to hold all lamp parts
  const lamp = new THREE.Group();

  // Materials
  const baseMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xd3d3d3, // light grau
    metalness: 0.8,
    roughness: 0.2,
    clearcoat: 0.5,
    clearcoatRoughness: 0.1,
  });

  const shadeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xecf0f1, // Light gray
    metalness: 0.1,
    roughness: 0.8,
    clearcoat: 0.2,
    transparent: true,
    opacity: 0.7,
  });

  const bulbMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffeb3b, // Warm yellow
    metalness: 0.0,
    roughness: 0.2,
    emissive: 0xffeb3b,
    emissiveIntensity: 0.5,
  });

  const switchMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xe74c3c, // Red
    metalness: 0.3,
    roughness: 0.4,
  });

  // Base (cylinder) - increased size
  const baseGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.15, 32);
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.set(0, 0, 0);
  base.name = "Base";
  lamp.add(base);

  // Stand/Neck (cylinder) - increased height and thickness
  const neckGeometry = new THREE.CylinderGeometry(0.08, 0.08, 1.8, 16);
  const neck = new THREE.Mesh(neckGeometry, baseMaterial);
  neck.position.set(0, 0.9, 0);
  neck.name = "Neck";
  lamp.add(neck);

  // Lamp Head/Shade (hemisphere) - increased size
  const shadeGeometry = new THREE.SphereGeometry(0.6, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
  const shade = new THREE.Mesh(shadeGeometry, shadeMaterial);
  shade.position.set(0, 1.8, 0);
  shade.rotation.x = Math.PI; // Flip to create hemisphere
  shade.name = "Shade";
  lamp.add(shade);

  // Bulb (sphere) - increased size
  const bulbGeometry = new THREE.SphereGeometry(0.25, 32, 32);
  const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
  bulb.position.set(0, 1.8, 0);
  bulb.name = "Bulb";
  lamp.add(bulb);

  // Add point light for bulb glow - increased intensity and range
  const bulbLight = new THREE.PointLight(0xffeb3b, 1.5, 5, 2);
  bulbLight.position.set(0, 1.8, 0);
  lamp.add(bulbLight);

  // Switch Button (box) - increased size
  const switchGeometry = new THREE.BoxGeometry(0.2, 0.08, 0.2);
  const switchButton = new THREE.Mesh(switchGeometry, switchMaterial);
  switchButton.position.set(0.6, 0.08, 0.6);
  switchButton.name = "Switch";
  lamp.add(switchButton);

  // Center the lamp
  lamp.position.set(0, 0, 0);
  scene.add(lamp);

  return lamp;
}
