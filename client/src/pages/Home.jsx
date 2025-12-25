import React from 'react'
// import Banner from '../components/home/Banner'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Testimonials from '../components/home/Testimonials'
import CallToAction from '../components/home/CallToAction'
import Footer from '../components/home/Footer'

const Home = () => {
  return (
    <div className="bg-slate-50 overflow-x-hidden selection:bg-green-200 selection:text-green-900">
      {/* <Banner /> */}
      <Hero />
      <Features />
      {/* Assuming Testimonials follows similar styling */}
      <Testimonials />
      <CallToAction />
      <Footer />

      {/* Global Styles for Animations */}
      <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 20s linear infinite;
          }
          .paused {
            animation-play-state: paused;
          }
        `}</style>
    </div>
  )
}

export default Home