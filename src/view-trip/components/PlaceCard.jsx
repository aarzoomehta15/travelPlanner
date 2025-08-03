
import React , { useEffect , useState} from 'react'
import { getPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'

const PlaceCard = ({place}) => {
    const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg')

    useEffect(() => {
      place && getPlacePhoto()
    }, [place])

    const getPlacePhoto = async() => {
            const address = place.place_name 
                
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

    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${place.geo_coordinates?.latitude},${place.geo_coordinates?.longitude}`;
  return (
    <a href = {mapUrl} target="_blank" rel="noopener noreferrer" className="no-underline text-black hover:text-blue-600 transition-colors">
    <div className = 'border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>

      <img src= {photoUrl}
      className = 'w-[150px] h-[150px] rounded-xl object-cover' ></img>

      <div>
        <h2 className = 'font-bold text-lg'>{place.place_name}</h2>
        <p className = 'text-sm text-gray-500'>{place.place_details} (Ratings: ⭐{place.ratings})</p>
        <h3 className='text-sm mt-2'>🕰️Best time to visit {place.best_time_to_visit}</h3>
        <p className='text-sm'>💰{place.cost}</p>

        {/* <Button className= 'w-10 h-10'><FaMapLocationDot /></Button> */}
      </div>
    </div>
    </a>
  )
}

export default PlaceCard
