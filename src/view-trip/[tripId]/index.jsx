import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import InfoSection from '../components/infoSection'
import axios from 'axios'
import Hotels from '../components/hotels'
import PlacesToVisit from '../components/placesToVisit'
import Footer from '../components/Footer'
import Additional from '../components/Additional'

const ViewTrip = () => {
    //to read dynamic parts of the url useparams is used
    const {tripId} = useParams()
    const[trip, setTrip] = useState(null)

    useEffect(() => {
        if(tripId){
          getTripData()
        }
    }, [tripId])

    const getTripData = async() => {
        try{
            const response = await axios.get(`https://triplanr.onrender.com/api/trips/${tripId}`)
            //api call

            if(response.data){
              console.log("Fetched trip data from backend:", response.data)
              response.data.tripData = JSON.parse(response.data.tripData)
              setTrip(response.data)
            }else{
              toast('No trip found')
            }
        }catch(e){
          console.log('error fetching data: ', e)
          toast('Error fetching data')
        }
    }

  if(!trip){
    return <div>Loading trip details...</div>
  }

  return (
    <div className = 'p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* Information Section */}
      <InfoSection trip = {trip}></InfoSection>
      {/* hotels */}
      <Hotels trip = {trip}></Hotels>
      {/* itineary  */}
      <PlacesToVisit trip = {trip}></PlacesToVisit>
      <Additional trip = {trip}></Additional>
      {/* footer */}
      <Footer trip = {trip}></Footer>
    </div>
  )
}

export default ViewTrip
