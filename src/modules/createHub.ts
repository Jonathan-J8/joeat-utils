import type { EventDispatcher as T } from 'three';

// TODO: implement mediator pattern
const createHub = (EventDispatcher: typeof T) => {
	const hub = new EventDispatcher<{
		resize: { width: number; height: number };
		update: () => void;
		clear: () => void;
	}>();

	// const emitter = new EventDispatcher<{resize: {width: number, height: number}, update: () => void, clear: () => void}>();
	// emitter.addEventListener('resize', () => {});
	// emitter.dispatchEvent( {type:'resize', width: 800, height: 600} );
	// emitter.dispatchEvent( {type:'blop', width: 800, height: 600} );

	return hub;
};

export default createHub;
