// src/service/GlobalApi.jsx
import axios from 'axios';

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';

const config = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        // --- FIX 1: Change the FieldMask to a comma-separated string ---
        'X-Goog-FieldMask': 'places.photos,places.displayName,places.id'
    }
};

// --- FIX 2: Add `async` to the function ---
export const getPlaceDetails = async (data) => {
    try {
        const response = await axios.post(BASE_URL, data, config);
        return response.data;
    } catch (error) {
        console.error("Error in getPlaceDetails:", error.response?.data || error.message);
        return null;
    }
};

export const PHOTO_REF_URL = `https://places.googleapis.com/v1/{photoResourceName}/media?key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}&maxWidthPx=1000&maxHeightPx=1000`