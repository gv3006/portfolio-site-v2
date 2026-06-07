"use client"

import { useEffect, useRef } from "react"

type NodePoint = {
  x: number
  y: number
  vx: number
  vy: number
  phase: number
}

const MAX_DISTANCE = 150
const MOUSE_DISTANCE = 220

function createNodes(width: number, height: number) {
  const area = width * height
  const count = Math.min(90, Math.max(34, Math.floor(area / 18000)))

  return Array.from({ length: count }, (_, index) => {
    const angle = ((index * 137.508) % 360) * (Math.PI / 180)
    const speed = 0.08 + (index % 7) * 0.012

    return {
      x: (Math.sin(index * 12.9898) * 43758.5453) % 1 * width,
      y: (Math.sin(index * 78.233) * 19341.234) % 1 * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      phase: index * 0.37,
    }
  }).map((node) => ({
    ...node,
    x: Math.abs(node.x),
    y: Math.abs(node.y),
  }))
}

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<NodePoint[]>([])
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const frameRef = useRef<number | null>(null)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context) return

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    reducedMotionRef.current = motionQuery.matches

    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const ratio = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.floor(width * ratio)
      canvas.height = Math.floor(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      nodesRef.current = createNodes(width, height)
    }

    const onPointerMove = (event: PointerEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY, active: true }
    }

    const onPointerLeave = () => {
      mouseRef.current.active = false
    }

    const onMotionChange = () => {
      reducedMotionRef.current = motionQuery.matches
    }

    const draw = (time: number) => {
      const width = window.innerWidth
      const height = window.innerHeight
      const nodes = nodesRef.current
      const mouse = mouseRef.current
      const reducedMotion = reducedMotionRef.current

      context.clearRect(0, 0, width, height)

      for (const node of nodes) {
        if (!reducedMotion) {
          node.x += node.vx
          node.y += node.vy
        }

        if (node.x < -20) node.x = width + 20
        if (node.x > width + 20) node.x = -20
        if (node.y < -20) node.y = height + 20
        if (node.y > height + 20) node.y = -20
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.hypot(dx, dy)
          if (distance > MAX_DISTANCE) continue

          const mouseDistance = mouse.active
            ? Math.min(Math.hypot(a.x - mouse.x, a.y - mouse.y), Math.hypot(b.x - mouse.x, b.y - mouse.y))
            : Infinity
          const hoverBoost = mouseDistance < MOUSE_DISTANCE ? 1 - mouseDistance / MOUSE_DISTANCE : 0
          const alpha = (1 - distance / MAX_DISTANCE) * (0.06 + hoverBoost * 0.22)

          context.strokeStyle = `rgba(255, 255, 255, ${alpha})`
          context.lineWidth = 1
          context.beginPath()
          context.moveTo(a.x, a.y)
          context.lineTo(b.x, b.y)
          context.stroke()
        }
      }

      if (mouse.active) {
        for (const node of nodes) {
          const distance = Math.hypot(node.x - mouse.x, node.y - mouse.y)
          if (distance > MOUSE_DISTANCE) continue

          const strength = 1 - distance / MOUSE_DISTANCE
          context.strokeStyle = `rgba(255, 255, 255, ${0.08 + strength * 0.16})`
          context.lineWidth = 1 + strength * 0.6
          context.beginPath()
          context.moveTo(mouse.x, mouse.y)
          context.lineTo(node.x, node.y)
          context.stroke()
        }
      }

      for (const node of nodes) {
        const distance = mouse.active ? Math.hypot(node.x - mouse.x, node.y - mouse.y) : Infinity
        const hoverBoost = distance < MOUSE_DISTANCE ? 1 - distance / MOUSE_DISTANCE : 0
        const pulse = reducedMotion ? 1 : Math.sin(time * 0.001 + node.phase) * 0.25 + 0.75
        const radius = 1.2 + hoverBoost * 1.9

        context.fillStyle = `rgba(255, 255, 255, ${(0.12 + hoverBoost * 0.21) * pulse})`
        context.beginPath()
        context.arc(node.x, node.y, radius, 0, Math.PI * 2)
        context.fill()
      }

      if (mouse.active) {
        context.fillStyle = "rgba(255, 255, 255, 0.58)"
        context.beginPath()
        context.arc(mouse.x, mouse.y, 2.4, 0, Math.PI * 2)
        context.fill()
      }

      frameRef.current = requestAnimationFrame(draw)
    }

    resize()
    frameRef.current = requestAnimationFrame(draw)

    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("pointerleave", onPointerLeave)
    motionQuery.addEventListener("change", onMotionChange)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerleave", onPointerLeave)
      motionQuery.removeEventListener("change", onMotionChange)

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="network-background" />
}
