const vs = `precision highp float;

in vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}`;

const fs = `precision highp float;

out vec4 fragmentColor;

uniform vec2 resolution;
uniform float rand;

void main() {
  float aspectRatio = resolution.x / resolution.y; 
  vec2 vUv = gl_FragCoord.xy / resolution;
  float noise = (fract(sin(dot(vUv, vec2(12.9898 + rand,78.233)*2.0)) * 43758.5453));

  vUv -= .5;
  vUv.x *= aspectRatio;

  float factor = 3.;
  float d = factor * length(vUv);
  
  // HEX-themed gradient colors
  vec3 color1 = vec3(255., 61., 61.) / 255.;    // HEX Red
  vec3 color2 = vec3(254., 1., 250.) / 255.;    // HEX Magenta  
  vec3 color3 = vec3(255., 15., 111.) / 255.;   // HEX Pink
  vec3 color4 = vec3(255., 219., 1.) / 255.;    // HEX Gold
  vec3 darkBase = vec3(8., 4., 12.) / 255.;     // Dark base
  
  // Create radial gradient with multiple color stops
  vec3 finalColor = darkBase;
  
  if (d < 1.0) {
    finalColor = mix(color1, color2, d);
  } else if (d < 2.0) {
    finalColor = mix(color2, color3, d - 1.0);
  } else if (d < 3.0) {
    finalColor = mix(color3, color4, d - 2.0);
  } else {
    finalColor = mix(color4, darkBase, min(d - 3.0, 1.0));
  }
  
  // Add subtle noise for texture
  finalColor += .008 * noise * vec3(1.2, 0.8, 1.0);
  
  fragmentColor = vec4(finalColor, 1.);
}
`;

export {fs, vs}; 