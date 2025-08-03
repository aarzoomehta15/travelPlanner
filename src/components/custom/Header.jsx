import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google'
import {
  Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios'

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [openDialog , setOpenDialog] = useState(false)

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
        window.location.reload()
        //re-run trip generation
      })
  }
  
  useEffect(() => {
    console.log(user)
  })
  return (
    <div className='p-2 shadow-sm flex justify-between items-center px-5'>
      <img src='/logo.png' className='h-[50px]'></img>
      <div>
        {user?
          <div className='flex items-center gap-3'>

            <a href='/create-trip'>
              <Button variant='outline' className='rounded-full'>Create Trip</Button>
            </a>

            <a href='/my-trips'>
              <Button variant='outline' className='rounded-full'>My Trips</Button>
            </a>

            <Popover>
              <PopoverTrigger><img src = {user?.picture} className='h-[35px] w-[35px] rounded-full'></img></PopoverTrigger>
                <PopoverContent>
                  <h2 onClick={() => {
                    googleLogout()
                    localStorage.clear()
                    window.location.reload()
                  }} className='cursor-pointer'>LogOut</h2>
                </PopoverContent>
            </Popover>

          </div>
          :
          <Button onClick ={login}>Sign in</Button>
                }
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
  )
}

export default Header