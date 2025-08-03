import React, { useEffect , useState} from 'react'
import { getPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'

const HotelCard = ({hotel, mapUrl}) => {

    const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg')

    useEffect(() => {
            hotel && getPlacePhoto()
        }, [hotel])
        
    const getPlacePhoto = async() => {
        const address = hotel?.name
            
        if (!address) {
            setPhotoUrl('/placeholder.jpg');
            return
        }
    
        try {
            const result = await getPlaceDetails({textQuery : address})
        
            const photo = result?.places?.[0]?.photos?.[1]
                
            if (photo) {
                const newPhotoUrl = PHOTO_REF_URL.replace('{photoResourceName}', photo.name)
                setPhotoUrl(newPhotoUrl)
                console.log('Successfully set photo URL:', newPhotoUrl)
            } else {
                setPhotoUrl('/placeholder.jpg')
                console.log("No photo found, using placeholder.")
            }
        } catch (error) {
            console.error("Error fetching photo from Google:", error.response?.data || error.message)
            setPhotoUrl('/placeholder.jpg'); 
        }
    }

  return (
    <div>
        <a href={mapUrl} target='_blank' rel="noopener noreferrer">
            <div className='hover:scale-105 transition-all'>
                <img src={photoUrl} className='rounded-lg h-[180px] w-full object-cover'></img>
                <div className='my-3 flex flex-col gap-1.5'>
                    <h2 className='font-medium'>
                        {hotel?.name}
                    </h2>

                    <h2 className='text-xs text-gray-600'>
                        📍{hotel?.address}
                    </h2>

                    <h2 className='text-sm'>
                        {hotel.pricing?.per_night} {hotel?.pricing?.currency} Per night
                    </h2>

                    <h2 className='text-sm'>
                        ⭐{hotel?.rating} Stars Rating
                    </h2>
                </div>
            </div>
        </a>
    </div>
  )
}

export default HotelCard
