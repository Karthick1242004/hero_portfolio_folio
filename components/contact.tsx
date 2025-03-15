"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Github, Linkedin, Instagram } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { usePortfolioData } from "@/src/hooks/usePortfolioData"

export function Contact() {
  const { data, loading, error } = usePortfolioData()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  
  
  if (loading) {
    return <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">
      Error loading contact information: {error}
    </div>
  }

  if (!data) {
    return <div className="text-center text-muted-foreground py-8">
      No contact data available
    </div>
  }

  
  // Check if contact property exists
  if (!data.contact) {
    return <div className="text-center text-red-500 py-8">
      Error: Contact information is missing
    </div>
  }
  
  // Check if required properties exist
  if (!data.contact.email || !data.contact.socialLinks || !data.contact.contactText) {
    return <div className="text-center text-red-500 py-8">
      Error: Contact data is incomplete
    </div>
  }

  return (
    <section id="contact" className="relative py-20 md:py-32 overflow-hidden bg-background min-h-screen">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -right-[60%] h-[800px] w-[800px] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -bottom-[40%] -left-[60%] h-[800px] w-[800px] rounded-full bg-primary/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Get In Touch</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {data.contact.contactText}
          </p>
          <div className="mt-4 h-1 w-20 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold">Contact Information</h3>
            <p className="mt-2 text-muted-foreground">
              {data.contact.contactDescription || "Feel free to reach out through any of these channels. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."}
            </p>

            <div className="mt-8 space-y-6">
              <motion.a
                href={`mailto:${data.contact.email}`}
                className="group flex items-center"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{data.contact.email}</p>
                </div>
              </motion.a>

              <div className="flex space-x-4">
                {Object.entries(data.contact.socialLinks).map(([platform, url]) => (
                  <motion.a
                    key={platform}
                    href={String(url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="flex h-12 w-12 items-center justify-center rounded-full border bg-background hover:bg-muted transition-colors"
                  >
                    {platform === "github" && <Github className="h-5 w-5" />}
                    {platform === "linkedin" && <Linkedin className="h-5 w-5" />}
                    {platform === "instagram" && <Instagram className="h-5 w-5" />}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

