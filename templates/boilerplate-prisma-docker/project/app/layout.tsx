import type {Metadata} from "next"

import {Inter} from "next/font/google"

import "./globals.css"
import {cn} from "@/lib/utils"
import {Toaster} from "@/components/ui/sonner"

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "Boilerplate Prisma Docker",
  description: "Boilerplate Prisma Docker",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={cn("dark", inter.className)}>
        <Toaster />

        {children}
      </body>
    </html>
  )
}
