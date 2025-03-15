"use client"

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { renderCanvas } from "@/components/ui/canvas"
import { Button } from "@/components/ui/button"
import { Download, Code, Sparkles } from "lucide-react"
import { usePortfolioData } from "@/src/hooks/usePortfolioData"

export function Hero() {
  const ref = useRef(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isInView = useInView(ref, { once: true })
  const { data, loading, error } = usePortfolioData()

  useEffect(() => {
    if (canvasRef.current && data) {
      renderCanvas()
    }
  }, [data])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (error) return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>
  if (!data) return <div className="min-h-screen flex items-center justify-center">No data available</div>

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      <div
        ref={ref}
        className="animation-delay-8 animate-fadeIn flex flex-col items-center justify-center px-4 text-center z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 mt-20 sm:justify-center md:mb-8 md:mt-20"
        >
          <div className="relative flex items-center whitespace-nowrap rounded-full border bg-popover/80 backdrop-blur-sm px-3 py-1 text-xs leading-6 text-primary/60">
            <Sparkles className="h-4 w-4 mr-1" /> {data.personalInfo.title}
          </div>
        </motion.div>

        <div className="mb-10 mt-4 md:mt-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="px-2"
          >
            <div className="border-accent relative mx-auto h-full max-w-4xl border p-6 [mask-image:radial-gradient(800rem_96rem_at_center,white,transparent)] md:px-12 md:py-20">
              <h1 className="flex select-none flex-col px-3 py-2 text-center text-5xl font-bold leading-none tracking-tight md:text-7xl lg:text-8xl">
                <Code strokeWidth={2} className="text-primary absolute -left-5 -top-5 h-10 w-10" />
                <Code strokeWidth={2} className="text-primary absolute -bottom-5 -left-5 h-10 w-10" />
                <Code strokeWidth={2} className="text-primary absolute -right-5 -top-5 h-10 w-10" />
                <Code strokeWidth={2} className="text-primary absolute -bottom-5 -right-5 h-10 w-10" />
                {data.personalInfo.name}
              </h1>
              <div className="flex items-center justify-center gap-1 mt-4">
                <span className="relative flex h-3 w-3 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                <p className="text-xs text-green-500">{data.personalInfo.status}</p>
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 text-2xl md:text-3xl"
          >
            {data.personalInfo.tagline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="md:text-md mx-auto mb-10 mt-4 max-w-2xl px-6 text-sm text-muted-foreground sm:px-6 md:max-w-3xl md:px-20 lg:text-lg"
          >
            {data.personalInfo.shortBio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex justify-center"
          >
            <a href={data.personalInfo.resumeUrl} download>
              <Button variant="default" size="lg" className="group">
                Download CV
                <Download className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
      <canvas 
        ref={canvasRef}
        className="bg-skin-base pointer-events-none absolute inset-0 mx-auto" 
        id="canvas"
      ></canvas>
    </section>
  )
}

