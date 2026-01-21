import type { Metadata } from 'next'
import { PT_Serif_Caption } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/ui/SmoothScroll'
import CustomCursor from '@/components/ui/CustomCursor'
import ParallaxOverlay from '@/components/ui/ParallaxOverlay'

const ptSerifCaption = PT_Serif_Caption({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Kinship | AI Creative Studio',
  description: 'Creative solutions for brands and agencies - combining deep human experience with ethical generative AI. VFX, compositing, and AI-powered content creation.',
  keywords: ['AI creative', 'VFX', 'generative AI', 'creative studio', 'compositing', 'visual effects'],
  openGraph: {
    title: 'The Kinship | AI Creative Studio',
    description: 'Creative solutions combining 25 years of VFX expertise with cutting-edge generative AI',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={ptSerifCaption.variable}>
      <body className="font-serif antialiased cursor-none">
        <SmoothScroll>
          <CustomCursor />
          <ParallaxOverlay />
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
