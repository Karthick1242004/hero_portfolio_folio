"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ProjectsShowcase } from "@/components/projects-showcase"
import { usePortfolioData } from "@/src/hooks/usePortfolioData"

export function Projects() {
  const { data, loading, error } = usePortfolioData()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <section id="projects" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">My Projects</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Here are some of my recent projects that showcase my skills and experience.
          </p>
          <div className="mt-4 h-1 w-20 bg-primary mx-auto rounded-full"></div>
        </div>

        <div ref={ref} className="mt-16">
          <ProjectsShowcase projects={data.projects} />
        </div>
      </div>
    </section>
  )
}

