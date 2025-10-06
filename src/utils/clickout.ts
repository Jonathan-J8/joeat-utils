const clickout = (node: Node) => {
	const handleClickOut = (event: MouseEvent | TouchEvent) => {
		const target = event.target as HTMLElement;
		if (node && !node.contains(target) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('clickout', { detail: { node } }));
		}
	};

	window.addEventListener('click', handleClickOut);
	return () => window.removeEventListener('click', handleClickOut);
};

export default clickout;
