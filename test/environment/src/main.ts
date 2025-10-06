import { Animator, TaskQueue } from '../../../src';

const animator = new Animator();

{
	const from = 0;
	const to = 1;
	animator.interpolate({
		from,
		to,
		onStart: ({ value, time, deltaTime }) => {
			console.assert(typeof value === 'number');
			console.assert(typeof time === 'number');
			console.assert(typeof deltaTime === 'number');
			console.assert(value === from);
		},
		onUpdate: ({ value }) => {
			console.assert(value >= from && value <= to);
		},
		onComplete: ({ value }) => {
			console.assert(value === to);
		},
	});
}
{
	const from = 0;
	const to = -1;
	animator.interpolate({
		from,
		to,
		onStart: ({ value, time, deltaTime }) => {
			console.assert(typeof value === 'number');
			console.assert(typeof time === 'number');
			console.assert(typeof deltaTime === 'number');
			console.assert(value === from);
		},
		onUpdate: ({ value }) => {
			console.assert(value <= from && value >= to);
		},
		onComplete: ({ value }) => {
			console.assert(value === to);
		},
	});
}

animator.play();

{
	const taskQueue = new TaskQueue();

	taskQueue.add(
		() => {
			console.assert(taskQueue.size === 2);
			taskQueue.stop(); // Stop the queue after this task

			setTimeout(() => {
				taskQueue.play(); // Resume the queue after 1 second
			}, 1000);
		},
		() => {
			console.assert(taskQueue.size === 1);
			return new Promise<void>((resolve) => {
				setTimeout(() => {
					console.assert(taskQueue.size === 1);
					resolve();
				}, 1000);
			});
		},
		() => {
			console.assert(taskQueue.size === 0);
		},
	);
	taskQueue.play();
}
(async () => {
	const taskQueue = new TaskQueue();

	const res: string[] = [];
	taskQueue.add(
		() => {
			res.push('first');
		},
		() => {
			res.push('second');
		},
		() => {
			res.push('third');
		},
	);
	await taskQueue.play();

	console.assert(JSON.stringify(res) === JSON.stringify(['first', 'second', 'third']));
})();
