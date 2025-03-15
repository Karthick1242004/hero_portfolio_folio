// "use client"

// import { useState } from "react"
// import { Code, Sparkles, Layers, Github, ExternalLink, Share2, Dumbbell, Brain } from "lucide-react"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Separator } from "@/components/ui/separator"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { motion } from "framer-motion"

// interface Project {
//   id: number;
//   icon: React.ReactNode;
//   title: string;
//   description: string;
//   date: string;
//   iconClassName: string;
//   titleClassName: string;
//   stack: string[];
//   fullDescription: string;
//   demoLink: string;
//   githubLink: string;
//   features: string[];
// }

// const projects: Project[] = [
//   {
//     id: 1,
//     icon: <Code className="size-4 text-blue-300" />,
//     title: "E-Commerce Platform",
//     description: "Full-featured online store",
//     date: "March 2023",
//     iconClassName: "text-blue-500",
//     titleClassName: "text-blue-500",
//     stack: ["React", "Node.js", "MongoDB", "Stripe"],
//     fullDescription:
//       "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
//     demoLink: "https://example.com/demo1",
//     githubLink: "https://github.com/username/project1",
//     features: [
//       "User authentication and authorization",
//       "Product catalog with search and filters",
//       "Shopping cart and checkout process",
//       "Payment integration with Stripe",
//       "Order management and tracking",
//       "Admin dashboard for inventory management",
//     ],
//   },
//   {
//     id: 2,
//     icon: <Share2 className="size-4 text-purple-300" />,
//     title: "Social Media Analytics",
//     description: "Data visualization platform",
//     date: "November 2022",
//     iconClassName: "text-purple-500",
//     titleClassName: "text-purple-500",
//     stack: ["Vue.js", "D3.js", "Firebase", "Express"],
//     fullDescription:
//       "A comprehensive analytics platform for tracking social media performance across multiple channels.",
//     demoLink: "https://example.com/demo4",
//     githubLink: "https://github.com/username/project4",
//     features: [
//       "Real-time data visualization",
//       "Multi-platform integration",
//       "Custom reporting tools",
//       "Engagement metrics tracking",
//       "Automated insights generation",
//       "Export functionality",
//     ],
//   },
//   {
//     id: 3,
//     icon: <Brain className="size-4 text-teal-300" />,
//     title: "AI Content Generator",
//     description: "Smart writing assistant",
//     date: "September 2022",
//     iconClassName: "text-teal-500",
//     titleClassName: "text-teal-500",
//     stack: ["Python", "TensorFlow", "React", "FastAPI"],
//     fullDescription:
//       "An AI-powered content generation tool that helps create blog posts, social media content, and marketing copy.",
//     demoLink: "https://example.com/demo6",
//     githubLink: "https://github.com/username/project6",
//     features: [
//       "Natural language processing",
//       "Content optimization suggestions",
//       "SEO analysis and recommendations",
//       "Multiple content formats support",
//       "Brand voice customization",
//       "Content performance analytics",
//     ],
//   },
//   {
//     id: 4,
//     icon: <Dumbbell className="size-4 text-rose-300" />,

//     description: "Mobile workout companion",
//     date: "October 2022",
//     iconClassName: "text-rose-500",
//     titleClassName: "text-rose-500",
//     stack: ["React Native", "GraphQL", "MongoDB", "Apollo"],
//     fullDescription:
//       "A mobile application for tracking workouts, nutrition, and fitness progress with personalized recommendations.",
//     demoLink: "https://example.com/demo5",
//     githubLink: "https://github.com/username/project5",
//     features: [
//       "Workout plan customization",
//       "Progress tracking and analytics",
//       "Nutrition logging and analysis",
//       "Social features and challenges",
//       "Integration with fitness devices",
//       "Personalized recommendations",
//     ],
//   },
// ]

// export function FeaturedProject() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null)

//   const handleCardClick = (project: Project) => {
//     setSelectedProject(project)
//     setIsOpen(true)
//   }

//   return (
//     <>
//       <div className="relative h-[400px] w-full max-w-[1200px] mx-auto">
//         {projects.map((project, index) => (
//           <motion.div
//             key={project.id}
//             className={`absolute left-1/2 top-1/2 w-[300px] cursor-pointer`}
//             style={{
//               translateX: `-50%`,
//               translateY: `-50%`,
//               zIndex: projects.length - index,
//             }}
//             initial={{
//               rotate: index * 5 - 7.5,
//               x: `calc(-50% + ${index * 20}px)`,
//               y: `-50%`,
//             }}
//             whileHover={{
//               rotate: 0,
//               scale: 1.1,
//               transition: { duration: 0.3 },
//             }}
//             onClick={() => handleCardClick(project)}
//           >
//             <div className="rounded-xl border-2 border-border bg-card p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-primary/25 dark:bg-card/50">
//               <div className="flex items-center gap-2">
//                 <span className={`rounded-full bg-${project.iconClassName.split("-")[1]}-900/30 p-2`}>
//                   {project.icon}
//                 </span>
//                 <h3 className={`text-lg font-semibold ${project.titleClassName}`}>{project.title}</h3>
//               </div>
//               <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
//               <p className="mt-4 text-xs text-muted-foreground">{project.date}</p>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {selectedProject && (
//         <Dialog open={isOpen} onOpenChange={setIsOpen}>
//           <DialogContent className="sm:max-w-[600px] p-6 overflow-hidden bg-card/95 backdrop-blur-xl border-primary/20">
//             <DialogHeader>
//               <div className="flex items-center gap-2">
//                 <span className={`rounded-full bg-${selectedProject.iconClassName.split("-")[1]}-900/30 p-2`}>
//                   {selectedProject.icon}
//                 </span>
//                 <DialogTitle className="text-2xl font-bold">{selectedProject.title}</DialogTitle>
//               </div>
//               <DialogDescription className="text-base text-muted-foreground">
//                 {selectedProject.fullDescription}
//               </DialogDescription>
//             </DialogHeader>

//             <ScrollArea className="h-[300px] mt-6 pr-4">
//               <div className="space-y-4">
//                 <div>
//                   <h4 className="text-sm font-semibold flex items-center gap-2">
//                     <Code className="h-4 w-4 text-primary" />
//                     Tech Stack
//                   </h4>
//                   <div className="mt-2 flex flex-wrap gap-2">
//                     {selectedProject.stack.map((tech, index) => (
//                       <Badge key={index} variant="outline" className="bg-background/50 backdrop-blur-sm">
//                         {tech}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>

//                 <Separator />

//                 <div>
//                   <h4 className="text-sm font-semibold flex items-center gap-2">
//                     <Sparkles className="h-4 w-4 text-primary" />
//                     Key Features
//                   </h4>
//                   <ul className="mt-2 ml-5 list-disc text-sm text-muted-foreground space-y-1">
//                     {selectedProject.features.map((feature, index) => (
//                       <li key={index}>{feature}</li>
//                     ))}
//                   </ul>
//                 </div>

//                 <Separator />

//                 <div>
//                   <h4 className="text-sm font-semibold flex items-center gap-2">
//                     <Layers className="h-4 w-4 text-primary" />
//                     Project Details
//                   </h4>
//                   <p className="mt-2 text-sm text-muted-foreground">
//                     This project showcases advanced development techniques and real-world problem-solving. It
//                     demonstrates proficiency in both frontend and backend technologies, with a strong focus on user
//                     experience and performance optimization.
//                   </p>
//                 </div>
//               </div>
//             </ScrollArea>

//             <div className="mt-6 flex justify-end gap-3">
//               <Button variant="outline" size="sm" className="gap-1" asChild>
//                 <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer">
//                   <Github className="h-4 w-4" />
//                   Code
//                 </a>
//               </Button>
//               <Button size="sm" className="gap-1" asChild>
//                 <a href={selectedProject.demoLink} target="_blank" rel="noopener noreferrer">
//                   <ExternalLink className="h-4 w-4" />
//                   Live Demo
//                 </a>
//               </Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       )}
//     </>
//   )
// }

