"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { usePortfolioData } from "@/src/hooks/usePortfolioData"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { data } = usePortfolioData()

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false)
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold tracking-tight">
              {data?.personalInfo.name}
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <nav className="flex items-center space-x-4 lg:space-x-6">
                <a href="#home" className="text-sm font-medium transition-colors hover:text-primary">
                  Home
                </a>
                <a href="#about" className="text-sm font-medium transition-colors hover:text-primary">
                  About
                </a>
                <a href="#projects" className="text-sm font-medium transition-colors hover:text-primary">
                  Projects
                </a>
                <a href="#contact" className="text-sm font-medium transition-colors hover:text-primary">
                  Contact
                </a>
              </nav>
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
                {mounted && (
                  <>
                    {theme === "dark" ? (
                      <Sun className="h-[1.2rem] w-[1.2rem]" />
                    ) : (
                      <Moon className="h-[1.2rem] w-[1.2rem]" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="flex md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="mr-2 rounded-full">
              {mounted && (
                <>
                  {theme === "dark" ? (
                    <Sun className="h-[1.2rem] w-[1.2rem]" />
                  ) : (
                    <Moon className="h-[1.2rem] w-[1.2rem]" />
                  )}
                  <span className="sr-only">Toggle theme</span>
                </>
              )}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              <span className="sr-only">Open menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <nav className="flex items-center space-x-4 lg:space-x-6">
              <a href="#home" className="text-sm font-medium transition-colors hover:text-primary">
                Home
              </a>
              <a href="#about" className="text-sm font-medium transition-colors hover:text-primary">
                About
              </a>
              <a href="#projects" className="text-sm font-medium transition-colors hover:text-primary">
                Projects
              </a>
              <a href="#contact" className="text-sm font-medium transition-colors hover:text-primary">
                Contact
              </a>
            </nav>
          </div>
        </div>
      )}
    </nav>
  )
}

