"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Code, Sparkles, Layers, Github, ExternalLink, Share2, Dumbbell, Brain } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AceternityCard, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/aceternity-card"


interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  date: string;
  icon: string;
  color: string;
  stack: string[];
  features: string[];
  demoLink: string;
  githubLink: string;
  image: string;
}

interface ProjectsShowcaseProps {
  projects: Project[];
}

export function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const handleCardClick = (project: Project) => {
    setSelectedProject(project)
    setIsOpen(true)
  }

  return (
    <>
   
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: project.id * 0.1 }}
            className="h-[300px]"
          >
            <AceternityCard 
              onClick={() => handleCardClick(project)}
              className="border border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300 bg-background/50 backdrop-blur-sm"
            >
              <CardContent>
                <div
                  className={`inline-flex items-center justify-center p-2.5 rounded-xl bg-${project.color}-100 dark:bg-${project.color}-500/10 ring-1 ring-${project.color}-500/20 mb-4`}
                >
                  {project.icon}
                </div>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>
                  {project.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <div className="flex flex-wrap gap-2">
                  {project.stack.slice(0, 3).map((tech, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="text-xs font-medium bg-secondary/50 hover:bg-secondary/70 transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.stack.length > 3 && (
                    <Badge 
                      variant="outline" 
                      className="text-xs font-medium"
                    >
                      +{project.stack.length - 3}
                    </Badge>
                  )}
                </div>
              </CardFooter>
            </AceternityCard>
          </motion.div>
        ))}
      </div>

      {selectedProject && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[600px] p-6 overflow-hidden bg-background/95 backdrop-blur-xl border shadow-lg">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <span className={`rounded-xl bg-${selectedProject.color}-100 dark:bg-${selectedProject.color}-500/20 p-2.5 ring-1 ring-${selectedProject.color}-500/20`}>
                  {selectedProject.icon}
                </span>
                <DialogTitle className="text-2xl font-bold tracking-tight">
                  {selectedProject.title}
                </DialogTitle>
              </div>
              <DialogDescription className="text-base text-muted-foreground">
                {selectedProject.fullDescription}
              </DialogDescription>
            </DialogHeader>

            <ScrollArea className="h-[300px] mt-6 pr-4">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <Code className="h-4 w-4 text-primary" />
                    Tech Stack
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedProject.stack.map((tech, index) => (
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
                    {selectedProject.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <Layers className="h-4 w-4 text-primary" />
                    Project Details
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    This project showcases advanced development techniques and real-world problem-solving. It
                    demonstrates proficiency in both frontend and backend technologies, with a strong focus on user
                    experience and performance optimization.
                  </p>
                </div>
              </div>
            </ScrollArea>

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" size="sm" className="gap-1" asChild>
                <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  Code
                </a>
              </Button>
              <Button size="sm" className="gap-1" asChild>
                <a href={selectedProject.demoLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

