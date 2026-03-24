export default function Events() {

  const techEvents = [
    { title: "HACKDUCS", desc: "24-hour hackathon where ideas become reality." },
    { title: "ALGOHOLICS", desc: "Competitive programming arena." },
    { title: "BLIND CODING", desc: "Write code without compiling." },
    { title: "SQUASH THE BUG", desc: "Debugging battlefield." },
    { title: "CODE AUCTION", desc: "Strategic bidding + coding." }
  ]

  const funEvents = [
    { title: "CHAKRAVYUH", desc: "Campus cryptic treasure hunt." },
    { title: "DASTUR-E-MEHFIL", desc: "Poetry and spoken word arena." },
    { title: "FEET ON FIRE", desc: "High energy dance battle." }
  ]

  return (
    <section id="events" className="relative py-32 bg-black text-white overflow-hidden">

      {/* CYBER GRID BACKGROUND */}

      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00ffff_1px,transparent_1px)] [bg-size:30px_30px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold tracking-widest text-center mb-24 drop-shadow-[0_0_20px_#00ffff]">
          EVENT ARENAS
        </h2>


        {/* TECH ARENA */}

        <h3 className="text-2xl text-cyan-400 mb-10 tracking-widest">
          TECH ARENA
        </h3>

        <div className="grid md:grid-cols-3 gap-10 mb-24">

          {techEvents.map((event, i) => (

            <div
              key={i}
              className="group relative border border-cyan-500/20 p-8 rounded-xl bg-black hover:border-cyan-400 transition duration-300 hover:scale-105"
            >

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-linear-to-r from-cyan-500/10 to-transparent blur-xl" />

              <h4 className="relative text-xl font-semibold text-cyan-400 mb-4">
                {event.title}
              </h4>

              <p className="relative text-gray-400 text-sm">
                {event.desc}
              </p>

              <button className="relative mt-6 text-sm text-cyan-400 border border-cyan-400 px-4 py-2 rounded hover:bg-cyan-400 hover:text-black transition">
                Enter Arena
              </button>

            </div>

          ))}

        </div>


        {/* CREATIVE ARENA */}

        <h3 className="text-2xl text-cyan-400 mb-10 tracking-widest">
          CREATIVE ARENA
        </h3>

        <div className="grid md:grid-cols-3 gap-10">

          {funEvents.map((event, i) => (

            <div
              key={i}
              className="group relative border border-cyan-500/20 p-8 rounded-xl bg-black hover:border-cyan-400 transition duration-300 hover:scale-105"
            >

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-linear-to-r from-cyan-500/10 to-transparent blur-xl" />

              <h4 className="relative text-xl font-semibold text-cyan-400 mb-4">
                {event.title}
              </h4>

              <p className="relative text-gray-400 text-sm">
                {event.desc}
              </p>

              <button className="relative mt-6 text-sm text-cyan-400 border border-cyan-400 px-4 py-2 rounded hover:bg-cyan-400 hover:text-black transition">
                Enter Arena
              </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}