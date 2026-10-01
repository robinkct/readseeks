/**
 * Destinations Data for Travel Diary Globe
 * Rich collection of travels with coordinates, stories, highlights, and photos.
 */

const DEFAULT_DESTINATIONS = [
  {
    id: "taiwan-island",
    name: "Taiwan · Taipei & East Coast",
    country: "Taiwan",
    flag: "🇹🇼",
    continent: "Asia",
    lat: 25.0330,
    lng: 121.5654,
    date: "Spring 2025",
    duration: "Home & Journey",
    rating: 5.0,
    category: "Culture",
    icon: "🏮",
    accentColor: "#f43f5e",
    tagline: "Vibrant night markets, misty tea mountains, and dramatic Pacific coastal cliffs.",
    summary: "From midnight beef noodles and steaming soup dumplings in Taipei to cycling along the majestic marble gorges of Taroko.",
    cover: "https://images.unsplash.com/photo-1508248467877-aec1b08de376?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1508248467877-aec1b08de376?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1470004914212-259bd0938c16?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Sunset views of Taipei 101 from the Elephant Mountain trail",
      "Wandering red lantern alleys and historic mountain teahouses in Jiufen",
      "Bustling night markets with xiao long bao, scallion pancakes, and fresh boba",
      "Scenic train rides along the Pacific East Coast watching cobalt ocean swells"
    ],
    tips: "Get an EasyCard (悠遊卡) for MRT, trains, and YouBike. Explore the night markets with an empty stomach!",
    weather: "🍵 24°C, Pleasant Mountain Breeze",
    story: `Taiwan is an island that captures the heart through its boundless warmth, incredible culinary culture, and breathtaking natural diversity packed into a compact paradise.

Every evening comes alive in the night markets—the sizzle of pan-fried buns, the aromatic steam of herbal braised broth, and ice-cold fresh fruit juices.

Climbing Elephant Mountain during the golden hour offers an unforgettable panoramic vista of the Taipei basin, with Taipei 101 towering into the twilight sky. Further along the northeast coast, the nostalgic hill village of Jiufen glows with traditional red lanterns as ocean mist rolls over the emerald ridgelines.`
  },
  {
    id: "santorini-greece",
    name: "Santorini & Oia",
    country: "Greece",
    flag: "🇬🇷",
    continent: "Europe",
    lat: 36.3932,
    lng: 25.4615,
    date: "July 2023",
    duration: "5 Days",
    rating: 4.8,
    category: "Nature",
    icon: "🏛️",
    accentColor: "#38bdf8",
    tagline: "Cobalt blue domes, whitewashed cliffside villas, and legendary sunsets.",
    summary: "Perched 300 meters above the submerged caldera, watching the Aegean Sea turn molten gold as sailboats glided across the sapphire waters.",
    cover: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Hiking the cliffside scenic trail from Fira to Oia along the caldera rim",
      "Fresh grilled octopus and crisp Greek salad with feta at Ammoudi Bay",
      "Sunset catamaran cruise swimming near the volcanic hot springs",
      "Waking up to uninterrupted panoramic views of the Aegean Sea"
    ],
    tips: "Walk down to Ammoudi Bay before 6 PM to grab a front-row dinner table right beside the water for the best sunset view.",
    weather: "☀️ 29°C, Mediterranean Sun",
    story: `The stark contrast of blinding white stucco buildings against the endless deep blue of the Aegean Sea was breathtaking. Santorini felt carved out of dreams and ancient myth.

Our favorite day was hiking the caldera edge from Fira to Oia. The 10-kilometer route winds along rugged ridges, passing secluded white chapels with blue domes that seem suspended between sky and sea.

Ending the trek with a swim at Ammoudi Bay, followed by freshly caught seafood grilled over open coals, was pure Greek bliss.`
  },
  {
    id: "banff-canada",
    name: "Banff & Lake Louise",
    country: "Canada",
    flag: "🇨🇦",
    continent: "Americas",
    lat: 51.4254,
    lng: -116.1773,
    date: "August 2023",
    duration: "6 Days",
    rating: 5.0,
    category: "Nature",
    icon: "🌲",
    accentColor: "#10b981",
    tagline: "Glacial turquoise lakes, jagged Rocky peaks, and wild pine forests.",
    summary: "Canoeing through unreal turquoise glacial meltwater on Lake Moraine, surrounded by ten soaring peaks touching the clouds.",
    cover: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Sunrise paddleboarding across the mirror surface of Moraine Lake",
      "Hiking up to the historic Plain of Six Glaciers Teahouse for mountain tea",
      "Spotting grizzly bears and elk grazing along the scenic Icefields Parkway",
      "Soaking in natural outdoor hot springs overlooking Mount Rundle"
    ],
    tips: "Book park shuttles early to access Moraine Lake at sunrise, when the water is perfectly still and reflects the Ten Peaks.",
    weather: "🌲 22°C, Sunny Mountain Air",
    story: `The Canadian Rockies possess an immense, humbling grandeur. The color of Lake Louise and Moraine Lake looks almost artificial in photos, but seeing that vivid cyan hue in person takes your breath away.

We spent our mornings hiking uphill through fragrant pine and spruce forests, listening to the thunderous echoes of distant avalanches high above on Victoria Glacier.

Reaching the rustic wooden teahouse perched on the cliffside, warmed by a cup of tea boiled with glacier water, made every kilometer of climbing worth it.`
  },
  {
    id: "new-york-usa",
    name: "New York City",
    country: "United States",
    flag: "🇺🇸",
    continent: "Americas",
    lat: 40.7128,
    lng: -74.0060,
    date: "September 2023",
    duration: "7 Days",
    rating: 4.9,
    category: "City",
    icon: "🗽",
    accentColor: "#fbbf24",
    tagline: "Towering skyscrapers, Broadway lights, and electric urban energy.",
    summary: "From walking the High Line at golden hour to late-night jazz in Greenwich Village, New York's energy is unmatched anywhere on Earth.",
    cover: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Crossing Brooklyn Bridge on foot at dusk with skyline lights switching on",
      "Live acoustic jazz underground at the legendary Village Vanguard",
      "Strolling the transformed railway garden of The High Line and Little Island",
      "Pastrami on rye at Katz's Delicatessen and authentic NY dollar slices"
    ],
    tips: "Visit the Top of the Rock an hour before sunset to see the city transition from daylight to glittering nighttime skyline.",
    weather: "🌤️ 23°C, Pleasant Early Fall",
    story: `New York moves to a relentless, intoxicating rhythm. Every corner holds a world of its own—from the historic brownstones of the West Village to the dizzying neon canyons of Midtown.

One unforgettable evening was walking across the Brooklyn Bridge towards Manhattan just as the sun set behind the Statue of Liberty. The sky turned peach and magenta, reflecting off hundreds of glass skyscrapers.

Late into the night, we tucked into a subterranean jazz club in Greenwich Village, listening to improvisational trumpet solos that brought the city's soul alive.`
  },
  {
    id: "machu-picchu-peru",
    name: "Machu Picchu & Cusco",
    country: "Peru",
    flag: "🇵🇪",
    continent: "Americas",
    lat: -13.1631,
    lng: -72.5450,
    date: "November 2023",
    duration: "8 Days",
    rating: 5.0,
    category: "Adventure",
    icon: "🏔️",
    accentColor: "#f97316",
    tagline: "Ancient Inca stone citadel perched among misty Andean cloud forests.",
    summary: "Stepping through the Sun Gate after four days trekking the Inca Trail as morning clouds parted to reveal the legendary lost sanctuary.",
    cover: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Crossing Dead Woman's Pass at 4,215 meters elevation on the Inca Trail",
      "Watching the morning mist unveil the dry-stone architecture of Machu Picchu",
      "Savoring traditional Peruvian lomo saltado and fresh ceviche in Cusco",
      "Learning ancient Andean textile weaving techniques in the Sacred Valley"
    ],
    tips: "Spend 2 days acclimatizing in Cusco before attempting high-altitude hikes, and drink plenty of coca tea.",
    weather: "⛰️ 19°C, Crisp Andean Skies",
    story: `The sheer ingenuity of the Inca civilization is awe-inspiring. Hiking across stone stairs laid over five hundred years ago through mountain passes and dense sub-tropical cloud forests was a transformative experience.

On the final morning, we reached Inti Punku (the Sun Gate) just before dawn. As the first rays of light struck the peaks, the thick shroud of morning clouds lifted, revealing the ancient citadel perched precariously between emerald peaks.

Standing amidst these masterfully cut stones without mortar that have withstood earthquakes for centuries left us completely speechless.`
  },
  {
    id: "cairo-egypt",
    name: "Cairo & Giza",
    country: "Egypt",
    flag: "🇪🇬",
    continent: "Africa",
    lat: 29.9792,
    lng: 31.1342,
    date: "December 2023",
    duration: "5 Days",
    rating: 4.8,
    category: "Culture",
    icon: "🐫",
    accentColor: "#d97706",
    tagline: "Eternal sands, towering pyramids, and five thousand years of history.",
    summary: "Standing in the desert sands directly before the Great Pyramid of Khufu, marveling at the colossal scale of humanity's oldest wonder.",
    cover: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Camel ride across the Giza desert plateau at sunset with the 3 pyramids aligned",
      "Gazing upon the golden funeral mask of Tutankhamun in the Grand Egyptian Museum",
      "Navigating the bustling, spice-scented labyrinth of Khan el-Khalili bazaar",
      "Sailing a traditional felucca wooden boat on the Nile at sunset"
    ],
    tips: "Hire a licensed Egyptologist guide to truly appreciate the intricate hieroglyphics and astronomical alignments of the monuments.",
    weather: "🏜️ 22°C, Warm Dry Desert",
    story: `Approaching the Giza plateau for the first time is surreal—the pyramids appear on the horizon, so colossal that your eyes struggle to comprehend their geometry.

We ventured into the narrow Grand Gallery inside the Great Pyramid, climbing steep wooden ramps through the heart of the stone mountain to the King's Chamber.

In the evening, we rode camels through the desert dunes into the setting sun, watching the silhouetted Great Sphinx keep eternal watch over the sands of time.`
  },
  {
    id: "reykjavik-iceland",
    name: "Reykjavik & South Coast",
    country: "Iceland",
    flag: "🇮🇸",
    continent: "Europe",
    lat: 64.1466,
    lng: -21.9426,
    date: "January 2024",
    duration: "9 Days",
    rating: 5.0,
    category: "Adventure",
    icon: "❄️",
    accentColor: "#06b6d4",
    tagline: "Dancing green auroras, frozen waterfalls, and black volcanic beaches.",
    summary: "Renting a 4x4 camper to chase the Northern Lights across surreal snowfields. Standing behind the roaring cascade of Seljalandsfoss was unforgettable.",
    cover: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Witnessing emerald green and violet auroras ripple across a pitch-black starry sky",
      "Walking on the black basalt sands of Reynisfjara as violent Atlantic waves crashed",
      "Soaking in geothermal mineral waters surrounded by snowy mountain peaks",
      "Exploring a natural blue crystal ice cave deep inside Vatnajökull glacier"
    ],
    tips: "Pack sturdy crampons, waterproof windbreakers, and always check vedur.is for road and aurora forecasts.",
    weather: "🌌 -4°C, Crisp Winter & Auroras",
    story: `Iceland is the land of raw elemental contrasts: fire and ice, volcanic obsidian rock and blinding glaciers. Driving Route 1 in the dead of winter felt like embarking on an expedition to another planet.

On our fourth night, parked beside a frozen lagoon near Vík, the sky suddenly ignited. Ribbons of vibrant emerald light began undulating directly above our heads, twisting like silk banners caught in solar winds.

During the daytime, we trekked into ancient glacial ice caves whose translucent walls glowed with an impossible, luminous sapphire blue.`
  },
  {
    id: "serengeti-tanzania",
    name: "Serengeti & Ngorongoro",
    country: "Tanzania",
    flag: "🇹🇿",
    continent: "Africa",
    lat: -2.3333,
    lng: 34.8333,
    date: "February 2024",
    duration: "7 Days",
    rating: 5.0,
    category: "Nature",
    icon: "🦁",
    accentColor: "#eab308",
    tagline: "The Great Migration across golden savannahs under endless African skies.",
    summary: "Watching hundreds of thousands of wildebeest traverse the plains at sunrise, while lion prides rested beneath acacia shade.",
    cover: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Sunrise hot air balloon ride drifting silently over herds of elephants",
      "Tracking a cheetah hunting across the open golden grassland plains",
      "Descending into the extinct volcanic amphitheater of Ngorongoro Crater",
      "Stargazing by the campfire under the crystal clear Milky Way in the bush"
    ],
    tips: "Bring good binoculars, zoom lenses (minimum 300mm), and neutral-colored safari clothes (avoid blue and black which attract tsetse flies).",
    weather: "🦁 28°C, Golden Savannah Warmth",
    story: `The Serengeti represents nature at its most raw and undisturbed. The vastness of the horizon, broken only by iconic silhouette acacia trees, resets your perception of our planet.

During an early morning game drive, we encountered a pride of lions playing with cubs on ancient granite kopjes. Later, we drifted silently in a hot air balloon as dawn painted the plains in fiery crimson and gold.

Falling asleep in canvas safari tents to the distant roar of lions and the nocturnal sounds of the wilderness was unforgettable.`
  },
  {
    id: "sydney-australia",
    name: "Sydney & Coastal Trails",
    country: "Australia",
    flag: "🇦🇺",
    continent: "Oceania",
    lat: -33.8688,
    lng: 151.2093,
    date: "March 2024",
    duration: "7 Days",
    rating: 4.8,
    category: "City",
    icon: "🦘",
    accentColor: "#0284c7",
    tagline: "World-famous harbor sails, cliffside coastal walks, and sunlit ocean pools.",
    summary: "Taking the iconic Manly ferry through Sydney Harbour and walking the breathtaking cliff trail from Bondi to Coogee beach.",
    cover: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549180030-48bf079fb38a?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Swimming laps in the saltwater waves of Bondi Icebergs ocean pool",
      "Sydney Harbour ferry ride at sunset viewing the Opera House and Harbour Bridge",
      "Coastal cliff walk along the Pacific Ocean from Bronte to Clovelly",
      "Sipping flat whites in the trendy leafy cafes of Surry Hills"
    ],
    tips: "Take public ferries using your contactless credit card—the trip to Manly offers views rivaling expensive harbor cruise tours.",
    weather: "🌊 25°C, Ocean Breeze",
    story: `Sydney marries sparkling natural waterways with relaxed outdoor culture better than almost anywhere else. The blue of the harbor under the Southern Hemisphere sunshine is dazzling.

One morning, we took an early swim at Bondi Icebergs pool, where ocean swells crash dramatically over the concrete edge into the swimming lanes.

We then walked the coastal path toward Coogee, following sandstone cliffs sculpted by the Pacific Ocean, with occasional glimpses of dolphins leaping in the offshore swell.`
  },
  {
    id: "paris-france",
    name: "Paris & Montmartre",
    country: "France",
    flag: "🇫🇷",
    continent: "Europe",
    lat: 48.8566,
    lng: 2.3522,
    date: "May 2024",
    duration: "6 Days",
    rating: 4.9,
    category: "City",
    icon: "🥐",
    accentColor: "#3b82f6",
    tagline: "Cobblestone alleys, fresh croissants, and golden hour along the Seine.",
    summary: "Spent days wandering between cozy bookshops, sipping espresso at sidewalk bistros, and watching the Eiffel Tower sparkle under midnight skies.",
    cover: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Warm butter croissants from Du Pain et des Idées near Canal Saint-Martin",
      "Picnic with fresh baguettes and comté cheese by the Seine as bateaux mouches drifted by",
      "Getting lost in the bohemian artists' square at Place du Tertre in Montmartre",
      "Viewing Monet's immense Water Lilies at Musée de l'Orangerie"
    ],
    tips: "Walk as much as possible instead of using the metro—Paris is best experienced block by block through its bakeries and parks.",
    weather: "🌸 21°C, Mild Spring Breeze",
    story: `Paris in late spring had an effortless elegance that was impossible not to fall in love with. Every morning began with the intoxicating scent of freshly baked sourdough and buttery laminated croissants.

We spent hours strolling along the riverbanks of the Seine, browsing vintage posters and old books from the iconic bouquinistes. Sitting outside on wicker bistro chairs with café au lait and observing Parisian life gave a deep sense of presence.

As twilight settled, we climbed the steps of Sacré-Cœur in Montmartre to watch the city of light unfold below, just as the Eiffel Tower began its five-minute sparkling shimmer.`
  },
  {
    id: "bali-indonesia",
    name: "Bali & Ubud",
    country: "Indonesia",
    flag: "🇮🇩",
    continent: "Asia",
    lat: -8.4095,
    lng: 115.1889,
    date: "June 2024",
    duration: "10 Days",
    rating: 4.9,
    category: "Culture",
    icon: "🌴",
    accentColor: "#14b8a6",
    tagline: "Emerald rice terraces, spiritual water temples, and tropical serenity.",
    summary: "Waking up to the jungle orchestra in Ubud, meditating beside ancient lotus ponds, and catching epic waves along Uluwatu cliffs.",
    cover: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Strolling the stepped emerald curves of Tegallalang Rice Terraces at dawn",
      "Purification water ritual at the sacred Tirta Empul springs",
      "Dramatic Kecak fire dance performance on the cliffedge of Uluwatu Temple",
      "Fresh dragonfruit smoothie bowls and organic Balinese farm-to-table cuisine"
    ],
    tips: "Rent a scooter only if experienced with Bali traffic; otherwise hire a friendly local private driver for $35-$45/day.",
    weather: "🌴 28°C, Tropical Sunshine",
    story: `Bali has a spiritual pulse that is felt everywhere—in the fragrant incense offerings placed neatly on doorsteps, the gentle sound of gamelan music drifting from family compounds, and the lush tropical foliage.

In Ubud, we stayed in an open-air villa overlooking a rushing river canyon. Every morning began with yoga surrounded by palms and tropical bird songs.

At Uluwatu, we watched seventy performers chant the hypnotic Kecak rhythm as the sun dissolved into the Indian Ocean behind the cliff temple.`
  },
  {
    id: "kyoto-japan",
    name: "Kyoto & Arashiyama",
    country: "Japan",
    flag: "🇯🇵",
    continent: "Asia",
    lat: 35.0116,
    lng: 135.7681,
    date: "October 2024",
    duration: "8 Days",
    rating: 5.0,
    category: "Culture",
    icon: "⛩️",
    accentColor: "#f43f5e",
    tagline: "Autumn leaves, thousand torii gates, and tranquil bamboo groves.",
    summary: "Woke up at 5:30 AM to walk through Fushimi Inari before anyone else arrived. The misty morning light filtering through vermilion gates was pure magic.",
    cover: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Hiking up Mount Inari under thousands of vermilion torii gates at daybreak",
      "Steaming matcha green tea and fresh warabi mochi in Gion district",
      "Hearing the wind whisper through the towering stalks of Arashiyama Bamboo Grove",
      "Cycling along the Kamo River as golden hour illuminated weeping willows"
    ],
    tips: "Buy the IC card for easy train hopping, and visit popular temples at opening hour to experience peaceful silence.",
    weather: "🍂 18°C, Crisp Autumn Skies",
    story: `Kyoto felt like stepping straight into a watercolor painting. Arriving just as autumn foliage began tinging the maple trees with vivid crimson and burnt amber, our days followed the rhythm of temple bells and bicycle chimes.

One highlight was our sunrise pilgrimage to Fushimi Inari-taisha. By starting at dawn, we had the endless winding tunnels of orange wooden torii gates virtually to ourselves. The soft morning mist clinging to the mountain cedar trees, paired with the faint scent of cedar wood, made the hike feel otherworldly.

In the afternoons, we wandered the narrow cobblestone alleyways of Gion and Pontocho, stumbling upon century-old tea houses serving hand-whisked ceremonial matcha. Kyoto taught me the art of slowing down and appreciating quiet craftsmanship.`
  },
  {
    id: "swiss-alps",
    name: "Zermatt & Swiss Alps",
    country: "Switzerland",
    flag: "🇨🇭",
    continent: "Europe",
    lat: 45.9763,
    lng: 7.7491,
    date: "December 2024",
    duration: "6 Days",
    rating: 5.0,
    category: "Adventure",
    icon: "⛷️",
    accentColor: "#ef4444",
    tagline: "Towering snow-clad Matterhorn peak, alpine chalets, and hot cheese fondue.",
    summary: "Riding the Gornergrat cogwheel train up to 3,100 meters for jaw-dropping panoramas of twenty-nine 4,000-meter alpine peaks.",
    cover: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Skiing across the Swiss-Italian border on the slopes of the Matterhorn Glacier Paradise",
      "Cozy evenings by the log fireplace with bubbling Gruyère cheese fondue and Swiss wine",
      "Riding the vintage Gornergrat Bahn cogwheel railway through snow-covered pine forests",
      "Walking the car-free fairytale streets of Zermatt village under festive winter lights"
    ],
    tips: "Zermatt is completely car-free; arrive via the Glacier Express or regional train from Brig/Visp for a seamless panoramic arrival.",
    weather: "❄️ -6°C, Pristine Alpine Snow",
    story: `Arriving in Zermatt in mid-winter is like opening a holiday pop-up book. Smoke curls gently from wooden chalet chimneys, and the solitary, pyramid-like peak of the Matterhorn commands the valley with silent majesty.

Riding the cogwheel train up to Gornergrat, the air is bitingly fresh and crystal clear. Standing on the summit viewing platform surrounded by massive glaciers and jagged peaks feels like standing on the roof of Europe.

Returning to the village to thaw out over a piping hot pot of cheese fondue with crusty country bread was the perfect alpine ritual.`
  }
];

// Helper to load destinations from localStorage or fallback to default
function getSavedDestinations() {
  try {
    const saved = localStorage.getItem('travel_diary_destinations');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Ensure Taiwan is included
        if (!parsed.some(d => d.id === 'taiwan-island' || d.country === 'Taiwan')) {
          parsed.unshift(DEFAULT_DESTINATIONS[0]);
          saveDestinations(parsed);
        }
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Could not read from localStorage', e);
  }
  return DEFAULT_DESTINATIONS;
}

// Helper to save destinations
function saveDestinations(data) {
  try {
    localStorage.setItem('travel_diary_destinations', JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}
