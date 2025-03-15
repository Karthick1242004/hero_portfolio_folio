"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink, Github, Code, Sparkles, Layers, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface Project {
  title: string;
  description: string;
  image?: string;
  stack: string[];
  githubLink: string;
  demoLink: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.div
        className="group cursor-pointer overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
      >
        <div className="overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={600}
            height={400}
            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.slice(0, 3).map((tech, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.stack.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{project.stack.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-card/95 backdrop-blur-xl border-primary/20">
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </AspectRatio>
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
              <DialogDescription className="text-base text-muted-foreground">{project.description}</DialogDescription>
            </DialogHeader>

            <ScrollArea className="h-[200px] mt-6 pr-4">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <Code className="h-4 w-4 text-primary" />
                    Tech Stack
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.stack.map((tech, index) => (
                      <Badge key={index} variant="outline" className="bg-background/50 backdrop-blur-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Key Features
                  </h4>
                  <ul className="mt-2 ml-5 list-disc text-sm text-muted-foreground space-y-1">
                    <li>Responsive design for all device sizes</li>
                    <li>Modern UI with smooth animations</li>
                    <li>Optimized performance and accessibility</li>
                    <li>Comprehensive documentation</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <Layers className="h-4 w-4 text-primary" />
                    Project Details
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    This project was built to solve real-world problems and showcase advanced development techniques. It
                    demonstrates proficiency in frontend and backend technologies, with a focus on user experience and
                    performance.
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    Timeline
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Development started in January 2023 and was completed in March 2023. Regular updates and maintenance
                    are ongoing.
                  </p>
                </div>
              </div>
            </ScrollArea>

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" size="sm" className="gap-1" asChild>
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  Code
                </a>
              </Button>
              <Button size="sm" className="gap-1" asChild>
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

