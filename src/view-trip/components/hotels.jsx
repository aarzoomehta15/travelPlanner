import React from 'react'
import { Link } from 'react-router';
import HotelCard from './HotelCard';

const Hotels = ({trip}) => {
    if(!trip || !trip.tripData){
        return <div>Loading...</div>;
    }
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendations</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5'>
        {trip?.tripData?.accommodation_options.map((hotel, ind) => {
            const mapUrl = `https://www.google.com/maps/search/?api=1&query=${hotel.geo_coordinates?.latitude},${hotel.geo_coordinates?.longitude}`
            return(
                <HotelCard hotel = {hotel} mapUrl = {mapUrl}></HotelCard>
            )
        })}
      </div>
    </div>
  )
}

export default Hotels
