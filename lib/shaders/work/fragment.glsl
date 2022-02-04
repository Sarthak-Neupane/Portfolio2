// varying float vNoise;
// varying vec2 vUv;
// uniform sampler2D uImage;
// uniform float time;

// uniform float hoverState;

// void main()	{

//     vec2 newUV = vUv;

//     vec4 oceanView = texture2D(uImage,newUV - fract(newUV * vec2(5.,0.)) * hoverState * 0.1);

//     // gl_FragColor = vec4(finalColor,1.);
//     gl_FragColor = vec4(vUv,0.,1.);
//     // gl_FragColor = oceanView + 0.5*vec4(vNoise);
//     // gl_FragColor = vec4(vNoise,0.,0.,1.);
//     gl_FragColor = oceanView;
//     gl_FragColor.rgb += 0.05*vec3(vNoise);
// }


uniform float hoverState;
uniform float defaultState;
uniform float intensity;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
varying vec2 vUv;
mat2 rotate(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
}
const float PI = 3.1415;
const float angle1 = PI * 0.25;
const float angle2 = -PI * 0.75;

void main() {
    vec2 newUV = (vUv - vec2(0.5)) * 1. + vec2(0.5);

    vec2 uvDivided = fract(newUV * vec2(30., 30.));

    vec2 uvDisplaced1 = newUV + rotate(3.1415926 / 4.) * uvDivided * defaultState * 0.1;
    vec2 uvDisplaced2 = newUV + rotate(3.1415926 / 4.) * uvDivided * (1. - defaultState) * 0.1;

    vec4 t1 = texture2D(uTexture1, uvDisplaced1);
    vec4 t2 = texture2D(uTexture2, uvDisplaced2);

    gl_FragColor = mix(t1, t2, defaultState);

}