import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './make-trip'
import Header from './components/custom/Header'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from './view-trip/[tripId]';
import MyTrips from './my-trips'

//different pages 
const router = createBrowserRouter([
  {
    path:'/',
    element:<App></App>
  },
  {
    path:'/create-trip',
    element:<CreateTrip></CreateTrip>
  },
  {
    path: '/view-trip/:tripId',
    element: <ViewTrip></ViewTrip>
  },
  {
    path: '/my-trips',
    element: <MyTrips></MyTrips>
  }
])

//looking for an html elt with id root -> root is an empty div in html which then is filled in by root 
//createRoot is an official react api function
//take control of this dom and manage it 
//it enables concurrent rendering -> read in gpt 
createRoot(document.getElementById('root')).render(
  
    <React.StrictMode>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
        <Header></Header>
        <Toaster></Toaster>
        <RouterProvider router = {router}/>
      </GoogleOAuthProvider>
    </React.StrictMode>
  
)
