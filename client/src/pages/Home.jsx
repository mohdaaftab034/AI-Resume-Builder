import React from 'react'
// import Banner from '../components/home/Banner'
import Hero from '../components/home/Hero'
import Templates from '../components/home/Templates'
import HowItWorks from '../components/home/HowItWorks'
import WhyChooseUs from '../components/home/WhyChooseUs'
import Features from '../components/home/Features'
import FAQ from '../components/home/FAQ'
import Footer from '../components/home/Footer'
import MarketDashboardDemo from '../components/home/MarketDashboardDemo'
import PrototypeNotice from '../components/home/PrototypeNotice'

const Home = () => {
  return (
    <div className="bg-white overflow-x-hidden selection:bg-orange-100 selection:text-primary-accent">
      <PrototypeNotice />
      <Hero />
      <MarketDashboardDemo />
      <Templates />
      <HowItWorks />
      <WhyChooseUs />
      <Features />
      <FAQ />
      <Footer />

      <style>{`
          .text-primary-accent { color: #F95200; }
        `}</style>
    </div>
  )
}

export default Home