import './globals.css'
import type { Metadata } from "next"
import { Navbar, Footer } from "@/components"

export const metadata: Metadata = {
  title: "Car Hub",
  description: "Discover the best cars in the world",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="relative"
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
