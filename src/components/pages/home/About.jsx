export default function About() {
  return (
    <section
      id="about"
      className="relative py-32 px-6 text-white bg-black"
    >

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT TEXT */}

        <div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-widest text-white mb-6">
            ABOUT SANKALAN
          </h2>

          <p className="text-gray-400 leading-relaxed text-lg">
            Sankalan is the annual tech fest of the Department of Computer
            Science Society. It brings together innovators, developers and
            tech enthusiasts to compete, collaborate and celebrate technology.
          </p>

          <p className="text-gray-400 leading-relaxed text-lg mt-6">
            From coding competitions to AI challenges, workshops and tech
            talks — Sankalan is where creativity meets cutting-edge technology.
          </p>

        </div>

        {/* RIGHT CARD */}

        <div className="relative border border-cyan-500/20 p-8 rounded-xl bg-black/80">

          <h3 className="text-3xl font-semibold text-cyan-400 mb-4">
            Why Sankalan?
          </h3>

          <ul className="space-y-4 text-gray-300">

            <li>⚡ Competitive coding events</li>
            <li>🤖 AI & tech challenges</li>
            <li>🧠 Workshops by experts</li>
            <li>🚀 Networking with innovators</li>

          </ul>

        </div>

      </div>

    </section>
  );
}