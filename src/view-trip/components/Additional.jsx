import React from 'react'

const Additional = ({trip}) => {
  return (
    <div>
        <h2 className='font-bold text-lg text-[#6d597a]'>Additional Information</h2>

      <div className='my-5 border rounded-lg'>
        <h2 className='font-medium'>Transportation Options:</h2>
        {trip.tripData.transportation.options.map((opt, ind) => {
            return(
            <p>➤{opt}</p>
        )})}
        <p className='text-sm text-gray-500'>Tips : {trip.tripData.transportation.tips}</p>
      </div>

      <div className='my-5 border rounded-lg'>
        <h2 className='font-medium'>Food Recommendations</h2>
        {trip.tripData.food.recommendations.map((food, ind) => {
            return(
                <p>➤{food}</p>
            )
        })}
      </div>

      <div className='my-5 border rounded-lg'>
        <h2 className='font-medium'>Important Notes</h2>
        {trip.tripData.important_notes}
      </div>
    </div>
  )
}

export default Additional
