"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { GraduationCap, Briefcase, Award, Code2, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePortfolioData } from "@/src/hooks/usePortfolioData"

interface TimelineItem {
  date: string;
  title: string;
  institution?: string;
  organization?: string;
  description: string;
  category: "education" | "achievement" | "experience";
}

interface PersonalInfo {
  name: string;
  title: string;
  status: string;
  tagline: string;
  shortBio: string;
  detailedBio: {
    intro: string;
  };
}

export function AboutTimeline() {
  const { data, loading, error } = usePortfolioData()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  
  if (loading) {
    return <div className="flex justify-center items-center min-h-[200px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  }  
  if (error || !data || !data.timeline) {
    return <div className="text-center text-muted-foreground py-4">
      Unable to load timeline data
    </div>
  }

  // Safely map the timeline items with proper type checking
  const timelineItems: TimelineItem[] = [
    ...(data.timeline.education || []).map((item: any) => ({
      ...item,
      category: "education" as const
    })),
    ...(data.timeline.achievements || []).map((item: any) => ({
      ...item,
      category: "achievement" as const
    }))
  ]

  const education = timelineItems.filter((item) => 
    item.category === "education" || item.category === "achievement"
  )
  return (
    <div ref={ref} className="mt-12">
      <div className="mb-10">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            {data.personalInfo?.detailedBio?.intro || ""}
          </p>
        </div>
      </div>

      <div className="max-w-xl mx-auto">
        <div>
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <GraduationCap className="mr-2 h-5 w-5 text-primary" />
            Education & Achievements
          </h3>
          {education.length > 0 ? (
            <ol className="relative border-s border-gray-200 dark:border-gray-700">
              {education.map((item, index) => (
                <li key={index} className="mb-10 ms-4">
                  <div className="absolute w-3 h-3 bg-primary rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">
                    {item.date}
                  </time>
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    {item.category === "education" ? item.institution : item.organization}
                  </p>
                  <p className="mb-4 text-base font-normal text-muted-foreground">
                    {item.description}
                  </p>
                  {item.category === "education" && (
                    <Button variant="outline" size="sm" className="text-xs">
                      View Certificate
                    </Button>
                  )}
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-center text-muted-foreground">No education or achievements found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

