# Joeat - Utils

TypeScript library providing modular wrappers and utilities for Three.js and other utility function for every day work. Built with type safety, dependency injection pattern, and testing.

## Features

- 🎯 **Modular Architecture**: Clean, reusable components for common Three.js patterns
- 🔧 **Dependency Injection**: Accept Three.js classes as parameters for optimal tree-shaking
- 📝 **Full TypeScript Support**: Strict typing with comprehensive type definitions
- 🎨 **Shader Integration**: Built-in uniforms system for seamless GLSL integration
- 🧪 **Thoroughly Tested**: 180+ unit tests with 95%+ coverage across all modules
- 📦 **Multiple Formats**: ES modules, CommonJS, and UMD builds available

## Installation

```bash
npm install joeat
npx degit https://github.com/Jonathan-J8/joeat-utils.git .
```

## Quick Start

```typescript
import { Animator, RendererWrapper, MousePointer } from 'joeat';
import * as THREE from 'three';

// Create renderer with post-processing support
const renderer = new WebGLRenderer();
const rendererWrapper = new RendererWrapper({
	renderer,
	Vector2,
	EffectComposer, // Optional
});

// Set up animation loop
const animator = new Animator();
animator.addListener(({ time, deltaTime }) => {
	rendererWrapper.update(scene, camera, deltaTime);
});

// Add mouse interaction
const mousePointer = new MousePointer({
	element: renderer.domElement,
	Vector2: THREE.Vector2,
	Vector4: THREE.Vector4,
	Raycaster: THREE.Raycaster,
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

animator.play();
```

### RendererWrapper

WebGL renderer abstraction with post-processing effects support.

```typescript
const rendererWrapper = new RendererWrapper({
	renderer: new THREE.WebGLRenderer(),
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

### MousePointer

Mouse/pointer interaction handling with coordinate normalization.

```typescript
const mousePointer = new MousePointer({
	element: canvas,
	Vector2: THREE.Vector2,
	Vector4: THREE.Vector4,
	Raycaster: THREE.Raycaster,
});

// Access normalized coordinates and world position
const uniforms = {
	uMouse: mousePointer.uniforms.uMouse, // [-1, 1]
	uMouseWorld: mousePointer.uniforms.uMouseWorld, // World coordinates
	uMouseVelocity: mousePointer.uniforms.uMouseVelocity,
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
spring.update();
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
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform vec2 uMouseVelocity;
uniform float uDeltaTime;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;

  // Animated effect using time
  float wave = sin(uv.x * 10.0 + uTime * 2.0);

  // Mouse interaction
  float mouse = length(uv - uMouse * 0.5 + 0.5);

  gl_FragColor = vec4(wave, mouse, 0.0, 1.0);
}
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build

# Run tests
npm test
npm run unit
npm run integration
npm run e2e

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

All commits are validated with:

- ESLint + Prettier code quality checks
- Unit/integration/e2e tests
