import React from 'react'
import Navbar from '../../Components/website/Navbar'
import Footer from '../../Components/website/Footer'
import Hero from '../../Components/website/Hero'
import FAQSection from '../../Components/website/FAQSection'
import AllPlans from '../../Components/website/AllPlans'
import ContactUs from '../../Components/website/ContactUs'
import { BouncyCardsFeatures } from '../../Components/website/BouncyCardsFeatures'
import AboutUs from '../../Components/website/AboutUs'
import ContentSections from '../../Components/website/ContentSections'
import Mission from '../../Components/website/Mission'
import Vision from '../../Components/website/Vision'
import InfoTabs from '../../Components/website/InfoTabs'
import WhyChoose from '../../Components/website/WhyChoose'


const Home = () => {
  return (
    <div className='text-white bg-black/90'>
      <div id="home">
        <Hero />
      </div>
      <div id="about">
        <AboutUs />
      </div>
 <div >
     <Mission/>
      </div>
       <div >
   <Vision/>
      </div>
<div>
  <WhyChoose/>
</div>
         <div >
<InfoTabs/>
      </div>


      <ContentSections />
      <BouncyCardsFeatures />
      <div id="packages">
        <AllPlans />
      </div>
      <div id="contact">
        <ContactUs />
      </div>
      <div id="faq">
        <FAQSection />
      </div>
      <Footer />
    </div>
  )
}

export default Home
