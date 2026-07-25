const cards = [
  {
    title: "Flights",
    icon: "✈️",
    content: [
      "Airline: Indigo",
      "Price: ₹6,500",
      "Duration: 2h 15m",
      "Non-stop",
    ],
  },
  {
    title: "Hotels",
    icon: "🏨",
    content: [
      "Sea View Resort",
      "⭐⭐⭐⭐⭐",
      "₹3,200 / night",
      "Breakfast Included",
    ],
  },
  {
    title: "Weather",
    icon: "🌤️",
    content: [
      "28°C",
      "Sunny",
      "Humidity: 65%",
      "Pack light clothes",
    ],
  },
  {
    title: "Budget",
    icon: "💰",
    content: [
      "Flights: ₹6,500",
      "Hotel: ₹12,800",
      "Food: ₹5,000",
      "Remaining: ₹5,700",
    ],
  },
];

function ResultsGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
        >
          <div className="text-5xl">{card.icon}</div>

          <h2 className="text-white text-xl font-bold mt-4">
            {card.title}
          </h2>

          <div className="mt-4 space-y-2 text-gray-300">
            {card.content.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResultsGrid;