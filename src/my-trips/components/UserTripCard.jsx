import React, { useEffect, useState } from 'react'
import { getPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
import { Link } from 'react-router'

const UserTripCard = ({trip}) => {
    console.log('trip prop in tripcard' , trip)  
    
  return (
    <Link to={'/view-trip/' + trip?.docId}>
      <div className= 'hover:scale-105 transition-all'>
        <img src={trip.photoUrl} className='object-cover rounded-xl h-[300px] w-[300px]'></img>
        <div>
          <h2 className='font-bold text-lg'>{trip?.tripData?.trip_details?.location}</h2>
          <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} days trip with a {trip?.userSelection?.budget} budget</h2>
        </div>
      </div>
    </Link>
  )
}

export default UserTripCard
