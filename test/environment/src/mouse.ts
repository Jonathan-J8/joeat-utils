import { Mesh, MeshBasicMaterial, Plane, Raycaster, SphereGeometry, Vector2, Vector3 } from 'three';
import { MousePointer } from '../../../src';
import useThreeWrapper from './useThreeWrapper';

const { camera, scene, gui, canvas } = useThreeWrapper();
const mouse = new MousePointer({ camera: camera.instance, Plane, Raycaster, Vector2, Vector3 });

mouse.init(canvas);
mouse.debug(gui);
const sphere = new Mesh(new SphereGeometry(1, 32, 32), new MeshBasicMaterial({ color: 0xff0000 }));

scene.instance.add(sphere);

if (import.meta.hot) {
	import.meta.hot.dispose(() => {
		sphere.geometry.dispose();
		(sphere.material as MeshBasicMaterial).dispose();
	});
}
