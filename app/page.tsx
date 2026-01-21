import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Showcase from '@/components/Showcase'
import Services from '@/components/Services'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-cinema-black">
      <Navigation />
      <Hero />
      <Services />
      <Showcase />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
