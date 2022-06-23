uniform float time;
uniform float progress;
uniform sampler2D uDataTexture;
uniform sampler2D uTexture;


uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.141592653589793238;
void main()	{
	vec2 newUV = (vUv)*resolution.zw;
	vec4 offset = texture2D(uDataTexture,newUV);
	gl_FragColor = texture2D(uTexture,newUV - 0.02*offset.rg);
	// gl_FragColor = offset;

}