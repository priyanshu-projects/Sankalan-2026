export default function Sponsors(){

const sponsors = [
  {name:"Title Sponsor"},
  {name:"Powered By"},
  {name:"Associate Sponsor"},
  {name:"Community Partner"},
  {name:"Media Partner"},
  {name:"Education Partner"}
]

return(

<section className="min-h-screen bg-black text-white py-32 px-6">

<div className="max-w-7xl mx-auto">

{/* PAGE TITLE */}

<h1 className="text-5xl font-bold text-center tracking-widest text-cyan-400 mb-10 drop-shadow-[0_0_25px_#00ffff]">
OUR SPONSORS
</h1>

<p className="text-gray-400 text-center max-w-3xl mx-auto mb-24">
Sankalan provides a powerful platform for organizations to connect with the
next generation of developers, innovators, and technology enthusiasts.
Through partnerships with our sponsors, we are able to create impactful
experiences, exciting competitions, and opportunities that inspire students
to explore the frontiers of technology.
</p>


{/* SPONSOR GRID */}

<div className="grid md:grid-cols-3 gap-10">

{sponsors.map((s,i)=>(
<div
key={i}
className="group p-12 rounded-xl border border-cyan-400/20 bg-[#050b14]
hover:border-cyan-400 transition relative overflow-hidden"
>

{/* glow */}

<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
<div className="absolute inset-0 bg-linear-to-r from-transparent via-cyan-400/20 to-transparent blur-xl"></div>
</div>

{/* content */}

<h3 className="text-xl font-semibold text-center text-cyan-400 relative z-10">
{s.name}
</h3>

<p className="text-gray-500 text-sm text-center mt-4 relative z-10">
Sponsor logo will appear here
</p>

</div>
))}

</div>


{/* BECOME A SPONSOR */}

<div className="mt-32 text-center max-w-3xl mx-auto">

<h2 className="text-3xl font-bold text-cyan-400 mb-6 tracking-widest">
BECOME A SPONSOR
</h2>

<p className="text-gray-400 mb-10">
Partner with Sankalan and showcase your brand to a vibrant community of
students, developers, and tech enthusiasts from across the country.
Sponsoring Sankalan offers visibility, engagement, and a direct connection
with the future workforce of the technology industry.
</p>

<a
href="#contact"
className="px-8 py-4 bg-[#00ffff] text-black font-semibold rounded-lg
hover:bg-[#00d9ff] transition"
>
Partner With Us
</a>

</div>

</div>

</section>

)
}