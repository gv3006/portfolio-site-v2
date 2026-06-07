"use client"

import { useEffect, useRef } from "react"

/**
 * Interactive lava gradient background.
 *
 * A full-screen WebGL canvas that renders animated, organic "lava lamp" blobs
 * using a fragment shader. The blob field warps toward the pointer, giving the
 * surface an interactive, fluid feel. Designed to sit behind dark content, so
 * the palette stays in deep reds / oranges over near-black.
 */
const FRAGMENT_SHADER = `
precision highp float;

uniform vec2  u_resolution;
uniform float u_time;
uniform vec2  u_mouse;       // normalized [0,1], y flipped to match gl coords
uniform float u_mouseInfluence;

// 2D simplex-ish value noise -------------------------------------------------
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i + vec2(0.0, 0.0));
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    v += amp * noise(p);
    p *= 2.0;
    amp *= 0.5;
  }
  return v;
}

// Metaball field -------------------------------------------------------------
float blob(vec2 uv, vec2 center, float radius) {
  float d = length(uv - center);
  return radius / (d + 0.0001);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 p = uv;
  p.x *= aspect;

  float t = u_time * 0.12;

  // Pointer pull: warp space toward the cursor.
  vec2 m = u_mouse;
  m.x *= aspect;
  vec2 toMouse = m - p;
  float mDist = length(toMouse);
  float pull = u_mouseInfluence * exp(-mDist * 2.2) * 0.18;
  p += normalize(toMouse + 0.0001) * pull;

  // Domain-warp the coordinates for organic flow.
  vec2 warp = vec2(
    fbm(p * 1.6 + vec2(t, t * 0.7)),
    fbm(p * 1.6 + vec2(t * 0.9 + 5.2, t * 1.1 + 1.3))
  );
  vec2 wp = p + (warp - 0.5) * 0.45;

  // Animated metaballs forming the lava body.
  float field = 0.0;
  field += blob(wp, vec2(0.35 * aspect + 0.25 * sin(t * 1.3), 0.30 + 0.18 * cos(t * 1.1)), 0.26);
  field += blob(wp, vec2(0.70 * aspect + 0.22 * cos(t * 0.9), 0.55 + 0.20 * sin(t * 1.4)), 0.30);
  field += blob(wp, vec2(0.50 * aspect + 0.28 * sin(t * 0.7 + 2.0), 0.78 + 0.15 * cos(t * 0.8)), 0.22);
  field += blob(wp, vec2(0.20 * aspect + 0.18 * cos(t * 1.6 + 1.0), 0.70 + 0.16 * sin(t * 1.0)), 0.20);
  field += blob(wp, vec2(0.85 * aspect + 0.16 * sin(t * 1.2 + 4.0), 0.22 + 0.18 * cos(t * 1.5)), 0.18);

  // Extra cursor-driven blob so the surface feels alive under the pointer.
  field += blob(wp, m, 0.18 * u_mouseInfluence);

  float lava = smoothstep(0.9, 2.2, field);

  // Texture detail inside the lava.
  float detail = fbm(wp * 3.0 + t * 0.6);
  lava *= 0.7 + 0.45 * detail;

  // Color ramp: near-black -> deep crimson -> molten orange -> warm gold.
  vec3 c0 = vec3(0.02, 0.01, 0.02);
  vec3 c1 = vec3(0.45, 0.05, 0.06);
  vec3 c2 = vec3(0.85, 0.22, 0.05);
  vec3 c3 = vec3(0.98, 0.62, 0.18);

  vec3 col = mix(c0, c1, smoothstep(0.0, 0.35, lava));
  col = mix(col, c2, smoothstep(0.35, 0.7, lava));
  col = mix(col, c3, smoothstep(0.7, 1.0, lava));

  // Subtle vignette to keep edges grounded in black.
  float vig = smoothstep(1.1, 0.25, length(uv - 0.5) * 1.3);
  col *= 0.6 + 0.4 * vig;

  gl_FragColor = vec4(col, 1.0);
}
`

const VERTEX_SHADER = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log("[v0] lava shader compile error:", gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export function LavaBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl", { antialias: true, alpha: false })
    if (!gl) {
      console.log("[v0] WebGL not supported, skipping lava background")
      return
    }

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!vs || !fs) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.log("[v0] lava program link error:", gl.getProgramInfoLog(program))
      return
    }
    gl.useProgram(program)

    // Fullscreen triangle.
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const posLoc = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const uResolution = gl.getUniformLocation(program, "u_resolution")
    const uTime = gl.getUniformLocation(program, "u_time")
    const uMouse = gl.getUniformLocation(program, "u_mouse")
    const uMouseInfluence = gl.getUniformLocation(program, "u_mouseInfluence")

    // Pointer state with smoothing.
    const target = { x: 0.5, y: 0.5, influence: 0 }
    const current = { x: 0.5, y: 0.5, influence: 0 }

    const onPointerMove = (e: PointerEvent) => {
      target.x = e.clientX / window.innerWidth
      target.y = 1 - e.clientY / window.innerHeight
      target.influence = 1
    }
    const onPointerLeave = () => {
      target.influence = 0
    }

    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerdown", onPointerMove)
    document.addEventListener("pointerleave", onPointerLeave)

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = w + "px"
      canvas.style.height = h + "px"
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener("resize", resize)

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let raf = 0
    const start = performance.now()

    const render = (now: number) => {
      const elapsed = prefersReducedMotion ? 0 : (now - start) / 1000

      // Smooth pointer follow.
      current.x += (target.x - current.x) * 0.08
      current.y += (target.y - current.y) * 0.08
      current.influence += (target.influence - current.influence) * 0.05

      gl.uniform2f(uResolution, canvas.width, canvas.height)
      gl.uniform1f(uTime, elapsed)
      gl.uniform2f(uMouse, current.x, current.y)
      gl.uniform1f(uMouseInfluence, current.influence)

      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerdown", onPointerMove)
      document.removeEventListener("pointerleave", onPointerLeave)
      window.removeEventListener("resize", resize)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buffer)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ display: "block" }}
    />
  )
}
