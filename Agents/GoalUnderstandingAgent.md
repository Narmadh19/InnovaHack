Purpose
Converts natural language travel requests into structured JSON.
Input
Natural language travel request.
Output
{
    "response": "{\n  \"intent\": \"Vacation\",\n  \"source\": \"Chennai\",\n  \"destination\": \"Goa\",\n  \"departure_date\": \"2026-08-01\",\n  \"return_date\": null,\n  \"duration_days\": null,\n  \"travelers\": 2,\n  \"budget\": 500,\n  \"currency\": \"USD\",\n  \"preferences\": {\n      \"hotel_type\": null,\n      \"flight_type\": null,\n      \"transportation\": null,\n      \"preferred_airline\": null,\n      \"hotel_rating\": null,\n      \"meal_preference\": null,\n      \"activities\": [],\n      \"special_requests\": []\n  },\n  \"missing_information\": []\n}",
    "module_outputs": {}
}
Responsibilities
Detect intent
Extract entities
Normalize values
Detect missing mandatory information
Return JSON only
Limitations
Doesn't search flights
Doesn't search hotels
Doesn't calculate budgets
Doesn't recommend destinations
