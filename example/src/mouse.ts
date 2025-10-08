import { Mesh, MeshBasicMaterial, Plane, Raycaster, SphereGeometry, Vector2, Vector3 } from 'three';
import { PointerTracker } from '../../src';
import useThreeWrapper from './useThreeWrapper';

const { camera, scene, gui, canvas } = useThreeWrapper();
const mouse = new PointerTracker({ camera: camera.instance, Plane, Raycaster, Vector2, Vector3 });

canvas.addEventListener('pointermove', mouse.onMove, false);
canvas.addEventListener('pointerout', mouse.onMove, false);
canvas.addEventListener('pointerdown', mouse.onPress, false);
canvas.addEventListener('pointerup', mouse.onPress, false);
window.addEventListener('scroll', mouse.onScroll, false);
window.addEventListener('scrollend', mouse.onScroll, false);

mouse.debug(gui);
const sphere = new Mesh(new SphereGeometry(1, 32, 32), new MeshBasicMaterial({ color: 0xff0000 }));

scene.instance.add(sphere);

if (import.meta?.hot) {
	import.meta.hot.dispose(() => {
		canvas.removeEventListener('pointermove', mouse.onMove, false);
		canvas.removeEventListener('pointerout', mouse.onMove, false);
		canvas.removeEventListener('pointerdown', mouse.onPress, false);
		canvas.removeEventListener('pointerup', mouse.onPress, false);
		window.removeEventListener('scroll', mouse.onScroll, false);
		window.removeEventListener('scrollend', mouse.onScroll, false);
		sphere.geometry.dispose();
		(sphere.material as MeshBasicMaterial).dispose();
	});
}
