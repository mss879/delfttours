// City highlight images mapping — used on tour detail pages
export type CityHighlight = { label: string; image: string };

export const cityHighlights: Record<string, CityHighlight[]> = {
  "Kandy": [
    { label: "Temple of the Tooth", image: "/KANDY/Temple of the Tooth.jpg" },
    { label: "Royal Botanical Garden", image: "/KANDY/Royal Botanical Garden.jpg" },
    { label: "Kandy Food Trail", image: "/KANDY/Kandy Food Trail.jpg" },
    { label: "Cultural Dance", image: "/KANDY/Cultural Dance.jpg" },
    { label: "Meet Artist Rahju", image: "/KANDY/Meet Artist Rahju.jpg" },
    { label: "Ceylon Gems", image: "/KANDY/Ceylon Gems.jpg" },
  ],
  "Colombo": [
    { label: "Galle Face Green", image: "/COLOMBO/Galle Face Green.webp" },
    { label: "Gangaramaya Temple", image: "/COLOMBO/Gangaramaya Temple.jpg" },
    { label: "Dutch Hospital", image: "/COLOMBO/Dutch Hospital.jpg" },
    { label: "Lotus Tower", image: "/COLOMBO/lotustower.jpg" },
    { label: "National Museum", image: "/COLOMBO/National Museum.jpg" },
    { label: "Rajamaha Temple", image: "/COLOMBO/Rajamaha Temple.jpg" },
  ],
  "Bentota": [
    { label: "Beach Relaxation", image: "/BENTOTA/Beach Relaxation.jpg" },
    { label: "Kosgoda Turtle Hatchery", image: "/BENTOTA/Kosgoda Turtle Hatchery.jpg" },
    { label: "Water Sports", image: "/BENTOTA/WaterSports .jpg" },
    { label: "Bentota Sanctuary", image: "/BENTOTA/bentota-sanctuary.png" },
    { label: "Spa & Wellness", image: "/BENTOTA/spa-inn-desk-feat-1.jpg" },
    { label: "Madu River Safari", image: "/BENTOTA/Screenshot 2026-03-27 081945.png" },
  ],
  "Galle": [
    { label: "Galle Fort", image: "/GALLE/gallfort.jpg" },
    { label: "Historic Streets", image: "/GALLE/historic-streets.jpg" },
    { label: "Fort Museums", image: "/GALLE/Fort Museums.jpg" },
    { label: "Beach Activities", image: "/GALLE/Beach Activities.jpg" },
    { label: "Local Market & Shopping", image: "/GALLE/localmarketshopppign.jpg" },
    { label: "Sunset Rampart Walks", image: "/GALLE/sunsetrampartwalks.jpg" },
  ],
  "Ella": [
    { label: "Nine Arch Bridge", image: "/ELLA/ninearchbridge.jpg" },
    { label: "Scenic Train Ride", image: "/ELLA/Scenictrainride.jpg" },
    { label: "Tea Plantation Tours", image: "/ELLA/Teaplantationtours.jpg" },
    { label: "Ella Rock", image: "/ELLA/ellarock.jpg" },
    { label: "Waterfall Visits", image: "/ELLA/Waterfallvisiots.jpg" },
    { label: "Zip-lining", image: "/ELLA/Zip-lining.jpg" },
  ],
  "Dambulla": [
    { label: "Golden Cave Temple", image: "/DAMBULLA/goldencavetemple.jpg" },
    { label: "Cave Viewpoint", image: "/DAMBULLA/caveviewpoint.jpg" },
    { label: "Minneriya National Park", image: "/DAMBULLA/minnertiya national park.jpg" },
    { label: "Ironwood Forest", image: "/DAMBULLA/Ironwood Forest.jpg" },
    { label: "Morning Rituals", image: "/DAMBULLA/mornign rituyals.jpg" },
    { label: "Megalithic Tombs", image: "/DAMBULLA/Megalithic Tombs.jpg" },
  ],
  "Anuradhapura": [
    { label: "Sacred City", image: "/ANURADHAPURA/sacred city.png" },
    { label: "Ruwanwelisaya Stupa", image: "/ANURADHAPURA/ruwanwella maga stupa.png" },
    { label: "Jetavana Ruins", image: "/ANURADHAPURA/jetavana ruins.png" },
    { label: "Ancient Royal Palace", image: "/ANURADHAPURA/ancient royal palace.png" },
    { label: "Sacred Bodhi Tree", image: "/ANURADHAPURA/sacred bow treee.png" },
    { label: "Abhayagiri Monasteries", image: "/ANURADHAPURA/Abhayagiri Monasteries.jpg" },
  ],
  "Hatton": [
    { label: "Tea Factories", image: "/HATTON/Tea Factories.jpg" },
    { label: "Adam's Peak", image: "/HATTON/adsmpeak.jpg" },
    { label: "Hiking Trails", image: "/HATTON/hikigntraisl.jpg" },
    { label: "Local Village Tours", image: "/HATTON/Locavilaltours.jpg" },
    { label: "Photo Opportunities", image: "/HATTON/photopoortunities.jpg" },
    { label: "Tea Estate Hotels", image: "/HATTON/teaestatewhotels.jpg" },
  ],
  "Sigiriya": [
    { label: "Sigiriya Rock Fortress", image: "/SIGIRIYA/Sigiriya Rock Fortress.jpg" },
    { label: "Boat Ride Experience", image: "/SIGIRIYA/Boat Ride Experience.jpg" },
    { label: "Safari at Minneriya", image: "/SIGIRIYA/Safari at Minneriya.jpg" },
    { label: "Village Experience", image: "/SIGIRIYA/Village Experience.jpg" },
    { label: "Piduranagala Rock", image: "/SIGIRIYA/Piduranagala Rock.jpg" },
    { label: "Dambulla Cave Temple", image: "/SIGIRIYA/Dambulla Cave Temple.jpg" },
  ],
  "Nuwara Eliya": [
    { label: "Scenic Train Ride", image: "/NUWARA ELIYA/Scenic Train Ride.jpg" },
    { label: "Tea Experience", image: "/NUWARA ELIYA/Tea Experience.jpg" },
    { label: "Horton Plains", image: "/NUWARA ELIYA/Horton Plains.jpg" },
    { label: "High Tea Experience", image: "/NUWARA ELIYA/High Tea Experience.jpg" },
    { label: "Colonial Architecture", image: "/NUWARA ELIYA/Colonial Architecture.jpg" },
    { label: "Seetha Amman Kovil", image: "/NUWARA ELIYA/Seetha Amman Kovil.jpg" },
  ],
  "Negombo": [
    { label: "Hamilton Canal", image: "/NEGOMBO/Hamilton Canal.jpg" },
    { label: "Muthurajawela Wetland", image: "/NEGOMBO/Muthurajawela Wetland.jpg" },
    { label: "Negombo Fish Market", image: "/NEGOMBO/Negombo Fish Market.jpg" },
    { label: "Fishing Village Life", image: "/NEGOMBO/Fishing Village Life.jpg" },
    { label: "Scenic Sunset", image: "/NEGOMBO/Scenic Sunset.jpg" },
    { label: "Sail Boats", image: "/NEGOMBO/Sail Boats.jpg" },
  ],
  "Yala": [
    { label: "Sri Lankan Leopard", image: "/YALA/Sri Lankan Leopard.jpg" },
    { label: "Sloth Bear", image: "/YALA/Sloth Bear.jpg" },
    { label: "Mugger Crocodile", image: "/YALA/Mugger Crocodile.jpg" },
    { label: "Elephants in Sri Lanka", image: "/YALA/Elephants in Sri Lanka.jpg" },
    { label: "Kataragama Hindu Temple", image: "/YALA/Kataragama Hindu Temple.jpg" },
    { label: "Jungle Sundowner", image: "/YALA/Jungle Sundowner.webp" },
  ],
  "Trincomalee": [
    { label: "Scenic Beach", image: "/TRINCOMALEE/Scenic Beach.jpg" },
    { label: "Dolphin Watching", image: "/TRINCOMALEE/Dolphin Watching.jpg" },
    { label: "Snorkeling", image: "/TRINCOMALEE/Snorkeling.jpg" },
    { label: "Pigeon Island", image: "/TRINCOMALEE/Pigeon Island.jpg" },
    { label: "Koneshwaram Kovil", image: "/TRINCOMALEE/Koneshwaram Kovil.jpg" },
    { label: "Swami Rock", image: "/TRINCOMALEE/Swami Rock.jpg" },
  ],
  "Udawalawa": [
    { label: "Udawalawa National Park", image: "/UDAWALAWA/Udawalawa National Park.jpg" },
    { label: "Elephant Transit Home", image: "/UDAWALAWA/Elephant Transit Home.jpg" },
    { label: "Beautiful Sunset", image: "/UDAWALAWA/Beautiful Sunset.jpg" },
    { label: "Sri Lankan Leopard", image: "/UDAWALAWA/Sri Lankan Leopard.jpg" },
    { label: "Sloth Bear", image: "/UDAWALAWA/Sloth Bear.jpg" },
    { label: "Peacock Grace", image: "/UDAWALAWA/Peacock Grace.jpg" },
  ],
  "Pussellawa": [],
  "Tangalle": [
    { label: "Relaxing at Beach", image: "/TANGALLE/Relaxing at Beach.jpg" },
    { label: "Elephant Transit Home", image: "/TANGALLE/Elephant Transit Home.jpg" },
    { label: "Mulgirigala", image: "/TANGALLE/Mulgirigala.jpg" },
    { label: "Bird Sanctuary", image: "/TANGALLE/Bird Sanctuary.jpg" },
    { label: "Kayaking", image: "/TANGALLE/Kayaking.jpg" },
    { label: "Traditional Food", image: "/TANGALLE/Traditional Food.jpg" },
  ],
  "Kalutara": [
    { label: "Stilt Fisherman", image: "/KALUTARA/Stilt Fisherman.jpg" },
    { label: "Galle Fort", image: "/KALUTARA/Galle Fort.jpg" },
    { label: "Turtle Conservation", image: "/KALUTARA/Turtle Conservation.jpg" },
    { label: "Madu River Safari", image: "/KALUTARA/Madu River Safari.jpg" },
    { label: "Water Sport", image: "/KALUTARA/Water Sport.jpg" },
    { label: "Isolated Lighthouse", image: "/KALUTARA/Isolated Lighthouse.jpg" },
  ],
  "Mirissa": [
    { label: "Coconut Tree Hill", image: "/MIRISSA/Coconut Tree Hill.jpg" },
    { label: "Stilt Fisherman", image: "/MIRISSA/Stilt Fisherman.jpg" },
    { label: "Surfing", image: "/MIRISSA/Surfing.jpg" },
    { label: "Padalangala Ride", image: "/MIRISSA/Padalangala Ride.jpg" },
    { label: "Parrot Rock Island", image: "/MIRISSA/Parrot Rock Island.jpg" },
    { label: "Relax Evening", image: "/MIRISSA/Relax Evening.jpg" },
  ],
};

// Helper: extract city name from day title
export function extractCityFromDayTitle(title: string): string | null {
  const cities = Object.keys(cityHighlights);
  // Sort by length descending so "Nuwara Eliya" matches before "Ella"
  const sorted = cities.sort((a, b) => b.length - a.length);
  for (const city of sorted) {
    if (title.toLowerCase().includes(city.toLowerCase())) {
      return city;
    }
  }
  return null;
}
