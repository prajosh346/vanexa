import { motion } from 'framer-motion'

export default function Hero(){
  return (
    <section id="home" className="relative overflow-hidden bg-[linear-gradient(180deg,#edf6ff_0%,#f5faff_100%)] px-0 pb-20 pt-0 md:pb-24 md:pt-0">
      <div className="hero-grid-bg absolute inset-0 opacity-90" />
      <div className="container relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-3 rounded-full border border-[#bfd9ff] bg-white/80 px-5 py-2 text-sm text-[#1f2d4c] shadow-[0_8px_24px_rgba(61,122,245,0.08)] backdrop-blur-sm"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[#68d6a2] shadow-[0_0_12px_rgba(104,214,162,0.7)]" />
            <span>Pune, Maharashtra</span>
            <span className="text-[#6b7b9a]">•</span>
            <span>open for new projects</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-5xl font-black leading-[0.9] tracking-[-0.06em] text-[#10264d] md:text-7xl xl:text-[8rem]"
          >
            <span className="block text-[#10264d]">We <span className="text-gradient-brand">build.</span> We</span>
            <span className="block text-[#10264d]">optimize. <span className="text-gradient-brand">You</span></span>
            <span className="block text-gradient-brand">grow.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-[#405274] md:text-xl"
          >
            VANEXA provides digital solutions for your business growth —
            <span className="text-[#10264d]"> websites, local SEO and Google visibility</span> that turn searches into real customers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-[#3d7af5] px-7 py-3.5 text-base font-bold text-white shadow-[0_12px_28px_rgba(61,122,245,0.28)] transition hover:brightness-105">
              Start a project <span className="ml-2">→</span>
            </a>
            <a href="#services" className="inline-flex items-center justify-center rounded-full border border-[#bfd9ff] bg-white px-7 py-3.5 text-base font-semibold text-[#10264d] shadow-[0_8px_20px_rgba(61,122,245,0.08)] transition hover:border-[#3d7af5] hover:text-[#3d7af5]">
              See what we do
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative mx-auto flex w-full max-w-[620px] items-center justify-center"
        >
          <div className="growth-section">
            <div className="growth-container">
              <div className="growth-grid" />
              <div className="growth-orbit" />
              <div className="connection connection-1" />
              <div className="connection connection-2" />
              <div className="connection connection-3" />
              <div className="connection connection-4" />

              <div className="growth-core">
                <div className="core-glow" />
                <div className="core-content">
                  <span className="core-small">DIGITAL</span>
                  <h2>GROWTH</h2>
                  <span className="core-line" />
                  <p>Build • Optimize • Grow</p>
                </div>
              </div>

              <div className="growth-label top-left"><span className="label-dot" /><span>SEO</span></div>
              <div className="growth-label top-right"><span className="label-dot" /><span>GROWTH</span></div>
              <div className="growth-label bottom-left"><span className="label-dot" /><span>BRAND</span></div>
              <div className="growth-label bottom-right"><span className="label-dot" /><span>WEB</span></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
