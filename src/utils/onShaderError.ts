// https://stackoverflow.com/questions/75172794/how-can-i-see-the-whole-shaders-text-content-with-all-the-prepended-code-by-th
const onShaderError = function (
	gl: WebGLRenderingContext,
	_program: WebGLProgram,
	vs: WebGLShader,
	fs: WebGLShader,
) {
	const parseForErrors = function (gl: WebGLRenderingContext, shader: WebGLShader, name: string) {
		const errors = gl.getShaderInfoLog(shader)?.trim();
		const prefix = 'Errors in ' + name + ':' + '\n\n' + errors;

		if (errors !== '') {
			const code = gl.getShaderSource(shader)?.replace(/\t/g, '  ');
			const lines = code?.split('\n');
			let linedCode = '';
			let i = 1;
			if (!lines) return;
			for (const line of lines) {
				linedCode += (i < 10 ? ' ' : '') + i + ':\t\t' + line + '\n';
				i++;
			}

			console.error(prefix + '\n' + linedCode);
		}
	};

	parseForErrors(gl, vs, 'Vertex Shader');
	parseForErrors(gl, fs, 'Fragment Shader');
};
export default onShaderError;
