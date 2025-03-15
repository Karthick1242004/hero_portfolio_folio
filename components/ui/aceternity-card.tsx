"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export const AceternityCard = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (!mounted) return
    const { left, top, width, height } = currentTarget.getBoundingClientRect()

    x.set(clientX - left - width / 2)
    y.set(clientY - top - height / 2)
  }

  function onMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className={`relative w-full h-full rounded-xl bg-gradient-to-r from-background to-background/80 border border-border/50 overflow-hidden ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{
        perspective: 800,
      }}
    >
      <motion.div
        className="relative h-full w-full rounded-xl bg-background/10 backdrop-blur-sm p-6 shadow-md flex flex-col justify-between z-10"
        style={{
          rotateX: mounted ? mouseY.get() * 0.01 : 0,
          rotateY: mounted ? mouseX.get() * -0.01 : 0,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-primary/5 z-[-1] rounded-xl"
          style={{
            transform: "translateZ(-10px)",
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export const CardTitle = ({ children }: { children: React.ReactNode }) => {
  return <h3 className="text-xl font-bold text-foreground mb-2 relative z-10">{children}</h3>
}

export const CardDescription = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-sm text-muted-foreground relative z-10">{children}</p>
}

export const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={`relative z-10 ${className}`}>{children}</div>
}

export const CardFooter = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative z-10 mt-auto pt-4">{children}</div>
}

