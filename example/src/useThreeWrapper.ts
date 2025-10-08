import { PerspectiveCamera, Quaternion, Scene, Vector2, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { Animator, CameraWrapper, RendererWrapper, Resizer, SceneWrapper } from '../../src';

// THREE
const canvas = document.getElementById('three') as HTMLCanvasElement;
const threeRenderer = new WebGLRenderer({ canvas });
const threeCamera = new PerspectiveCamera(75, 2, 0.1, 1000);
const threeScene = new Scene();
const threeControls = new OrbitControls(threeCamera, canvas);

// WRAPPERS & EMITTERS
const animator = new Animator();
const resizer = new Resizer(canvas);
const scene = new SceneWrapper({ instance: threeScene });
const renderer = new RendererWrapper({ instance: threeRenderer, Vector2 });
const camera = new CameraWrapper({
	instance: threeCamera,
	controls: threeControls,
	Vector3,
	Quaternion,
});

camera.instance.position.z = 5;
scene.instance.add(camera.instance);
resizer.addListener(camera.resize, renderer.resize);
resizer.fire();
animator.addListener(({ deltaTime }) => {
	camera.update({ deltaTime });
	renderer.update({ scene: scene.instance, camera: camera.instance, deltaTime });
});
animator.play(renderer.instance);

// GUI
const gui = new GUI();
animator.debug(gui);
resizer.debug(gui);
renderer.debug(gui);
camera.debug(gui);
const debug = () => {
	const isDebug = location.hash.match(/#debug/) ? true : false;
	if (!isDebug) return gui.hide();
	gui.show();
};
debug();
window.addEventListener('hashchange', debug);

// HMR
if (import.meta?.hot) {
	import.meta.hot.dispose(() => {
		window.removeEventListener('hashchange', debug);
		gui.destroy();
		animator.clear();
		resizer.clear();
		renderer.clear();
		camera.clear();
		scene.clear();
	});
}

// HOOK
const useThreeWrapper = () => {
	return { gui, canvas, animator, resizer, renderer, scene, camera };
};
export default useThreeWrapper;
