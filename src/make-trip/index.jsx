import { Geocoder } from '@mapbox/search-js-react';
import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import { AI_prompt, SelectBudget, SelectTravellers } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/AImodel';
import {
  Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router';


const CreateTrip = () => {
  //react version of link - to
  const navigate = useNavigate()
  //to store selected location from mapbox
  const [place, setPlace] = useState(null);

  //whether login popup is shown or not 
  const [openDialog , setOpenDialog] = useState(false);

  const[loading, setloading] = useState(false);

  const handleRetrieve = (result) => {
    setPlace(result);
    handleInput('location',result);
  } 

  const[formData, setFormData] = useState([]);

  const handleInput = (name,value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]:value
    }))
  }

  //has await hence made async
  const onGenerate =async() => { 

    const user = localStorage.getItem('user');

    if(!user){
      console.log('no user found');
      setOpenDialog(true)
      return;
    }

    if(formData?.noOfDays > 20){
      toast('Number of days must be less than 15')
      return;
    }
    if(!formData?.noOfDays || !formData?.location || !formData?.budget || !formData?.travellers){
      toast('Please fill all details :)')
    }

    setloading(true)
    const FINAL_PROMPT = AI_prompt
    .replace('{location}', formData?.location?.properties?.full_address)
    .replace('{totalDays}', formData?.noOfDays)
    .replace('{travellers}', formData?.travellers)
    .replace('{budget}', formData?.budget)

    //console.log(FINAL_PROMPT)

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result?.response?.text());
    setloading(false)
    saveTrip(result?.response.text())
  }

  //we need the result from the chat session
  const saveTrip = async(tripData) => {
    setloading(true)
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();

    if(!user || !user.email){
      console.log('user not logged in or email missing')
      toast('User information missing. Please log in again :) ')
      setloading(false)
      return;
    }

    try{
      const response = await axios.post('http://localhost:5000/api/trips', {
        userSelection: formData,
        tripData: tripData,
        userEmail : user.email,
        docId: docId
      })
      console.log('Trip saved successfully: ', response.data)
      toast('Trip saved successfully :)')
    }
    catch(error){
      console.log('Error saving trip: ',error.response ? error.response.data : error.message)
      toast('Failed to save trip, try again')
    }
    finally{
      setloading(false)
    }
    navigate('/view-trip/'+docId)
  }

  useEffect(() => {
    console.log(formData);
  },[formData])
  //everytme form data changes it is console.log to console

  const login=useGoogleLogin({
    onSuccess:(codeResp)=>getUserProfile(codeResp),
    onError:(error)=>console.log(error) 
  })

  const getUserProfile=(tokenInfo)=>{
    console.log("token info", tokenInfo)
    console.log("Access token: ",tokenInfo?.access_token)
    if(!tokenInfo?.access_token){
      console.error("Access token is missing");
      return;
    }

    //api to fetch data 
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
      {
        headers:{
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'Application/json'
        }
      }).then((resp)=>{
        console.log(resp);
        localStorage.setItem('user',JSON.stringify(resp.data))
        //stores users profile even after page is reloaded 
        setOpenDialog(false)
        onGenerate();
        //re-run trip generation
      })
      //promise 
  }

  return ( 
    <div className="sm:px-10 md:px-28 lg:px-56 xl:px-10 px-5">
      <h2 className="font-extrabold text-3xl text-[#718355]">
        Tell us about your travel preferences 🌍🌴
      </h2>
      <p className="mt-4 text-xl text-[#4e5743]">
        Share your interests, budget, and preferred destinations, so we can create the perfect itinerary for you!
      </p>

      <div className="mt-20 flex flex-col gap-8">
        <div>
        <h3 className="text-xl my-3 font-medium">What's your preferred destination?</h3>

    {/* search box */}
    <Geocoder options={{
        proximity: {
          lng: -122.431297,
          lat: 37.773972,
        },
      }}
      place={place}
      accessToken='pk.eyJ1IjoiYWFyem9vbWVodGEiLCJhIjoiY201aDA0aG02MGYwdDJoc2RvcTc4NjkzYyJ9.cNmi48FISxRiGUl8m5vPpQ'
      onRetrieve={handleRetrieve}     
    >
    </Geocoder>
      </div>

      <div>
      <h3 className="text-xl my-3 font-medium">How long are you planning to travel?</h3>
      <Input placeholder={'Ex.3'} type="number" className="shadow-md" onChange={(e) => handleInput('noOfDays',e.target.value)}>
      </Input>
      </div>

      <div>
      <h3 className="text-xl my-3 font-medium">What is your budget?</h3>
      <div className='grid grid-cols-3 gap-5 mt-5'>
        {SelectBudget.map((item,index)=>(
         <div key={index} 
         onClick={() => handleInput('budget',item.title)}
         className={`p-4 border rounded-lg hover:shadow-md cursor-pointer ${formData?.budget == item.title ? 'shadow-lg border-black' : ''}`}>
          {/* added conditonal css */}
            <h2 className='text-3xl'>{item.icon}</h2>
            <h2 className='font-bold text-md'>{item.title}</h2>
            <h2 className='text-sm text-[#4e5743]'>{item.desc}</h2>
         </div>
        ))}
      </div>
      </div>

      <div>
      <h3 className="text-xl my-3 font-medium">Who do you plan on travelling with?</h3>
      <div className='grid grid-cols-3 gap-5 mt-5'>
        {SelectTravellers.map((item,index)=>(
         <div key={index}
         onClick={() => handleInput('travellers',item.people)}
          className={`p-4 border rounded-lg hover:shadow-md cursor-pointer ${formData?.travellers == item.people ? 'shadow-lg border-black' : ''}`}>
            <h2 className='text-3xl'>{item.icon}</h2>
            <h2 className='font-bold text-md'>{item.title}</h2>
            <h2 className='text-sm text-[#4e5743]'>{item.desc}</h2>
         </div>
        ))}
      </div>
      </div>
      
      <div className='my-10 flex justify-end'>
      <Button disabled = {loading} onClick={onGenerate}>
        {loading ? 
        <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin '/>:
          'Generate Trip'
        }
        </Button>
      </div>

      <Dialog open={openDialog}>

        <DialogContent>
          <DialogTitle>Sign in required</DialogTitle>
          <DialogHeader>
            <DialogDescription>
              <img src='/logo.svg'></img>
              <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
              <p>Sign in to the app with Google Authentication securely</p>

              <Button
              onClick={login}
              className='mt-5 w-full flex gap-4 items-center'>         
              <FcGoogle/>
                Sign in with Google
                </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      </div>
    </div>
  );
};

export default CreateTrip;