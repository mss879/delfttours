export type TourDetail = {
  id: string;
  title: string;
  description: string;
  images: string[];
  days: { title: string; description: string }[];
  inclusions: string[];
  mapImage?: string;
  destination?: string;
  themes?: string[];
  activities?: string[];
  startingPrice?: string;
};

// Tour data source
export const tourDetails: TourDetail[] = [
  {
    "id": "SL-3D2N-CTY-01",
    "title": "3 Day Quick Tour of 2 Cities",
    "startingPrice": "$290",
    "description": "Duration: 3 days / 2 nights\nType: Private escorted tour\nSuitable For: Short stays, add ons, couples, families, transit guests",
    "days": [
      {
        "title": "Day 1: Arrival / Kandy \u2013 The Cultural Heart",
        "description": "\u2022 Meet & greet at Bandaranaike International Airport\n\u2022 Scenic drive through lush hill country to Kandy (approx. 3 hrs)\n\u2022 En-route stops at Pinnawala Elephant Orphanage (optional) or local spice gardens\n\u2022 Afternoon city tour of Kandy:\n\u2022 Visit the Temple of the Sacred Tooth Relic (UNESCO)\n\u2022 Walk around Kandy Lake and explore the Bazaar and Gem Museum\n\u2022 Evening: enjoy a Traditional Cultural Dance Show\n\u2022 Overnight in Kandy (Standard \u2013 Senani Hotel 4\u2605 / Deluxe \u2013 Oak Ray Regency 5\u2605)"
      },

      {
        "title": "Day 2: Kandy \u2192 Colombo \u2013 The Vibrant Coastal Capital",
        "description": "\u2022 Breakfast at hotel and morning visit to Royal Botanical Gardens \u2013 Peradeniya\n\u2022 Stop at Giragama Tea Factory for a tea experience and tasting\n\u2022 Depart for Colombo (approx. 3 hrs)\n\u2022 Afternoon city tour:\n\u2022 Galle Face Green Promenade\n\u2022 Gangaramaya Temple and Viharamahadevi Park\n\u2022 Independence Square, Red Mosque, and Lotus Tower view\n\u2022 Leisure or shopping at Colombo City Centre / One Galle Face Mall\n\u2022 Overnight in Colombo (Standard \u2013 Cinnamon Red 4\u2605 / Deluxe \u2013 Cinnamon Grand 5\u2605)"
      },

      {
        "title": "Day 3: Departure",
        "description": "\u2022 Breakfast and leisure until transfer to the airport for onward flight"
      },

    ],
    "inclusions": [
      "Private Driver/Guide",
      "Private Superior Car",
      "Half Board (Breakfast & Dinner)",
      "Airport Drop-off",
      "Airport Pick-up",
      "Tour Consultant",
    ],
    "mapImage": "3 Day Quick Tour of 2 Cities Glimpse of Lanka the Paradise Isle.png",
    "images": [
      "/package_images/SL-3D2N-CTY-01.jpg",
    ],
    "themes": ["Beach & Relax", "Wildlife & Nature", "Honeymoon", "Culture & Heritage", "Hill Country"],
    "activities": ["Cultural Show", "City Tour", "Tea Factory Visit", "Cooking Class"],
  },

  {
    "id": "SL-4D3N-STD-01",
    "title": "Essence of Sri Lanka (4 days)",
    "startingPrice": "$450",
    "description": "Duration: 4 days / 3 nights\nType: Private escorted tour\nSuitable For: Families, couples, and friends",
    "days": [
      {
        "title": "Day 1: Arrival - Kandy, The Cultural Heart",
        "description": "\u2022 Meet and greet on arrival, then travel to Kandy\n\u2022 Visit Pinnawala Elephant Orphanage and enjoy time observing and feeding\n\u2022 the elephants\n\u2022 Explore the sacred Temple of the Tooth Relic, Kandy\u2019s most iconic landmark\n\u2022 Stroll through the Royal Botanical Gardens and enjoy the calm, leafy\n\u2022 surroundings\n\u2022 Visit a spice village to learn about famous Ceylon spices and local remedies\n\u2022 Watch traditional handicrafts and batik making\n\u2022 Learn about Sri Lanka\u2019s renowned gemstones and craftsmanship\n\u2022 If time permits, enjoy a traditional cultural dance show\n\u2022 Dinner and overnight stay in Kandy"
      },

      {
        "title": "Day 2: Kandy to Nuwara Eliya - Little England in the Hills",
        "description": "\u2022 After breakfast, proceed to Nuwara Eliya\n\u2022 Optional scenic train ride from Kandy to Nuwara Eliya\n\u2022 En route, visit the Shri Bhakta Hanuman Hindu Temple near Ramboda\n\u2022 Stop at the beautiful Ramboda Waterfall for photos\n\u2022 Visit a tea garden and learn about Sri Lanka\u2019s world-famous Ceylon tea\n\u2022 Visit Seetha Amman Hindu Kovil\n\u2022 Enjoy a peaceful walk at Gregory Park and admire Lake Gregory at sunset\n\u2022 Experience a classic high tea at the Grand Hotel\n\u2022 Dinner and overnight stay in Nuwara Eliya"
      },

      {
        "title": "Day 3: Nuwara Eliya to Bentota - Beach, Nature, and",
        "description": "\u2022 River Safari\n\u2022 After breakfast at the hotel, travel to Bentota\n\u2022 Visit Lunuganga Estate, the stunning country home of world-famous architect\n\u2022 Geoffrey Bawa\n\u2022 Enjoy Bentota\u2019s exciting water sports (optional): jet ski, banana boat, tube ride,\n\u2022 diving, snorkeling, and deep-sea fishing\n\u2022 Stop at the Kosgoda Turtle Hatchery to learn about Sri Lanka\u2019s sea turtle\n\u2022 conservation\n\u2022 Take a scenic boat safari on the Madu River, gliding through beautiful\n\u2022 mangrove forests\n\u2022 Visit a fish farm on the river and, if you like, try the popular Sri Lankan fish\n\u2022 therapy\n\u2022 Explore the Moonstone mines and see how this unique gemstone is mined and\n\u2022 processed\n\u2022 Take a relaxing walk along the beach and enjoy a breathtaking sunset\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 4: Bentota to Colombo - City Highlights and",
        "description": "\u2022 Shopping\n\u2022 After breakfast at the hotel, proceed to Colombo\n\u2022 Visit the Gangaramaya Buddhist Temple and admire its unique blend of\n\u2022 modern design and cultural heritage\n\u2022 Enjoy a relaxing walk in a city park such as Green Path or Viharamahadevi\n\u2022 Park, with local artwork displayed along the roads\n\u2022 Explore the lively Colombo Fort area, including the bustling bazaar, the Red\n\u2022 Mosque, and the Dutch Museum\n\u2022 Stop at popular local hangout spots like Independence Square and the Arcade\n\u2022 at Independence Square\n\u2022 Visit the famous beachfront park Galle Face Green and view the Old\n\u2022 Parliament building nearby\n\u2022 Sri with\n\u2022 Continue   Lanka\n\u2022 shopping at top local spots such as ODEL, Noritake, House of\n\u2022 Fashion, Ceylon Tea Shops, and Sri Lankan handicraft stores\n\u2022 In the evening, enjoy Colombo\u2019s nightlife with optional visits to local pubs,\n\u2022 clubs, and casinos"
      },

    ],
    "inclusions": [
      "Private Driver/Guide",
      "Private Superior Car",
      "Half Board (Breakfast & Dinner)",
      "Airport Drop-off",
      "Airport Pick-up",
      "Tour Consultant",
    ],
    "mapImage": "Sri Lanka 3 Nights 4 Days essenve of sri lanka.png",
    "images": [
      "/package_images/SL-4D3N-STD-01.jpg",
    ],
    "themes": ["Beach & Relax", "Wildlife & Nature", "Honeymoon", "Culture & Heritage", "Hill Country"],
    "activities": ["City Tour", "Snorkeling/Diving", "Train Ride", "Cultural Show", "Safari", "Boat Ride"],
  },

  {
    "id": "SL-5D4N-STD-01",
    "title": "Essence of Sri Lanka (5 days)",
    "startingPrice": "$800",
    "description": "Duration: 5 days / 4 nights\nType: Private escorted tour\nSuitable For: Families, couples, and friends",
    "days": [
      {
        "title": "Day 1: Arrival - Kandy, The Cultural Heart",
        "description": "\u2022 Meet and greet on arrival, then proceed to Kandy\n\u2022 Visit Pinnawala Elephant Orphanage and enjoy time with the elephants\n\u2022 Explore the Temple of the Tooth Relic, Kandy\u2019s most iconic landmark\n\u2022 Walk through the Royal Botanical Gardens and enjoy the peaceful greenery\n\u2022 Experience a spice village tour and learn about famous Ceylon spices\n\u2022 See how Sri Lankan handicrafts and batik are made\n\u2022 Learn about Sri Lanka\u2019s famous gemstones and craftsmanship\n\u2022 If time permits, enjoy a traditional cultural dance show\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 2: Kandy to Nuwara Eliya - Little England in the Hills",
        "description": "\u2022 After breakfast, proceed to Nuwara Eliya\n\u2022 Optional scenic train ride from Kandy to Nuwara Eliya\n\u2022 En route near Ramboda, visit Shri Bhakta Hanuman Hindu Temple\n\u2022 Stop at Ramboda Waterfall for photos\n\u2022 Visit Labukale Tea Garden and learn about Ceylon tea\n\u2022 Visit Seetha Amman Hindu Kovil\n\u2022 Take a calm walk through Gregory Park and enjoy sunset by Lake Gregory\n\u2022 Enjoy a classic high tea experience at the Grand Hotel\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 3: Nuwara Eliya to Bentota - Beach, Nature, and",
        "description": "\u2022 River Safari\n\u2022 After breakfast, proceed to Bentota\n\u2022 Visit Lunuganga Estate, Geoffrey Bawa\u2019s famous country home\n\u2022 Optional water sports in Bentota: jet ski, banana boat, tube rides, diving,\n\u2022 snorkeling, deep-sea fishing\n\u2022 Visit the Kosgoda Turtle Hatchery and learn about sea turtle conservation\n\u2022 Enjoy a scenic Madu River boat safari through mangrove forests\n\u2022 Stop at a fish farm and, if you like, try Sri Lankan fish therapy\n\u2022 Visit Moonstone mines and see how this gem is mined\n\u2022 Relax with a beach stroll and enjoy a beautiful sunset\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 4: Bentota to Colombo - City Highlights and",
        "description": "\u2022 Shopping\n\u2022 After breakfast, proceed to Colombo\n\u2022 Visit Gangaramaya Temple and admire its cultural and modern blend\n\u2022 Walk through Green Path or Viharamahadevi Park and view local art displays\n\u2022 Explore Colombo Fort, including the bazaar, Red Mosque, and Dutch Museum\n\u2022 Stop at Independence Square and the Arcade at Independence Square\n\u2022 Visit Galle Face Green and view the Old Parliament building\n\u2022 Enjoy shopping at popular spots such as ODEL, Noritake, House of Fashion, tea\n\u2022 shops, and handicraft stores\n\u2022 In the evening, optional visits to pubs, clubs, and casinos\n\u2022 Overnight stay in Colombo"
      },

      {
        "title": "Day 5: Departure - Airport Drop-off",
        "description": "\u2022 After breakfast, enjoy free time depending on your flight schedule\n\u2022 Transfer to the airport for departure with a comfortable private drop-off"
      },

    ],
    "inclusions": [
      "Private Driver/Guide",
      "Private Superior Car",
      "Half Board (Breakfast & Dinner)",
      "Airport Drop-off",
      "Airport Pick-up",
      "Tour Consultant",
    ],
    "mapImage": "5 day taste of paradise.png",
    "images": [
      "/package_images/SL-5D4N-STD-01.jpg",
    ],
    "themes": ["Beach & Relax", "Wildlife & Nature", "Honeymoon", "Culture & Heritage", "Hill Country"],
    "activities": ["City Tour", "Snorkeling/Diving", "Train Ride", "Cultural Show", "Safari", "Boat Ride"],
  },

  {
    "id": "SL-5D4N-STD-02",
    "title": "Island Escape (5 days)",
    "startingPrice": "$585",
    "description": "Duration: 5 days / 4 nights\nType: Private escorted tour\nSuitable For: Families",
    "days": [
      {
        "title": "Day 1: Arrival - Sigiriya, The Ancient Kingdom Region",
        "description": "\u2022 Warm welcome at the airport\n\u2022 Private transfer to Sigiriya\n\u2022 Visit the Dambulla Cave Temple\n\u2022 Check in and relax for the evening\n\u2022 Overnight stay in Sigiriya area"
      },

      {
        "title": "Day 2: Sigiriya - Fortress and Wildlife",
        "description": "\u2022 After breakfast, head out to explore Sigiriya\n\u2022 Climb the Sigiriya Rock Fortress and enjoy breathtaking views\n\u2022 Optional Minneriya jeep safari to spot wild elephants and other wildlife\n\u2022 Return to the hotel and unwind\n\u2022 Overnight stay in Sigiriya area"
      },

      {
        "title": "Day 3: Sigiriya to Kandy - The Cultural Capital",
        "description": "\u2022 After breakfast, proceed to Kandy\n\u2022 Enjoy a Kandy city tour and explore local highlights\n\u2022 Visit the sacred Temple of the Tooth Relic\n\u2022 Evening at leisure\n\u2022 Overnight stay in Kandy"
      },

      {
        "title": "Day 4: Kandy to Bentota - Coast and River Experiences",
        "description": "\u2022 After breakfast, proceed towards the southern coast\n\u2022 Visit the Royal Botanical Garden\n\u2022 Stop at Giragama Tea Factory for a tea experience\n\u2022 Enjoy a scenic Madu River boat safari through mangroves\n\u2022 Arrive in Bentota and relax by the beach\n\u2022 Overnight stay in Bentota"
      },

      {
        "title": "Day 5: Departure - Airport Drop-off",
        "description": "\u2022 After breakfast, free time depending on your flight schedule\n\u2022 Private transfer for airport drop-off and departure"
      },

    ],
    "inclusions": [
      "Private Driver/Guide",
      "Private Superior Car",
      "Half Board (Breakfast & Dinner)",
      "Airport Drop-off",
      "Airport Pick-up",
      "Tour Consultant",
    ],
    "images": [
      "/package_images/SL-5D4N-STD-02.jpg",
    ],
    "themes": ["Beach & Relax", "Culture & Heritage", "Hill Country", "Wildlife & Nature"],
    "activities": ["City Tour", "Tea Factory Visit", "Boat Ride", "Safari"],
  },

  {
    "id": "SL-5D4N-WLD-03",
    "title": "Temples, Wildlife and Beach (5 days)",
    "startingPrice": "$800",
    "description": "Duration: 5 days / 4 nights\nType: Private escorted tour\nSuitable For: Families",
    "days": [
      {
        "title": "Day 1: Arrival - Kandy",
        "description": "\u2022 Welcome at the airport\n\u2022 Transfer to Kandy\n\u2022 Enjoy a city tour in Kandy\n\u2022 Visit the Temple of the Tooth Relic\n\u2022 Overnight stay in Kandy"
      },

      {
        "title": "Day 2: Kandy to Nuwara Eliya - Hill Country Escape",
        "description": "\u2022 Visit the Royal Botanic Garden\n\u2022 Experience tea plucking\n\u2022 Visit a tea factory\n\u2022 Visit Ramboda Waterfall\n\u2022 Continue to Nuwara Eliya\n\u2022 Overnight stay in Nuwara Eliya"
      },

      {
        "title": "Day 3: Nuwara Eliya to Udawalawa - Scenic Drive and Hill",
        "description": "\u2022 Highlights\n\u2022 Visit Seetha Amman Temple\n\u2022 Visit Ella\n\u2022 Optional visit to the Elephant Transit Home\n\u2022 Proceed to Udawalawa\n\u2022 Overnight stay in Udawalawa"
      },

      {
        "title": "Day 4: Udawalawa to Galle - Wildlife and Fort Walk",
        "description": "\u2022 Jeep safari at Udawalawa National Park\n\u2022 Proceed towards the south coast\n\u2022 Walk inside Galle Fort\n\u2022 Overnight stay on the south coast (Galle area)"
      },

      {
        "title": "Day 5: Bentota Coast to Colombo - River Safari and City",
        "description": "\u2022 Madu River boat safari\n\u2022 Transfer to Colombo\n\u2022 Enjoy a city tour of Colombo\n\u2022 Drop-off as per your departure plan"
      },

    ],
    "inclusions": [
      "Private Driver/Guide",
      "Private Superior Car",
      "Half Board (Breakfast & Dinner)",
      "Airport Drop-off",
      "Airport Pick-up",
      "Tour Consultant",
    ],
    "images": [
      "/package_images/SL-5D4N-WLD-03.jpg",
    ],
    "themes": ["Beach & Relax", "Culture & Heritage", "Hill Country", "Wildlife & Nature"],
    "activities": ["City Tour", "Train Ride", "Tea Factory Visit", "Safari", "Boat Ride"],
  },

  {
    "id": "SL-5D4N-BCH-04",
    "title": "Taste of Paradise (5 days)",
    "startingPrice": "$750",
    "description": "Duration: 5 days / 4 nights\nType: Private escorted tour\nSuitable For: Families, couples, and friends",
    "days": [
      {
        "title": "Day 1: Arrival - Sigiriya",
        "description": "\u2022 Arrival and assistance at the airport\n\u2022 Proceed to Sigiriya in a private air-conditioned vehicle\n\u2022 En route, visit Pinnawala Elephant Orphanage\n\u2022 Climb the iconic Sigiriya Rock Fortress\n\u2022 Walk around the village to experience Sri Lankan village life and culture\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 2: Sigiriya to Trincomalee - Beach and Ocean",
        "description": "\u2022 Adventures\n\u2022 After breakfast, proceed to Trincomalee\n\u2022 Visit the historic Fedrik Fort built by Portuguese invaders\n\u2022 Visit Pigeon Island National Park\n\u2022 Enjoy snorkeling and diving among coral reefs, reef fish, and turtles\n\u2022 Whale watching experience to see whales up close (seasonal)\n\u2022 Visit Koneswaram Kovil, an ancient Hindu temple with stunning views\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 3: Trincomalee to Kandy - Heritage and Culture",
        "description": "\u2022 After breakfast, proceed to Kandy\n\u2022 En route, visit the Dambulla Cave Temple (UNESCO World Heritage Site)\n\u2022 Enjoy a spice village tour and learn about world-famous Ceylon spices\n\u2022 Visit the Temple of the Tooth Relic, Kandy\u2019s most important attraction\n\u2022 Explore the Royal Botanical Garden in Kandy\n\u2022 Learn about Ceylon gems and craftsmanship\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 4: Kandy to Colombo - City Tour and Shopping",
        "description": "\u2022 After breakfast, proceed to Colombo\n\u2022 Visit Gangaramaya Buddhist Temple for its cultural and modern architectural\n\u2022 Walk through Colombo Fort bazaar area and visit the Red Mosque and Dutch\n\u2022 Museum\n\u2022 Visit Galle Face Green and view the Old Parliament building\n\u2022 Continue with shopping at ODEL, Noritake, House of Fashion, Ceylon tea\n\u2022 shops, Sri Lankan handicrafts, and more\n\u2022 Overnight stay at the hotel"
      },

      {
        "title": "Day 5: Departure - Airport Drop-off",
        "description": "\u2022 Breakfast at the hotel\n\u2022 Free time depending on flight schedule\n\u2022 Transfer for airport drop-off and departure"
      },

    ],
    "inclusions": [
      "Private Driver/Guide",
      "Private Superior Car",
      "Half Board (Breakfast & Dinner)",
      "Airport Drop-off",
      "Airport Pick-up",
      "Tour Consultant",
    ],
    "images": [
      "/package_images/SL-5D4N-BCH-04.jpg",
    ],
    "themes": ["Beach & Relax", "Adventure", "Wildlife & Nature", "Honeymoon", "Culture & Heritage", "Hill Country"],
    "activities": ["Whale Watching", "Snorkeling/Diving", "City Tour"],
  },

  {
    "id": "SL-5D4N-STD-05",
    "title": "5 Days Island Escape (High Tea Variation)",
    "description": "Duration: 5 days / 4 nights\nType: Tailor-made private tour\nSuitable For: Family",
    "days": [
      {
        "title": "Day 1: Arrival - Sigiriya",
        "description": "\u2022 Welcome at the airport and meet your driver guide\n\u2022 Private transfer to Sigiriya\n\u2022 Visit the Dambulla Cave Temple\n\u2022 Check in and relax for the evening\n\u2022 Overnight stay in Sigiriya"
      },

      {
        "title": "Day 2: Sigiriya - Ancient Fortress and Wildlife",
        "description": "\u2022 Visit the iconic Sigiriya Rock Fortress and enjoy panoramic views\n\u2022 Optional jeep safari at Minneriya to spot wild elephants and other wildlife\n\u2022 Free time to enjoy the peaceful surroundings\n\u2022 Overnight stay in Sigiriya"
      },

      {
        "title": "Day 3: Sigiriya to Kandy - The Cultural Capital",
        "description": "\u2022 Transfer to Kandy\n\u2022 Enjoy a Kandy city tour and explore key local sights\n\u2022 Visit the sacred Temple of the Tooth Relic\n\u2022 Evening at leisure (optional cultural experiences if you wish)\n\u2022 Overnight stay in Kandy"
      },

      {
        "title": "Day 4: Kandy to Bentota - Gardens, Tea, and River Safari",
        "description": "\u2022 Visit the Royal Botanic Garden before leaving Kandy\n\u2022 Stop at Giragama Tea Factory for a Ceylon tea experience\n\u2022 Continue to the south coast and enjoy a Madu River boat safari through\n\u2022 mangroves\n\u2022 Free time to relax by the beach in Bentota (optional coastal experiences if you\n\u2022 Overnight stay in Bentota (Kalutara area)"
      },

      {
        "title": "Day 5: Departure - Airport Drop-off",
        "description": "\u2022 Breakfast at the hotel\n\u2022 Private transfer to the airport for departure"
      },

    ],
    "inclusions": [
      "Private Driver/Guide",
      "Private Superior Car",
      "Half Board (Breakfast & Dinner)",
      "Airport Drop-off",
      "Airport Pick-up",
      "Tour Consultant",
    ],
    "images": [
      "/package_images/SL-5D4N-STD-05.jpg",
    ],
    "themes": ["Beach & Relax", "Culture & Heritage", "Hill Country", "Wildlife & Nature"],
    "activities": ["City Tour", "Tea Factory Visit", "Boat Ride", "Safari"],
  },

  {
    "id": "SL-5D4N-HNM-06",
    "title": "Romantic Days in Paradise (5 days)",
    "startingPrice": "$1,850",
    "description": "Duration: 5 days / 4 nights\nType: Superior private honeymoon tour\nSuitable For: Couples",
    "days": [
      {
        "title": "Day 1: Arrival - Colombo City Romance",
        "description": "\u2022 Arrive at Bandaranayake International Airport and transfer to Colombo\n\u2022 (approx. 45 mins)\n\u2022 Visit the Gangaramaya Buddhist Temple\n\u2022 Explore the Green Path Open Art Gallery and enjoy local art displays\n\u2022 Shop at chic boutiques and pick out stylish souvenirs\n\u2022 Optional dining experience such as Ministry of Crab\n\u2022 End the day with a romantic dinner at a restaurant of your choice\n\u2022 Overnight stay: Colombo"
      },

      {
        "title": "Day 2: Colombo to Kandy - Culture, Gardens, and Sunset",
        "description": "\u2022 Transfer to Kandy (approx. 3.5 hours)\n\u2022 Visit the sacred Temple of the Tooth Relic\n\u2022 Explore Kandy\u2019s hidden gems on a guided walk with a local storyteller\n\u2022 Visit the Royal Botanical Gardens in Peradeniya\n\u2022 Optional cultural dance atmosphere\n\u2022 Romantic moments like floral devotion scenes and scenic viewpoints\n\u2022 Spend a romantic evening at a Kandy viewpoint and enjoy the sunset together\n\u2022 Overnight stay: Kandy"
      },

      {
        "title": "Day 3: Kandy to Bentota - Tea Trails and Galle Fort Charm",
        "description": "\u2022 Travel towards Bentota (approx. 4.5 hours) with a beautiful stop along the way\n\u2022 Visit Giragama Tea Factory and enjoy a Ceylon tea experience\n\u2022 Walk inside the Galle Royal Dutch Fort and explore its charming streets\n\u2022 Arrive in Bentota and enjoy a relaxed evening by the coast\n\u2022 Overnight stay: Bentota"
      },

      {
        "title": "Day 4: Bentota - Beach Bliss and Romantic River Moments",
        "description": "\u2022 Relax on the beach and enjoy slow, peaceful coastal time\n\u2022 Visit a Turtle Hatchery and learn about turtle conservation\n\u2022 Explore the beautiful Lunuganga Garden (Geoffrey Bawa\u2019s estate)\n\u2022 End the day with a romantic river cruise along the Bentota River\n\u2022 Overnight stay: Bentota"
      },

      {
        "title": "Day 5: Departure - Airport Drop-off",
        "description": "\u2022 Breakfast at the hotel\n\u2022 Free time depending on your flight schedule\n\u2022 Transfer to the airport for departure"
      },

    ],
    "inclusions": [
      "Private Driver/Guide",
      "Private Superior Car",
      "Half Board (Breakfast & Dinner)",
      "Airport Drop-off",
      "Airport Pick-up",
      "Tour Consultant",
    ],
    "mapImage": "5 day ramantic days in aradise.png",
    "images": [
      "/Romantic Days in Paradise (5 days).webp",
    ],
    "themes": ["Beach & Relax", "Wildlife & Nature", "Honeymoon", "Culture & Heritage", "Hill Country"],
    "activities": ["Cultural Show", "City Tour", "Tea Factory Visit"],
  },

  {
    "id": "SL-6D5N-STD-01",
    "title": "Island Charm Express (6 days)",
    "startingPrice": "$890",
    "description": "Duration: 6 days / 5 nights\nType: Private escorted tour\nSuitable For: Family, Couple, Friends",
    "days": [
      {
        "title": "Day 1: Arrival - Sigiriya, Ancient Wonders and Village Life",
        "description": "\u2022 Arrival at the airport and proceed to Sigiriya\n\u2022 En route, visit Pinnawala Elephant Orphanage\n\u2022 Climb the Sigiriya Rock Fortress\n\u2022 Climb Pidurangala Rock for the iconic Sigiriya Lion Rock view\n\u2022 Optional: Minneriya National Park safari (elephants, leopards, and\n\u2022 Village walk to experience Sri Lankan culture and local life\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 2: Sigiriya to Kandy - Culture, Gardens, and Heritage",
        "description": "\u2022 After breakfast, proceed to Kandy\n\u2022 Spice village tour and learn about world-famous Ceylon spices\n\u2022 Visit the Royal Botanical Garden in Kandy\n\u2022 Learn about Ceylon gems\n\u2022 Optional: Sri Lankan traditional cultural show\n\u2022 Visit the Temple of the Tooth Relic\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 3: Kandy to Nuwara Eliya - Tea Country and Cool Hills",
        "description": "\u2022 After breakfast, proceed to Nuwara Eliya\n\u2022 Visit Shri Bhakta Hanuman Hindu Temple near Ramboda\n\u2022 Stop at the beautiful Ramboda Waterfall for photos\n\u2022 Visit Labukale Tea Garden and enjoy the tea-country atmosphere\n\u2022 Visit Seetha Amman Hindu Kovil\n\u2022 Walk through Gregory Park and enjoy sunset by Lake Gregory\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 4: Nuwara Eliya to Yala - Ella Views and Wildlife",
        "description": "\u2022 Adventure\n\u2022 After breakfast, proceed to Yala\n\u2022 Visit the Nine Arches Bridge in Demodara\n\u2022 Optional: Hike Little Adam\u2019s Peak through scenic tea plantations\n\u2022 Enjoy the breathtaking views of Ella Gap during the drive\n\u2022 Optional: Yala National Park safari (approx. 3 to 4 hours)\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 5: Yala to Bentota - Fort Charm and Coastal Relaxation",
        "description": "\u2022 After breakfast, proceed to Bentota\n\u2022 Visit Galle Dutch Fort (UNESCO World Heritage Site)\n\u2022 Visit the National Maritime Archaeology Museum\n\u2022 Optional: Madu River boat safari through mangroves\n\u2022 Visit Kosgoda Turtle Hatchery and learn about sea turtle conservation\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 6: Departure - Airport Drop-off",
        "description": "\u2022 Breakfast at the hotel\n\u2022 Private transfer to the airport for departure"
      },

    ],
    "inclusions": [
      "Private Driver/Guide",
      "Private Superior Car",
      "Half Board (Breakfast & Dinner)",
      "Airport Drop-off",
      "Airport Pick-up",
      "Tour Consultant",
    ],
    "mapImage": "6 day tropical days.png",
    "images": [
      "/Island Charm Express (6 days).webp",
    ],
    "themes": ["Beach & Relax", "Adventure", "Wildlife & Nature", "Honeymoon", "Culture & Heritage", "Hill Country"],
    "activities": ["Train Ride", "Cultural Show", "Tea Factory Visit", "Safari", "Boat Ride", "Hiking/Trekking"],
  },

  {
    "id": "SL-6D5N-STD-02",
    "title": "Tropical Trails (6 days)",
    "startingPrice": "$980",
    "description": "Duration: 6 days / 5 nights\nType: Private escorted tour\nSuitable For: Family, Couple, Friends",
    "days": [
      {
        "title": "Day 1: Arrival - Sigiriya, Village Life and Ancient Wonder",
        "description": "\u2022 Arrival and assistance at the airport, then proceed to Sigiriya\n\u2022 Walk around the calm village to experience Sri Lankan culture and village life\n\u2022 Enjoy a bullock cart ride for a traditional travel experience\n\u2022 Take a Sri Lankan traditional boat ride\n\u2022 Climb the Sigiriya Rock Fortress, the legendary ancient fortress\n\u2022 If time permits, enjoy a Minneriya National Park wildlife safari to spot elephants,\n\u2022 leopards, and more\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 2: Sigiriya to Trincomalee - East Coast Beaches and",
        "description": "\u2022 Marine Adventure\n\u2022 After breakfast, proceed to Trincomalee\n\u2022 Visit the famous Fedrik Fort built by Portuguese invaders\n\u2022 Visit Koneswaram Kovil, an ancient temple with breathtaking views\n\u2022 Optional whale watching for a once-in-a-lifetime ocean experience\n\u2022 Visit Pigeon Island National Park and enjoy snorkeling and diving among corals,\n\u2022 reef fish, and turtles\n\u2022 Relax at one of Sri Lanka\u2019s most beautiful sandy beaches\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 3: Trincomalee to Kandy - Culture, Gardens, and Local",
        "description": "\u2022 After breakfast, proceed to Kandy\n\u2022 Experience a spice village tour and learn about world-famous Ceylon spices\n\u2022 Visit the Temple of the Tooth Relic, Kandy\u2019s main attraction\n\u2022 Explore the peaceful Royal Botanical Garden in Kandy\n\u2022 Learn about the famous Ceylon gems\n\u2022 Watch how Sri Lankan handicrafts and batiks are made\n\u2022 If time permits, enjoy a Sri Lankan traditional cultural show\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 4: Kandy to Nuwara Eliya - Waterfalls and Cool Hill",
        "description": "\u2022 Country\n\u2022 After breakfast, proceed to Nuwara Eliya\n\u2022 Optional scenic train ride from Kandy to Nuwara Eliya\n\u2022 Stop at the beautiful Ramboda Waterfall for photos\n\u2022 Visit the Seetha Amman Hindu Kovil\n\u2022 Take a serene walk through Gregory Park and enjoy sunset by Lake Gregory\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 5: Nuwara Eliya to Colombo - City Sights and",
        "description": "\u2022 Shopping\n\u2022 After breakfast, proceed to Colombo\n\u2022 Visit Gangaramaya Buddhist Temple and admire its cultural and modern blend\n\u2022 Walk through Colombo Fort area, including the bazaar, Red Mosque, and Dutch\n\u2022 Museum\n\u2022 Stop at popular local hangout spots like Independence Square and Arcade\n\u2022 Independence Square\n\u2022 Visit Galle Face Green and view the Old Parliament building\n\u2022 Continue with shopping at ODEL, Noritake, House of Fashion, Ceylon tea shops,\n\u2022 Sri Lankan handicrafts, and more\n\u2022 Overnight stay at the hotel"
      },

      {
        "title": "Day 6: Departure - Airport Drop-off",
        "description": "\u2022 Breakfast at the hotel\n\u2022 Transfer to the airport for departure (timed to your flight)"
      },

    ],
    "inclusions": [
      "Private Driver/Guide",
      "Private Superior Car",
      "Half Board (Breakfast & Dinner)",
      "Airport Drop-off",
      "Airport Pick-up",
      "Tour Consultant",
    ],
    "images": [
      "/package_images/SL-6D5N-STD-02.jpg",
    ],
    "themes": ["Beach & Relax", "Adventure", "Wildlife & Nature", "Honeymoon", "Culture & Heritage", "Hill Country"],
    "activities": ["City Tour", "Snorkeling/Diving", "Train Ride", "Cultural Show", "Safari", "Boat Ride", "Whale Watching"],
  },

  {
    "id": "SL-6D5N-WLD-03",
    "title": "Temples, Wildlife and Beach (6 days)",
    "startingPrice": "$730",
    "description": "Duration: 6 days / 5 nights\nType: Tailor-made private tour\nSuitable For: Families",
    "days": [
      {
        "title": "Day 1: Arrival - Kandy, Sacred City and Local Flavours",
        "description": "\u2022 Welcome at the airport\n\u2022 Transfer to Kandy\n\u2022 Enjoy a city tour in Kandy\n\u2022 Visit the Temple of the Tooth Relic\n\u2022 Overnight stay in Kandy"
      },

      {
        "title": "Day 2: Kandy to Nuwara Eliya - Tea Country and Hill",
        "description": "\u2022 Retreat\n\u2022 Visit the Royal Botanic Garden\n\u2022 Experience tea plucking\n\u2022 Visit a tea factory\n\u2022 Stop at Ramboda Waterfall for photos\n\u2022 Continue to Nuwara Eliya and enjoy the cool hill-country atmosphere\n\u2022 Overnight stay in Nuwara Eliya"
      },

      {
        "title": "Day 3: Nuwara Eliya to Udawalawa - Scenic Stops and",
        "description": "\u2022 Highland Wonders\n\u2022 Visit Seetha Amman Temple\n\u2022 Visit Ella and enjoy the iconic hill-town views\n\u2022 Optional visit to the Elephant Transit Home\n\u2022 Proceed to Udawalawa\n\u2022 Overnight stay in Udawalawa"
      },

      {
        "title": "Day 4: Udawalawa to South Coast - Safari and Galle Fort",
        "description": "\u2022 Jeep safari at Udawalawa National Park\n\u2022 Proceed towards the south coast\n\u2022 Walk inside the historic Galle Fort\n\u2022 Overnight stay on the south coast area"
      },

      {
        "title": "Day 5: Bentota to Colombo - River Safari and City",
        "description": "\u2022 Highlights\n\u2022 Madu River boat safari through beautiful mangroves\n\u2022 Transfer to Colombo\n\u2022 Enjoy a Colombo city tour\n\u2022 Overnight stay in Colombo"
      },

      {
        "title": "Day 6: Departure - Airport Drop-off",
        "description": "\u2022 Breakfast at the hotel\n\u2022 Transfer to the airport for departure (as per flight schedule)"
      },

    ],
    "inclusions": [
      "Private Driver/Guide",
      "Private Superior Car",
      "Half Board (Breakfast & Dinner)",
      "Airport Drop-off",
      "Airport Pick-up",
      "Tour Consultant",
    ],
    "images": [
      "/package_images/SL-6D5N-STD-01.jpg",
    ],
    "themes": ["Beach & Relax", "Culture & Heritage", "Hill Country", "Wildlife & Nature"],
    "activities": ["City Tour", "Train Ride", "Tea Factory Visit", "Safari", "Boat Ride"],
  },

  {
    "id": "SL-7D6N-HNM-01",
    "title": "Love and Adventure (7 days)",
    "startingPrice": "$3,470",
    "description": "Duration: 7 days / 6 nights\nType: Private luxury honeymoon tour\nSuitable For: Couples",
    "days": [
      {
        "title": "Day 1: Kandy - Romance and Culture in the Hills",
        "description": "\u2022 Transfer to Kandy\n\u2022 Visit the Temple of the Tooth Relic\n\u2022 Explore Kandy\u2019s hidden gems on a guided walk with a local storyteller\n\u2022 Romantic evening at the Kandy Viewpoint with sunset views\n\u2022 Overnight stay in Kandy"
      },

      {
        "title": "Day 2: Nuwara Eliya - Tea Country and Cool Climate",
        "description": "\u2022 Visit the Royal Botanic Garden\n\u2022 Experience tea plucking\n\u2022 Visit a tea factory\n\u2022 Visit Ramboda Waterfall\n\u2022 Continue to Nuwara Eliya and enjoy the town atmosphere\n\u2022 Overnight stay in Nuwara Eliya"
      },

      {
        "title": "Day 3: Hatton - Scenic Train Ride and Tea Plantation",
        "description": "\u2022 Romance\n\u2022 Transfer to Hatton\n\u2022 Explore Hatton and its tea-country surroundings\n\u2022 Enjoy a scenic train ride through lush tea plantations\n\u2022 Visit Christ Church Warleigh\n\u2022 Overnight stay in Hatton"
      },

      {
        "title": "Day 4: Hatton - Private Tea Experience and Waterfall Views",
        "description": "\u2022 Indulge in a private tea experience\n\u2022 Meet tea pluckers and learn about the tea-making lifestyle\n\u2022 Visit St Clair\u2019s and Devon Waterfalls\n\u2022 Explore the Bogawanthalawa Tea Valley\n\u2022 Overnight stay in Hatton"
      },

      {
        "title": "Day 5: Galle - Colonial Fort, Coastal Vibes and Extras",
        "description": "\u2022 Transfer to Galle\n\u2022 Explore the Galle Royal Dutch Fort\n\u2022 Enjoy a sundowner cocktail while overlooking the ramparts\n\u2022 Added experiences (Beruwala area stops):\n\u2022 Overnight stay in Galle area"
      },

      {
        "title": "Day 6: Colombo - City Sights, Shopping and Nightlife",
        "description": "\u2022 After breakfast, proceed to Colombo\n\u2022 Visit Gangaramaya Buddhist Temple and admire the unique architecture and\n\u2022 cultural blend\n\u2022 Enjoy a relaxed stroll at Green Path or Viharamahadevi Park and view local art\n\u2022 displays\n\u2022 Walk through Colombo Fort bazaar area, including the Red Mosque and Dutch\n\u2022 Museum\n\u2022 Stop at Independence Square and the Arcade at Independence Square\n\u2022 Visit Galle Face Green and see the Old Parliament building\n\u2022 Continue with shopping at ODEL, Noritake, House of Fashion, Ceylon tea shops,\n\u2022 Sri Lankan handicrafts, and more\n\u2022 Evening option: visit local pubs, clubs, and casinos\n\u2022 Overnight stay in Colombo"
      },

      {
        "title": "Day 7: Departure - Airport Drop-off",
        "description": "\u2022 Breakfast at the hotel\n\u2022 Transfer to the airport for departure"
      },

    ],
    "inclusions": [
      "Private Driver/Guide",
      "Private Superior Car",
      "Half Board (Breakfast & Dinner)",
      "Airport Drop-off",
      "Airport Pick-up",
      "Tour Consultant",
    ],
    "mapImage": "7 day love and adventure.png",
    "images": [
      "/package_images/SL-7D6N-WLD-01.jpg",
    ],
    "themes": ["Beach & Relax", "Adventure", "Wildlife & Nature", "Honeymoon", "Culture & Heritage", "Hill Country"],
    "activities": ["Train Ride", "City Tour", "Tea Factory Visit"],
  },

  {
    "id": "SL-7D6N-NGBE-02",
    "title": "Whispers of Lanka (7 days)",
    "startingPrice": "$1,100",
    "description": "Duration: 7 days / 6 nights\nType: Private luxury honeymoon tour\nSuitable For: Couples",
    "days": [
      {
        "title": "Day 1: Arrival - Negombo, Coastal Welcome",
        "description": "\u2022 Arrival at the airport and transfer to the hotel\n\u2022 Visit the lively Negombo Fish Market and experience the local fishing community\n\u2022 Optional: Explore the Muthurajawela Wetland, known for mangroves and birdlife\n\u2022 End the day with a scenic sunset at Negombo Beach\n\u2022 Overnight stay in Negombo"
      },

      {
        "title": "Day 2: Negombo to Sigiriya - Ancient Fortress and Safari",
        "description": "\u2022 Breakfast at the hotel\n\u2022 Climb the Sigiriya Rock Fortress, the legendary ancient citadel\n\u2022 Optional: Polonnaruwa ancient city tour for a deep historical experience\n\u2022 Walk or cycle around Polonnaruwa (bicycles can be arranged in advance)\n\u2022 Wildlife safari at Minneriya National Park to spot elephants and other endemic\n\u2022 animals\n\u2022 Dinner and overnight stay in Sigiriya"
      },

      {
        "title": "Day 3: Sigiriya to Kandy - Culture, Spices, and Gardens",
        "description": "\u2022 After breakfast, proceed to Kandy\n\u2022 En route, visit the Dambulla Cave Temple (UNESCO World Heritage Site)\n\u2022 Experience a spice village tour and learn about world-famous Ceylon spices\n\u2022 Visit the sacred Temple of the Tooth Relic\n\u2022 Explore the peaceful Royal Botanical Garden in Kandy\n\u2022 Optional: Sri Lankan traditional cultural show (time permitting)\n\u2022 Dinner and overnight stay in Kandy"
      },

      {
        "title": "Day 4: Kandy to Nuwara Eliya - Tea Country and Cool Hills",
        "description": "\u2022 After breakfast, proceed to Nuwara Eliya\n\u2022 Optional: Scenic train ride to Nuwara Eliya\n\u2022 En route near Ramboda, visit Shri Bhakta Hanuman Hindu Temple\n\u2022 Visit the beautiful Seetha Amman Hindu Kovil\n\u2022 Take a serene walk through Gregory Park and enjoy sunset by Lake Gregory\n\u2022 Dinner and overnight stay in Nuwara Eliya"
      },

      {
        "title": "Day 5: Nuwara Eliya to Bentota - Coastline, Mangroves,",
        "description": "\u2022 and Turtle Care\n\u2022 After breakfast, proceed to Bentota\n\u2022 Enjoy Bentota\u2019s popular water sports (optional): jet ski, banana boat, tube rides,\n\u2022 diving, snorkeling, deep-sea fishing\n\u2022 Visit the Kosgoda Turtle Hatchery and learn about sea turtle conservation\n\u2022 Take an amazing Madu River boat ride through beautiful mangroves\n\u2022 Stop at a fish farm during the river ride and, if you like, try Sri Lankan fish therapy\n\u2022 Dinner and overnight stay in Bentota"
      },

      {
        "title": "Day 6: Bentota to Colombo - City Sights, Shopping, and",
        "description": "\u2022 Seafood\n\u2022 After breakfast, proceed to Colombo\n\u2022 Visit Gangaramaya Buddhist Temple and admire its cultural and modern blend\n\u2022 Walk through the lively Colombo Fort area, including the bazaar, Red Mosque, and\n\u2022 Dutch Museum\n\u2022 Continue with shopping at ODEL, Noritake, House of Fashion, Ceylon tea shops,\n\u2022 handicrafts, and more\n\u2022 Enjoy mouth-watering seafood at popular seafood restaurants in Colombo\n\u2022 Overnight stay in Colombo"
      },

      {
        "title": "Day 7: Departure - Airport Drop-off",
        "description": "\u2022 Breakfast at the hotel\n\u2022 Transfer to the airport for departure (as per flight schedule)"
      },

    ],
    "inclusions": [
      "Private Driver/Guide",
      "Private Superior Car",
      "Half Board (Breakfast & Dinner)",
      "Airport Drop-off",
      "Airport Pick-up",
      "Tour Consultant",
    ],
    "mapImage": "7 day whisper of lanka.png",
    "images": [
      "/Whispers of Lanka (7 days).webp",
    ],
    "themes": ["Beach & Relax", "Wildlife & Nature", "Honeymoon", "Culture & Heritage", "Hill Country"],
    "activities": ["City Tour", "Snorkeling/Diving", "Train Ride", "Cultural Show", "Safari", "Boat Ride"],
  },

  {
    "id": "SL-7D6N-STD-02",
    "title": "Rhythms of Ceylon (8 days)",
    "startingPrice": "$1,250",
    "description": "Duration: 7 days / 6 nights\nType: Private escorted tour\nSuitable For: Families, couples, and friends",
    "days": [
      {
        "title": "Day 1: Arrival - Sigiriya, Rock Fortress and Village Life",
        "description": "\u2022 Arrival and assistance at the airport, then proceed to Sigiriya\n\u2022 En route, visit Pinnawala Elephant Orphanage\n\u2022 Climb the Sigiriya Rock Fortress (ancient fortress built on a rock)\n\u2022 Climb Pidurangala Rock for the stunning view of Sigiriya Lion Rock\n\u2022 Walk around the calm village to experience Sri Lankan culture and village life\n\u2022 Enjoy a Sri Lankan traditional boat ride\n\u2022 Wildlife safari at Minneriya National Park to see elephants, leopards,\n\u2022 and other endemic animals\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 2: Sigiriya to Kandy - Temples, Spices and Gardens",
        "description": "\u2022 After breakfast, proceed to Kandy\n\u2022 Stop at the Dambulla Cave Temple (UNESCO World Heritage Site)\n\u2022 Experience a spice village tour and learn about Ceylon spices\n\u2022 Visit the Temple of the Tooth Relic\n\u2022 Learn about famous Ceylon gems\n\u2022 Visit the Royal Botanical Garden in Kandy\n\u2022 If time permits, enjoy a Sri Lankan traditional cultural show\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 3: Kandy to Nuwara Eliya - Waterfalls, Tea Country and",
        "description": "\u2022 High Tea\n\u2022 After breakfast, proceed to Nuwara Eliya\n\u2022 Stop at Ramboda Waterfall for photos\n\u2022 Visit Seetha Amman Hindu Kovil\n\u2022 Stop at Labukale Tea Garden on the way\n\u2022 Enjoy high tea at the Grand Hotel\n\u2022 Take a serene walk through Gregory Park and enjoy sunset by Lake Gregory\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 4: Nuwara Eliya to Yala - Ella Train Ride and Safari",
        "description": "\u2022 Adventure\n\u2022 After breakfast, proceed to Yala\n\u2022 Scenic train ride from Nuwara Eliya to Ella\n\u2022 Explore Ella and the Nine Arch Bridge\n\u2022 3 to 4 hour safari at Yala National Park to explore exotic wildlife\n\u2022 Keep an eye out for elusive leopards\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 5: Yala to Bentota - Galle Fort, Stilt Fishing and River",
        "description": "\u2022 Safari\n\u2022 After breakfast, proceed to Bentota\n\u2022 Witness Sri Lankan stilt fishermen in their traditional fishing style\n\u2022 Visit Galle Fort and enjoy a Galle city tour\n\u2022 Boat ride on the Madu River through beautiful mangroves\n\u2022 Visit a fish farm during the river ride and, if interested, try Sri Lankan fish therapy\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 6: Bentota - Bawa Estate, Turtles, Water Sports and",
        "description": "\u2022 Sunset\n\u2022 After breakfast at the hotel\n\u2022 Visit Lunuganga Estate, Geoffrey Bawa\u2019s famous country home\n\u2022 Optional water sports in Bentota: jet ski, banana boat, tube boating, diving,\n\u2022 snorkeling, deep sea fishing\n\u2022 Visit the Kosgoda Turtle Hatchery and learn about sea turtle conservation\n\u2022 Relax with a beach stroll and enjoy the sunset\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 7: Bentota to Colombo - City Highlights and",
        "description": "\u2022 Shopping\n\u2022 After breakfast, proceed to Colombo\n\u2022 Visit Gangaramaya Buddhist Temple and admire the cultural and modern blend\n\u2022 Stop at Independence Square and the Arcade at Independence Square\n\u2022 Shopping time at ODEL, Noritake, House of Fashion, Ceylon tea shops, Sri Lankan\n\u2022 handicrafts, and more\n\u2022 Visit Galle Face Green and see the Old Parliament building\n\u2022 Overnight stay in Colombo"
      },

      {
        "title": "Day 8: Departure - Airport Drop-off",
        "description": "\u2022 Breakfast at the hotel\n\u2022 Transfer to the airport for departure (as per flight schedule)"
      },

    ],
    "inclusions": [
      "Private Driver/Guide",
      "Private Superior Car",
      "Half Board (Breakfast & Dinner)",
      "Airport Drop-off",
      "Airport Pick-up",
      "Tour Consultant",
    ],
    "mapImage": "8 days rhythm of ceylon.png",
    "images": [
      "/package_images/SL-7D6N-STD-02.jpg",
    ],
    "themes": ["Beach & Relax", "Adventure", "Wildlife & Nature", "Honeymoon", "Culture & Heritage", "Hill Country"],
    "activities": ["City Tour", "Snorkeling/Diving", "Train Ride", "Cultural Show", "Safari", "Boat Ride", "Hiking/Trekking"],
  },

  {
    "id": "SL-9D8N-STD-01",
    "title": "Pearl Island Getaway (9 days)",
    "startingPrice": "$1,360",
    "description": "Duration: 9 days / a8 nights\nType: Private escorted tour\nSuitable For: Family, Couple, Friends",
    "days": [
      {
        "title": "Day 1: Arrival - Negombo, Sunset and Coastal Life",
        "description": "\u2022 Arrive at the airport and proceed to Negombo\n\u2022 Visit St. Mary\u2019s Church, often called \u201cLittle Rome\u201d\n\u2022 Enjoy a boat ride along the Hamilton Canal and visit the old Dutch Fort in\n\u2022 Negombo\n\u2022 Visit a nearby fishing village for a glimpse of local lifestyle\n\u2022 Enjoy the evening breeze with a beautiful sunset experience\n\u2022 Relax with a beach walk and enjoy Negombo\u2019s lively nightlife\n\u2022 Dinner and overnight stay in Negombo"
      },

      {
        "title": "Day 2: Negombo to Sigiriya - Elephants and Village",
        "description": "\u2022 Experience\n\u2022 After breakfast, proceed to Sigiriya\n\u2022 En route, visit Pinnawala Elephant Orphanage\n\u2022 Take a calm village walk to experience Sri Lankan culture and village life\n\u2022 Enjoy a Sri Lankan traditional boat ride\n\u2022 Dinner and overnight stay in Sigiriya"
      },

      {
        "title": "Day 3: Sigiriya - Fortress Views and Safari Adventure",
        "description": "\u2022 After breakfast, climb the Sigiriya Rock Fortress\n\u2022 Optional: Climb Pidurangala Rock for the stunning Sigiriya Lion Rock viewpoint\n\u2022 Enjoy a wildlife safari at Minneriya National Park to spot elephants, leopards,\n\u2022 and other endemic animals\n\u2022 Dinner and overnight stay in Sigiriya"
      },

      {
        "title": "Day 4: Sigiriya to Kandy - Temples, Gardens and Culture",
        "description": "\u2022 After breakfast, proceed to Kandy\n\u2022 Stop at the Dambulla Cave Temple (UNESCO World Heritage Site)\n\u2022 Visit the Royal Botanical Garden in Kandy and enjoy the peaceful surroundings\n\u2022 Learn about famous Ceylon gems\n\u2022 Visit the Temple of the Tooth Relic, Kandy\u2019s main attraction\n\u2022 Optional: Sri Lankan traditional cultural show (time permitting)\n\u2022 Dinner and overnight stay in Kandy"
      },

      {
        "title": "Day 5: Kandy to Ella - Scenic Train and Hill-Country",
        "description": "\u2022 Highlights\n\u2022 After breakfast, proceed to Ella\n\u2022 Enjoy one of the world\u2019s most beautiful train rides from Nanu Oya to Ella\n\u2022 Visit the iconic Nine Arches Bridge in Demodara\n\u2022 Hike Little Adam\u2019s Peak through scenic tea plantations\n\u2022 Dinner and overnight stay in Ella"
      },

      {
        "title": "Day 6: Ella - Hiking, Tea, and Adventure",
        "description": "\u2022 After breakfast, hike Ella Rock for breathtaking panoramic views\n\u2022 Visit the charming tea plantations in Ella\n\u2022 Experience an adrenaline-filled zip line ride with stunning Ella backdrops\n\u2022 Enjoy the evening at Ravana Pool Club with a sundowner cocktail\n\u2022 Dinner and overnight stay in Ella"
      },

      {
        "title": "Day 7: Ella to Bentota - Galle Fort and River Safari",
        "description": "\u2022 After breakfast, proceed to Bentota\n\u2022 Witness Sri Lankan stilt fishermen practicing traditional fishing\n\u2022 Visit Galle Fort and enjoy a Galle city tour\n\u2022 Take a scenic Madu River boat ride through beautiful mangroves\n\u2022 Dinner and overnight stay in Bentota"
      },

      {
        "title": "Day 8: Bentota - Bawa Estate, Turtles, Water Sports and",
        "description": "\u2022 Sunset\n\u2022 After breakfast, visit Lunuganga Estate, Geoffrey Bawa\u2019s famous country home\n\u2022 Enjoy Bentota\u2019s water sports (optional): jet ski, banana boat, tube boating, diving,\n\u2022 snorkeling, deep-sea fishing\n\u2022 Visit the Kosgoda Turtle Hatchery and learn about sea turtle conservation\n\u2022 Take a relaxing beach stroll and enjoy the sunset\n\u2022 Dinner and overnight stay in Bentota"
      },

      {
        "title": "Day 9: Departure - Airport Drop-off",
        "description": "\u2022 Breakfast at the hotel\n\u2022 Free time depending on your flight schedule\n\u2022 Private transfer to the airport for departure"
      },

    ],
    "inclusions": [
      "Private Driver/Guide",
      "Private Superior Car",
      "Half Board (Breakfast & Dinner)",
      "Airport Drop-off",
      "Airport Pick-up",
      "Tour Consultant",
    ],
    "images": [
      "/package_images/SL-9D8N-STD-01.jpg",
    ],
    "themes": ["Beach & Relax", "Adventure", "Wildlife & Nature", "Honeymoon", "Culture & Heritage", "Hill Country"],
    "activities": ["City Tour", "Snorkeling/Diving", "Train Ride", "Cultural Show", "Tea Factory Visit", "Safari", "Boat Ride", "Hiking/Trekking"],
  },

  {
    "id": "SL-10D9N-STD-01",
    "title": "Sri Lanka Dream Route (10 days)",
    "startingPrice": "$1,500",
    "description": "Duration: 10 days / 9 nights\nType: Private escorted tour\nSuitable For: Family, Couple, Friends",
    "days": [
      {
        "title": "Day 1: Arrival - Negombo Coastal Welcome",
        "description": "\u2022 Arrival and assistance at the airport, then proceed to Negombo\n\u2022 Visit St. Mary\u2019s Church, often called \u201cLittle Rome\u201d\n\u2022 Boat ride along the Hamilton Canal and visit the old Dutch Fort in Negombo\n\u2022 Visit a nearby fishing village for a glimpse of local lifestyle\n\u2022 Enjoy the evening breeze with a colorful sunset experience\n\u2022 Relax with a beach walk and enjoy Negombo\u2019s lively nightlife\n\u2022 Dinner and overnight stay in Negombo"
      },

      {
        "title": "Day 2: Negombo to Anuradhapura - Ancient Kingdom and",
        "description": "\u2022 Wilpattu Safari\n\u2022 After breakfast, proceed to Anuradhapura\n\u2022 Enjoy a half-day jeep safari at Wilpattu National Park\n\u2022 Visit Isurumuniya Temple and admire the Lovers\u2019 Statue, Elephant Pond, and stone\n\u2022 carvings\n\u2022 Visit Mihintale, where Buddhism was introduced to Sri Lanka\n\u2022 Climb Mihintale Rock to witness a beautiful sunset\n\u2022 Dinner and overnight stay in Anuradhapura"
      },

      {
        "title": "Day 3: Anuradhapura to Sigiriya - Rock Fortress and",
        "description": "\u2022 Wildlife\n\u2022 After breakfast, proceed to Sigiriya\n\u2022 Climb the legendary Sigiriya Rock Fortress\n\u2022 Climb Pidurangala Rock for the iconic Sigiriya Lion Rock viewpoint\n\u2022 Wildlife safari at Minneriya National Park to spot elephants, leopards, and\n\u2022 Enjoy a Sri Lankan traditional boat ride experience\n\u2022 Dinner and overnight stay in Sigiriya"
      },

      {
        "title": "Day 4: Sigiriya to Kandy - Culture, Spices and Heritage",
        "description": "\u2022 After breakfast, proceed to Kandy\n\u2022 En route, visit the Dambulla Cave Temple (UNESCO World Heritage Site)\n\u2022 Experience a spice village tour and learn about Ceylon spices\n\u2022 Visit the Royal Botanical Garden in Kandy and enjoy its peaceful greenery\n\u2022 Watch Sri Lankan handicrafts and famous batik-making\n\u2022 Learn about Ceylon gems and craftsmanship\n\u2022 Visit the Temple of the Tooth Relic, the main attraction in Kandy\n\u2022 Optional: Sri Lankan traditional cultural show (time permitting)\n\u2022 Dinner and overnight stay in Kandy"
      },

      {
        "title": "Day 5: Kandy to Nuwara Eliya - Waterfalls, Tea Country and",
        "description": "\u2022 High Tea\n\u2022 After breakfast, proceed to Nuwara Eliya\n\u2022 Visit Shri Bhakta Hanuman Hindu Temple near Ramboda\n\u2022 Stop at the beautiful Ramboda Waterfall for photos\n\u2022 Visit Labukale Tea Garden on the way\n\u2022 Visit Seetha Amman Hindu Kovil\n\u2022 Take a serene walk through Gregory Park and enjoy sunset by Lake Gregory\n\u2022 Enjoy a classic high tea experience at the Grand Hotel\n\u2022 Dinner and overnight stay in Nuwara Eliya"
      },

      {
        "title": "Day 6: Nuwara Eliya to Yala - Ella Highlights and Safari",
        "description": "\u2022 Adventure\n\u2022 After breakfast, proceed to Yala\n\u2022 Visit the iconic Nine Arches Bridge in Demodara\n\u2022 Hike Little Adam\u2019s Peak through scenic tea plantations\n\u2022 Enjoy a 3 to 4 hour safari at Yala National Park and explore exotic wildlife\n\u2022 Speak with an experienced trekker to learn about the park\u2019s animals and birdlife\n\u2022 Keep an eye out for elusive leopards\n\u2022 Dinner and overnight stay in Yala"
      },

      {
        "title": "Day 7: Yala to Kalutara - Galle Fort, Stilt Fishing and River",
        "description": "\u2022 Safari\n\u2022 After breakfast, proceed towards Bentota and Kalutara area\n\u2022 Visit Rumassala Temple, perched on Rumassala Hill\n\u2022 Witness Sri Lankan stilt fishermen in their traditional fishing style\n\u2022 Visit the Galle Dutch Fort, a UNESCO World Heritage Site by the sea\n\u2022 Enjoy a scenic Madu River boat safari through beautiful mangroves\n\u2022 Dinner and overnight stay in Kalutara (Bentota area)"
      },

      {
        "title": "Day 8: Kalutara - Bawa Estate, Water Sports, Turtles and",
        "description": "\u2022 Sunset\n\u2022 Breakfast at the hotel\n\u2022 Visit Lunuganga Estate, the famous country home of architect Geoffrey Bawa\n\u2022 Optional water sports in Bentota: jet ski, banana boat, tube rides, diving, snorkeling,\n\u2022 deep-sea fishing\n\u2022 Visit the Kosgoda Turtle Hatchery and learn about sea turtle conservation\n\u2022 Take a relaxing beach stroll and enjoy a spectacular sunset\n\u2022 Dinner and overnight stay in Kalutara (Bentota area)"
      },

      {
        "title": "Day 9: Kalutara to Colombo - City Sights and Shopping",
        "description": "\u2022 After breakfast, proceed to Colombo\n\u2022 Visit Gangaramaya Buddhist Temple and admire its cultural and modern blend\n\u2022 Explore Colombo Fort area, including the lively bazaar, Red Mosque, and Dutch\n\u2022 Museum\n\u2022 Enjoy shopping at popular spots such as ODEL, Noritake, House of Fashion, Ceylon\n\u2022 tea shops, and Sri Lankan handicraft stores\n\u2022 Visit Galle Face Green and view the Old Parliament building nearby\n\u2022 Overnight stay in Colombo"
      },

      {
        "title": "Day 10: Departure - Airport Drop-off",
        "description": "\u2022 Breakfast at the hotel (as per hotel arrangements)\n\u2022 Transfer to the airport for departure, timed to your flight schedule"
      },

    ],
    "inclusions": [
      "Private Driver/Guide",
      "Private Superior Car",
      "Half Board (Breakfast & Dinner)",
      "Airport Drop-off",
      "Airport Pick-up",
      "Tour Consultant",
    ],
    "mapImage": "10 days sri lanka dream route.png",
    "images": [
      "/package_images/SL-10D9N-STD-01.jpg",
    ],
    "themes": ["Beach & Relax", "Adventure", "Wildlife & Nature", "Honeymoon", "Culture & Heritage", "Hill Country"],
    "activities": ["City Tour", "Snorkeling/Diving", "Train Ride", "Cultural Show", "Tea Factory Visit", "Safari", "Boat Ride", "Hiking/Trekking"],
  },

  {
    "id": "SL-10D9N-STD-02",
    "title": "Amazing Sri Lanka Tour (10 days)",
    "startingPrice": "$1,500",
    "description": "Duration: 10 days / 9 nights\nType: Private escorted tour\nSuitable For: Couples, families, friends, solo travelers",
    "days": [
      {
        "title": "Day 1: Dambulla - Caves, Culture, and Local Life",
        "description": "\u2022 Visit the Dambulla Cave Temple and explore ancient murals and statues\n\u2022 Sightseeing around Dambulla with a feel of local village life and rural landscapes\n\u2022 Watch a cultural dance show in Dambulla with traditional drumming and fire acts\n\u2022 Evening at leisure and relax at the hotel\n\u2022 Optional experiences\n\u2022 Sigiriya Lion Rock climb\n\u2022 Habarana village tour with bullock cart ride, local lunch, and village interaction"
      },

      {
        "title": "Day 2: Cultural Triangle - Polonnaruwa and Wildlife Safari",
        "description": "\u2022 Explore the Polonnaruwa Ancient Kingdom and walk among historic ruins and sacred\n\u2022 Visit Minneriya National Park and Lake\n\u2022 Optional jeep safari at Minneriya, Habarana, or Kaudulla to spot elephants and\n\u2022 wildlife\n\u2022 Return to the hotel and unwind\n\u2022 Optional experiences\n\u2022 Anuradhapura Ancient City visit\n\u2022 Additional wild safari options in the area"
      },

      {
        "title": "Day 3: Kandy - Elephants, Viewpoints, and Sacred Temple",
        "description": "\u2022 Visit Pinnawala Elephant Orphanage and observe rescued elephants\n\u2022 Stop at Kadugannawa Viewpoint for stunning hill-country views\n\u2022 Visit the Temple of the Tooth Relic, the most sacred temple in Kandy\n\u2022 Enjoy a peaceful walk by Kandy Lake\n\u2022 Optional experiences\n\u2022 Open Zoo at Pinnawala\n\u2022 Peradeniya Botanical Garden\n\u2022 Embekke Wood Carvings\n\u2022 Bahirawa Kanda Buddha statue viewpoint"
      },

      {
        "title": "Day 4: Nuwara Eliya - Waterfalls, Tea, and Cool Hills",
        "description": "\u2022 Stop at Ramboda Waterfall for scenic photos\n\u2022 Visit Labookellie Tea Factory and learn tea production with fresh tasting\n\u2022 Drive through tea plantations and enjoy the hill-country scenery\n\u2022 Relax by Gregory Lake in the cool climate\n\u2022 Optional experiences\n\u2022 Hanuman Temple visit\n\u2022 Hakgala Botanical Garden\n\u2022 Ambuluwawa Tower for panoramic views"
      },

      {
        "title": "Day 5: Ella - Nine Arch Bridge and Mountain Views",
        "description": "\u2022 Explore Ella town and enjoy the relaxed hill vibe\n\u2022 Visit the iconic Nine Arch Bridge\n\u2022 Hike Little Adam\u2019s Peak for beautiful viewpoints\n\u2022 Visit Kubalwela Temple for a calm cultural stop\n\u2022 Evening at leisure in Ella\n\u2022 Optional experiences\n\u2022 Ella train ride experience\n\u2022 Seetha Amman Temple\n\u2022 Flying Ravana zipline and adventure activities\n\u2022 Ella Rock hike\n\u2022 Ravana Cave exploration\n\u2022 Lipton\u2019s Seat viewpoint\n\u2022 Edison Bungalow in Haputale"
      },

      {
        "title": "Day 6: Yala or Udawalawe - Waterfall Stops and Safari",
        "description": "\u2022 Adventure\n\u2022 Stop at Ravana Waterfall near Ella\n\u2022 Visit Buduruwagala ancient rock statues\n\u2022 Enjoy scenic forest views on the way to the national park region\n\u2022 Observe Wallawaya paddy fields and rural landscapes\n\u2022 Go on a jeep safari at Yala or Udawalawe to spot elephants, wildlife, and possible\n\u2022 leopards\n\u2022 Optional experiences\n\u2022 Clay craft center visit to see traditional pottery making"
      },

      {
        "title": "Day 7: South Coast - Beaches and Scenic Highlights",
        "description": "\u2022 Visit Tissa Lake and a Buddhist temple\n\u2022 Relax at Mirissa Beach\n\u2022 Visit Coconut Tree Hill for iconic coastal views\n\u2022 Enjoy Weligama Beach, great for ocean vibes and photos\n\u2022 Optional experiences\n\u2022 Kataragama Temple visit\n\u2022 Whale watching tour in Mirissa (seasonal)\n\u2022 Surfing in Weligama"
      },

      {
        "title": "Day 8: South Coast - Galle Fort and Hikkaduwa Beach Time",
        "description": "\u2022 Explore the historic Galle Fort and walk through colonial streets\n\u2022 Experience Weligama stilt fishing views and photo moments\n\u2022 Relax at Hikkaduwa Beach, famous for its lively atmosphere and coral reef coast\n\u2022 Optional experiences\n\u2022 Water sports in Hikkaduwa such as snorkeling, diving, and reef exploration"
      },

      {
        "title": "Day 9: Colombo - Culture, Port City, and City Seaside",
        "description": "\u2022 Visit Ambalangoda Mask Museum and learn about traditional mask-making\n\u2022 Enjoy Southern Expressway sightseeing on the way to Colombo\n\u2022 Visit Galle Face Green for a seaside city stroll\n\u2022 Visit Port City for modern waterfront views\n\u2022 Visit Gangaramaya Temple, a unique blend of culture and architecture\n\u2022 Free time to relax and explore Colombo\n\u2022 Optional experiences\n\u2022 Kosgoda Turtle Hatchery\n\u2022 Madu River safari through mangroves\n\u2022 Lakshmi Amman Kovil\n\u2022 Lotus Tower city views\n\u2022 Colombo National Museum"
      },

      {
        "title": "Day 10: Departure - Colombo Shopping and Airport",
        "description": "\u2022 Transfer\n\u2022 Enjoy your final hours in Colombo at leisure\n\u2022 Shopping for souvenirs and gifts\n\u2022 Transfer to the airport for departure"
      },

    ],
    "inclusions": [
      "Private Driver/Guide",
      "Private Superior Car",
      "Half Board (Breakfast & Dinner)",
      "Airport Drop-off",
      "Airport Pick-up",
      "Tour Consultant",
    ],
    "mapImage": "10 days sri lanka dream route.png",
    "images": [
      "/package_images/SL-10D9N-STD-02.jpg",
    ],
    "themes": ["Beach & Relax", "Adventure", "Wildlife & Nature", "Honeymoon", "Culture & Heritage", "Hill Country"],
    "activities": ["City Tour", "Snorkeling/Diving", "Train Ride", "Cultural Show", "Tea Factory Visit", "Safari", "Boat Ride", "Whale Watching", "Hiking/Trekking"],
  },

  {
    "id": "SL-11D10N-STD-01",
    "title": "Full Spectrum Journey (11 days)",
    "startingPrice": "$2,000",
    "description": "Duration: 11 days / 10 nights\nType: Private escorted tour\nSuitable For: Family, Couple, Friends",
    "days": [
      {
        "title": "Day 1: Arrival - Negombo, Coastal Welcome",
        "description": "\u2022 Arrival and assistance at the airport, then proceed to Negombo\n\u2022 Visit St. Mary\u2019s Church in Negombo\n\u2022 Boat ride along the Hamilton Canal and visit the old Dutch Fort in Negombo\n\u2022 Visit a nearby fishing village to experience local lifestyle\n\u2022 Enjoy the evening breeze with a colorful sunset experience\n\u2022 Relax with a beach walk and enjoy Negombo\u2019s lively nightlife\n\u2022 Overnight stay in Negombo"
      },

      {
        "title": "Day 2: Negombo to Sigiriya - Elephants, Viewpoints, and",
        "description": "\u2022 Village Life\n\u2022 After breakfast, proceed to Sigiriya\n\u2022 En route, visit Pinnawala Elephant Orphanage\n\u2022 Climb Pidurangala Rock for the iconic Sigiriya Lion Rock view\n\u2022 Village walk to experience Sri Lankan culture and village life\n\u2022 Enjoy a traditional Sri Lankan boat ride\n\u2022 Dinner and overnight stay in Sigiriya"
      },

      {
        "title": "Day 3: Sigiriya - Ancient Kingdom and Wildlife Safari",
        "description": "\u2022 Breakfast at the hotel\n\u2022 Optional morning visit to Polonnaruwa, Sri Lanka\u2019s second ancient capital (UNESCO\n\u2022 World Heritage Site)\n\u2022 Climb the Sigiriya Rock Fortress, the legendary ancient fortress built on a rock\n\u2022 Wildlife safari at Minneriya National Park to spot elephants, leopards, and\n\u2022 other endemic animals\n\u2022 Dinner and overnight stay in Sigiriya"
      },

      {
        "title": "Day 4: Sigiriya to Kandy - Temples, Spices, and Culture",
        "description": "\u2022 After breakfast, proceed to Kandy\n\u2022 Stop at the Dambulla Cave Temple (UNESCO World Heritage Site)\n\u2022 Visit a spice village and learn about world-famous Ceylon spices\n\u2022 Visit the Temple of the Tooth Relic, the main attraction in Kandy\n\u2022 Visit the Royal Botanical Garden in Kandy\n\u2022 Optional Sri Lankan traditional cultural show (time permitting)\n\u2022 Dinner and overnight stay in Kandy"
      },

      {
        "title": "Day 5: Kandy to Nuwara Eliya - Tea Country and Sunset by",
        "description": "\u2022 the Lake\n\u2022 After breakfast, proceed to Nuwara Eliya\n\u2022 Optional scenic train ride from Kandy to Nuwara Eliya\n\u2022 En route near Ramboda, visit Shri Bhakta Hanuman Hindu Temple\n\u2022 Visit Labukale Tea Garden on the way\n\u2022 Walk through Gregory Park and enjoy the sunset by Lake Gregory\n\u2022 Dinner and overnight stay in Nuwara Eliya"
      },

      {
        "title": "Day 6: Nuwara Eliya - Horton Plains and High Tea",
        "description": "\u2022 Experience\n\u2022 Breakfast at the hotel\n\u2022 Visit Horton Plains National Park\n\u2022 Visit Seetha Amman Hindu Kovil\n\u2022 Enjoy high tea at the Grand Hotel\n\u2022 Dinner and overnight stay in Nuwara Eliya"
      },

      {
        "title": "Day 7: Nuwara Eliya to Yala - Ella Sights and Safari",
        "description": "\u2022 Adventure\n\u2022 After breakfast, proceed to Yala\n\u2022 Visit Ella and the famous Nine Arches Bridge\n\u2022 Visit Buduruwagala and see the tallest Buddha statue on the island\n\u2022 3 to 4 hour safari at Yala National Park to explore exotic wildlife\n\u2022 Optional visit to Kataragama Hindu Temple (if interested and time permits)\n\u2022 Dinner and overnight stay in Yala"
      },

      {
        "title": "Day 8: Yala to Kalutara - Galle Fort, Stilt Fishing, and River",
        "description": "\u2022 Safari\n\u2022 After breakfast, proceed to Bentota and Kalutara area\n\u2022 Witness Sri Lankan stilt fishermen fishing in the traditional style\n\u2022 Visit Galle Fort and enjoy a Galle city tour\n\u2022 Madu River boat safari through beautiful mangroves\n\u2022 Stop at a fish farm during the river ride and, if you like, try Sri Lankan fish therapy\n\u2022 Dinner and overnight stay in Kalutara"
      },

      {
        "title": "Day 9: Kalutara - Bawa Estate, Water Sports, Turtles, and",
        "description": "\u2022 Sunset\n\u2022 Breakfast at the hotel\n\u2022 Visit Lunuganga Estate, Geoffrey Bawa\u2019s famous country home\n\u2022 Optional water sports in Bentota: jet ski, banana boat, tube boating, diving,\n\u2022 snorkeling, deep-sea fishing\n\u2022 Visit Kosgoda Turtle Hatchery and learn about sea turtle conservation\n\u2022 Enjoy a relaxing beach stroll and a spectacular sunset\n\u2022 Dinner and overnight stay in Kalutara"
      },

      {
        "title": "Day 10: Kalutara to Colombo - City Highlights and",
        "description": "\u2022 Shopping\n\u2022 After breakfast, proceed to Colombo\n\u2022 Visit Gangaramaya Buddhist Temple and admire its cultural and modern\n\u2022 architectural blend\n\u2022 Explore Colombo Fort area, including the bazaar, Red Mosque, and Dutch\n\u2022 Museum\n\u2022 Shopping time at ODEL, Noritake, House of Fashion, Ceylon tea shops, Sri Lankan\n\u2022 handicrafts, and more\n\u2022 Overnight stay in Colombo"
      },

      {
        "title": "Day 11: Departure - Airport Drop-off",
        "description": "\u2022 Breakfast at the hotel\n\u2022 Transfer to the airport for departure (as per flight schedule)"
      },

    ],
    "inclusions": [
      "Private Driver/Guide",
      "Private Superior Car",
      "Half Board (Breakfast & Dinner)",
      "Airport Drop-off",
      "Airport Pick-up",
      "Tour Consultant",
    ],
    "images": [
      "/full spectrum 11 days.webp",
    ],
    "themes": ["Beach & Relax", "Adventure", "Wildlife & Nature", "Honeymoon", "Culture & Heritage", "Hill Country"],
    "activities": ["City Tour", "Snorkeling/Diving", "Train Ride", "Cultural Show", "Safari", "Boat Ride", "Hiking/Trekking"],
  },

  {
    "id": "SL-12D11N-STD-01",
    "title": "Ceylon Panorama Journey (12 days)",
    "startingPrice": "$1,800",
    "description": "Duration: 12 days / 11 nights\nType: Private escorted tour\nSuitable For: Families, couples, and friends",
    "days": [
      {
        "title": "Day 1: Arrival - Negombo",
        "description": "\u2022 Arrival and assistance at the airport, proceed to Negombo\n\u2022 Visit St. Mary\u2019s Church in Negombo, often called \u201cLittle Rome\u201d\n\u2022 Boat ride along the Hamilton Canal and visit the old Dutch Fort\n\u2022 Visit a nearby fishing village to experience local lifestyle\n\u2022 Optional Ayurvedic spa session (can be pre-arranged)\n\u2022 Enjoy the evening breeze with a beautiful sunset experience\n\u2022 Beach walk and enjoy Negombo\u2019s lively nightlife\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 2: Negombo to Anuradhapura - Safari and Heritage",
        "description": "\u2022 After breakfast, proceed to Anuradhapura\n\u2022 Half-day jeep safari at Wilpattu National Park\n\u2022 Visit Isurumuniya Temple and admire the Lovers\u2019 Statue, Elephant Pond, and stone\n\u2022 carvings\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 3: Anuradhapura - Sacred City and Sunset at Mihintale",
        "description": "\u2022 Breakfast at the hotel\n\u2022 Visit the key ancient sites including:\n\u2022 Ruwanwelisaya\n\u2022 Mirisawetiya\n\u2022 Jetavanaramaya\n\u2022 Thuparamaya\n\u2022 Lovamahapaya\n\u2022 Kuttam Pokuna\n\u2022 Samadhi Pilimaya\n\u2022 Satmahal Prasada\n\u2022 Guard Stone\n\u2022 See the famous semi-circular stone carving found at the foot of steps in ancient\n\u2022 Buddhist buildings (moonstone)\n\u2022 Visit Mihintale, where Buddhism was introduced to Sri Lanka\n\u2022 Climb Mihintale Rock to witness a stunning sunset\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 4: Anuradhapura to Sigiriya - Aukana and Rock",
        "description": "\u2022 Fortress\n\u2022 After breakfast, proceed to Sigiriya\n\u2022 Visit the Aukana Temple and admire the towering rock-carved Buddha statue\n\u2022 Climb the Sigiriya Rock Fortress, the legendary ancient citadel\n\u2022 Climb Pidurangala Rock for the iconic view of Sigiriya Lion Rock\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 5: Sigiriya - Polonnaruwa, Village Life, and Minneriya",
        "description": "\u2022 Safari\n\u2022 After breakfast at the hotel\n\u2022 Morning visit to Polonnaruwa, Sri Lanka\u2019s second ancient capital and a UNESCO\n\u2022 World Heritage Site\n\u2022 Village walk to experience Sri Lankan culture and village life\n\u2022 Enjoy a Sri Lankan traditional boat ride\n\u2022 Wildlife safari at Minneriya National Park to see elephants, leopards, and\n\u2022 other endemic animals\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 6: Sigiriya to Kandy - Culture, Gardens, and Crafts",
        "description": "\u2022 After breakfast, proceed to Kandy\n\u2022 Stop at the Dambulla Cave Temple (UNESCO World Heritage Site)\n\u2022 Spice village tour to learn about world-famous Ceylon spices\n\u2022 Visit the Temple of the Tooth Relic, Kandy\u2019s main attraction\n\u2022 Visit the Royal Botanical Garden in Peradeniya\n\u2022 Watch Sri Lankan handicrafts and batik-making\n\u2022 Learn about Ceylon gems and craftsmanship\n\u2022 Optional Sri Lankan traditional cultural show (time permitting)\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 7: Kandy to Nuwara Eliya - Tea Country and High Tea",
        "description": "\u2022 After breakfast, proceed to Nuwara Eliya\n\u2022 Visit Shri Bhakta Hanuman Hindu Temple near Ramboda\n\u2022 Stop at Ramboda Waterfall for photos\n\u2022 Stop at Labukale Tea Garden on the way\n\u2022 Visit Seetha Amman Hindu Kovil\n\u2022 Enjoy high tea at the Grand Hotel\n\u2022 Evening walk at Gregory Park and watch the sunset by Lake Gregory\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 8: Nuwara Eliya to Yala - Ella Views and Safari",
        "description": "\u2022 Adventure\n\u2022 After breakfast, proceed to Yala\n\u2022 Scenic train ride from Nuwara Eliya to Ella\n\u2022 Explore Ella and visit the Nine Arches Bridge\n\u2022 Visit Buduruwagala and see the island\u2019s tallest Buddha statue\n\u2022 3 to 4 hour safari at Yala National Park to explore exotic wildlife\n\u2022 Look out for elusive leopards and elephants\n\u2022 Speak with an experienced trekker to learn about the park\u2019s wildlife and bird species\n\u2022 Optional visit to Kataragama Hindu Temple (time and interest permitting)\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 9: Yala to Kalutara - Galle Fort and Madu River",
        "description": "\u2022 After breakfast, proceed to Bentota and Kalutara area\n\u2022 Witness Sri Lankan stilt fishermen in their traditional fishing style\n\u2022 Visit Galle Fort and enjoy a Galle city tour\n\u2022 Boat ride on the Madu River through mangroves\n\u2022 Stop at a fish farm during the river ride and, if interested, try Sri Lankan fish therapy\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 10: Kalutara - Bawa Estate, Turtles, Water Sports,",
        "description": "\u2022 Sunset\n\u2022 Breakfast at the hotel\n\u2022 Visit Lunuganga Estate, the country home of architect Geoffrey Bawa\n\u2022 Optional water sports in Bentota: jet ski, banana boat, tube boating, diving,\n\u2022 snorkeling, deep-sea fishing\n\u2022 Visit the Kosgoda Turtle Hatchery and learn about sea turtle conservation\n\u2022 Beach stroll and enjoy a spectacular sunset\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 11: Kalutara to Colombo - City Highlights, Shopping,",
        "description": "\u2022 Nightlife\n\u2022 After breakfast, proceed to Colombo\n\u2022 Visit Gangaramaya Buddhist Temple and admire the blend of culture and modern\n\u2022 architecture\n\u2022 Visit Lotus Tower for panoramic views over Colombo\n\u2022 Stop at Independence Square and Arcade Independence Square\n\u2022 Visit Galle Face Green and see the Old Parliament building\n\u2022 Shopping time at ODEL, Noritake, House of Fashion, Ceylon tea shops, Sri Lankan\n\u2022 handicrafts, and more\n\u2022 Evening option to visit pubs, clubs, and casinos\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 12: Departure - Airport Drop-off",
        "description": "\u2022 Breakfast at the hotel\n\u2022 Transfer to the airport for departure (as per flight schedule)"
      },

    ],
    "inclusions": [
      "Private Driver/Guide",
      "Private Superior Car",
      "Half Board (Breakfast & Dinner)",
      "Airport Drop-off",
      "Airport Pick-up",
      "Tour Consultant",
    ],
    "mapImage": "12 days ceylon panorama journey.png",
    "images": [
      "/package_images/SL-12D11N-STD-01.jpg",
    ],
    "themes": ["Beach & Relax", "Adventure", "Wildlife & Nature", "Honeymoon", "Culture & Heritage", "Hill Country"],
    "activities": ["City Tour", "Snorkeling/Diving", "Train Ride", "Cultural Show", "Safari", "Boat Ride", "Hiking/Trekking"],
  },

  {
    "id": "SL-12D11N-HNM-02",
    "title": "Dreamy Honeymoon Days (12 days)",
    "startingPrice": "$4,850",
    "description": "Duration: 12 days / 11 nights\nType: Private honeymoon tour\nSuitable For: Couples",
    "days": [
      {
        "title": "Day 1: Arrival - Negombo",
        "description": "\u2022 Arrival and private transfer to Negombo (Kotugoda area)\n\u2022 Check in at the hotel and unwind\n\u2022 Stroll through churches and Grand Street\n\u2022 Optional sunset boat ride through the Dutch Canal in Muthurajawela Wetland\n\u2022 Optional Negombo city exploration, also known as \u201cLittle Rome\u201d\n\u2022 Relax and enjoy a calm evening"
      },

      {
        "title": "Day 2: Negombo to Dambulla",
        "description": "\u2022 After breakfast, transfer to Dambulla\n\u2022 En route visit the tranquil Ridi Viharaya Temple\n\u2022 Arrive and enjoy a relaxed evening at the hotel"
      },

      {
        "title": "Day 3: Dambulla - Sigiriya and Pidurangala Romance",
        "description": "\u2022 Climb Sigiriya Rock Fortress for breathtaking views and ancient history\n\u2022 Sunset visit to Pidurangala Rock for stunning Sigiriya views and a magical golden-\n\u2022 hour moment"
      },

      {
        "title": "Day 4: Dambulla - Polonnaruwa and Optional Safari",
        "description": "\u2022 Visit the ancient city of Polonnaruwa and explore historic ruins\n\u2022 Optional jeep safari at Minneriya National Park for an unforgettable wildlife\n\u2022 experience"
      },

      {
        "title": "Day 5: Dambulla to Pussellawa via Kandy",
        "description": "\u2022 Transfer to the Central Highlands and continue to Pussellawa\n\u2022 Visit the Temple of the Tooth Relic in Kandy\n\u2022 Stroll around Kandy Lake\n\u2022 Visit the Royal Botanical Gardens in Peradeniya\n\u2022 Continue to Pussellawa and settle in for a peaceful evening"
      },

      {
        "title": "Day 6: Pussellawa - Tea, Waterfalls, and High Tea",
        "description": "\u2022 Explore Pussellawa at a relaxed pace\n\u2022 Tea experiences with local tea pluckers\n\u2022 Visit Geradigini Ella Falls\n\u2022 Visit Kotmale Reservoir\n\u2022 Return to the hotel for a delightful high tea by the poolside"
      },

      {
        "title": "Day 7: Pussellawa - Ramayana Trails and Scenic Discoveries",
        "description": "\u2022 Explore Pussellawa and its romantic Ramayana-era legends\n\u2022 Morning visit to the Lord Hanuman temple\n\u2022 Visit Chariot Path and Kadadora Temple\n\u2022 Explore Kotmale and surrounding scenic areas\n\u2022 Optional experiences based on time: hidden waterfalls, local temples, and short\n\u2022 scenic train journeys"
      },

      {
        "title": "Day 8: Pussellawa to Yala via Nuwara Eliya and Ella",
        "description": "\u2022 Early morning drive to Nuwara Eliya to explore \u201cLittle England\u201d\n\u2022 Scenic train journey to Ella\n\u2022 Visit the iconic Nine Arches Bridge for photos\n\u2022 Capture moments at the Ella Swing\n\u2022 Relax at Ravana Pool Club\n\u2022 Continue the drive to Yala and check in"
      },

      {
        "title": "Day 9: Yala - Wildlife Adventure",
        "description": "\u2022 Jeep safari in Yala National Park\n\u2022 Spot wildlife such as elephants, leopards, deer, and birdlife (sightings depend on\n\u2022 the day)\n\u2022 Return to the hotel and enjoy a relaxed evening"
      },

      {
        "title": "Day 10: Yala to Galle - Coastal Icons",
        "description": "\u2022 Transfer to Galle\n\u2022 Stop at Coconut Tree Hill in Mirissa for iconic views\n\u2022 Visit the stilt fishermen in Ahangama\n\u2022 Optional: try the stilt fishing pose if weather and conditions allow\n\u2022 Arrive in Galle and enjoy the coastal atmosphere"
      },

      {
        "title": "Day 11: Galle - Fort Walk and Sundowner",
        "description": "\u2022 Guided walk inside the Royal Dutch Fort in Galle\n\u2022 Visit the Dutch Reformed Church\n\u2022 Enjoy sundowners at Galle Fort with stunning rampart views"
      },

      {
        "title": "Day 12: Departure - Airport Drop-off",
        "description": "\u2022 Breakfast at the hotel\n\u2022 Free time depending on flight schedule\n\u2022 Private transfer to the airport for departure"
      },

    ],
    "inclusions": [
      "Private Driver/Guide",
      "Private Superior Car",
      "Half Board (Breakfast & Dinner)",
      "Airport Drop-off",
      "Airport Pick-up",
      "Tour Consultant",
    ],
    "mapImage": "12 days dreamy honeymoon days.png",
    "images": [
      "/dereamyhoneymoon 12 days.webp",
    ],
    "themes": ["Beach & Relax", "Adventure", "Wildlife & Nature", "Honeymoon", "Culture & Heritage", "Hill Country"],
    "activities": ["City Tour", "Train Ride", "Cultural Show", "Safari", "Boat Ride", "Whale Watching", "Hiking/Trekking"],
  },

  {
    "id": "SL-14D13N-CLT-01",
    "title": "Journey Culture and Nature (14 days)",
    "startingPrice": "$2,670",
    "description": "Duration: 14 days / 13 nights\nType: Private escorted tour\nSuitable For: Couples, families",
    "days": [
      {
        "title": "Day 1: Arrival - Negombo",
        "description": "\u2022 Arrive in Sri Lanka\n\u2022 Transfer to Negombo\n\u2022 Warm welcome by your representative\n\u2022 Welcome meeting at 6:00 pm\n\u2022 Dinner at the hotel\n\u2022 Overnight stay in Negombo"
      },

      {
        "title": "Day 2: Negombo to Dambulla - Village Life and Local",
        "description": "\u2022 Experiences\n\u2022 Visit the Negombo Fish Market\n\u2022 Proceed to Dambulla\n\u2022 Visit a coconut plantation\n\u2022 Enjoy a bullock cart ride\n\u2022 Glide across the lake by catamaran\n\u2022 Traditional village tour with a local lunch\n\u2022 Overnight stay in Dambulla"
      },

      {
        "title": "Day 3: Anuradhapura and Minneriya - Ancient Capital and",
        "description": "\u2022 Safari\n\u2022 Explore Sri Lanka\u2019s 1st ancient capital, Anuradhapura\n\u2022 Visit the sacred Sri Maha Bodhi Tree\n\u2022 Explore historical stupas and ancient sites\n\u2022 Afternoon safari in Minneriya National Park\n\u2022 Overnight stay in Dambulla"
      },

      {
        "title": "Day 4: Polonnaruwa and Sigiriya - Heritage and Sunset",
        "description": "\u2022 Explore Sri Lanka\u2019s 2nd ancient capital, Polonnaruwa\n\u2022 Climb Sigiriya Rock Fortress at sunset\n\u2022 Overnight stay in Dambulla"
      },

      {
        "title": "Day 5: Dambulla to Kandy - Caves, Spices, Lake Walk,",
        "description": "\u2022 and Culture\n\u2022 Visit the Dambulla Cave Temple\n\u2022 Explore a spice garden in Matale\n\u2022 Stroll by Kandy Lake at dusk\n\u2022 Visit a gem lapidary\n\u2022 Enjoy a Kandyan dancing performance\n\u2022 Overnight stay in Kandy"
      },

      {
        "title": "Day 6: Kandy - Gardens, Heritage, Temple, and Street Food",
        "description": "\u2022 Visit the Royal Botanical Garden\n\u2022 Tour the Suriyakantha Center for Kandyan heritage\n\u2022 Visit the Temple of the Tooth Relic\n\u2022 Street food stroll in Kandy\n\u2022 Overnight stay in Kandy"
      },

      {
        "title": "Day 7: Kandy to Nuwara Eliya - Scenic Train and High Tea",
        "description": "\u2022 Scenic train ride to Nuwara Eliya (subject to availability)\n\u2022 High tea experience at the Grand Hotel\n\u2022 Tour a tea factory and tea plantation\n\u2022 Overnight stay in Nuwara Eliya"
      },

      {
        "title": "Day 8: Horton Plains and Nuwara Eliya - Nature and City",
        "description": "\u2022 Optional trek at Horton Plains National Park\n\u2022 Nuwara Eliya city walk\n\u2022 Overnight stay in Nuwara Eliya"
      },

      {
        "title": "Day 9: Ella - Cooking Class, Bridge Visit, and Viewpoint",
        "description": "\u2022 Sri Lankan cooking class in Ella\n\u2022 Visit the Nine Arches Bridge\n\u2022 Hike to Little Adam\u2019s Peak\n\u2022 Overnight stay in the Yala area"
      },

      {
        "title": "Day 10: Yala - Game Drive and Holy City Visit",
        "description": "\u2022 Game drive in Yala National Park\n\u2022 Visit Kataragama Holy City\n\u2022 Overnight stay in the Yala area"
      },

      {
        "title": "Day 11: Yala to Galle - Elephants, Stilt Fishing, and Fort",
        "description": "\u2022 Visit the Elephant Transit Home\n\u2022 Visit stilt fishermen in Ahangama\n\u2022 Explore Galle Fort\n\u2022 Overnight stay in Galle"
      },

      {
        "title": "Day 12: Bentota - Beach Day, Turtles, and River Safari",
        "description": "\u2022 Beach day in Bentota\n\u2022 Visit a turtle conservation project\n\u2022 Madu River boat safari\n\u2022 Overnight stay in Bentota"
      },

      {
        "title": "Day 13: Colombo - City Tour, Bazaar Walk, and Farewell",
        "description": "\u2022 Dinner\n\u2022 Guided city tour of Colombo\n\u2022 Walking tour of the Colombo bazaar\n\u2022 Farewell dinner in Colombo\n\u2022 Overnight stay in Colombo"
      },

      {
        "title": "Day 14: Departure - Airport Drop-off",
        "description": "\u2022 Breakfast at the hotel\n\u2022 Transfer to the airport for departure (as per flight schedule)"
      },

    ],
    "inclusions": [
      "Private Driver/Guide",
      "Private Superior Car",
      "Half Board (Breakfast & Dinner)",
      "Airport Drop-off",
      "Airport Pick-up",
      "Tour Consultant",
    ],
    "images": [
      "/journey nature and culateu 14 days.webp",
    ],
    "themes": ["Beach & Relax", "Adventure", "Wildlife & Nature", "Honeymoon", "Culture & Heritage", "Hill Country"],
    "activities": ["City Tour", "Cooking Class", "Train Ride", "Cultural Show", "Tea Factory Visit", "Safari", "Boat Ride", "Hiking/Trekking"],
  },

  {
    "id": "SL-13D12N-STD-01",
    "title": "Sri Lanka Grand Discovery Tour (13 days)",
    "startingPrice": "$1,880",
    "description": "Duration: 13 days / 12 nights\nType: Private escorted tour\nSuitable For: Anyone",
    "days": [
      {
        "title": "Day 1: Arrival - Negombo",
        "description": "\u2022 Arrival and assistance at the airport, proceed to Negombo\n\u2022 Explore St. Mary\u2019s Church in Negombo, the heart of \u201cLittle Rome\u201d\n\u2022 Enjoy a boat ride on Hamilton Canal and visit the old Dutch Fort in Negombo\n\u2022 Visit a fishing village for a glimpse of authentic local life\n\u2022 Enjoy the evening breeze with a stunning sunset sky\n\u2022 Overnight stay at the hotel"
      },

      {
        "title": "Day 2: Negombo to Anuradhapura - Sacred City and",
        "description": "\u2022 Optional Safari\n\u2022 After breakfast, proceed to Anuradhapura\n\u2022 Discover Anuradhapura\u2019s sacred highlights, from towering stupas and ancient ponds\n\u2022 to the serene Samadhi Buddha\n\u2022 See the Lovers\u2019 Statue and stone carvings at Isurumuniya Temple\n\u2022 Optional: Half-day jeep safari at Wilpattu National Park\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 3: Anuradhapura to Sigiriya - Rock Temples and",
        "description": "\u2022 Viewpoints\n\u2022 After breakfast, proceed to Sigiriya\n\u2022 Marvel at the towering giant Buddha carved from solid rock at Aukana Temple\n\u2022 Climb the legendary Sigiriya Rock Fortress\n\u2022 Climb Pidurangala Rock for stunning views of Sigiriya Lion Rock\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 4: Sigiriya - Ancient City, Village Life, and Safari",
        "description": "\u2022 After breakfast at the hotel\n\u2022 Optional: Visit Polonnaruwa, Sri Lanka\u2019s second ancient capital and a UNESCO World\n\u2022 Heritage Site\n\u2022 Walk through a serene village to experience authentic Sri Lankan daily life\n\u2022 Enjoy a scenic traditional Sri Lankan boat ride\n\u2022 Wildlife safari in Minneriya National Park to spot elephants, leopards, and\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 5: Sigiriya to Kandy - Caves, Temple, Gardens, and",
        "description": "\u2022 After breakfast, proceed to Kandy\n\u2022 En route, explore the UNESCO-listed Dambulla Cave Temple\n\u2022 Visit the world-famous Temple of the Tooth Relic, Kandy\u2019s main attraction\n\u2022 Explore the serene Royal Botanical Garden in Kandy\n\u2022 Learn about the famous Ceylon gems\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 6: Kandy to Ella - Scenic Train and Sunset Moments",
        "description": "\u2022 After breakfast, proceed to Ella\n\u2022 Scenic train ride from Nanu Oya to Ella, one of the world\u2019s most beautiful journeys\n\u2022 Visit Ella\u2019s iconic Nine Arch Bridge\n\u2022 Relax at Ravana Pool Club with a sunset cocktail\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 7: Ella - Tea Trails and Adventure",
        "description": "\u2022 After breakfast at the hotel\n\u2022 Visit the charming tea plantations in Ella\n\u2022 Hike Little Adam\u2019s Peak through scenic tea plantations\n\u2022 Enjoy a thrilling zip line ride over Ella\u2019s landscapes\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 8: Ella to Yala - Safari Day",
        "description": "\u2022 After breakfast, proceed to Yala\n\u2022 Enjoy a safari in Yala National Park, spotting exotic wildlife in their natural habitat\n\u2022 Keep your eyes peeled to catch a glimpse of elusive leopards\n\u2022 Get up close with majestic elephants on your safari jeep adventure\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 9: Yala - Culture and Wildlife Encounters",
        "description": "\u2022 After breakfast at the hotel\n\u2022 Optional: Ride 40 km to sacred Kataragama through scenic backroads, ancient\n\u2022 ruins, and rich wildlife\n\u2022 See baby elephants rehabilitated at Udawalawe Elephant Transit Home\n\u2022 Visit Asia\u2019s largest Birds Park in Hambantota, home to thousands of birds and\n\u2022 many species\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 10: Yala to Kalutara - Galle Fort and River Safari",
        "description": "\u2022 After breakfast, proceed to Bentota and Kalutara area\n\u2022 See Sri Lankan stilt fishermen in action, practicing their traditional craft\n\u2022 Visit beautiful Galle Fort and enjoy the Galle city tour\n\u2022 Enjoy a scenic boat ride through Madu River\u2019s mangroves\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 11: Kalutara - Turtles, Water Sports, and Sunset Beach",
        "description": "\u2022 After breakfast at the hotel\n\u2022 Learn about Sri Lankan sea turtles at a turtle hatchery in Kosgoda\n\u2022 Enjoy exciting water sports in Bentota, including jet skiing, snorkeling, and deep-sea\n\u2022 fishing\n\u2022 Take a stroll along the calming beach and enjoy the spectacular sunset\n\u2022 Dinner and overnight stay at the hotel"
      },

      {
        "title": "Day 12: Kalutara to Colombo - City Highlights and Shopping",
        "description": "\u2022 After breakfast, proceed to Colombo\n\u2022 Visit Gangaramaya Temple and admire its blend of modern architecture and cultural\n\u2022 heritage\n\u2022 Visit Lotus Tower for breathtaking views of Colombo\n\u2022 Explore Galle Face Green and the historic Old Parliament building\n\u2022 Enjoy shopping at ODEL, Noritake, House of Fashion, tea shops, and local handicraft\n\u2022 stores\n\u2022 Overnight stay at the hotel"
      },

      {
        "title": "Day 13: Departure - Airport Drop-off",
        "description": "\u2022 Breakfast at the hotel\n\u2022 Transfer to the airport for departure (as per flight schedule)"
      },

    ],
    "inclusions": [
      "Private Driver/Guide",
      "Private Superior Car",
      "Half Board (Breakfast & Dinner)",
      "Airport Drop-off",
      "Airport Pick-up",
      "Tour Consultant",
    ],
    "images": [
      "/Sri Lanka Grand Discovery Tour (13 days).jpg",
    ],
    "themes": ["Beach & Relax", "Adventure", "Wildlife & Nature", "Culture & Heritage", "Hill Country"],
    "activities": ["City Tour", "Snorkeling/Diving", "Train Ride", "Tea Factory Visit", "Safari", "Boat Ride", "Hiking/Trekking"],
  },

  {
    "id": "SL-15D14N-HNM-01",
    "title": "Romantic Bliss (15 days)",
    "startingPrice": "$6,190",
    "description": "Duration: 15 days / 14 nights\nType: Tailor-made private honeymoon tour\nSuitable For: Couples",
    "days": [
      {
        "title": "Day 1: Arrival - Negombo",
        "description": "\u2022 Arrival and transfer to Negombo (Kotugoda area)\n\u2022 Visit Muthurajawela Wetland (optional if time permits)\n\u2022 Sail on local fishing boats (experience-based, weather dependent)\n\u2022 Visit the churches in Negombo\n\u2022 Optional: Explore Negombo city, also known as Little Rome\n\u2022 Evening at leisure and unwind"
      },

      {
        "title": "Day 2: Negombo to Sigiriya - Caves and Sunset Viewpoint",
        "description": "\u2022 Transfer towards Sigiriya\n\u2022 Visit the Dambulla Cave Temple (UNESCO World Heritage Site)\n\u2022 Climb Pidurangala Rock for a spectacular sunset view over Sigiriya\n\u2022 Return to the hotel and relax"
      },

      {
        "title": "Day 3: Sigiriya - Fortress and Wildlife Safari",
        "description": "\u2022 Visit the UNESCO-listed Sigiriya Rock Fortress\n\u2022 Enjoy the beautiful water gardens, frescoes, and panoramic views from the top\n\u2022 Jeep safari at Minneriya National Park to spot wild elephants and other wildlife"
      },

      {
        "title": "Day 4: Sigiriya to Pussellawa via Kandy - City of Love",
        "description": "\u2022 Moments\n\u2022 Transfer to Pussellawa via Kandy\n\u2022 Visit the Temple of the Tooth Relic\n\u2022 Explore Kandy city\n\u2022 Visit the Royal Botanical Gardens in Peradeniya\n\u2022 Continue to Pussellawa and settle in"
      },

      {
        "title": "Day 5: Pussellawa - Tea Trails and High Tea",
        "description": "\u2022 Tea experiences with local tea pluckers\n\u2022 Visit Geradigini Ella Falls viewpoint\n\u2022 Explore Kotmale Reservoir or hike to the top of Peacock Hill\n\u2022 High tea session by the poolside"
      },

      {
        "title": "Day 6: Pussellawa - Ramayana Trail and Scenic Stops",
        "description": "\u2022 Visit the Hanuman Temple\n\u2022 Visit Kadadora Temple\n\u2022 Enjoy a scenic train ride (subject to availability)\n\u2022 Visit scenic waterfalls and hidden viewpoints"
      },

      {
        "title": "Day 7: Pussellawa to Ella - Boutique Stops and Tea Craft",
        "description": "\u2022 Transfer to Ella\n\u2022 Visit Adisham Bungalow en route\n\u2022 Free time at Ravana Pool Club\n\u2022 Try the Ella Swing for memorable photo moments\n\u2022 Visit Amba Estate and learn about artisanal tea-making"
      },

      {
        "title": "Day 8: Ella - Viewpoints, Waterfalls, and Adventure",
        "description": "\u2022 Visit Lipton\u2019s Seat viewpoint for breathtaking views\n\u2022 Visit Upper Diyaluma Waterfall\n\u2022 Visit Ravana Waterfall\n\u2022 Explore the Nine Arches Bridge\n\u2022 Experience the Ravana zip-line for an adrenaline rush"
      },

      {
        "title": "Day 9: Ella to Yala - Elephants and Safari Night",
        "description": "\u2022 Transfer to Yala\n\u2022 Visit the Elephant Transit Home (baby elephant rehabilitation project)\n\u2022 Jeep safari at Yala National Park, with chances to spot Sri Lankan leopards and\n\u2022 other wildlife"
      },

      {
        "title": "Day 10: Yala - Nature Trails and Romance Under the Stars",
        "description": "\u2022 Bird watching trail with a resident naturalist\n\u2022 Second jeep safari at Yala National Park for more wildlife encounters\n\u2022 Romantic dinner on the beach under the stars"
      },

      {
        "title": "Day 11: Yala to Tangalle - Beach Time and Turtle Nesting",
        "description": "\u2022 Transfer to Tangalle\n\u2022 Leisure time at the beach to relax and unwind\n\u2022 Optional wellness and spa treatments\n\u2022 Turtle nesting experience at night (seasonal and nature dependent)"
      },

      {
        "title": "Day 12: Tangalle - Caves and Lagoon Sunset",
        "description": "\u2022 Visit Mulgirigala Caves and explore ancient murals\n\u2022 Sunset boat ride at Kalametiya Lagoon sanctuary"
      },

      {
        "title": "Day 13: Tangalle to Galle - Coastal Icons",
        "description": "\u2022 Transfer to Galle\n\u2022 Stop at Mirissa and Coconut Tree Hill for iconic views\n\u2022 Visit the stilt fishermen in Ahangama\n\u2022 Optional: Try the stilt fishing pose if weather and conditions allow"
      },

      {
        "title": "Day 14: Galle - Fort Walk and Sundowners",
        "description": "\u2022 Guided walk inside the Royal Dutch Fort in Galle\n\u2022 Visit the Dutch Reformed Church\n\u2022 Sundowners at Galle Fort overlooking the ramparts"
      },

      {
        "title": "Day 15: Departure - Airport Drop-off",
        "description": "\u2022 Breakfast at the hotel\n\u2022 Transfer to the airport for departure (as per flight schedule)"
      },

    ],
    "inclusions": [
      "Private Driver/Guide",
      "Private Superior Car",
      "Half Board (Breakfast & Dinner)",
      "Airport Drop-off",
      "Airport Pick-up",
      "Tour Consultant",
    ],
    "images": [
      "/Romantic Bliss (15 days).jpg",
    ],
    "themes": ["Beach & Relax", "Adventure", "Wildlife & Nature", "Honeymoon", "Culture & Heritage", "Hill Country"],
    "activities": ["City Tour", "Train Ride", "Safari", "Boat Ride", "Whale Watching", "Hiking/Trekking"],
  },

];