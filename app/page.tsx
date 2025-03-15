import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading About...</div>}>
          <About />
        </Suspense>
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading Projects...</div>}>
          <Projects />
        </Suspense>
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading Contact...</div>}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

