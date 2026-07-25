import axios from 'axios';

// Create a custom Axios instance
const api = axios.create({
  baseURL: 'https://api.travelgenie.ai/v1', // Placeholder base URL
  timeout: 10000,
});

// Mock database to store session-specific states
let currentSession = null;
let currentProgress = 0;
let progressTimer = null;

const mockFlights = [
  { id: 'f1', airline: 'Japan Airlines', logo: 'JAL', flightNo: 'JL-005', price: 1250, stops: 0, duration: '11h 45m', depTime: '11:30 AM', arrTime: '3:15 PM (+1)', depCode: 'JFK', arrCode: 'HND' },
  { id: 'f2', airline: 'All Nippon Airways', logo: 'ANA', flightNo: 'NH-109', price: 1320, stops: 0, duration: '12h 10m', depTime: '2:45 PM', arrTime: '6:55 PM (+1)', depCode: 'JFK', arrCode: 'HND' },
  { id: 'f3', airline: 'Singapore Airlines', logo: 'SIA', flightNo: 'SQ-21', price: 980, stops: 1, duration: '15h 30m', depTime: '8:15 AM', arrTime: '10:45 PM', depCode: 'JFK', arrCode: 'NRT' },
  { id: 'f4', airline: 'United Airlines', logo: 'UA', flightNo: 'UA-79', price: 890, stops: 1, duration: '16h 15m', depTime: '6:00 AM', arrTime: '9:15 PM', depCode: 'EWR', arrCode: 'NRT' }
];

const mockHotels = [
  { id: 'h1', name: 'Park Hyatt Tokyo', rating: 4.9, price: 450, distance: '0.8 km from center', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80', amenities: ['Free Wi-Fi', 'Infinity Pool', 'Sky Bar', 'Luxury Spa', 'Fitness Center'] },
  { id: 'h2', name: 'Hotel Gracery Shinjuku', rating: 4.5, price: 180, distance: '0.3 km from center', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', amenities: ['Free Wi-Fi', 'Godzilla Terrace', 'Restaurant', 'AC', 'Shuttle Service'] },
  { id: 'h3', name: 'Ryokan Kurama', rating: 4.7, price: 280, distance: '4.5 km from center', image: 'https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?auto=format&fit=crop&w=800&q=80', amenities: ['Onsen (Hot Spring)', 'Traditional Dinner', 'Tatami Rooms', 'Garden View'] },
  { id: 'h4', name: 'The Prince Gallery Tokyo Kioicho', rating: 4.8, price: 380, distance: '1.2 km from center', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80', amenities: ['Free Wi-Fi', 'Indoor Pool', 'Sky Lounge', 'AC', '24h Service'] }
];

const mockWeather = {
  destination: 'Tokyo, Japan',
  avgTemp: '18°C',
  highTemp: '22°C',
  lowTemp: '12°C',
  humidity: '62%',
  wind: '14 km/h',
  rainProb: '15%',
  condition: 'Partly Cloudy / Spring Season',
  packingSuggestions: [
    { category: 'Clothing', items: ['Light jacket or cardigan', 'Comfortable walking sneakers', 'Layerable long sleeve shirts', 'Jeans or chinos'] },
    { category: 'Accessories', items: ['Compact umbrella', 'Power adapter (Type A)', 'Sunglasses', 'Daypack for excursions'] },
    { category: 'Toiletries & Health', items: ['Allergy medication (for cherry blossom pollen)', 'Moisturizer', 'Hand sanitizer'] }
  ],
  forecast: [
    { day: 'Mon', temp: 18, condition: 'Partly Cloudy' },
    { day: 'Tue', temp: 20, condition: 'Sunny' },
    { day: 'Wed', temp: 17, condition: 'Light Rain' },
    { day: 'Thu', temp: 19, condition: 'Sunny' },
    { day: 'Fri', temp: 21, condition: 'Clear' },
    { day: 'Sat', temp: 22, condition: 'Clear' },
    { day: 'Sun', temp: 18, condition: 'Partly Cloudy' }
  ]
};

const mockBudget = {
  total: 5000,
  spent: 4280,
  currency: 'USD',
  categories: [
    { name: 'Flights', value: 1250, color: '#3b82f6' },
    { name: 'Accommodation', value: 1440, color: '#06b6d4' },
    { name: 'Food & Dining', value: 750, color: '#10b981' },
    { name: 'Activities', value: 540, color: '#f59e0b' },
    { name: 'Transport & Local', value: 300, color: '#8b5cf6' }
  ],
  breakdown: [
    { item: 'JAL Roundtrip Flight', category: 'Flights', amount: 1250, date: 'Day 1' },
    { item: 'Hotel Gracery (8 nights)', category: 'Accommodation', amount: 1440, date: 'Days 1-9' },
    { item: 'Shinkansen & Subway Passes', category: 'Transport & Local', amount: 300, date: 'Day 1' },
    { item: 'Sushi, Ramen & Fine Dining (Est.)', category: 'Food & Dining', amount: 750, date: 'Daily' },
    { item: 'teamLab Planets Ticket & Excursions', category: 'Activities', amount: 540, date: 'Days 2-8' }
  ]
};

const mockItinerary = [
  {
    day: 1,
    title: 'Arrival & Shinjuku Neon Lights',
    events: [
      { time: '3:15 PM', type: 'flight', title: 'Land at Haneda Airport (HND)', desc: 'Flight JL-005 arrived. Clear customs and collect luggage.', duration: '1h' },
      { time: '4:30 PM', type: 'transport', title: 'Tokyo Monorail to Hamamatsucho', desc: 'Transfer to Yamanote line for Shinjuku Station.', duration: '45m' },
      { time: '5:30 PM', type: 'hotel', title: 'Check-in at Hotel Gracery Shinjuku', desc: 'Settle into room, see the giant Godzilla head on the terrace.', duration: '30m' },
      { time: '7:30 PM', type: 'activity', title: 'Dinner at Omoide Yokocho', desc: 'Traditional yakitori in the narrow, nostalgic alleyways of Shinjuku.', duration: '2h' }
    ]
  },
  {
    day: 2,
    title: 'Futuristic Art & Shibuya Vibes',
    events: [
      { time: '9:30 AM', type: 'activity', title: 'teamLab Planets TOKYO', desc: 'Immersive digital art museum where you walk through water and gardens.', duration: '3h' },
      { time: '1:00 PM', type: 'food', title: 'Sushi lunch in Tsukiji Outer Market', desc: 'Freshly prepared nigiri at local food stalls.', duration: '1.5h' },
      { time: '3:00 PM', type: 'activity', title: 'Shibuya Crossing & Hachiko Statue', desc: 'Cross the world\'s busiest pedestrian intersection and explore Shibuya 109.', duration: '2h' },
      { time: '6:30 PM', type: 'activity', title: 'Shibuya Sky Observatory', desc: 'Breathtaking open-air rooftop views of the Tokyo skyline at sunset.', duration: '1.5h' }
    ]
  },
  {
    day: 3,
    title: 'Historic Temples & Harajuku Culture',
    events: [
      { time: '9:00 AM', type: 'activity', title: 'Meiji Jingu Shrine', desc: 'Serene forested shrine dedicated to Emperor Meiji.', duration: '2h' },
      { time: '11:30 AM', type: 'activity', title: 'Harajuku Takeshita Street', desc: 'Colorful street known for quirky fashion, street art, and sweet crepes.', duration: '2h' },
      { time: '2:00 PM', type: 'activity', title: 'Omotesando & Nezu Museum', desc: 'Walk tree-lined boulevards and visit the museum with a beautiful Japanese garden.', duration: '3h' },
      { time: '7:00 PM', type: 'food', title: 'Wagyu Beef Yakiniku Dinner', desc: 'Grill premium beef cuts at your table in Ginza.', duration: '2h' }
    ]
  },
  {
    day: 4,
    title: 'Akihabara Electronics & Senso-ji Temple',
    events: [
      { time: '9:30 AM', type: 'activity', title: 'Asakusa Senso-ji Temple', desc: 'Tokyo\'s oldest temple. Walk through Nakamise Shopping Street.', duration: '2.5h' },
      { time: '12:30 PM', type: 'food', title: 'Tempura Lunch at Daikokuya', desc: 'Famous traditional tempura restaurant operating since 1887.', duration: '1h' },
      { time: '2:00 PM', type: 'activity', title: 'Akihabara Electric Town', desc: 'Explore multi-level retro game shops, anime stores, and electronics.', duration: '4h' },
      { time: '7:00 PM', type: 'activity', title: 'Robot Cafe Experience', desc: 'Immerse in Tokyo\'s unique pop culture entertainment.', duration: '2h' }
    ]
  },
  {
    day: 5,
    title: 'Departure & Ginza Shopping',
    events: [
      { time: '10:00 AM', type: 'activity', title: 'Souvenir Shopping in Ginza Six', desc: 'High-end department store with art installations and rooftop garden.', duration: '2.5h' },
      { time: '1:00 PM', type: 'food', title: 'Ramen Street at Tokyo Station', desc: 'Try a bowl of world-class Tsukemen (dipping ramen).', duration: '1h' },
      { time: '3:00 PM', type: 'transport', title: 'Narita Express to Airport', desc: 'Head to Narita (NRT) or Haneda (HND) for departure.', duration: '1.5h' }
    ]
  }
];

const mockReport = {
  summary: {
    destination: 'Tokyo, Japan',
    duration: '5 Days, 4 Nights',
    dates: 'Oct 12 - Oct 16, 2026',
    passenger: '1 Traveler',
    airlineSelected: 'Japan Airlines (JL-005)',
    hotelSelected: 'Hotel Gracery Shinjuku',
    totalEstimated: '$4,280 / $5,000 Budget'
  },
  aiDecision: 'TravelGenie coordinated a multi-agent consensus to construct this itinerary. The Flight Agent sourced options favoring Japan Airlines for optimal legroom and timing, avoiding layovers. The Hotel Agent filtered 45 properties, selecting Hotel Gracery Shinjuku due to its high walkability index (98/100) and proximity to Shinjuku Station. The Weather Agent predicted low rain probability (15%), allowing the Itinerary Agent to schedule open-air events (Shibuya Sky, Hakone trip) on Days 2 & 3. The Budget Agent enforced constraints, leaving a $720 contingency reserve.'
};

// Mock agent workflow stages
const mockWorkflowStages = [
  { id: 'goal', name: 'Goal Understanding', status: 'pending', progress: 0, description: 'Parsing user prompt and extracting constraints.' },
  { id: 'planner', name: 'Planner Agent', status: 'pending', progress: 0, description: 'Creating optimal search strategies and agent tasks.' },
  { id: 'flights', name: 'Flight Search', status: 'pending', progress: 0, description: 'Searching flight availability and fare options.' },
  { id: 'hotels', name: 'Hotel Search', status: 'pending', progress: 0, description: 'Finding hotel matches based on reviews and distance.' },
  { id: 'weather', name: 'Weather Forecast', status: 'pending', progress: 0, description: 'Analyzing weather conditions for packing tips.' },
  { id: 'budget', name: 'Budget Optimization', status: 'pending', progress: 0, description: 'Allocating expenses and maximizing savings.' },
  { id: 'decision', name: 'Decision Agent', status: 'pending', progress: 0, description: 'Aligning itinerary with traveler preferences.' },
  { id: 'report', name: 'Report Generation', status: 'pending', progress: 0, description: 'Compiling final travel packet and PDF exports.' }
];

const mockActionLogs = [
  { id: 1, stage: 'goal', text: 'Prompt received: "Plan a 5-day trip to Tokyo on a $5k budget"', time: '14:36:08' },
  { id: 2, stage: 'goal', text: 'Extracted variables: Destination="Tokyo", Duration="5 days", Budget="$5000"', time: '14:36:10' },
  { id: 3, stage: 'planner', text: 'Initializing sub-agent DAG (Directed Acyclic Graph)', time: '14:36:12' },
  { id: 4, stage: 'flights', text: 'Scanning GDS and budget carriers for NYC to TYO flights...', time: '14:36:15' },
  { id: 5, stage: 'flights', text: 'Found 14 flight matches. Filtering non-stop options.', time: '14:36:18' },
  { id: 6, stage: 'hotels', text: 'Searching accommodations in Shinjuku, Shibuya, and Ginza...', time: '14:36:20' },
  { id: 7, stage: 'hotels', text: 'Retrieved hotel details. Filtering by rating > 4.5.', time: '14:36:22' },
  { id: 8, stage: 'weather', text: 'Retrieving historical climate patterns for mid-October.', time: '14:36:25' },
  { id: 9, stage: 'weather', text: 'Forecast fetched: 18°C, light wind, low precipitation risk.', time: '14:36:26' },
  { id: 10, stage: 'budget', text: 'Optimizing budget distribution. Checking dynamic currency rates.', time: '14:36:28' },
  { id: 11, stage: 'decision', text: 'Synthesizing itineraries. Comparing traveler time constraints.', time: '14:36:31' },
  { id: 12, stage: 'report', text: 'Travel packet compiled. PDF output rendered.', time: '14:36:34' }
];

// Helper to simulate API responses with delay
const delayResponse = (data, delay = 600) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {}
      });
    }, delay);
  });
};

// Add interceptor to mock request routing
api.interceptors.request.use((config) => {
  const url = config.url;
  const method = config.method;

  if (url === '/api/workflow' && method === 'post') {
    currentSession = 'WF' + Math.floor(100 + Math.random() * 900);
    currentProgress = 0;
    
    if (progressTimer) clearInterval(progressTimer);
    
    progressTimer = setInterval(() => {
      if (currentProgress < 100) {
        currentProgress += 10;
        if (currentProgress > 100) currentProgress = 100;
      } else {
        clearInterval(progressTimer);
      }
    }, 1000);

    config.adapter = () => {
      return delayResponse({
        workflow_id: currentSession,
        status: 'started',
        message: 'Travel planning workflow initiated'
      });
    };
  }

  else if (url.startsWith('/api/workflow/') && !url.endsWith('/result') && method === 'get') {
    const workflowId = url.split('/').pop();
    const allAgents = [
      "Goal Understanding Agent",
      "Planner Agent",
      "Flight Search Agent",
      "Hotel Search Agent",
      "Weather Intelligence Agent",
      "Budget Optimization Agent",
      "Decision Agent",
      "Report Generator Agent"
    ];
    
    const numAgents = allAgents.length;
    const completedCount = Math.min(
      numAgents,
      Math.max(1, Math.floor((currentProgress / 100) * (numAgents + 1)))
    );
    const completedAgents = allAgents.slice(0, completedCount);
    const currentAgent = completedCount < numAgents ? allAgents[completedCount] : null;
    const status = currentProgress >= 100 ? 'completed' : 'processing';

    const mockLogs = [
      { time: '10:30:02', agent: 'Goal Agent', action: 'Extracted Goa destination & budget ₹30000', status: 'Completed' },
      { time: '10:30:05', agent: 'Planner Agent', action: 'Created execution workflow plan', status: 'Completed' },
      { time: '10:30:08', agent: 'Flight Agent', action: 'Searching Indigo & Air India flights', status: 'Completed' },
      { time: '10:30:12', agent: 'Hotel Agent', action: 'Filtering Sea Breeze and beachfront hotels', status: 'Completed' },
      { time: '10:30:15', agent: 'Weather Agent', action: 'Analyzing monsoon humidity risk levels', status: 'Completed' },
      { time: '10:30:18', agent: 'Budget Agent', action: 'Evaluating budget optimizations against constraints', status: 'Completed' },
      { time: '10:30:21', agent: 'Decision Agent', action: 'Synthesizing traveler options and score rankings', status: 'Completed' },
      { time: '10:30:24', agent: 'Report Agent', action: 'Assembled consolidated dossier details', status: 'Completed' }
    ];
    
    const activeLogs = mockLogs.slice(0, completedCount);

    config.adapter = () => {
      return delayResponse({
        workflow_id: workflowId,
        status,
        completed_agents: completedAgents,
        current_agent: currentAgent,
        actionLog: activeLogs.map((log, idx) => ({ id: idx + 1, time: log.time, stage: log.agent.split(' ')[0].toLowerCase(), text: `${log.action} - [${log.status}]` })),
        progress: currentProgress
      }, 100);
    };
  }

  else if (url.startsWith('/api/workflow/') && url.endsWith('/result') && method === 'get') {
    const urlParts = url.split('/');
    const workflowId = urlParts[urlParts.length - 2];

    const trip_details = {
      destination: 'Goa, India',
      departure_date: '2026-08-16',
      return_date: '2026-08-20',
      travelers: 2,
      budget: 30000,
      preferences: {
        hotel_type: 'Beach Resort'
      }
    };

    const flight_result = {
      status: 'success',
      best_option: {
        airline: 'IndiGo',
        price: 8000,
        duration: '2h',
        score: 90,
        logo: 'IGO',
        flightNo: '6E-205',
        depTime: '10:30 AM',
        arrTime: '12:30 PM',
        depCode: 'MAA',
        arrCode: 'GOI',
        stops: 0
      },
      top_recommendations: [
        { id: 'f1', airline: 'IndiGo', logo: 'IGO', flightNo: '6E-205', price: 8000, stops: 0, duration: '2h', depTime: '10:30 AM', arrTime: '12:30 PM', depCode: 'MAA', arrCode: 'GOI' },
        { id: 'f2', airline: 'Air India', logo: 'AIC', flightNo: 'AI-540', price: 9500, stops: 0, duration: '2h 15m', depTime: '06:00 AM', arrTime: '08:15 AM', depCode: 'MAA', arrCode: 'GOI' }
      ],
      reasoning: ['Indigo offers the best price and is a direct flight', 'Fits well within the 30k budget constraints'],
      warnings: [],
      confidence: 0.92
    };

    const hotel_result = {
      status: 'success',
      best_option: {
        hotel_id: 'H101',
        name: 'Sea Breeze Resort',
        price: 12000,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        distance: '0.2 km from center',
        amenities: ['Free Wi-Fi', 'Swimming Pool', 'Spa', 'Private Beach']
      },
      top_recommendations: [
        { id: 'h1', name: 'Sea Breeze Resort', rating: 4.8, price: 3000, distance: '0.2 km from beach', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', amenities: ['Free Wi-Fi', 'Swimming Pool', 'Spa', 'Private Beach'] },
        { id: 'h2', name: 'Goa Heritage Villa', rating: 4.5, price: 2500, distance: '1.5 km from beach', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80', amenities: ['Free Wi-Fi', 'Garden View', 'Restaurant'] }
      ],
      reasoning: ['Sea Breeze Resort perfectly fits beach resort preference', 'Highly recommended for couples'],
      warnings: [],
      confidence: 0.92
    };

    const weather_result = {
      status: 'success',
      weather_summary: {
        risk_level: 'Medium',
        avg_temp: '30°C',
        temp_range: '26°C - 33°C',
        rain_prob: '10% - 60%',
        condition: 'Warm / Light Rain risk'
      },
      daily_forecast: [
        { date: 'Aug 16', day: 'Aug 16', temp: 33, condition: 'Sunny' },
        { date: 'Aug 17', day: 'Aug 17', temp: 31, condition: 'Light Rain' },
        { date: 'Aug 18', day: 'Aug 18', temp: 30, condition: 'Thunderstorm' },
        { date: 'Aug 19', day: 'Aug 19', temp: 32, condition: 'Sunny' },
        { date: 'Aug 20', day: 'Aug 20', temp: 33, condition: 'Clear' }
      ],
      travel_advice: [
        'Beach activities recommended on Aug 16',
        'Carry rain protection for Aug 17-18'
      ],
      packing_list: [
        { category: 'Clothing', items: ['Beachwear & shorts', 'Light cotton shirts', 'Rain poncho'] },
        { category: 'Accessories', items: ['Umbrella', 'Sunscreen SPF 50', 'Waterproof pouch'] }
      ]
    };

    const budget_result = {
      status: 'success',
      budget_status: 'Over Budget',
      estimated_cost: 32000,
      user_budget: 30000,
      difference: 2000,
      cost_breakdown: {
        Flight: 8000,
        Hotel: 12000,
        Food: 5000,
        Transport: 3000,
        Activities: 4000
      },
      categories: [
        { name: 'Flights', value: 8000, color: '#3b82f6' },
        { name: 'Accommodation', value: 12000, color: '#06b6d4' },
        { name: 'Food & Dining', value: 5000, color: '#10b981' },
        { name: 'Activities', value: 4000, color: '#f59e0b' },
        { name: 'Transport & Local', value: 3000, color: '#8b5cf6' }
      ],
      breakdown: [
        { item: 'IndiGo Roundtrip Flight (2 pax)', category: 'Flights', amount: 8000, date: 'Day 1' },
        { item: 'Sea Breeze Resort (4 nights)', category: 'Accommodation', amount: 12000, date: 'Days 1-5' },
        { item: 'Local Cab transfers', category: 'Transport', amount: 3000, date: 'Daily' },
        { item: 'Beach Shacks & Dining (Est.)', category: 'Food & Dining', amount: 5000, date: 'Daily' },
        { item: 'Water activities package', category: 'Activities', amount: 4000, date: 'Day 2' }
      ],
      optimization_suggestions: [
        'Choose cheaper hotel',
        'Reduce activity expenses',
        'Compare flight timings'
      ]
    };

    const mockGoaItinerary = [
      {
        day: 1,
        title: 'Arrival & Calangute Beach Sunset',
        events: [
          { time: '12:30 PM', type: 'flight', title: 'Land at Dabolim Airport (GOI)', desc: 'Flight 6E-205 arrived. Clear customs and collect luggage.', duration: '1h' },
          { time: '2:00 PM', type: 'hotel', title: 'Check-in at Sea Breeze Resort', desc: 'Welcome drinks, beach resort rooms check-in.', duration: '30m' },
          { time: '5:30 PM', type: 'activity', title: 'Sunset view at Calangute Beach', desc: 'Walk along the shore and see local shacks.', duration: '2h' }
        ]
      },
      {
        day: 2,
        title: 'Water Adventures & Dinner shacks',
        events: [
          { time: '09:30 AM', type: 'activity', title: 'Water Sports at Baga Beach', desc: 'Parasailing, jet ski, banana boat ride.', duration: '3h' },
          { time: '01:00 PM', type: 'food', title: 'Lunch at beach shacks', desc: 'Enjoy fresh fish curry rice and local cocktails.', duration: '1.5h' }
        ]
      }
    ];

    config.adapter = () => {
      return delayResponse({
        workflow_id: workflowId,
        trip_details,
        flight_result,
        hotel_result,
        weather_result,
        budget_result,
        itinerary: mockGoaItinerary
      });
    };
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
export { mockFlights, mockHotels, mockWeather, mockBudget, mockItinerary, mockReport };
