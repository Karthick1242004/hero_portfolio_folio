"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { GraduationCap, Briefcase, Award, Code2 } from "lucide-react"
import { usePortfolioData } from "@/src/hooks/usePortfolioData"

// Define the interface for timeline items
interface TimelineItem {
  date: string;
  title: string;
  description: string;
  category: string;
}

export function Timeline() {
  const { data, loading, error } = usePortfolioData()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const mainControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    } else {
      mainControls.start("hidden")
    }
  }, [isInView, mainControls])

  if (loading) {
    return <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">
      Error loading timeline: {error}
    </div>
  }

  if (!data) {
    return <div className="text-center text-muted-foreground py-8">
      No timeline data available
    </div>
  }

  // Use the interface to type the items
  const timelineItems = [
    ...data.timeline.education.map((item: TimelineItem) => ({
      ...item,
      icon: <GraduationCap className="h-5 w-5" />,
      color: "bg-red-500",
    })),
    ...data.timeline.achievements.map((item: TimelineItem) => ({
      ...item,
      icon: <Award className="h-5 w-5" />,
      color: "bg-amber-500",
    }))
  ]

  return (
    <div ref={ref} className="relative mx-auto max-w-3xl px-4 py-8">
      <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border"></div>

      {timelineItems.map((item, index) => (
        <motion.div
          key={index}
          className={`relative mb-12 ${index % 2 === 0 ? "ml-auto pl-8 text-right md:ml-0 md:w-1/2 md:pl-12 md:pr-8" : "mr-auto pr-8 text-left md:ml-auto md:mr-0 md:w-1/2 md:pl-8 md:pr-12"}`}
          initial="hidden"
          animate={mainControls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: index * 0.2,
              },
            },
          }}
        >
          <div
            className={`absolute left-0 top-0 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background ${item.color} text-white md:left-1/2`}
          >
            {item.icon}
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {item.date}
            </span>
            <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
            <p className="mt-2 text-muted-foreground">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

