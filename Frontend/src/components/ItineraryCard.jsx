function ItineraryCard() {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mt-10">

      <h2 className="text-white text-2xl font-bold">
        📅 Final Itinerary
      </h2>

      <div className="mt-6 space-y-4 text-gray-300">

        <div>
          <strong className="text-cyan-400">Day 1</strong>
          <p>Arrival in Goa • Hotel Check-in • Beach Visit</p>
        </div>

        <div>
          <strong className="text-cyan-400">Day 2</strong>
          <p>North Goa Tour • Water Sports</p>
        </div>

        <div>
          <strong className="text-cyan-400">Day 3</strong>
          <p>Shopping • Departure</p>
        </div>

      </div>

    </div>
  );
}

export default ItineraryCard;