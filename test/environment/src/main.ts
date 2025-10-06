import { BoxGeometry, Mesh, type Material } from 'three';

import './mouse';
import './style.css';
import useThreeWrapper from './useThreeWrapper';

const { scene, animator } = useThreeWrapper();
const cube = new Mesh(new BoxGeometry(2, 2, 2));
scene.instance.add(cube);

animator.addListener(() => {
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
});

const debugBtn = document.getElementById('debug-btn') as HTMLButtonElement;
const click = () => {
	if (location.hash === '#debug') {
		location.hash = '';
		debugBtn.textContent = 'Debug';
	} else {
		location.hash = '#debug';
		debugBtn.textContent = 'Close Debug';
	}
};
click();
debugBtn.addEventListener('click', click);

if (import.meta?.hot) {
	import.meta.hot.dispose(() => {
		debugBtn.removeEventListener('click', click);
		cube.geometry.dispose();
		(cube.material as Material).dispose();
	});
}
