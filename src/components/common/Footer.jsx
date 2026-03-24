import { Instagram, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 mt-20 border-t border-cyan-500/10">

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">

        {/* Logo + about */}
        <div>

          <h2 className="text-xl font-bold text-cyan-400 tracking-widest drop-shadow-[0_0_8px_#00ffff]">
            SANKALAN 2025
          </h2>

          <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-sm">
            Sankalan is the annual tech fest of the Department of Computer
            Science Society celebrating innovation, technology and creativity.
          </p>

        </div>


        {/* Quick links */}
        <div>

          <h3 className="text-white font-semibold mb-4 tracking-widest">
            QUICK LINKS
          </h3>

          <div className="flex flex-col gap-3 text-sm">

            <a href="#home" className="hover:text-cyan-400 transition">
              Home
            </a>

            <a href="#events" className="hover:text-cyan-400 transition">
              Events
            </a>

            <a href="#team" className="hover:text-cyan-400 transition">
              Team
            </a>

            <a href="#faq" className="hover:text-cyan-400 transition">
              FAQ
            </a>

          </div>

        </div>


        {/* Contact */}
        <div>

          <h3 className="text-white font-semibold mb-4 tracking-widest">
            CONTACT
          </h3>

          <p className="text-sm text-gray-400">
            Department of Computer Science Society
          </p>

          <p className="text-sm text-gray-400 mt-2">
            University of Delhi
          </p>


          {/* Social icons */}
          <div className="flex gap-6 mt-6 text-cyan-400">

            <a href="https://www.instagram.com/sankalan.ducs/"
               target="_blank"
               rel="noopener noreferrer"
               className="hover:text-white transition hover:scale-110">
              <Instagram size={22}/>
            </a>
            

            <a href="https://www.facebook.com/DUCS.Sankalan/" 
               target="_blank"
               rel="noopener noreferrer"
               className="hover:text-white transition hover:scale-110">
              <Facebook size={22}/>
            </a>

            <a href="https://www.linkedin.com/school/department-of-computer-science-university-of-delhi/"
               target="_blank"
               rel="noopener noreferrer"
               className="hover:text-white transition hover:scale-110">
              <Linkedin size={22}/>
            </a>

          </div>

        </div>

      </div>


      {/* bottom bar */}
      <div className="border-t border-cyan-500/10 text-center py-6 text-sm text-gray-500">
        © 2025 Sankalan — Department of Computer Science Society
      </div>

    </footer>
  );
}