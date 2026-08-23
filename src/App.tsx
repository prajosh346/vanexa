import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import GrowthFlow from './components/GrowthFlow'
import About from './components/About'
import Process from './components/Process'
import Results from './components/Results'
import WhyVanexa from './components/WhyVanexa'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App(){
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <Services />
        <GrowthFlow />
        <About />
        <Process />
        <Results />
        <WhyVanexa />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
