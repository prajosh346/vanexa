import { motion } from 'framer-motion'

export default function Hero(){
  return (
    <section id="home" className="section bg-white">
      <div className="container grid md:grid-cols-2 gap-8 items-center">
        <div>
          <motion.h1 initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.1}} className="text-4xl md:text-6xl font-bold text-vanexa-navy">Grow Digitally. Grow Beyond.</motion.h1>
          <motion.p initial={{y:10,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.2}} className="mt-6 text-gray-600 max-w-xl">We help businesses build powerful digital experiences, improve online visibility, and turn digital presence into measurable growth.</motion.p>
          <div className="mt-8 flex gap-4">
            <a href="#contact" className="px-6 py-3 bg-vanexa-gold text-black rounded-md font-semibold">Start Your Growth</a>
            <a href="#services" className="px-6 py-3 border rounded-md text-vanexa-navy">Explore Services</a>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <motion.div initial={{scale:0.95,opacity:0}} animate={{scale:1,opacity:1}} transition={{delay:0.3}} className="hero-visual">
            <img src="/src/assets/hero.png" alt="digital growth visual" className="rounded-lg shadow-lg" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
