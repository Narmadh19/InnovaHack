import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const TravelContext = createContext();

export const useTravel = () => useContext(TravelContext);

export const TravelProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stages, setStages] = useState([]);
  const [logs, setLogs] = useState([]);
  const [isPartial, setIsPartial] = useState(false);
  
  // Scraped Travel Data
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [weather, setWeather] = useState(null);
  const [budget, setBudget] = useState(null);
  const [itinerary, setItinerary] = useState([]);
  const [report, setReport] = useState(null);

  // User selections
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const pollingInterval = useRef(null);

  const startPlanning = async (prompt) => {
    try {
      setIsGenerating(true);
      setProgress(0);
      setSessionId(null);
      setSelectedFlight(null);
      setSelectedHotel(null);
      
      const res = await api.post('/api/workflow', { user_id: 'user123', message: prompt });
      const { workflow_id } = res.data;
      setSessionId(workflow_id);
      
      // Start polling workflow status
 pollStatus(workflow_id);
    } catch (err) {
      toast.error('Failed to initialize planning agent.');
      setIsGenerating(false);
    }
  };

  const pollStatus = (sid) => {
    if (pollingInterval.current) clearInterval(pollingInterval.current);

    pollingInterval.current = setInterval(async () => {
      try {
        const res = await api.get(`/api/workflow/${sid}`);
        const { progress: currentProgress, status, completed_agents, current_agent, actionLog } = res.data;
        
        setProgress(currentProgress);
        setLogs(actionLog || []);

        const allAgents = [
          { id: 'goal', name: 'Goal Understanding Agent', description: 'Parsing user prompt and extracting constraints.' },
          { id: 'planner', name: 'Planner Agent', description: 'Creating optimal search strategies and agent tasks.' },
          { id: 'flights', name: 'Flight Search Agent', description: 'Searching flight availability and fare options.' },
          { id: 'hotels', name: 'Hotel Search Agent', description: 'Finding hotel matches based on reviews and distance.' },
          { id: 'weather', name: 'Weather Intelligence Agent', description: 'Analyzing weather conditions for packing tips.' },
          { id: 'budget', name: 'Budget Optimization Agent', description: 'Allocating expenses and maximizing savings.' },
          { id: 'decision', name: 'Decision Agent', description: 'Aligning itinerary with traveler preferences.' },
          { id: 'itinerary', name: 'itinerary_generation', description: 'Generating custom daily travel itineraries.' },
          { id: 'booking', name: 'Booking Agent', description: 'Simulated reservation booking confirmation.' },
          { id: 'report', name: 'Report Generator Agent', description: 'Compiling final travel packet and PDF exports.' }
        ];

        const mappedStages = allAgents.map((agent) => {
          let stageStatus = 'pending';
          let stageProgress = 0;
          
          const isCompleted = completed_agents && (
            completed_agents.includes(agent.name) || 
            (agent.id === 'itinerary' && (completed_agents.includes('Itinerary Agent') || completed_agents.includes('itinerary_generation')))
          );

          if (isCompleted) {
            stageStatus = 'completed';
            stageProgress = 100;
          } else if (current_agent && (current_agent === agent.name || (agent.id === 'itinerary' && current_agent === 'itinerary_generation'))) {
            stageStatus = 'running';
            stageProgress = 50;
          }
          
          return { id: agent.id, name: agent.name, status: stageStatus, progress: stageProgress, description: agent.description };
        });
        
        setStages(mappedStages);

        if (status === 'completed' || status === 'partial' || currentProgress >= 100) {
          clearInterval(pollingInterval.current);
          setIsGenerating(false);
          setIsPartial(status === 'partial');
          if (status === 'partial') {
            toast.error('Swarm completed with partial results (some agents timed out).', { duration: 5000 });
          } else {
            toast.success('AI travel plan generated successfully!');
          }
          fetchTravelPlanData(sid);
        }
      } catch (err) {
        clearInterval(pollingInterval.current);
        setIsGenerating(false);
        toast.error('Error tracking agent progress.');
      }
    }, 1000);
  };

  const fetchTravelPlanData = async (sid) => {
    try {
      const res = await api.get(`/api/workflow/${sid}/result`);
      const { trip_details, flight_result, hotel_result, weather_result, budget_result, itinerary: parsedItinerary } = res.data;

      setFlights(flight_result.top_recommendations || []);
      setHotels(hotel_result.top_recommendations || []);
      
      const mappedWeather = {
        destination: trip_details.destination,
        avgTemp: weather_result.weather_summary.avg_temp,
        highTemp: weather_result.weather_summary.temp_range.split(' - ')[1] || '33°C',
        lowTemp: weather_result.weather_summary.temp_range.split(' - ')[0] || '26°C',
        humidity: '60%',
        wind: '12 km/h',
        rainProb: weather_result.weather_summary.rain_prob,
        condition: weather_result.weather_summary.condition,
        packingSuggestions: Array.isArray(weather_result.packing_list)
          ? (typeof weather_result.packing_list[0] === 'string'
              ? [{ category: 'Swarm Recommendations', items: weather_result.packing_list }]
              : weather_result.packing_list.map((category) => ({
                  category: category.category || 'Swarm Recommendations',
                  items: category.items || []
                }))
            )
          : [],
        forecast: weather_result.daily_forecast
      };
      setWeather(mappedWeather);

      setBudget(budget_result);
      setItinerary(parsedItinerary || []);

      const mappedReport = {
        summary: {
          destination: trip_details.destination,
          duration: '5 Days, 4 Nights',
          dates: `${trip_details.departure_date} - ${trip_details.return_date}`,
          passenger: `${trip_details.travelers} Travelers`,
          airlineSelected: `${flight_result.best_option.airline} (${flight_result.best_option.flightNo})`,
          hotelSelected: hotel_result.best_option.name,
          totalEstimated: `₹${budget_result.estimated_cost} / ₹${budget_result.user_budget} Budget`
        },
        aiDecision: `Goal Agent extracted target parameters for Goa. Planner created execution schedules. Flight search matched optimal IndiGo options, and Hotel search selected ${hotel_result.best_option.name} for resort preferences. Weather risk was evaluated as Medium due to monsoon forecasts, and budget was optimized resulting in a cost difference of ₹${budget_result.difference}.`
      };
      setReport(mappedReport);

      setSelectedFlight(flight_result.best_option);
      setSelectedHotel(hotel_result.best_option);
    } catch (err) {
      toast.error('Error loading generated data.');
    }
  };

  const resetPlanning = () => {
    if (pollingInterval.current) clearInterval(pollingInterval.current);
    setSessionId(null);
    setIsGenerating(false);
    setIsPartial(false);
    setProgress(0);
    setStages([]);
    setLogs([]);
    setFlights([]);
    setHotels([]);
    setWeather(null);
    setBudget(null);
    setItinerary([]);
    setReport(null);
    setSelectedFlight(null);
    setSelectedHotel(null);
  };

  useEffect(() => {
    return () => {
      if (pollingInterval.current) clearInterval(pollingInterval.current);
    };
  }, []);

  return (
    <TravelContext.Provider value={{
      sessionId,
      isGenerating,
      isPartial,
      progress,
      stages,
      logs,
      flights,
      hotels,
      weather,
      budget,
      itinerary,
      report,
      selectedFlight,
      setSelectedFlight,
      selectedHotel,
      setSelectedHotel,
      startPlanning,
      resetPlanning
    }}>
      {children}
    </TravelContext.Provider>
  );
};
