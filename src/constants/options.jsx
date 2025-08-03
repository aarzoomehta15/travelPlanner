export const SelectTravellers = [
    {
        id:1,
        title:'Just Me',
        desc:'A solo adventurer on a personal journey.',
        icon:'✈️',
        people:'1'
    },
    {
        id:2,
        title:'Couple',
        desc:'Two hearts exploring the world together.',
        icon:'❤️',
        people:'2'
    },
    {
        id:3,
        title:'Family',
        desc:'Cherished moments with your loved ones.',
        icon:'🏡',
        people:'3 to 5'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekers ready for fun.',
        icon:'🌟',
        people:'5 to 10'
    }
]

export const SelectBudget = [
    {
        id:1,
        title:'Cheap',
        desc:'Affordable and practical.',
        icon:'🪙'
    },
    {
        id:2,
        title:'Moderate',
        desc:'Balanced and comfy.',
        icon:'💰'
    },
    {
        id:3,
        title:'Luxury',
        desc:'Premium and lavish.',
        icon:'💎'
    }
]

export const AI_prompt = "Generate a good travel plan for the location : {location}, duration of trip is {totalDays} days and it's for {travellers} people under a {budget} budget : Give me a list of options for hotels along with their address, pricing, image url, geo coordinates, rating and description. Along with that i want information about the basic itinerary , the locations that can be covered in this duration, place name, place details , place image url,its ratings, its coordinates  the cost of visiting or the ticket prices if any the places along with the best time to visit the location with each day plan spread among the duration. Provide all of it in JSON format"