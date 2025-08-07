import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import axios from 'axios'
import UserTripCard from './components/UserTripCard'
import { getPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
import Header from '@/components/custom/Header'

const MyTrips = () => {
    const [loading, setLoading] = useState(true)
    const [userTrips, setUserTrips] = useState([])
    const navigate = useNavigate()
    

    const getPhotosForTrips = async (trips) => {
        const updatedTrips = await Promise.all(
            trips.map(async (trip) => {
                try {
                    const placeName = trip.tripData?.trip_details?.location;
                    if (!placeName) return { ...trip, photoUrl: '/placeholder.jpg' };
                    
                    const result = await getPlaceDetails({textQuery: placeName});
                    const photo = result?.places?.[0]?.photos?.[0]; // Get the first photo
                    let photoUrl = '/placeholder.jpg';
                    if (photo) {
                        photoUrl = PHOTO_REF_URL.replace('{photoResourceName}', photo.name);
                    }
                    return { ...trip, photoUrl };
                } catch (error) {
                    console.error("Error fetching photo for trip:", trip.docId, error.message);
                    return { ...trip, photoUrl: '/placeholder.jpg' };
                }
            })
        );
        setUserTrips(updatedTrips);
    }

    const getUserTrips = async() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(!user || !user.email){
            navigate('/')
            return
        }    
        try{
            const response = await axios.get(`http://localhost:5000/api/trips/user/${user.email}`)
            setUserTrips([])

            const trips = response.data.map(trip => {
                try {
                    trip.tripData = JSON.parse(trip.tripData);
                } catch (e) {
                    console.error("Failed to parse tripData for docId:", trip.docId, e.message)
                    trip.tripData = null; // Set to null to prevent further errors
                }
                return trip;
            });
            setUserTrips(trips);
            setLoading(false)
            getPhotosForTrips(trips);
        }
        catch(error){
            console.error('Error fetching user trips:' ,error.message)
            setLoading(false)
        }
    }


    useEffect(() => {
        getUserTrips()
    }, [navigate])

  return (
    <>
    <Header></Header>
    <div className='sm:px-10 md:px-28 lg:px-56 xl:px-10 px-5'>
      <h2 className='font-bold text-3xl'>My Trips</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
        
        {loading? (
            [1,2,3,4,5,6].map((item, ind) => (
                <div key={ind} className='h-[300px] w-[300px] bg-slate-400 animate-pulse rounded-xl'></div>
            ))
        ): userTrips.length > 0 ? (
            userTrips.map((trip) => (
                <UserTripCard key={trip.docId} trip={trip}></UserTripCard>
            ))):
            (
                <div className='font-bold text-2xl'>No trips found!!</div>
            )
        }
      </div>
    </div>
    </>
  )
}

export default MyTrips