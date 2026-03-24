import Particles from "react-tsparticles";
import tech from "../../../assets/tech.gif";

export default function Hero() {

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center text-white overflow-hidden"
    >

      {/* BACKGROUND IMAGE */}

      <div
        className="absolute inset-0 bg-cover bg-right opacity-70"
        style={{ backgroundImage: `url(${tech})` }}
      />

      {/* DARK FADE OVERLAY */}

      <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-transparent"></div>

      {/* PARTICLES */}

      <Particles
        id="tsparticles"
        className="absolute inset-0 z-0"
        options={{
          background: { color: "transparent" },
          particles: {
            number: { value: 90 },
            color: { value: "#00ffff" },
            links: {
              enable: true,
              color: "#00ffff",
              distance: 140,
              opacity: 0.4
            },
            move: { enable: true, speed: 1.5 },
            opacity: { value: 0.5 },
            size: { value: 2 }
          }
        }}
      />

      {/* HERO CONTENT */}

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 flex justify-start">

        <div className="max-w-lg">

          <h1 className="text-6xl md:text-7xl font-bold tracking-widest text-white drop-shadow-[0_0_25px_#00ffff]">
            SANKALAN 2025
          </h1>

          <p className="mt-6 text-gray-400 text-lg">
            Where Code Meets Innovation
          </p>

          <div className="mt-10 flex gap-6">

            <a
              href="#events"
              className="px-6 py-3 bg-[#00ffff] text-black font-semibold rounded-lg hover:bg-[#00d9ff] transition"
            >
              Explore Events
            </a>

            <a
              href="#about"
              className="px-6 py-3 border border-[#00ffff] text-[#00ffff] rounded-lg hover:bg-[#00ffff] hover:text-black transition"
            >
              Learn More
            </a>

          </div>

        </div>

      </div>

      {/* HERO → ABOUT FADE */}

      <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-b from-transparent to-black"></div>

    </section>
  );
}