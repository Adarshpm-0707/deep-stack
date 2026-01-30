/* eslint-disable react/no-unknown-property */
import { useEffect, useRef } from 'react';
import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl';

const hexToRgb = hex => {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const int = parseInt(hex, 16);
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255];
};

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec3 pos = position * uSpread;
    pos.z *= 10.0;
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    vec4 mvPos = viewMatrix * mPos;
    gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  varying vec3 vColor;
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    if(d > 0.5) discard;
    gl_FragColor = vec4(vColor, 1.0 - smoothstep(0.3, 0.5, d));
  }
`;

const Particles = ({
  particleCount = 500,
  particleSpread = 15,
  speed = 0.2,
  particleColors = ['#ffffff', '#FF9FFC', '#392e4e'],
  moveParticlesOnHover = true,
  particleHoverFactor = 2,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 25,
  disableRotation = false,
  className = ""
}) => {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const renderer = new Renderer({ dpr: window.devicePixelRatio, alpha: true });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    const camera = new Camera(gl, { fov: 15 });
    camera.position.z = cameraDistance;

    const resize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };
    window.addEventListener('resize', resize);
    resize();

    const handleMove = e => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      };
    };
    if (moveParticlesOnHover) container.addEventListener('mousemove', handleMove);

    const positions = new Float32Array(particleCount * 3);
    const randoms = new Float32Array(particleCount * 4);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions.set([(Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2], i * 3);
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
      colors.set(hexToRgb(particleColors[Math.floor(Math.random() * particleColors.length)]), i * 3);
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors }
    });

    const program = new Program(gl, {
      vertex, fragment, transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: particleSpread },
        uBaseSize: { value: particleBaseSize },
        uSizeRandomness: { value: sizeRandomness }
      }
    });

    const mesh = new Mesh(gl, { mode: gl.POINTS, geometry, program });
    let raf;
    const update = t => {
      raf = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001 * speed;
      if (moveParticlesOnHover) {
        mesh.position.x = -mouseRef.current.x * particleHoverFactor;
        mesh.position.y = -mouseRef.current.y * particleHoverFactor;
      }
      if (!disableRotation) {
        mesh.rotation.y += 0.001;
      }
      renderer.render({ scene: mesh, camera });
    };
    raf = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(raf);
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
    };
  }, [particleCount, particleSpread, speed, particleColors, moveParticlesOnHover, particleHoverFactor, particleBaseSize, sizeRandomness, cameraDistance, disableRotation]);

  return <div ref={containerRef} className={`particles-bg ${className}`} style={{ width: '100%', height: '100%' }} />;
};

export default Particles;