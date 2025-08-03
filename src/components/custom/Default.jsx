import React from 'react'
import { Button } from "../ui/button";
import { Link } from 'react-router-dom'

const Default = () => {
  return (
    <div className='flex flex-col items-center gap-9'>
      <h1
      className='font-extrabold text-[60px] text-center mt-16'
      >
        <span className='text-[#718355]'>Discover, Plan, Connect: Travel Reimagined!</span></h1>

        <p className='text-[#4e5743] font-bold'>Simplify your travel planning with personalized itineraries and perfect companion matches, all powered by smart AI. </p>
        <Link to={'/create-trip'}>
        <Button>Get sarted, for free</Button>
        </Link>
    </div>
  )
}

export default Default
