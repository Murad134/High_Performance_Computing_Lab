import React from 'react'
import WelcomeSection from '../Components/HomeComponents/WelcomeSection'
import Stat from '../Components/HomeComponents/Stat'
import Aboutsection from '../Components/HomeComponents/Aboutsection'
import Picture_Awards from '../Components/HomeComponents/Picture_Awards'
import Publications from '../Components/HomeComponents/PublicationsSection'
import ResearchInterest from '../Components/ResearchInterest'
function Home() {
  return (
    <div className='pt-16'>
      <WelcomeSection />

      <Aboutsection />
      <div className='px-6 py-10'>
        <Stat />
      </div>

      <div>
        <h3 className='text-5xl flex items-center justify-center text-teal-500 py-8' >Research Interests</h3>
        <ResearchInterest />
      </div>
      <Publications />
      <div>
        <h3 className='text-5xl flex items-center justify-center text-black-500 py-8'>Awards Pictures</h3>
        <Picture_Awards />
      </div>
    </div>
  )
}
export default Home
