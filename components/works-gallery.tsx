"use client"

import { useState } from "react"
import { VideoCard } from "./video-card"
import { CustomCursor } from "./custom-cursor"

const projects = [
  {
    id: 1,
    title: "FASHION STUDIO",
    category: "BRANDING",
    year: "2024",
    thumbnail: "/image1.jpg",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 2,
    title: "ARCHITECTURE FIRM",
    category: "DESIGN",
    year: "2024",
    thumbnail: "/image2.jpg",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: 3,
    title: "PRODUCT LAUNCH",
    category: "CREATIVE",
    year: "2024",
    thumbnail: "/image3.jpg",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
  {
    id: 4,
    title: "STUDIO VALE",
    category: "MARKETING",
    year: "2024",
    thumbnail: "/image4.jpg",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
  {
    id: 5,
    title: "AUTOMOTIVE",
    category: "COMMERCIAL",
    year: "2024",
    thumbnail: "/image5.jpg",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  },
]

export function WorksGallery() {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)
  const hasHoveredProject = hoveredKey !== null

  return (
    <>
      <CustomCursor isActive={hasHoveredProject} />
      <div className="w-full overflow-hidden px-6">
        <div className="works-gallery-marquee overflow-hidden">
          <div className="works-gallery-track flex w-max items-stretch">
            {[0, 1].map((loopIndex) => (
              <div key={loopIndex} className="works-gallery-set flex shrink-0 items-stretch gap-4 pr-4">
                {projects.map((project) => {
                  const projectKey = `${loopIndex}-${project.id}`

                  return (
                    <VideoCard
                      key={projectKey}
                      project={project}
                      isHovered={hoveredKey === projectKey}
                      isDimmed={hasHoveredProject && hoveredKey !== projectKey}
                      onHoverChange={(hovered) => setHoveredKey(hovered ? projectKey : null)}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
