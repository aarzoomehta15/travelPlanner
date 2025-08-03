import { GoogleGenerativeAI } from "@google/generative-ai";

  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a good travel plan for the location Goa, India, duration of trip is 3 days and it's for a couple under a cheap budget : Give me a list of options for four hotels along with their address, pricing, image url, geo coordinates, rating and description. Along with that i want information about the basic itinerary , the locations that can be covered in this duration, place name, place details , place image url,its ratings, its coordinates  the cost of visiting or the ticket prices if any the places along with the best time to visit the location with each day plan spread among the duration. Provide all of it in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"trip_details\": {\n    \"location\": \"Goa, India\",\n    \"duration\": \"3 Days\",\n    \"travelers\": \"Couple\",\n    \"budget\": \"Cheap\"\n  },\n  \"accommodation_options\": [\n    {\n      \"name\": \"Backpacker Panda Goa\",\n      \"address\": \"House No. 769, Opposite St. Alex Church, Calangute - Anjuna Rd, Baga, Goa 403516, India\",\n      \"pricing\": {\n        \"per_night\": 500,\n        \"currency\": \"INR\"\n      },\n      \"image_url\": \"[https://example.com/backpackerpanda.jpg](https://example.com/backpackerpanda.jpg)\",\n      \"geo_coordinates\": {\n        \"latitude\": 15.5664,\n        \"longitude\": 73.7526\n      },\n      \"rating\": 4.2,\n      \"description\": \"A popular hostel with dorms and private rooms. Known for its social atmosphere and budget-friendly prices. Located near Baga Beach.\"\n    },\n    {\n      \"name\": \"Red Fox Hotel, Morjim, Goa\",\n      \"address\": \"Survey No. 215/1, Near Morjim Beach, Pernem, Morjim, Goa 403512, India\",\n      \"pricing\": {\n        \"per_night\": 1800,\n        \"currency\": \"INR\"\n      },\n      \"image_url\": \"[https://example.com/redfoxmorjim.jpg](https://example.com/redfoxmorjim.jpg)\",\n      \"geo_coordinates\": {\n        \"latitude\": 15.6471,\n        \"longitude\": 73.7411\n      },\
      \"rating\": 4.0,\n      \"description\": \"A decent hotel near Morjim beach. Offers a comfortable stay at a reasonable price.\"\n    },\n    {\n      \"name\": \"Casa Vagator\",\n      \"address\": \"House No. 593, Near Anjuna Petrol Pump, Anjuna, Goa 403509, India\",\n      \"pricing\": {\n        \"per_night\": 1200,\n        \"currency\": \"INR\"\n      },\
      \"image_url\": \"[https://example.com/casavagator.jpg](https://example.com/casavagator.jpg)\",\n      \"geo_coordinates\": {\n        \"latitude\": 15.5789,\n        \"longitude\": 73.7361\n      },\
      \"rating\": 4.3,\n      \"description\": \"A guest house offering clean and comfortable rooms close to Vagator and Anjuna beaches. A good budget-friendly option.\"\n    },\n    {\n      \"name\": \"Goa Hideout Hostel\",\n      \"address\": \"105, Vagator Beach Rd, Vagator, Goa 403509, India\",\n      \"pricing\": {\n        \"per_night\": 900,\n        \"currency\": \"INR\"\n      },\
      \"image_url\": \"[https://example.com/goahideout.jpg](https://example.com/goahideout.jpg)\",\n      \"geo_coordinates\": {\n        \"latitude\": 15.6033,\n        \"longitude\": 73.7414\n      },\
      \"rating\": 4.5,\n      \"description\": \"A popular hostel offering a relaxed vibe, with easy access to Vagator and Anjuna beaches. Ideal for budget travelers.\"\n    }\n  ],\
  \"itinerary\": {\n    \"day_1\": {\n      \"theme\": \"North Goa Beaches and Forts\",\n      \"plan\": [\n        {\n          \"place_name\": \"Baga Beach\",\n          \"place_details\": \"A popular and lively beach known for its shacks, water sports, and nightlife.\",\n          \"place_image_url\": \"[https://example.com/bagabeach.jpg](https://example.com/bagabeach.jpg)\",\n          \"ratings\": 4.1,\n          \"geo_coordinates\": {\n            \"latitude\": 15.5656,\n            \"longitude\": 73.7529\n          },\
          \"cost\": \"Free (Water sports extra)\",\n          \"best_time_to_visit\": \"Morning for fewer crowds, evening for nightlife.\",\n          \"time_slot\": \"Morning\"\n        },\n        {\n          \"place_name\": \"Calangute Beach\",\n          \"place_details\": \"The largest beach in North Goa, offering a variety of activities and shacks.\",\n          \"place_image_url\": \"[https://example.com/calangutebeach.jpg](https://example.com/calangutebeach.jpg)\",\n          \"ratings\": 3.9,\n          \"geo_coordinates\": {\n            \"latitude\": 15.5347,\n            \"longitude\": 73.7627\n          },\
          \"cost\": \"Free (Water sports extra)\",\n          \"best_time_to_visit\": \"Morning or late afternoon\",\n          \"time_slot\": \"Afternoon\"\n        },\n        {\n          \"place_name\": \"Fort Aguada\",\n          \"place_details\": \"A 17th-century Portuguese fort offering stunning views of the Arabian Sea.\",\n          \"place_image_url\": \"[https://example.com/fortaguada.jpg](https://example.com/fortaguada.jpg)\",\n          \"ratings\": 4.4,\n          \"geo_coordinates\": {\n            \"latitude\": 15.5042,\n            \"longitude\": 73.7806\n          },\
          \"cost\": \"Free\",\n          \"best_time_to_visit\": \"Late afternoon for sunset views.\",\n          \"time_slot\": \"Late Afternoon/Evening\"\n        }\n      ]\
      },\
      \"day_2\": {\n      \"theme\": \"South Goa Serenity and Culture\",\n      \"plan\": [\n        {\n          \"place_name\": \"Colva Beach\",\n          \"place_details\": \"A beautiful and relatively less crowded beach in South Goa.\",\n          \"place_image_url\": \"[https://example.com/colvabeach.jpg](https://example.com/colvabeach.jpg)\",\n          \"ratings\": 4.0,\n          \"geo_coordinates\": {\n            \"latitude\": 15.2881,\n            \"longitude\": 73.9526\n          },\
          \"cost\": \"Free\",\n          \"best_time_to_visit\": \"Morning for a peaceful experience.\",\n          \"time_slot\": \"Morning\"\n        },\n        {\n          \"place_name\": \"Basilica of Bom Jesus\",\n          \"place_details\": \"A UNESCO World Heritage Site, home to the relics of St. Francis Xavier.\",\n          \"place_image_url\": \"[https://example.com/basilica.jpg](https://example.com/basilica.jpg)\",\n          \"ratings\": 4.6,\n          \"geo_coordinates\": {\n            \"latitude\": 15.5000,\n            \"longitude\": 73.9000\n          },\
          \"cost\": \"Free\",\n          \"best_time_to_visit\": \"Anytime during the day\",\n          \"time_slot\": \"Afternoon\"\n        },\n        {\n          \"place_name\": \"Se Cathedral\",\n          \"place_details\": \"One of the largest churches in Asia, known for its impressive architecture.\",\n          \"place_image_url\": \"[https://example.com/secathedral.jpg](https://example.com/secathedral.jpg)\",\n          \"ratings\": 4.5,\n          \"geo_coordinates\": {\n            \"latitude\": 15.4972,\n            \"longitude\": 73.9000\n          },\
          \"cost\": \"Free\",\n          \"best_time_to_visit\": \"Anytime during the day.\",\n          \"time_slot\": \"Afternoon\"\n        }\n      ]\
      },\
      \"day_3\": {\n      \"theme\": \"Spice Plantation and Dudhsagar Falls (optional)\",\n      \"plan\": [\n        {\n          \"place_name\": \"Sahakari Spice Farm\",\n          \"place_details\": \"Learn about various spices and herbs, enjoy a traditional Goan lunch.\",\n          \"place_image_url\": \"[https://example.com/spicefarm.jpg](https://example.com/spicefarm.jpg)\",\n          \"ratings\": 4.3,\n          \"geo_coordinates\": {\n            \"latitude\": 15.4500,\n            \"longitude\": 74.1000\n          },\
          \"cost\": \"Entry fee + Lunch (approx. INR 700-1000 per person)\",\n          \"best_time_to_visit\": \"Morning or early afternoon.\",\n          \"time_slot\": \"Morning/Early Afternoon\"\n        },\n        {\n          \"place_name\": \"Dudhsagar Falls (Optional)\",\n          \"place_details\": \"One of India's tallest waterfalls. Requires a jeep safari to reach (can be expensive). Consider if budget allows.\",\n          \"place_image_url\": \"[https://example.com/dudhsagar.jpg](https://example.com/dudhsagar.jpg)\",\n          \"ratings\": 4.5,\n          \"geo_coordinates\": {\n            \"latitude\": 15.3167,\n            \"longitude\": 74.3167\n          },\
          \"cost\": \"Jeep Safari approx. INR 500-600 per person (plus entry fees)\",\n          \"best_time_to_visit\": \"Post-monsoon season (September-December) for best water flow.\",\n          \"time_slot\": \"Full Day (if chosen)\"\n        },\n        {\n          \"place_name\": \"Panjim Market\",\n          \"place_details\": \"A vibrant local market to buy souvenirs. Head here if dudhsagar is not preferred\",\n          \"place_image_url\": \"[https://example.com/panjimmarket.jpg](https://example.com/panjimmarket.jpg)\",\n          \"ratings\": 4.1,\n          \"geo_coordinates\": {\n            \"latitude\": 15.4955,\n            \"longitude\": 73.8278\n          },\
          \"cost\": \"Free\",\n          \"best_time_to_visit\": \"Afternoon/Evening.\",\n          \"time_slot\": \"Afternoon/Evening\"\n        }\n      ]\
      }\n  },\
      \"transportation\": {\n    \"options\": [\n      \"Scooter/Bike rental (Budget-friendly and convenient for exploring)\",\n      \"Local buses (Cheapest option, but can be crowded and time-consuming)\",\n      \"Taxis/Auto-rickshaws (More expensive, but readily available)\",\n      \"Rent a car (more expensive but suitable for Dudhsagar Falls visit)\"\n    ],\
      \"tips\": \"Negotiate fares with taxi/auto drivers beforehand.\"\n  },\
      \"food\": {\n    \"recommendations\": [\n      \"Try local Goan cuisine at beach shacks (seafood, vindaloo, xacuti).\",\n      \"Explore local restaurants for budget-friendly meals.\",\n      \"Avoid tourist traps for better prices.\",\n      \"Use google maps or zomato to find the best food with ratings\"\n    ],\
      \"budget_per_day\": {\n    \"per_person\": 500,\n    \"currency\": \"INR\"\n    }\n  },\
      \"important_notes\": [\n    \"Carry sufficient cash as many small establishments don't accept cards.\",\n    \"Bargain at markets and with vendors.\",\n    \"Stay hydrated, especially during hot weather.\",\n    \"Respect local customs and traditions.\",\n    \"Wear sunscreen and protective clothing to avoid sunburn.\",\n    \"Be aware of your surroundings and take precautions against petty theft.\",\n    \"Check visa requirements if you are an international traveler.\",\n    \"The above is a budget itinerary, prices may vary during peak season.\"\n  ]\
      }\n```"},
          ],
        },
      ],
    });