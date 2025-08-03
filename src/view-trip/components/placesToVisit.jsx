import React from 'react'
import PlaceCard from './PlaceCard'

const PlacesToVisit = ({trip}) => {
    const dayKeys = Object.keys(trip.tripData.itinerary)
  return (
    <div>
      <h2 className = 'font-bold text-lg'>Places You Can Visit</h2>

      <div>
        {dayKeys.map((dayKey, ind) => {
            const day = trip.tripData.itinerary[dayKey]
            return(
                <div className='mt-5'>
                    <h2 className= 'font-medium text-lg'>Day {ind + 1} - {day.theme}</h2>

                    <div className = 'grid md:grid-cols-2 gap-5'>
                        {day.plan.map((place, placeInd) => (
                        <div className='my-3'>
                            <h2 className='font-medium text-sm text-[#b56576]'>{place.time_slot}</h2>
                            <PlaceCard place= {place}></PlaceCard>
                        </div>
                        ))}
                    </div>
                    
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default PlacesToVisit
