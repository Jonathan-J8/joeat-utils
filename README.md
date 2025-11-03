# Joeat - Utils

TypeScript library providing modular wrappers and utilities for Three.js and other utility function for every day work. Built with type safety, dependency injection pattern, and testing.

## Features

- 🎯 **Modular Architecture**: Clean, reusable components for common Three.js patterns
- 🔧 **Dependency Injection**: Accept Three.js classes as parameters for optimal tree-shaking
- 📝 **Full TypeScript Support**: Strict typing with comprehensive type definitions
- 🎨 **Shader Integration**: Built-in uniforms system for seamless GLSL integration
- 🧪 **Thoroughly Tested**: 184+ unit tests with 95%+ coverage across all modules
- 📦 **Multiple Formats**: ES modules, CommonJS, and UMD builds available

## Installation

### Latest Version

```bash
npm install github:Jonathan-J8/joeat-utils#dist-only
# or
npx degit github:Jonathan-J8/joeat-utils#dist-only ./joeat-utils
```

### Specific Version

```bash
# Install specific version (recommended for production)
npm install github:Jonathan-J8/joeat-utils#v1.2.2

# Using degit
npx degit github:Jonathan-J8/joeat-utils#v1.2.2 ./joeat-utils
```

### In package.json

```json
{
	"dependencies": {
		"joeat-utils": "github:Jonathan-J8/joeat-utils#v1.2.2"
	}
}
```

## Example

Find the example [here](/example)

### Run the example

```bash
npm run dev
```

## Quick Start

### Common Module Pattern

Most modules follow a consistent API pattern for predictable usage:

#### 🏗️ **Constructor Pattern**

```typescript
const module = new ModuleName({
	instance: threeJsObject, // Three.js object to wrap
	...dependencies, // Required Three.js classes for tree-shaking
});
```

#### 🔧 **Core Methods**

- **`resize({ width, height, pixelRatio })`** - Handle responsive updates
- **`update({ time, deltaTime, deltaMs })`** - Animation loop integration
- **`debug(gui: GUI)`** - Runtime debugging with lil-gui controls
- **`clear()`** - Clean disposal and garbage collection

#### 📊 **Properties**

- **`module.instance`** - Access to the wrapped Three.js object
- **`module.uniforms`** - Shader uniforms for GLSL integration

#### 🎯 **Event Integration**

```typescript
const myEmitter = new MonoEventEmitter<[{ someNumber: number }]>();
const foo = ({ someNumber }) => {
	// your logic
};
myEmitter.addListener(foo);
myEmitter.fire({ someNumber: 10 });
myEmitter.removeListener(foo);
myEmitter.clear();
```

```typescript
import { Animator, RendererWrapper, PointerTracker, CameraWrapper } from '../../src';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Create renderer with post-processing support
const renderer = new THREE.WebGLRenderer();
const rendererWrapper = new RendererWrapper({
	instance: renderer,
	Vector2: THREE.Vector2,
});

// Set up cameras with controls
const perspectiveCamera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
const orthographicCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
const controls = new OrbitControls(perspectiveCamera, renderer.domElement);

const cameraWrapper = new CameraWrapper({
	perspective: perspectiveCamera,
	orthographic: orthographicCamera,
	controls: controls,
	Vector3: THREE.Vector3,
	Quaternion: THREE.Quaternion,
});

// Set up animation loop
const animator = new Animator();
animator.addListener(({ time, deltaTime }) => {
	cameraWrapper.update({ deltaTime });
	rendererWrapper.update(scene, cameraWrapper.instance, deltaTime);
});

// Add mouse interaction
const pointerTracker = new PointerTracker({
	camera: cameraWrapper.instance,
	Vector2: THREE.Vector2,
	Vector3: THREE.Vector3,
	Plane: THREE.Plane,
	Raycaster: THREE.Raycaster,
});
pointerTracker.init(renderer.domElement);

// Handle resize
window.addEventListener('resize', () => {
	const width = window.innerWidth;
	const height = window.innerHeight;

	cameraWrapper.resize({ width, height });
	rendererWrapper.resize({ width, height, pixelRatio: window.devicePixelRatio });
});

animator.play();
```

## Core Modules

### Animator

Central animation loop with renderer integration support.

```typescript
const animator = new Animator();

// Basic animation loop
animator.addListener(({ time, deltaTime }) => {
	// Update your scene
});

// Value interpolation
animator.interpolate({
	from: 0,
	to: 100,
	duration: 2000,
	onUpdate: ({ value }) => {
		mesh.position.x = value;
	},
});

// Animation
animator.animate({
	steps: 0,
	duration: 400,
	delay: 100,
	iterations: 1,
	onUpdate: () => {
		// your animation logic
	},
});

animator.play();
```

### RendererWrapper

WebGL renderer abstraction with post-processing effects support.

```typescript
const rendererWrapper = new RendererWrapper({
	instance: new THREE.WebGLRenderer(),
	Vector2: THREE.Vector2,
	EffectComposer: EffectComposer, // Optional for post-processing
});

// Access uniforms for shaders
const uniforms = {
	uTime: animator.uniforms.uTime,
	uResolution: rendererWrapper.uniforms.uResolution,
};

// Add post-processing effects
rendererWrapper.addEffect(bloomPass, fxaaPass);

// Handle resize
rendererWrapper.resize({
	width: window.innerWidth,
	height: window.innerHeight,
	pixelRatio: window.devicePixelRatio,
});
```

### PointerTracker

Mouse/pointer interaction handling with coordinate normalization.

```typescript
const camera = new THREE.PerspectiveCamera();
const pointerTracker = new PointerTracker({
	camera: camera,
	Vector2: THREE.Vector2,
	Vector3: THREE.Vector3,
	Plane: THREE.Plane,
	Raycaster: THREE.Raycaster,
});

// Initialize with element
pointerTracker.init(canvas);

// Access normalized coordinates and world position
const uniforms = {
	uPointerPosition: pointerTracker.uniforms.uPointerPosition, // [-1, 1]
	uPointerWorldPosition: pointerTracker.uniforms.uPointerWorldPosition, // World coordinates
	uPointerPositionVelocity: pointerTracker.uniforms.uPointerPositionVelocity,
	uPointerPress: pointerTracker.uniforms.uPointerPress, // Pointer pressure
	uPointerScroll: pointerTracker.uniforms.uPointerScroll,
	uPointerScrollVelocity: pointerTracker.uniforms.uPointerScrollVelocity,
};
```

### Resizer

Responsive behavior with ResizeObserver integration.

```typescript
const resizer = new Resizer(canvas);

resizer.addListener(({ width, height, pixelRatio }) => {
	renderer.setSize(width, height, false);
	renderer.setPixelRatio(pixelRatio);
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
});

// Configure quality settings
resizer.resolutionFactor = 0.8; // Reduce resolution for performance
resizer.maxSize = 2048; // Limit maximum dimensions
```

### CameraWrapper

Advanced camera management with dual-camera system, controls integration, and comprehensive shader uniforms.

```typescript
const perspectiveCamera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
const orthographicCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
const controls = new OrbitControls(perspectiveCamera, canvas);

const cameraWrapper = new CameraWrapper({
	perspective: perspectiveCamera,
	orthographic: orthographicCamera,
	controls: controls, // OrbitControls, FlyControls, ArcballControls, or DragControls
	Vector3: THREE.Vector3,
	Quaternion: THREE.Quaternion,
});

// Access comprehensive uniforms for shaders
const uniforms = {
	uCameraDirection: cameraWrapper.uniforms.cameraDirection, // Camera world direction
	uCameraScale: cameraWrapper.uniforms.cameraScale, // Camera world scale
	uCameraQuaternion: cameraWrapper.uniforms.cameraQuaternion, // Camera world rotation
};

// Switch between camera types at runtime
// default cameraWrapper.instance === controls.object
cameraWrapper.instance = 'OrthographicCamera'; // Switch to orthographic
cameraWrapper.instance = 'PerspectiveCamera'; // Switch back to perspective

// Handle resize (updates both cameras)
cameraWrapper.resize({
	width: window.innerWidth,
	height: window.innerHeight,
});

// Update camera uniforms and controls
cameraWrapper.update({ deltaTime: 0.016 });

// Debug camera in lil-gui
cameraWrapper.debug(gui); // Adds camera position, type toggle, and controls settings

// Clean up resources
cameraWrapper.clear(); // Disposes controls and clears cameras
```

#### Camera Features

- **Dual Camera System**: Seamlessly switch between perspective and orthographic cameras
- **Controls Integration**: Support for OrbitControls, FlyControls, ArcballControls, and DragControls
- **Smart Initialization**: Automatically detects initial camera type from controls object
- **Comprehensive Uniforms**: Direction, scale, and quaternion vectors for advanced shader effects
- **Responsive Design**: Handles both perspective aspect ratio and orthographic bounds calculation
- **Debug Interface**: Runtime camera controls with position tracking and controls configuration
- **Conditional Updates**: Controls only update when enabled, optimizing performance

### TaskQueue

Sequential task execution with async support.

```typescript
const taskQueue = new TaskQueue();

taskQueue.add(
	() => console.log('First task'),
	async () => {
		await fetch('/api/data');
		console.log('Async task completed');
	},
	() => console.log('Final task'),
);

await taskQueue.play(); // Executes all tasks in sequence
```

### Spring

Physics-based animation system.

```typescript
const spring = new Spring(0, {
	onUpdate: ({ value }) => {
		// animate any value
	},
});

spring.to(1);
spring.update(); // Call in your animation loop
```

### SceneWrapper

Scene resource management with automatic disposal.

```typescript
const sceneWrapper = new SceneWrapper({
	scene: new THREE.Scene(),
});

// Automatic cleanup of materials, geometries, textures
sceneWrapper.clear();
```

### MonoEventEmitter

Type-safe single-event emitter base class.

```typescript
class MyAnimator extends MonoEventEmitter<[{ progress: number }]> {
	update() {
		this.fire({ progress: 0.5 });
	}
}

const animator = new MyAnimator();
animator.addListener(({ progress }) => {
	console.log(`Progress: ${progress * 100}%`);
});
```

## Shader Integration

All wrapper classes provide uniforms for seamless GLSL integration:

```glsl
// Time and rendering uniforms
uniform float uTime;
uniform float uDeltaTime;
uniform vec2 uResolution;

// Pointer interaction uniforms
uniform vec2 uMouse;
uniform vec2 uPointerPositionVelocity;
uniform float uPointerPress;
uniform vec2 uPointerScroll;

// Camera uniforms (from CameraWrapper)
uniform vec3 uCameraDirection;
uniform vec3 uCameraScale;
uniform vec4 uCameraQuaternion;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;

  // Animated effect using time
  float wave = sin(uv.x * 10.0 + uTime * 2.0);

  // Mouse interaction
  float mouse = length(uv - uMouse * 0.5 + 0.5);

  // Camera-based effects
  float cameraInfluence = dot(uCameraDirection, vec3(0.0, 1.0, 0.0));

  // Combine effects
  vec3 color = vec3(wave, mouse, cameraInfluence);

  gl_FragColor = vec4(color, 1.0);
}
```

## Development

```bash
# Install dependencies
npm install

# Build library
npm run build

# Run tests
npm test

# Lint and format
npm run lint
npm run format
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

All commits are validated with ESLint + Prettier code quality checks and unit tests
