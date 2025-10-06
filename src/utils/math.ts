import type { Vector2, Vector2Like, Vector3, Vector3Like, Vector4, Vector4Like } from 'three';

export const clamp = (value: number, min: number, max: number) => {
	return Math.max(min, Math.min(max, value));
};

export const isBetween = (base: number, range: number, threshold: number) => {
	return base >= range - threshold && base <= range + threshold;
};

export const lerp = (x: number, y: number, t: number) => {
	return (1 - t) * x + t * y;
};

export const dampThreshold = (
	x: number,
	y: number,
	lambda: number,
	dt: number,
	threshold = 0.0001,
) => {
	if (x <= y + threshold && x >= y - threshold) return x;
	return lerp(x, y, 1 - Math.exp(-lambda * dt));
};

export const dampThresholdVec = (
	vec0: Vector2 | Vector3 | Vector4,
	vec1: Vector2Like | Vector3Like | Vector4Like,
	lambda: number,
	delta: number,
	threshold = 0.0001,
) => {
	vec0.x = dampThreshold(vec0.x, vec1.x, lambda, delta, threshold);
	vec0.y = dampThreshold(vec0.y, vec1.y, lambda, delta, threshold);
	vec0.x = dampThreshold(vec0.x, vec1.x, lambda, delta, threshold);
	vec0.y = dampThreshold(vec0.y, vec1.y, lambda, delta, threshold);
	if (typeof (vec0 as Vector3).z === 'number' && typeof (vec1 as Vector3).z === 'number')
		(vec0 as Vector3).z = dampThreshold(
			(vec0 as Vector3).z,
			(vec1 as Vector3).z,
			lambda,
			delta,
			threshold,
		);
	if (typeof (vec0 as Vector4).w === 'number' && typeof (vec1 as Vector4).w === 'number')
		(vec0 as Vector4).w = dampThreshold(
			(vec0 as Vector4).w,
			(vec1 as Vector4).w,
			lambda,
			delta,
			threshold,
		);
};
