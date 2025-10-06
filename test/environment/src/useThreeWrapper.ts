import { PerspectiveCamera, Scene, Vector2, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { Animator, CameraWrapper, RendererWrapper, Resizer, SceneWrapper } from '../../../src';

const canvas = document.getElementById('three') as HTMLCanvasElement;
const renderer = new RendererWrapper({ renderer: new WebGLRenderer({ canvas }), Vector2 });

const cam = new PerspectiveCamera(75, 2, 0.1, 1000);
const camera = new CameraWrapper({
	camera: cam,
	controls: new OrbitControls(cam, canvas),
	Vector3,
});
camera.instance.position.z = 5;

const resizer = new Resizer(canvas);
resizer.addListener(camera.resize, renderer.resize);
resizer.fire();

const scene = new SceneWrapper({ scene: new Scene() });
scene.instance.add(camera.instance);

const animator = new Animator();
animator.addListener(() => {
	renderer.update(scene.instance, camera.instance, animator.uniforms.uDeltaTime.value);
});
animator.play(renderer.instance);

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

const useThreeWrapper = () => {
	return { gui, canvas, animator, resizer, renderer, scene, camera };
};
export default useThreeWrapper;
