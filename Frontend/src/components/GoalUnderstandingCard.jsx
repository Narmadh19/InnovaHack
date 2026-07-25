import React from "react";


function GoalUnderstandingCard(){

const data = {
    intent:"Vacation",
    source:"Chennai",
    destination:"Goa",
    duration:"5 Days",
    travelers:2,
    budget:"₹30,000",
    style:"Budget Friendly"
};


return (

<div className="
bg-slate-900
border
border-slate-800
rounded-2xl
p-6
shadow-lg
">


<div className="
flex
justify-between
items-center
mb-6
">


<h2 className="
text-2xl
font-bold
text-white
">

🎯 Goal Understanding

</h2>


<span className="
bg-green-500/20
text-green-400
px-4
py-2
rounded-full
text-sm
">

AI Verified

</span>


</div>



<div className="
grid
md:grid-cols-3
gap-5
">


<Card 
title="Trip Type"
value={data.intent}
/>


<Card 
title="Route"
value={`${data.source} → ${data.destination}`}
/>


<Card 
title="Duration"
value={data.duration}
/>


<Card 
title="Travelers"
value={data.travelers}
/>


<Card 
title="Budget"
value={data.budget}
/>


<Card 
title="Style"
value={data.style}
/>



</div>


</div>

);

}



function Card({title,value}){

return(

<div className="
bg-slate-800
rounded-xl
p-4
border
border-slate-700
">


<p className="
text-gray-400
text-sm
">

{title}

</p>


<h3 className="
text-white
text-lg
font-semibold
mt-2
">

{value}

</h3>


</div>

)

}


export default GoalUnderstandingCard;