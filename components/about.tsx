"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { motion } from "framer-motion"
import { AboutTimeline } from "./about-timeline"
import { usePortfolioData } from "@/src/hooks/usePortfolioData"

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { data, loading, error } = usePortfolioData()

  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">About Me</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            My journey in technology and design, from education to professional experience.
          </p>
          <div className="mt-4 h-1 w-20 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="mt-16 max-w-4xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">
              Error loading about section: {error}
            </div>
          ) : !data ? (
            <div className="text-center text-muted-foreground py-8">
              No about data available
            </div>
          ) : (
            <motion.div className="prose prose-lg dark:prose-invert max-w-none">
              <AboutTimeline />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

