import React, { useEffect , useState} from 'react'
import { Button } from '@/components/ui/button'
import { IoIosSend } from "react-icons/io"
import { getPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'


const InfoSection = ({trip}) => {
    const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg')

    useEffect(() => {
        trip && getPlacePhoto()
    }, [trip])
    
    const getPlacePhoto = async() => {
        const address = trip?.userSelection?.location?.properties?.full_address;
        
        if (!address) {
            setPhotoUrl('/placeholder.jpg');
            return;
        }

        try {
            const result = await getPlaceDetails({textQuery : address});
            
            const photo = result?.places?.[0]?.photos?.[2]; 
            
            if (photo) {
                const newPhotoUrl = PHOTO_REF_URL.replace('{photoResourceName}', photo.name);
                setPhotoUrl(newPhotoUrl);
                console.log('Successfully set photo URL:', newPhotoUrl);
            } else {
                setPhotoUrl('/placeholder.jpg'); 
                console.log("No photo found, using placeholder.");
            }
        } catch (error) {
            console.error("Error fetching photo from Google:", error.response?.data || error.message);
            setPhotoUrl('/placeholder.jpg'); 
        }
    }
  return (
    <div>
        <img src = {photoUrl} className='h-[340px] w-full object-cover rounded'></img>

        <div className='flex justify-between items-center'>
            <div className = 'my-5 flex flex-col gap-2'>
                <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.properties?.full_address}</h2>
                <div className= 'flex gap-5'>
                    <h2 className = 'p1 px-3 bg-gray-200 rounded-full text-gray-800 sm:text-sm md:text-lg'>
                        {trip.userSelection?.noOfDays} Days
                    </h2>

                    <h2 className = 'p1 px-3 bg-gray-200 rounded-full text-gray-800 sm:text-sm md:text-lg'>
                        {trip.userSelection?.budget} Budget
                    </h2>

                    <h2 className = 'p1 px-3 bg-gray-200 rounded-full text-gray-800 sm:text-sm md:text-lg'>
                        {trip.userSelection?.travellers} Travellers
                    </h2>
                </div>
            </div>
            <Button><IoIosSend /></Button>
        </div>
    </div>
  )
}

export default InfoSection
