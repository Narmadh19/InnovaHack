import React from "react";
import FlightCard from "./FlightCard";
import HotelCard from "./HotelCard";
import WeatherCard from "./WeatherCard";


function ResultsGrid(){

return (

<div className="
grid
md:grid-cols-3
gap-6
mt-10
">


<FlightCard />

<HotelCard />

<WeatherCard />


</div>

);

}


export default ResultsGrid;